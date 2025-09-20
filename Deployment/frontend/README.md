# Frontend Deployment (Azure CLI)

These steps publish the Vite React build to an Azure Storage static website with CDN cache purged so new assets load immediately.

## Prerequisites
- Azure CLI 2.55+ (`az --version`)
- Logged in with permission to create resource groups, storage accounts, and CDN profiles.
- Local build tooling (`npm`)

## One-time Setup
```bash
# Variables
RESOURCE_GROUP="hm-frontend-rg"
LOCATION="eastus"
STORAGE_ACCOUNT="hmfrontend$RANDOM"   # must be globally unique
CDN_PROFILE="hm-frontend-cdn"
CDN_ENDPOINT="hm-frontend-endpoint"

az login
az account set --subscription "<subscription-name-or-id>"

# Create resource group and storage account (static website enabled)
az group create --name "$RESOURCE_GROUP" --location "$LOCATION"
az storage account create \
  --name "$STORAGE_ACCOUNT" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --sku Standard_LRS \
  --kind StorageV2 \
  --https-only true

az storage blob service-properties update \
  --account-name "$STORAGE_ACCOUNT" \
  --static-website \
  --index-document index.html \
  --404-document index.html

# Optional CDN for cache purging
az cdn profile create \
  --name "$CDN_PROFILE" \
  --resource-group "$RESOURCE_GROUP" \
  --sku Standard_Microsoft

# The static website primary endpoint becomes the CDN origin
ORIGIN_HOST=$(az storage account show \
  --name "$STORAGE_ACCOUNT" \
  --resource-group "$RESOURCE_GROUP" \
  --query "primaryEndpoints.web" -o tsv | sed 's#https://##; s#/$##')

az cdn endpoint create \
  --name "$CDN_ENDPOINT" \
  --profile-name "$CDN_PROFILE" \
  --resource-group "$RESOURCE_GROUP" \
  --origin "$ORIGIN_HOST"
```

## Build & Upload
```bash
npm install
npm run build

# Clear existing files from $web container
ez storage blob delete-batch \
  --source '$web' \
  --account-name "$STORAGE_ACCOUNT"

# Upload new build artifacts
az storage blob upload-batch \
  --destination '$web' \
  --account-name "$STORAGE_ACCOUNT" \
  --source dist \
  --overwrite true

# Purge CDN cache so the latest assets load immediately (optional)
az cdn endpoint purge \
  --name "$CDN_ENDPOINT" \
  --profile-name "$CDN_PROFILE" \
  --resource-group "$RESOURCE_GROUP" \
  --content-paths '/*'
```

## Manual Upload Checklist
1. `npm run build`
2. `az storage blob delete-batch --source '$web' --account-name <acct>`
3. `az storage blob upload-batch --destination '$web' --account-name <acct> --source dist`
4. `az cdn endpoint purge --content-paths '/*' ...` (if CDN is enabled)

The static website endpoint is reported by:
```bash
az storage account show --name "$STORAGE_ACCOUNT" --resource-group "$RESOURCE_GROUP" --query "primaryEndpoints.web" -o tsv
```
