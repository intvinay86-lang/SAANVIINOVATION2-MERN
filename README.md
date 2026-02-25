# SAANVI INNOVATION - Full Stack Business Website

A complete modern business website for SAANVI INNOVATION, built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a powerful admin panel for content management.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd saanviinnovation-mern
```

2. **Setup Server**

```bash
cd server
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration
```

3. **Setup Client**

```bash
cd client
npm install

# Create .env file
cp .env.example .env
# Edit .env with your API URL
```

4. **Start Development**

Terminal 1 (Server):

```bash
cd server
npm run dev
```

Terminal 2 (Client):

```bash
cd client
npm run dev
```

Visit:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## 📋 Project Overview

A production-ready, full-stack business website with comprehensive admin panel for managing all content dynamically. Features include:

### Frontend Features

- Modern orange-themed corporate design
- Fully responsive (mobile-first approach)
- Dynamic content from database
- SEO optimized
- Contact form with validation
- Portfolio showcase with filtering
- Service listings
- Pricing plans
- Client testimonials
- Terms & Privacy pages

### Backend Features

- RESTful API architecture
- JWT authentication
- Role-based access control
- File upload handling
- Contact form management
- Content management system
- User management
- Secure password hashing
- Input validation
- Error handling middleware

### Admin Panel Features

- Dashboard with statistics
- Site information management
- Page content management (Home, About, Services, Portfolio, Contact, Footer, Pricing, Terms, Privacy)
- Portfolio project management (CRUD operations)
- Contact message management
- User profile management
- Real-time content updates
- Image upload functionality
- Rich text editor for content

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router DOM v6** - Routing
- **Tailwind CSS v3** - Styling
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Quill** - Rich text editor
- **Vite** - Build tool

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Joi** - Validation
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment variables

## 📁 Project Structure

```
saanviinnovation-mern/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── app/               # Redux store configuration
│   │   ├── components/        # Reusable components
│   │   │   ├── admin/        # Admin-specific components
│   │   │   ├── cards/        # Card components
│   │   │   ├── layout/       # Layout components
│   │   │   └── sections/     # Section components
│   │   ├── features/         # Redux slices
│   │   │   ├── auth/         # Authentication
│   │   │   ├── contact/      # Contact management
│   │   │   ├── siteData/     # Site data management
│   │   │   ├── upload/       # File upload
│   │   │   └── user/         # User management
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # Page layouts
│   │   ├── pages/            # Page components
│   │   │   ├── About/
│   │   │   ├── Admin/        # Admin panel pages
│   │   │   ├── Auth/
│   │   │   ├── Contact/
│   │   │   ├── Home/
│   │   │   ├── Portfolio/
│   │   │   ├── Pricing/
│   │   │   ├── Privacy/
│   │   │   ├── Services/
│   │   │   └── Terms/
│   │   ├── router/           # Route configuration
│   │   ├── services/         # API services
│   │   └── utils/            # Utility functions
│   └── package.json
│
├── server/                     # Backend Node.js application
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Custom middleware
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   ├── validators/       # Input validation
│   │   └── app.js            # Express app setup
│   ├── tests/                # Test files
│   ├── uploads/              # Uploaded files
│   └── package.json
│
└── README.md
```

## 📄 Pages & Routes

### Public Pages

- **/** - Home page with hero, services, portfolio, clients
- **/about** - Company information, mission, vision, team
- **/services** - Detailed service descriptions
- **/portfolio** - Project showcase with filtering
- **/portfolio/:id** - Individual project details
- **/pricing** - Pricing plans and packages
- **/contact** - Contact form and information
- **/terms** - Terms and conditions
- **/privacy** - Privacy policy

### Admin Pages (Protected)

- **/admin** - Dashboard with statistics
- **/admin#siteinfo** - Site information settings
- **/admin#home** - Home page content management
- **/admin#about** - About page content management
- **/admin#services** - Services management
- **/admin#portfolio** - Portfolio settings
- **/admin#portfolio-projects** - Portfolio project management
- **/admin#contact** - Contact page settings
- **/admin#contact-messages** - Contact messages inbox
- **/admin#footer** - Footer settings
- **/admin#pricing** - Pricing page management
- **/admin#terms** - Terms page editor
- **/admin#privacy** - Privacy page editor
- **/admin#profile** - User profile management

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- Tokens are stored in localStorage
- Protected routes require valid JWT
- Token expiration handling
- Cross-tab authentication sync
- Secure password hashing with bcrypt

### Default Admin Credentials

```
Email: admin@example.com
Password: admin123
```

⚠️ **Important**: Change these credentials after first login!

## 🗄️ Database Models

### User

- name, email, password (hashed)
- role (admin/user)
- timestamps

### Contact

- firstName, lastName, email, phone
- subject, message
- timestamps

### SiteData (Single Document)

- siteinfo (company details, contact info, social links)
- homeSettings (hero, about, services, clients)
- aboutSettings (mission, vision, values, team)
- servicesSettings (hero, services list)
- portfolioSettings (hero, categories)
- portfolioProjects (array of projects)
- contactSettings (hero, contact numbers, business hours)
- footer (tagline)
- pricingSettings (hero, plans)
- termsSettings (content)
- privacySettings (content)

## 🔧 Environment Variables

### Server (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/saanvi-innovation
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api/v1
```

## 🎨 Design System

- **Primary Color**: Orange (#f97316)
- **Secondary Color**: Dark Orange (#ea580c)
- **Background**: White / Gray-50
- **Text**: Gray-800 / Gray-900
- **Font**: Orbitron (headings), System fonts (body)
- **Responsive Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

## 📡 API Endpoints

### Authentication

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration (admin only)

### Users

- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update profile
- `PUT /api/v1/users/change-password` - Change password

### Contacts

- `POST /api/v1/contacts` - Submit contact form (public)
- `GET /api/v1/contacts` - Get all contacts (admin)
- `GET /api/v1/contacts/:id` - Get contact by ID (admin)
- `PUT /api/v1/contacts/:id` - Update contact (admin)
- `DELETE /api/v1/contacts/:id` - Delete contact (admin)
- `GET /api/v1/contacts/stats` - Get contact statistics (admin)

### Site Data

- `GET /api/v1/sitedata` - Get all site data (public)
- `PUT /api/v1/sitedata/:section` - Update section (admin)

### Upload

- `POST /api/v1/upload` - Upload file (admin)

## 🧪 Testing

```bash
cd server
npm test
```

Tests include:

- Authentication tests
- Contact API tests
- User management tests
- Site data tests
- Upload tests

## 📦 Build for Production

### Build Client

```bash
cd client
npm run build
```

Output: `client/dist/`

### Build Server

```bash
cd server
npm run build
```

### Run Production

```bash
# Server
cd server
npm start

# Serve client build with a static server
cd client/dist
npx serve
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the client: `npm run build`
2. Deploy the `client/dist` folder
3. Set environment variable: `VITE_API_URL`

### Backend (Heroku/Railway/DigitalOcean)

1. Push server code to hosting platform
2. Set environment variables
3. Ensure MongoDB connection
4. Run migrations if needed

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in server .env

## 📞 Contact Information

- **Company**: SAANVI INNOVATION
- **Address**: 21, Near Garg Clinic, Nehru Colony, Mayur Nagar, Thatipur, Gwalior, Madhya Pradesh – 474011
- **Phone**: +91 8305233223, +91 9876543210
- **Email**: ceo@saanviinnovation.com
- **Website**: www.saanviinnovation.com

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

© 2026 SAANVI INNOVATION. All rights reserved.

## 🙏 Acknowledgments

- React Team for the amazing library
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible database
- All open-source contributors

---

**Built with ❤️ by SAANVI INNOVATION**
