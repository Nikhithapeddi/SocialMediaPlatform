# 🚀 PostMate Frontend - Quick Setup Guide

## ✨ What We've Built

A **stunning, modern social media platform** frontend with:
- 🎯 Beautiful landing page with hero section
- 🔐 Professional login & signup pages
- 📱 Fully responsive design
- 🎨 Modern dark theme with vibrant gradients
- ⚡ Fast performance with Vite
- 🎭 Smooth animations and transitions

## 📋 Installation Steps

### Step 1: Install Dependencies
```bash
cd smp-frontend
npm install
```

This installs:
- React & React DOM
- React Router DOM (for navigation)
- Axios (for API calls)
- Tailwind CSS (for styling)
- Vite (build tool)

### Step 2: Start Development Server
```bash
npm run dev
```

You'll see output like:
```
  VITE v7.2.2  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 3: Open in Browser
Visit: `http://localhost:5173`

## 🎯 Page Overview

### 1. Landing Page (`/`)
**First impression of PostMate**
- ✨ Eye-catching hero section
- 🎨 Animated gradients
- 📝 Feature showcase
- 🔘 Login & Signup buttons
- 📱 Fully responsive

### 2. Signup Page (`/signup`)
**Create new account**
- 👤 Username input
- 📧 Email input
- 🔐 Password input with visibility toggle
- ✅ Form validation
- 🔗 Link to login page
- 📊 API integration: `POST /user/signup`

### 3. Login Page (`/login`)
**Sign in to account**
- 📧 Email input
- 🔐 Password input with visibility toggle
- ✅ Form validation
- 🔗 Link to signup page
- 📊 API integration: `POST /user/login`

### 4. Dashboard Page (`/dashboard`)
**Protected page for logged-in users**
- 👤 Shows user email
- 🚪 Logout button
- 🔒 Auto-redirects if not logged in

## 🔗 API Integration

Your backend should provide these endpoints:

### Signup API
```
POST http://localhost:8082/user/signup
Headers: Content-Type: application/json

Request Body:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 
{ 
  "message": "User created successfully",
  "user": { ... }
}
```

### Login API
```
POST http://localhost:8082/user/login
Headers: Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "user": { ... }
}
```

## 🔐 Authentication Flow

```
1. User visits landing page (/)
   ↓
2. Clicks "Sign Up" button → Goes to /signup
   ↓
3. Fills form (username, email, password)
   ↓
4. Clicks "Create Account"
   ↓
5. Frontend validates form
   ↓
6. Sends POST to /user/signup
   ↓
7. Backend creates user
   ↓
8. Frontend stores email in localStorage
   ↓
9. Redirects to /dashboard
   ↓
10. Dashboard shows user's email
    ↓
11. Click "Logout" to clear localStorage and return home
```

## 📂 Project Structure

```
smp-frontend/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx   # Home page
│   │   ├── LoginPage.jsx     # Login form
│   │   ├── SignupPage.jsx    # Signup form
│   │   └── DashboardPage.jsx # Protected dashboard
│   ├── config/
│   │   └── api.js            # API configuration
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── tailwind.config.js        # Tailwind config
├── vite.config.js           # Vite config
├── package.json             # Dependencies
└── index.html               # HTML template
```

## 🎨 Design Features

### Colors
- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Pink (#ec4899)
- **Background**: Dark Slate (#0f172a)

### Animations
- Fade-in effects
- Slide-up animations
- Hover scale effects
- Pulse backgrounds
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- All pages work on phone, tablet, desktop

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm lint
```

## 🔧 Configuration

### Changing API Base URL
Edit `src/config/api.js`:
```javascript
export const API_BASE_URL = 'http://localhost:8082';
```

### Changing Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',      // Change primary color
  secondary: '#8b5cf6',    // Change secondary color
  accent: '#ec4899',       // Change accent color
}
```

### Changing Font
Edit `src/index.css`:
```css
body {
  font-family: 'Your Font Here', sans-serif;
}
```

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
npm run dev -- --port 3000
```

### Tailwind not working?
Make sure you've run `npm install`

### API requests failing?
- Check backend is running on `http://localhost:8082`
- Check network tab in DevTools
- Verify request/response format

### localStorage not working?
- Check browser privacy settings
- Don't use private/incognito mode
- Check browser console for errors

## 📱 Testing the App

### 1. Test Landing Page
- Visit `http://localhost:5173`
- Click through navbar
- Check responsive design (resize browser)

### 2. Test Signup
- Click "Sign Up" button
- Try to submit empty form (should show error)
- Enter invalid email (should show error)
- Passwords don't match (should show error)
- Fill form correctly and submit
- Should show in localStorage

### 3. Test Login
- Click "Login" from navbar
- Try empty fields (should show error)
- Enter correct credentials
- Should store email and redirect

### 4. Test Dashboard
- After login, you should be on dashboard
- Should show your email
- Click logout to return home
- Try accessing `/dashboard` without login (should redirect)

## 🚀 Next Steps

1. ✅ Install and run frontend
2. 🔧 Set up backend API
3. ✨ Test all pages
4. 🎨 Customize colors/fonts if needed
5. 📱 Test on mobile devices
6. 🚀 Deploy to production

## 📚 Documentation Files

- `README.md` - Original project info
- `README_SETUP.md` - Detailed setup guide
- `ARCHITECTURE.md` - Project structure & components
- `DESIGN_GUIDE.md` - UI/UX design system

## 🎯 Features Summary

| Feature | Status |
|---------|--------|
| Landing Page | ✅ Complete |
| Signup Page | ✅ Complete |
| Login Page | ✅ Complete |
| Dashboard Page | ✅ Complete |
| Form Validation | ✅ Complete |
| API Integration | ✅ Ready |
| Local Storage | ✅ Ready |
| Routing | ✅ Complete |
| Responsive Design | ✅ Complete |
| Dark Theme | ✅ Complete |
| Animations | ✅ Complete |

## 💡 Tips

- Use browser DevTools to inspect elements
- Check Network tab to see API requests
- Use React DevTools to debug state
- Keep browser console open for errors
- Test on multiple browsers if possible

## 📞 Support

If you encounter issues:
1. Check error messages in browser console
2. Review the documentation files
3. Verify backend is running
4. Check API endpoint format
5. Ensure all dependencies installed

---

**Ready to launch PostMate? 🚀**

```bash
npm install && npm run dev
```

Visit `http://localhost:5173` and enjoy! ✨
