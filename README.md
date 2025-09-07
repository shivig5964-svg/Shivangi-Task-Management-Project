# Task Management Application

A full-stack task management application built with React.js frontend and Node.js/Express backend with MongoDB database.

## 🌐 Live Demo

- **Frontend**: [https://shivangi-task-management-project-jy4o7fqg4.vercel.app](https://shivangi-task-management-project-jy4o7fqg4.vercel.app)
- **Backend API**: [https://shivangi-task-management-project.onrender.com/api](https://shivangi-task-management-project.onrender.com/api)

## 🚀 Features

- **User Authentication**: Register, login, and secure JWT-based authentication
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status (pending, completed)
- **Task Statistics**: View task statistics and progress
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Environment Configuration**: Support for both local and production environments

## 🏗️ Project Structure

```
Shivangi Assignment/
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Auth/        # Authentication components
│   │   │   ├── Layout/      # Layout components
│   │   │   ├── Tasks/       # Task management components
│   │   │   └── UI/          # Generic UI components
│   │   ├── context/         # React context for state management
│   │   ├── pages/           # Main application pages
│   │   └── config/          # API configuration
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js/Express backend API
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── services/            # Business logic
│   ├── config/              # Database configuration
│   ├── constants/           # Application constants
│   └── package.json
└── README.md               # This file
```

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Data validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-management-app
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Environment Setup

#### Backend Environment
```bash
cd backend
cp env.example .env
```

Edit `backend/.env` with your configuration:
```env
# Server Configuration
PORT=5000
ENVIRONMENT=development

# Database Configuration
MONGODB_URI_LOCAL=mongodb://localhost:27017/task-management
MONGODB_URI_PRODUCTION=mongodb+srv://username:password@cluster.mongodb.net/task-management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration - Frontend URLs
FRONTEND_URL_LOCAL=http://localhost:3000
FRONTEND_URL_PRODUCTION=https://your-production-frontend.com

# Current environment (local or production)
ENVIRONMENT=local

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend Environment
```bash
cd frontend
cp env.example .env
```

Edit `frontend/.env` with your configuration:
```env
# Local development
REACT_APP_API_URL_LOCAL=http://localhost:5000/api

# Production URL (replace with your actual production URL)
REACT_APP_API_URL_PRODUCTION=https://your-production-api.com/api

# Current environment (local or production)
REACT_APP_ENVIRONMENT=local
```

### 4. Start the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd frontend
npm start
```
The frontend application will start on `http://localhost:3000`

## 🌐 API Endpoints

**Base URL**: `https://shivangi-task-management-project.onrender.com/api`

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get a single task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/status` - Update task status only
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/stats/summary` - Get task statistics

### Health Check
- `GET /api/health` - API health status

## 🔧 Development

### Available Scripts

#### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

#### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Environment Configuration

The application supports two environments:

#### Local Development
- Frontend: `REACT_APP_ENVIRONMENT=local`
- Backend: `ENVIRONMENT=local`
- Uses local MongoDB and localhost URLs

#### Production
- Frontend: `REACT_APP_ENVIRONMENT=production`
- Backend: `ENVIRONMENT=production`
- Uses production MongoDB and production URLs

## 🚀 Deployment

### Backend Deployment
1. Set `ENVIRONMENT=production` and `ENVIRONMENT=production`
2. Update `MONGODB_URI_PRODUCTION` with your production database URL
3. Update `FRONTEND_URL_PRODUCTION` with your production frontend URL
4. Set a strong `JWT_SECRET`
5. Deploy to your preferred platform (Heroku, AWS, DigitalOcean, etc.)

### Frontend Deployment
1. Set `REACT_APP_ENVIRONMENT=production`
2. Update `REACT_APP_API_URL_PRODUCTION` with your production API URL
3. Build the application: `npm run build`
4. Deploy the `build` folder to your preferred platform

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS configuration
- Helmet for security headers
- Input validation with Joi
- Rate limiting (configurable)

## 📱 Features Overview

### User Authentication
- Secure user registration and login
- JWT token-based authentication
- Protected routes
- Automatic token refresh

### Task Management
- Create tasks with title and description
- Update task status (pending, completed)
- Delete tasks
- Filter tasks by status
- View task statistics

### User Interface
- Responsive design
- Modern and clean interface
- Real-time notifications
- Loading states
- Error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Express.js team for the robust framework
- MongoDB for the flexible database solution
- All contributors who helped improve this project

---

**Happy Coding! 🎉**
