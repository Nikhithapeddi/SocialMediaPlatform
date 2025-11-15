# PostMate - Social Media Platform Frontend

An amazing, modern social media platform with a stunning UI built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Landing Page
- **Stunning Hero Section** - Eye-catching gradient backgrounds with animated elements
- **Feature Showcase** - Highlights what makes PostMate special
- **CTA Buttons** - Easy navigation to Login and Signup
- **Responsive Design** - Beautiful on all devices

### Authentication Pages
- **Login Page** - Clean and intuitive login interface
- **Signup Page** - Easy account creation process
- **Form Validation** - Real-time error handling
- **Password Visibility Toggle** - Show/hide password feature
- **Responsive Layout** - Optimized for mobile and desktop

### Features Included
✨ **Modern UI/UX** - Beautiful gradients and smooth animations
🔐 **Secure Authentication** - Email & password based signup/login
💾 **Local Storage** - User email stored for session management
🎨 **Tailwind CSS** - Professional styling with modern design system
⚡ **Fast Performance** - Built with Vite for lightning-fast loading
📱 **Mobile Responsive** - Works perfectly on all screen sizes
🌙 **Dark Theme** - Eye-friendly dark mode throughout

## 📋 Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. **Navigate to project directory**
```bash
cd smp-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Build

To create a production build:
```bash
npm run build
```

## 📡 API Endpoints

The application uses the following API endpoints:

### Login
- **URL**: `http://localhost:8082/user/login`
- **Method**: POST
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Signup
- **URL**: `http://localhost:8082/user/signup`
- **Method**: POST
- **Body**:
```json
{
  "username": "john_doe",
  "email": "user@example.com",
  "password": "password123"
}
```

## 🎨 Color Scheme

The application uses a modern color palette:
- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Pink (#ec4899)
- **Dark Background**: Slate (#0f172a)
- **Light Text**: Slate (#f8fafc)

## 📱 Pages

### 1. Landing Page (`/`)
- Introduction to PostMate
- Feature highlights
- Call-to-action buttons
- Navigation to login/signup

### 2. Login Page (`/login`)
- Email and password inputs
- Error handling
- Sign up link for new users
- Stores user email in localStorage
- Redirects to dashboard on successful login

### 3. Signup Page (`/signup`)
- Username, email, and password inputs
- Password confirmation field
- Form validation
- Error messages
- Login link for existing users
- Stores user email in localStorage
- Redirects to dashboard on successful signup

### 4. Dashboard Page (`/dashboard`)
- Protected route (requires login)
- Displays logged-in user's email
- Logout functionality
- Placeholder for future dashboard features

## 🔒 Authentication Flow

1. User visits landing page
2. User clicks "Sign Up" → Goes to signup page
3. User fills form → Validated client-side
4. Request sent to backend → User created
5. User email stored in localStorage
6. Redirected to dashboard
7. User can logout → Clears localStorage and returns to home

## 🎯 Form Validation

### Signup Validation
- ✅ Username minimum 3 characters
- ✅ Valid email format
- ✅ Password minimum 6 characters
- ✅ Passwords must match

### Login Validation
- ✅ Valid email format
- ✅ Password required

## 🚀 Future Enhancements

- [ ] Dashboard with post creation
- [ ] Timeline/Feed
- [ ] User profiles
- [ ] Follow/Unfollow functionality
- [ ] Like and comment features
- [ ] Real-time notifications
- [ ] Search functionality
- [ ] Direct messaging

## 📝 Notes

- No JWT authentication (as requested)
- Simple email-based authentication
- Client-side form validation
- User session managed via localStorage
- Backend API handling required for full functionality

## 🔗 Related Projects

- **Backend**: `SocialMediaPlatform` - Backend API server
- **Port**: Frontend runs on `http://localhost:5173`
- **API Base**: `http://localhost:8082`

## 📄 License

This project is part of the SocialMediaPlatform initiative.

---

**Created with ❤️ for PostMate Community**
