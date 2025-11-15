# PostMate Frontend - Project Structure

```
smp-frontend/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx      # Main landing page with hero section
│   │   ├── LoginPage.jsx        # User login page
│   │   ├── SignupPage.jsx       # User signup page
│   │   └── DashboardPage.jsx    # Dashboard (protected route)
│   ├── config/
│   │   └── api.js               # API configuration and endpoints
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind CSS imports & global styles
├── public/                      # Static files
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

## 🎯 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:5173
```

## 📋 Pages Overview

### Landing Page (`/`)
The first page users see when visiting PostMate. Features:
- Stunning hero section with gradients and animations
- Feature highlights (Unlimited Posts, Global Community, Lightning Fast)
- Call-to-action buttons for Login and Signup
- Fully responsive design
- Eye-catching visual effects

### Login Page (`/login`)
For existing users to sign in. Features:
- Email and password input fields
- Password visibility toggle
- Email validation
- Error message display
- Link to signup page
- API integration with `POST /user/login`
- Stores user email in localStorage
- Auto-redirects to dashboard on success

### Signup Page (`/signup`)
For new users to create an account. Features:
- Username, email, password, confirm password fields
- Password visibility toggles
- Comprehensive form validation
- Real-time error handling
- Link to login page
- API integration with `POST /user/signup`
- Stores user email in localStorage
- Auto-redirects to dashboard on success

### Dashboard Page (`/dashboard`)
Protected route visible only to logged-in users. Features:
- Welcome message with user email
- Protected route (redirects to login if not authenticated)
- Logout functionality
- Placeholder for future dashboard features
- Consistent theme with other pages

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366f1) - Main brand color
- **Secondary**: Purple (#8b5cf6) - Secondary brand color
- **Accent**: Pink (#ec4899) - Accent highlights
- **Dark**: Slate (#0f172a) - Dark background
- **Light**: Slate (#f8fafc) - Light text

### Typography
- **Font**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Sizes**: Responsive scaling from mobile to desktop
- **Weights**: Regular (400), Semibold (600), Bold (700), Black (900)

### Components
- **Buttons**: Primary, secondary, and outlined variants
- **Inputs**: Text and password inputs with focus states
- **Cards**: Gradient cards with hover effects
- **Navigation**: Fixed navbar with backdrop blur

## 🔐 Security Features

✅ **Client-side Validation** - All forms validated before submission
✅ **Password Visibility Toggle** - Users can see passwords while typing
✅ **Error Messages** - Clear feedback for form errors
✅ **Secure Storage** - User data in localStorage (ready for JWT integration)
✅ **Protected Routes** - Dashboard only accessible when logged in

## 🚀 API Integration

### Login Request
```javascript
POST http://localhost:8082/user/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Signup Request
```javascript
POST http://localhost:8082/user/signup
{
  "username": "john_doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### Response Handling
- Success: Stores email in localStorage, redirects to dashboard
- Error: Displays error message from backend API
- Axios used for HTTP requests

## 📦 Dependencies

### Production
- **react**: ^19.2.0 - React library
- **react-dom**: ^19.2.0 - React DOM rendering
- **react-router-dom**: ^6.20.0 - Client-side routing
- **axios**: ^1.6.2 - HTTP client

### Development
- **vite**: ^7.2.2 - Fast build tool
- **tailwindcss**: ^3.4.1 - CSS framework
- **postcss**: ^8.4.32 - CSS processing
- **autoprefixer**: ^10.4.16 - CSS vendor prefixes
- **@vitejs/plugin-react**: ^5.1.0 - React plugin for Vite
- **eslint**: ^9.39.1 - Code linting

## 🎬 Animation Effects

- **Fade In**: Smooth opacity transition
- **Slide Up**: Elements slide up with fade effect
- **Pulse**: Subtle pulsing animation for backgrounds
- **Hover Scale**: Buttons scale up on hover
- **Border Glow**: Border highlight on focus/hover

## 💡 Usage Tips

1. **Customize Colors**: Edit `tailwind.config.js` to change the color scheme
2. **Add New Pages**: Create new files in `src/pages/` and add routes in `App.jsx`
3. **API Configuration**: Update `src/config/api.js` for different backend URLs
4. **Local Storage**: User email stored as `userEmail` in localStorage
5. **Responsive**: Tailwind classes handle mobile responsiveness

## 🔄 Authentication Flow

```
Landing Page
    ↓ (Sign Up button)
Signup Page → API POST /user/signup
    ↓ (Success)
Store email in localStorage
    ↓
Dashboard Page
    ↓ (Logout)
Clear localStorage
    ↓
Landing Page
```

## ✨ Beautiful UI Features

🌈 **Gradient Backgrounds** - Smooth color transitions
✨ **Glass Morphism** - Frosted glass effect with backdrop blur
🎯 **Micro-interactions** - Hover effects and transitions
📱 **Responsive Design** - Adapts to all screen sizes
🔤 **Typography** - Professional font hierarchy
🎨 **Color Palette** - Carefully selected color scheme

## 🚦 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm run dev`
3. ✅ Visit `http://localhost:5173`
4. 📝 Configure backend API if needed
5. 🚀 Deploy to production when ready

---

**Built with React, Vite, and Tailwind CSS** 🚀
