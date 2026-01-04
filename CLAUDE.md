# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Meu Xodo** is a car activity diary application that helps users track vehicle maintenance, washes, reminders, and important dates. The application features:

- Vehicle registration (make, model, year)
- 3D car visualization
- Maintenance and service history tracking
- Wash scheduling and reminders
- Car anniversary reminders
- IPVA (vehicle tax) payment tracking
- Apple-inspired design language (reference: https://www.apple.com/br/iphone-17/)

The primary language for user-facing content is **Portuguese (Brazil)**.

## Tech Stack

- **Frontend**: React 19 with Vite
- **Backend/Database**: Firebase (Firestore, Authentication, Cloud Functions, Hosting)
- **3D Visualization**: Three.js with React Three Fiber and Drei helpers
- **Build Tool**: Vite 7

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Architecture

### Technology Architecture

- **Frontend Layer**: React components with hooks for state management
- **Data Layer**: Firebase Firestore for real-time data sync
- **Authentication**: Firebase Authentication for user management
- **Storage**: Firebase Storage for images (car photos, receipts)
- **Functions**: Firebase Cloud Functions for background tasks (reminders, notifications)
- **Hosting**: Firebase Hosting for deployment

### Core Features to Implement

1. **Vehicle Management**
   - User selects car make, model, and year
   - 3D visualization of selected vehicle
   - Vehicle profile storage in Firestore
   - User authentication via Firebase Auth

2. **Activity Tracking**
   - Revisões (inspections/reviews)
   - Manutenções (maintenance)
   - Lavagens (car washes)
   - Real-time sync across devices via Firestore

3. **Reminder System**
   - Car wash reminders
   - Car anniversary notifications
   - IPVA payment reminders
   - Cloud Functions for scheduled notifications

### Design Principles

- Follow Apple's design language for UI/UX
- Clean, minimal interface
- Focus on usability and clarity
- Portuguese (Brazilian) as the primary language for all user-facing text

## Development Principles

### Architecture & Code Quality

1. **Clean Architecture** - Maintain separation of concerns with clear layers (presentation, business logic, data)
2. **Performance** - Optimize based on Big O notation; consider algorithmic complexity for all operations
3. **Security** - Mitigate against major CVEs and common vulnerabilities
4. **Resilience** - Implement service resilience patterns and caching strategies
5. **Modern Design** - Context-appropriate modern design patterns
6. **Testing Pyramid** - Guarantee functionality through comprehensive testing (unit, integration, e2e)
7. **Data Security** - Prevent data leaks and implement proper data protection
8. **Observability** - Apply logging to all flows and implement observability concepts
9. **Design System** - Follow design system principles for consistency
10. **Phased Development** - Create implementation plans with phases and sub-phases
11. **Change Documentation** - Document all changes in CHANGELOG.md
12. **Build Quality** - Ensure working builds and remove unused imports

### Agent Behavior

1. **Long-Running Commands** - Cancel or convert to background tasks if commands take too long
2. **Alternative Solutions** - If a solution doesn't work, research and try new approaches
3. **Token Economy** - Focus on implementation over summaries

## Project Structure

```
src/
├── components/
│   ├── Landing.jsx              # Landing page with product showcase
│   ├── VehicleSelection.jsx    # Initial vehicle setup screen
│   ├── CarViewer3D.jsx          # 3D car visualization with Three.js
│   ├── Sidebar.jsx              # Navigation and info sidebar
│   ├── ActivityModal.jsx        # Modal for adding activities
│   ├── ActivityList.jsx         # List of activities by type
│   ├── Calendar.jsx             # Calendar view of activities
│   └── ThemeSelector.jsx        # Theme switcher (light/dark/system)
├── firebase/
│   └── config.js                # Firebase initialization and config
├── services/
│   └── sessionService.js        # Firebase session management
├── assets/          # Static assets (images, icons)
├── App.jsx          # Main application component
├── App.css          # Application styles
└── main.jsx         # Application entry point

public/
├── models/          # 3D model files (.glb, .gltf)
│   └── chevy-tracker.glb  # Chevrolet Tracker 3D model
└── logo.svg         # Application logo
```

## Features Implemented

### Core Functionality
- **Landing Page**: Product showcase with features overview and CTA buttons
- **Firebase Integration**: User session management with anonymous authentication
- **Vehicle Selection**: Initial setup flow to choose car make, model, and year
- **3D Visualization**: Interactive 3D model viewer (currently supports Chevrolet Tracker)
- **Activity Management**: Full CRUD operations for vehicle activities
- **Calendar View**: Visual calendar with activity indicators
- **Theme System**: Light/Dark/System theme support with CSS variables
- **Data Persistence**: Dual storage (localStorage + Firebase Firestore)

### Activity Types
1. **Calendário** (Calendar) - Visual calendar view of all activities by date
2. **Manutenções** (Maintenance) - Track repairs and services
3. **Lavagens** (Car Washes) - Log washing history
4. **Revisões** (Inspections) - Schedule and track periodic reviews
5. **IPVA** - Manage vehicle tax payments
6. **Lembretes** (Reminders) - Create custom reminders

### Data Structure
Activities are stored with:
- Date, description, value (currency)
- Kilometers (for maintenance/inspections)
- Notes/observations
- Type-specific fields (e.g., IPVA year and installment)

## 3D Model Setup

The project uses a free Chevrolet Tracker 3D model from Sketchfab:
- Source: https://sketchfab.com/3d-models/chevy-tracker-5aad1bae1d934d8c8781dc589a67c0ec
- License: Creative Commons Attribution-NonCommercial-ShareAlike
- Format: GLB (recommended) or GLTF
- Location: `public/models/chevy-tracker.glb`

To add the 3D model:
1. Download from Sketchfab (requires free account)
2. Save as `public/models/chevy-tracker.glb`
3. The CarViewer3D component will automatically load it

## Firebase Setup

The application uses Firebase for backend services:

1. **Authentication**: Anonymous authentication for user sessions
2. **Firestore**: NoSQL database for storing user data
3. **Configuration**: See `FIREBASE_SETUP.md` for detailed setup instructions

### Environment Variables

Create a `.env` file in the root directory with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Data Sync Strategy

- **Primary Storage**: localStorage for immediate access and offline support
- **Secondary Storage**: Firebase Firestore for backup and multi-device sync
- **Session Management**: Firebase Auth anonymous sessions track user data
- **Auto-Sync**: Activities and vehicle data automatically sync to Firebase

## Key Considerations

- All user-facing strings should be in Brazilian Portuguese
- The 3D car visualization is a central feature of the UX
- Reminder system should be reliable and configurable
- Firebase Security Rules protect user data (see `FIREBASE_SETUP.md`)
- Offline-first approach with localStorage as primary storage
- Firebase serves as backup and enables future multi-device sync
- Anonymous authentication provides simple user tracking without registration
