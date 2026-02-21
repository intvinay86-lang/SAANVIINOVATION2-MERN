# SAANVI INNOVATION - React Application

A modern, responsive React application built with Vite, featuring a professional corporate design with an orange-based theme.

## Tech Stack

- **React 19** with Vite
- **React Router DOM v6** for routing
- **Redux Toolkit** for state management
- **React Redux** for React bindings
- **Native React 19 Meta Tags** for SEO
- **Tailwind CSS v3** for styling
- **React Icons** for icons
- **Swiper.js** for responsive hero slider
- **PostCSS** for CSS processing

## Features

- ✅ Modern pages-based architecture
- ✅ Responsive design with mobile-first approach
- ✅ Professional corporate orange theme
- ✅ Sticky navigation with mobile menu
- ✅ Modern dark blue footer with company info
- ✅ Auto-sliding hero section with Swiper.js and smooth transitions
- ✅ Services section with animated cards
- ✅ Recent works section with portfolio previews
- ✅ Clients section with logo showcase
- ✅ Dynamic portfolio detail pages
- ✅ SEO optimized with React 19 native meta tags
- ✅ Admin dashboard with authentication
- ✅ Protected routes with localStorage-based auth
- ✅ 404 Not Found page with helpful navigation
- ✅ Clean, scalable component structure
- ✅ SEO-friendly routing setup

## Installation & Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**

   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── main.jsx                 # Application entry point
├── App.jsx                  # Main App component
├── router/
│   └── AppRouter.jsx        # Routing configuration
├── layouts/
│   └── MainLayout.jsx       # Main layout with header and outlet
├── components/
│   └── layout/
│       ├── Header.jsx       # Navigation header component
│       └── Footer.jsx       # Footer component
├── pages/
│   ├── Home/
│   │   ├── Home.jsx         # Home page
│   │   └── Components/
│   │       ├── HeroSlider.jsx # Hero slider component
│   │       ├── ServicesSection.jsx # Services showcase
│   │       ├── RecentWorksSection.jsx # Portfolio preview
│   │       └── ClientsSection.jsx # Client logos
│   ├── About/About.jsx      # About page
│   ├── Services/Services.jsx # Services page
│   ├── Portfolio/
│   │   ├── Portfolio.jsx    # Portfolio listing
│   │   └── PortfolioDetails.jsx # Individual project details
│   ├── Pricing/Pricing.jsx  # Pricing page
│   └── Contact/Contact.jsx  # Contact page
└── assets/                  # Static assets
```

## Routes

- `/` - Home page with hero slider, services, recent works, and clients
- `/about` - About us page
- `/services` - Services offered
- `/portfolio` - Project portfolio listing
- `/portfolio/:id` - Individual project details
- `/pricing` - Pricing plans
- `/contact` - Contact information and form
- `/terms` - Terms & Conditions
- `/login` - Admin login page
- `/admin` - Admin dashboard (protected)
- `*` - 404 Not Found page (catch-all route)

## Brand Details

- **Company:** SAANVI INNOVATION
- **Email:** ceo@saanviinnovation.com
- **Phone:** +91 7999840475
- **Theme:** Professional orange-based corporate design

## Development

The application uses:

- Functional components only
- React Hooks (useState, useEffect)
- React Router DOM v6 with NavLink for active states
- Tailwind CSS v3 for styling
- React Icons for consistent iconography

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement approach

## Admin Dashboard

The application includes a complete admin dashboard system with authentication.

### Admin Access

**Login URL:** `/login`

**Demo Credentials:**

- Email: `admin@saanviinnovation.com`
- Password: `admin123`

### Admin Features

- **Authentication System**: localStorage-based mock authentication
- **Protected Routes**: Admin routes are protected and redirect to login if not authenticated
- **Dashboard**: Overview with stats cards, recent messages, and quick actions
- **Responsive Design**: Fully responsive with collapsible sidebar on mobile
- **Modern UI**: Dark blue theme with orange accents

### Admin Structure

```
src/
├── layouts/
│   └── AdminLayout.jsx          # Admin layout with sidebar and navbar
├── pages/
│   ├── Login/
│   │   └── Login.jsx            # Login page
│   └── Admin/
│       ├── Dashboard.jsx        # Main dashboard
│       └── Components/
│           ├── StatsCard.jsx    # Statistics card component
│           ├── RecentMessages.jsx # Messages table
│           └── QuickActions.jsx # Quick action buttons
├── components/
│   └── ProtectedRoute.jsx       # Route protection component
└── utils/
    └── auth.js                  # Authentication utilities
```

### Authentication Flow

1. User visits `/login`
2. Enters credentials (validated on client-side)
3. On successful login, user data is stored in localStorage/sessionStorage
4. User is redirected to `/admin`
5. Protected routes check authentication status
6. Logout clears stored data and redirects to login

### Extending the Admin Panel

To add new admin pages:

1. Create page component in `src/pages/Admin/`
2. Add route in `AppRouter.jsx` under admin routes
3. Add menu item in `AdminLayout.jsx` menuItems array
4. Wrap route with `ProtectedRoute` component
