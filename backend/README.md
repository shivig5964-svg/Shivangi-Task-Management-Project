# Task Management Backend API

A RESTful API built with Node.js, Express.js, and MongoDB for the Task Management Application.

## 🏗️ Architecture

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── constants/
│   ├── statusCodes.js       # HTTP status codes
│   └── taskStatus.js        # Task status constants
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── taskController.js    # Task management logic
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── validation.js        # Request validation middleware
├── models/
│   ├── User.js              # User data model
│   └── Task.js              # Task data model
├── routes/
│   ├── auth.js              # Authentication routes
│   └── tasks.js             # Task management routes
├── services/
│   ├── authService.js       # Authentication business logic
│   └── taskService.js       # Task management business logic
├── logs/                    # Application logs
├── server.js                # Main server file
├── package.json
└── env.example              # Environment variables example
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

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
# Server Configuration
PORT=5000
NODE_ENV=development

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

4. **Start the Server**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
- **Local**: `http://localhost:5000/api`
- **Production**: `https://your-production-api.com/api`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Task Management Endpoints

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer jwt-token-here
```

**Query Parameters:**
- `status` (optional): Filter by task status (`pending`, `in-progress`, `completed`)

**Response:**
```json
{
  "success": true,
  "tasks": [
    {
      "id": "task-id",
      "title": "Complete project",
      "description": "Finish the task management app",
      "status": "pending",
      "priority": "high",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer jwt-token-here
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "id": "task-id",
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer jwt-token-here
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "in-progress",
  "priority": "high"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "id": "task-id",
    "title": "Updated Task",
    "description": "Updated description",
    "status": "in-progress",
    "priority": "high",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

#### Get Task Statistics
```http
GET /api/tasks/stats/summary
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 10,
    "pending": 3,
    "inProgress": 4,
    "completed": 3,
    "completionRate": 30
  }
}
```

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "message": "Task Management API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5000 | No |
| `NODE_ENV` | Environment mode | development | No |
| `ENVIRONMENT` | App environment (local/production) | local | No |
| `MONGODB_URI_LOCAL` | Local MongoDB connection string | mongodb://localhost:27017/task-management | No |
| `MONGODB_URI_PRODUCTION` | Production MongoDB connection string | - | Yes (for production) |
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `JWT_EXPIRE` | JWT expiration time | 7d | No |
| `FRONTEND_URL_LOCAL` | Local frontend URL | http://localhost:3000 | No |
| `FRONTEND_URL_PRODUCTION` | Production frontend URL | - | Yes (for production) |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 | No |

### Database Models

#### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

#### Task Model
```javascript
{
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  user: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet**: Security headers middleware
- **Input Validation**: Joi schema validation
- **Rate Limiting**: Configurable request rate limiting
- **Environment-based Configuration**: Separate configs for different environments

## 🧪 Testing

### Manual Testing
Use tools like Postman or curl to test the API endpoints:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test user registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Automated Testing
```bash
# Run tests (if test suite is implemented)
npm test
```

## 📊 Logging

The application uses Morgan for HTTP request logging:
- **Development**: `dev` format (clean, concise)
- **Production**: `combined` format (detailed)

Logs are output to the console and can be configured to write to files.

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Set `ENVIRONMENT=production`
- [ ] Configure production MongoDB URI
- [ ] Set strong JWT secret
- [ ] Configure production frontend URL
- [ ] Set up proper logging
- [ ] Configure rate limiting
- [ ] Set up monitoring and health checks

### Deployment Platforms
- **Heroku**: Easy deployment with environment variables
- **AWS**: EC2, ECS, or Lambda deployment
- **DigitalOcean**: Droplet or App Platform
- **Railway**: Simple Node.js deployment
- **Vercel**: Serverless deployment

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MongoDB is running
   - Verify connection string
   - Check network connectivity

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure proper Authorization header

3. **CORS Errors**
   - Verify FRONTEND_URL configuration
   - Check CORS middleware setup

4. **Port Already in Use**
   - Change PORT in environment variables
   - Kill existing process on the port

### Debug Mode
Set `NODE_ENV=development` for detailed error messages and logging.

## 📝 API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**API Documentation Version**: 1.0.0  
**Last Updated**: 2024
