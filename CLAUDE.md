# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend (React/Vite)
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm i` - Install dependencies

### Backend (Express/TypeScript)
- `cd server && npm run dev` - Start backend development server with hot reload
- `cd server && npm run build` - Build server TypeScript to JavaScript
- `cd server && npm start` - Start production server
- `cd server && npm run seed` - Run database seeding scripts

## Architecture

This is a full-stack franchise portal for Halal Munchies with two main parts:

### Frontend Structure
- **React + TypeScript + Vite**: Modern React setup with SWC for fast builds
- **Tailwind CSS**: Custom design system with Halal Munchies brand colors (orange, red, green, brown, gold)
- **Radix UI**: Comprehensive component library for accessible UI components
- **Component Architecture**: 
  - `/src/components/` - Feature components (Navigation, CustomerWebsite, FranchiseDashboard, etc.)
  - `/src/components/ui/` - Reusable UI components built on Radix primitives
  - Multi-role system: customer, employee, manager, admin, franchisee
  - Demo mode toggle between customer and franchise views

### Backend Structure  
- **Express + TypeScript**: RESTful API with async error handling
- **Sequelize + SQLite**: ORM with database models for franchise management
- **JWT Authentication**: Token-based auth with bcrypt password hashing
- **Structure**:
  - `/server/src/controllers/` - Route handlers
  - `/server/src/models/` - Database models
  - `/server/src/routes/` - API route definitions
  - `/server/src/services/` - Business logic
  - `/server/src/middleware/` - Auth and validation middleware

### Key Features
- **Multi-role Dashboard**: Different interfaces for customers vs franchise management
- **Online Ordering System**: Integrated ordering with inventory management
- **Training System**: Employee training modules and tracking
- **Inspection Management**: Store inspection workflows and compliance
- **Catering Services**: Large order management and scheduling
- **Location Management**: Multi-location franchise oversight

### Configuration
- **Vite Config**: Path aliases (`@/` maps to `./src`), chunking strategy for vendor libs
- **Tailwind**: Custom color palette, extended spacing/typography for brand consistency
- **TypeScript**: Strict mode enabled, separate configs for app and Node environments

### State Management
- **React State**: Local state with centralized AppState interface
- **Role-based Rendering**: Components conditionally render based on user role and login state
- **Section Navigation**: Single-page app with section-based routing (home, dashboard, ordering, etc.)