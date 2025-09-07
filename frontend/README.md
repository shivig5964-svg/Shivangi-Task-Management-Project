# Task Management Frontend

A modern React.js frontend application for the Task Management System with responsive design and real-time updates.

## 🌐 Live Demo

- **Frontend Application**: [https://shivangi-task-management-project-jy4o7fqg4.vercel.app](https://shivangi-task-management-project-jy4o7fqg4.vercel.app)
- **Backend API**: [https://shivangi-task-management-project.onrender.com/api](https://shivangi-task-management-project.onrender.com/api)

## 🏗️ Project Structure

```
frontend/
├── public/
│   ├── index.html           # Main HTML template
│   ├── favicon.ico          # App favicon
│   └── manifest.json        # PWA manifest
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Auth/           # Authentication components
│   │   │   ├── Login.js    # Login form component
│   │   │   └── Register.js # Registration form component
│   │   ├── Layout/         # Layout components
│   │   │   └── Header.js   # Navigation header
│   │   ├── Tasks/          # Task-related components
│   │   │   ├── TaskForm.js     # Task creation/editing form
│   │   │   ├── TaskList.js     # Task list display
│   │   │   ├── TaskItem.js     # Individual task item
│   │   │   ├── TaskFilters.js  # Task filtering controls
│   │   │   └── TaskStats.js    # Task statistics display
│   │   ├── UI/             # Generic UI components
│   │   │   ├── Notification.js      # Toast notifications
│   │   │   └── ConfirmationModal.js # Confirmation dialogs
│   │   └── ProtectedRoute.js # Route protection component
│   ├── context/            # React Context providers
│   │   └── AuthContext.js  # Authentication state management
│   ├── pages/              # Main application pages
│   │   ├── Home.js         # Landing page
│   │   └── Dashboard.js    # Main dashboard page
│   ├── config/             # Configuration files
│   │   └── api.js          # API configuration and endpoints
│   ├── App.js              # Main App component
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles
├── package.json
└── env.example             # Environment variables example
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Setup**
```bash
cp env.example .env
```

3. **Configure Environment Variables**
Edit `.env` file with your configuration:
```env
# Local development
REACT_APP_API_URL_LOCAL=http://localhost:5000/api

# Production URL (replace with your actual production URL)
REACT_APP_API_URL_PRODUCTION=https://your-production-api.com/api

# Current environment (local or production)
REACT_APP_ENVIRONMENT=local
```

4. **Start Development Server**
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## 🎨 Component Overview

### Authentication Components

#### Login Component (`components/Auth/Login.js`)
- User login form with email and password
- Form validation and error handling
- Redirects to dashboard on successful login
- Links to registration page

#### Register Component (`components/Auth/Register.js`)
- User registration form with name, email, and password
- Password confirmation validation
- Form validation and error handling
- Redirects to dashboard on successful registration

### Task Management Components

#### TaskForm Component (`components/Tasks/TaskForm.js`)
- Create new tasks or edit existing ones
- Form fields: title, description
- Validation and error handling
- Submit and cancel functionality

#### TaskList Component (`components/Tasks/TaskList.js`)
- Displays list of tasks
- Handles task filtering and sorting
- Shows loading states and empty states
- Integrates with TaskItem components

#### TaskItem Component (`components/Tasks/TaskItem.js`)
- Individual task display
- Status indicators
- Edit and delete actions
- Responsive design

#### TaskFilters Component (`components/Tasks/TaskFilters.js`)
- Filter tasks by status (all, pending, completed)
- Search functionality
- Clear filters option

#### TaskStats Component (`components/Tasks/TaskStats.js`)
- Displays task statistics
- Progress indicators
- Completion rates
- Visual charts and metrics

### UI Components

#### Notification Component (`components/UI/Notification.js`)
- Toast-style notifications
- Success, error, and info types
- Auto-dismiss functionality
- Customizable positioning

#### ConfirmationModal Component (`components/UI/ConfirmationModal.js`)
- Confirmation dialogs for destructive actions
- Customizable title and message
- Confirm and cancel buttons
- Modal overlay

### Layout Components

#### Header Component (`components/Layout/Header.js`)
- Navigation bar with user info
- Logout functionality
- Responsive design
- User avatar and name display

### Pages

#### Home Page (`pages/Home.js`)
- Landing page for unauthenticated users
- Login and register links
- Application overview

#### Dashboard Page (`pages/Dashboard.js`)
- Main application interface
- Task management functionality
- Statistics and filtering
- Real-time updates

## 🔧 Configuration

### API Configuration (`src/config/api.js`)

The API configuration automatically handles environment-based URL selection:

```javascript
// Automatically selects API URL based on environment
const getApiUrl = () => {
  const isProduction = window.location.hostname.includes('vercel.app') || 
                      window.location.hostname.includes('netlify.app') ||
                      window.location.hostname.includes('github.io') ||
                      process.env.NODE_ENV === 'production';
  
  const apiUrl = isProduction 
    ? (process.env.REACT_APP_API_URL_PRODUCTION || 'https://shivangi-task-management-project.onrender.com/api')
    : (process.env.REACT_APP_API_URL_LOCAL || 'http://localhost:5000/api');
  
  return apiUrl;
};
```

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL_LOCAL` | Local backend API URL | http://localhost:5000/api | No |
| `REACT_APP_API_URL_PRODUCTION` | Production backend API URL | https://shivangi-task-management-project.onrender.com/api | No |
| `REACT_APP_ENVIRONMENT` | Environment mode (local/production) | local | No |

## 🎯 Features

### Authentication
- **Secure Login/Register**: JWT-based authentication
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Automatic token refresh and logout on expiration
- **User Context**: Global user state management

### Task Management
- **CRUD Operations**: Create, read, update, and delete tasks
- **Real-time Updates**: Immediate UI updates after operations
- **Task Filtering**: Filter by status (pending, completed)
- **Task Statistics**: Visual progress tracking and completion rates

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Notifications**: Success and error toast notifications
- **Form Validation**: Client-side validation with helpful messages

### Performance
- **Optimized Rendering**: Efficient component updates
- **Lazy Loading**: Components loaded as needed
- **Error Boundaries**: Graceful error handling
- **Memory Management**: Proper cleanup of effects and listeners

## 🎨 Styling

### CSS Architecture
- **Global Styles**: Base styles in `index.css`
- **Component Styles**: Scoped styles within components
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional design

### Design System
- **Color Palette**: Consistent color scheme
- **Typography**: Readable font hierarchy
- **Spacing**: Consistent margins and padding
- **Components**: Reusable UI patterns

## 🧪 Available Scripts

### Development
```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Eject from Create React App (not recommended)
npm run eject
```

### Production Build
```bash
# Create production build
npm run build

# Serve production build locally
npx serve -s build
```

## 🔄 State Management

### Authentication Context (`context/AuthContext.js`)
- Global authentication state
- User information management
- Login/logout functionality
- Token handling and refresh

### Component State
- Local component state with React hooks
- Form state management
- Loading and error states
- Real-time data updates

## 🌐 API Integration

### HTTP Client
- **Axios**: HTTP client for API calls
- **Interceptors**: Automatic token attachment and error handling
- **Base Configuration**: Environment-based API URL selection

### API Endpoints
- **Authentication**: Login, register, user profile
- **Tasks**: CRUD operations, statistics, filtering
- **Error Handling**: Consistent error response handling

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Touch-friendly interface
- Optimized form inputs
- Responsive navigation
- Mobile-specific interactions

## 🚀 Deployment

### Build Process
```bash
# Create production build
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repos

### Environment Configuration
1. Set `REACT_APP_ENVIRONMENT=production`
2. Update `REACT_APP_API_URL_PRODUCTION` with your production API URL
3. Build and deploy the `build` folder

## 🔍 Development Tips

### Code Organization
- Keep components small and focused
- Use meaningful component and variable names
- Follow React best practices
- Implement proper error boundaries

### Performance Optimization
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Avoid unnecessary re-renders
- Optimize bundle size

### Testing
- Write unit tests for components
- Test user interactions
- Mock API calls in tests
- Test error scenarios

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check backend server is running
   - Verify API URL in environment variables
   - Check CORS configuration

2. **Authentication Issues**
   - Verify JWT token is valid
   - Check token expiration
   - Clear localStorage if needed

3. **Build Errors**
   - Check for syntax errors
   - Verify all imports are correct
   - Clear node_modules and reinstall

4. **Styling Issues**
   - Check CSS class names
   - Verify responsive breakpoints
   - Test on different screen sizes

### Debug Mode
- Use React Developer Tools
- Check browser console for errors
- Use network tab to debug API calls
- Enable verbose logging in development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use functional components with hooks
- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License.

---

**Frontend Version**: 1.0.0  
**React Version**: 18.2.0  
**Last Updated**: 2024
