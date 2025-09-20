# Backend & Database Deployment (Azure CLI)

These steps provision Azure resources for the Express API and PostgreSQL database, deploy the API via ZIP upload, run migrations, and seed demo data. Commands assume **Linux App Service** hosting and **Azure Database for PostgreSQL flexible server**.

## Prerequisites
- Azure CLI 2.55+
- Zip utility (`zip`), Node.js 18+
- Local Postgres client (`psql`) for migrations/seed tasks

## Environment Variables
Define the following locally before running commands:
```bash
RESOURCE_GROUP="hm-backend-rg"
LOCATION="eastus"
APP_SERVICE_PLAN="hm-backend-plan"
WEBAPP_NAME="hm-backend-api"
POSTGRES_SERVER="hm-backend-pg"
POSTGRES_DB="halal_munchies"
POSTGRES_ADMIN_USER="hmadmin"
POSTGRES_ADMIN_PASS="<strong-password>"
AZ_SUBSCRIPTION="<subscription-id-or-name>"
```

## One-time Azure Setup
```bash
az login
az account set --subscription "$AZ_SUBSCRIPTION"

# Resource group & Postgres flexible server
az group create --name "$RESOURCE_GROUP" --location "$LOCATION"
az postgres flexible-server create \
  --name "$POSTGRES_SERVER" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --admin-user "$POSTGRES_ADMIN_USER" \
  --admin-password "$POSTGRES_ADMIN_PASS" \
  --database-name "$POSTGRES_DB" \
  --tier Burstable \
  --sku-name Standard_B1ms \
  --storage-size 32

# If server exists, update firewall to allow current IP
az postgres flexible-server firewall-rule create \
  --name AllowMyIp \
  --resource-group "$RESOURCE_GROUP" \
  --server-name "$POSTGRES_SERVER" \
  --start-ip-address $(curl -s https://ifconfig.me) \
  --end-ip-address $(curl -s https://ifconfig.me)

# App Service plan & Web App
az appservice plan create \
  --name "$APP_SERVICE_PLAN" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --sku P1v3 \
  --is-linux

az webapp create \
  --name "$WEBAPP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --plan "$APP_SERVICE_PLAN" \
  --runtime "NODE|18-lts"

# Configure Web App connection strings & env vars
POSTGRES_URL="postgres://${POSTGRES_ADMIN_USER}:${POSTGRES_ADMIN_PASS}@${POSTGRES_SERVER}.postgres.database.azure.com:5432/${POSTGRES_DB}?sslmode=require"

az webapp config connection-string set \
  --name "$WEBAPP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --connection-string-type PostgreSQL \
  --settings DATABASE_URL="$POSTGRES_URL"

az webapp config appsettings set \
  --name "$WEBAPP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --settings \
    NODE_ENV=production \
    DB_LOGGING=false \
    DB_SSL=true \
    JWT_SECRET="<production-secret>" \
    CLIENT_ORIGIN="https://<frontend-domain>"
```

## Build, Migrate, and Seed Locally
```bash
cd server
npm install
npm run build

# Run migrations/seed against Azure Postgres
PGPASSWORD="$POSTGRES_ADMIN_PASS" psql \
  --host "${POSTGRES_SERVER}.postgres.database.azure.com" \
  --username "${POSTGRES_ADMIN_USER}@${POSTGRES_SERVER}" \
  --dbname "$POSTGRES_DB" \
  --command "SELECT 1;"   # connectivity check

npm run seed
```

> `npm run seed` uses Sequelize to recreate schema and populate demo data. Ensure `DATABASE_URL` is set in `.env` before running locally or export it inline.

## Package & Deploy API via ZIP
```bash
cd server
zip -r ../api.zip dist package.json package-lock.json .env* -x "**/node_modules/**"
cd ..

az webapp deploy \
  --resource-group "$RESOURCE_GROUP" \
  --name "$WEBAPP_NAME" \
  --type zip \
  --src-path api.zip

# Clear zip and restart
rm api.zip
az webapp restart --name "$WEBAPP_NAME" --resource-group "$RESOURCE_GROUP"
```

## Manual Deployment Checklist
1. Ensure `DATABASE_URL` points to Azure Postgres.
2. `npm run build` inside `server/`.
3. `npm run seed` (once per environment or when refreshing data).
4. Package the `dist` folder with `package.json` and deploy via `az webapp deploy --type zip`.
5. `az webapp restart` to recycle the process.

## SSH Into App Service (Optional)
```bash
az webapp create-remote-connection \
  --name "$WEBAPP_NAME" \
  --resource-group "$RESOURCE_GROUP"
```

Use the forwarded port to inspect logs or run `npm run seed` in the hosted environment if necessary.
