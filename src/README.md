# Halal Munchies Franchise Platform

A modern React 18 + Vite application for Halal Munchies franchise platform, featuring customer-facing website and franchise management portal.

## Features

### Customer Portal
- **Home**: Hero section with brand showcase
- **Our Story**: Company history and values
- **Online Ordering**: Food menu and ordering system
- **Locations**: Store locator and franchise locations
- **Contact**: Customer support and franchise inquiries
- **Login**: Authentication for customers and franchise owners

### Franchise Management Portal (Private)
- **Dashboard**: Business intelligence and performance metrics
- **Inspections**: Quality control and compliance tracking
- **Training**: Employee training and certification management
- **Inventory**: Stock management and supplier tracking
- **Reports**: Advanced analytics and business reports

## Tech Stack

- **React 18** - Modern React with functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful SVG icons

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── sections/       # Page sections (Hero, Features, etc.)
│   ├── ui/            # UI components (Button, Card, etc.)
│   └── figma/         # Figma-specific components
├── pages/             # Route-based page components
├── contexts/          # React contexts (Auth, etc.)
├── styles/           # Global styles and CSS
└── main.tsx          # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd halal-munchies-franchise-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Demo Mode

The application includes a demo toggle that allows you to switch between:
- **Customer Website**: Public-facing restaurant website
- **Franchise Dashboard**: Private management portal

### Authentication

For demo purposes, use any email/password combination. Select different user roles to see different access levels:
- **Customer**: Access to public website
- **Franchise Owner/Manager**: Access to private management portal

### Navigation

The application uses React Router for navigation. Navigation menus automatically update based on authentication state:
- **Public Navigation**: Home | Online Ordering | Locations | Contact | Login
- **Private Navigation**: Dashboard | Inspections | Training | Inventory | Reports | Logout

## Development

### Code Style

- Use TypeScript (.tsx files only)
- Functional components with React hooks
- Tailwind CSS for styling (no inline styles)
- Semantic HTML for accessibility

### Responsive Design

- **Desktop**: Split layouts with sidebar navigation
- **Mobile**: Stacked layouts with collapsible navigation

### Accessibility Features

- Semantic headings and HTML structure
- Proper labels for form inputs
- Visible focus states for keyboard navigation
- High color contrast ratios
- ARIA attributes where needed

## Brand Colors

The application uses a custom color palette:

- **Halal Green**: `#2d5a27` (Primary brand color)
- **Halal Gold**: `#d4af37` (Accent color)
- **Halal Cream**: `#faf8f3` (Background color)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary and confidential.

## Support

For technical support or franchise inquiries, please contact:
- Email: support@halalmunchies.com
- Website: https://halalmunchies.com