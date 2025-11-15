# 🔧 PostMate Frontend - Troubleshooting Guide

## Installation Issues

### Issue: `npm install` fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install

# Or use yarn
yarn install
```

### Issue: Node version incompatible
**Solution:**
```bash
# Check your Node version (need v14+)
node --version

# Update Node if needed:
# Visit https://nodejs.org/
```

---

## Development Server Issues

### Issue: `npm run dev` won't start
**Solution:**
```bash
# Make sure you're in the right directory
cd smp-frontend

# Kill any process on port 5173
# Windows (PowerShell):
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Try with different port
npm run dev -- --port 3000
```

### Issue: Port 5173 already in use
**Solution:**
```bash
# Start on different port
npm run dev -- --port 3000
# Or find and kill process using port 5173
```

### Issue: Hot Module Replacement (HMR) not working
**Solution:**
```bash
# Stop dev server
# Delete node_modules and package-lock.json
rm -r node_modules package-lock.json

# Reinstall
npm install
npm run dev
```

---

## Module/Import Issues

### Issue: "Cannot find module 'react-router-dom'"
**Solution:**
```bash
npm install react-router-dom
```

### Issue: "Cannot find module 'axios'"
**Solution:**
```bash
npm install axios
```

### Issue: "Cannot find module 'tailwindcss'"
**Solution:**
```bash
npm install --save-dev tailwindcss postcss autoprefixer
```

---

## Tailwind CSS Issues

### Issue: Tailwind styles not appearing
**Solution:**
1. Check `tailwind.config.js` has correct content paths:
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

2. Check `index.css` has Tailwind imports:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Restart dev server

### Issue: ESLint warning about @tailwind
**Solution:**
This is normal and doesn't affect functionality. You can ignore it or add to `.eslintignore`.

---

## API Integration Issues

### Issue: "Failed to fetch from API" / CORS errors
**Solution:**
```javascript
// Make sure backend is running on localhost:8082
// In chrome DevTools → Network tab:
// - Check if request is being sent
// - Check response status
// - Check response body for error message

// Common reasons:
1. Backend not running
2. Wrong URL format
3. Backend not handling CORS
4. Request body format incorrect
```

### Issue: API returns 404 error
**Solution:**
```javascript
// Check endpoint format
// It should be:
POST http://localhost:8082/user/signup
POST http://localhost:8082/user/login

// Not:
POST http://localhost:8082/users/signup  // ❌ wrong
POST http://localhost:8082/signup        // ❌ missing /user
```

### Issue: API returns 400 (Bad Request)
**Solution:**
```javascript
// Check request body format
// For signup, should be:
{
  "username": "john_doe",      // string, required
  "email": "john@example.com", // string, required
  "password": "password123"    // string, required
}

// For login, should be:
{
  "email": "john@example.com", // string, required
  "password": "password123"    // string, required
}

// Check in browser DevTools:
// Network tab → Click request → Payload section
```

### Issue: "Cannot POST /user/login" - Backend routing issue
**Solution:**
1. Verify backend has these routes configured
2. Check backend server is actually running
3. Try accessing `http://localhost:8082` in browser to test

---

## Form Validation Issues

### Issue: Form errors not showing
**Solution:**
```javascript
// Check error state is being set
// Look in React DevTools → Components → App → State
// Verify error message is in JSX

// Make sure error div exists:
{error && (
  <div className="p-3 rounded-lg bg-red-500/10...">
    {error}
  </div>
)}
```

### Issue: Password visibility toggle not working
**Solution:**
```javascript
// Make sure showPassword state is initialized
const [showPassword, setShowPassword] = useState(false);

// And onClick handler is correct
onClick={() => setShowPassword(!showPassword)}
```

---

## Routing Issues

### Issue: Navigation not working
**Solution:**
```javascript
// Make sure routes are in App.jsx:
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
</Routes>

// Make sure you're using Link or useNavigate
import { Link, useNavigate } from 'react-router-dom';

// In components:
const navigate = useNavigate();
navigate('/login');
```

### Issue: Dashboard shows blank after login
**Solution:**
```javascript
// Check localStorage is being set
// In browser console:
localStorage.getItem('userEmail')
// Should return your email

// Check useEffect is redirecting:
useEffect(() => {
  if (!userEmail) {
    navigate('/login');
  }
}, [userEmail, navigate]);
```

### Issue: Can access /dashboard without logging in
**Solution:**
```javascript
// Make sure DashboardPage checks localStorage:
const userEmail = localStorage.getItem('userEmail');

useEffect(() => {
  if (!userEmail) {
    navigate('/login');
  }
}, [userEmail, navigate]);
```

---

## localStorage Issues

### Issue: Data not persisting after refresh
**Solution:**
```javascript
// localStorage might be disabled:
// 1. Check browser settings
// 2. Not in private/incognito mode
// 3. Not using old browser

// Test in console:
localStorage.setItem('test', 'value');
localStorage.getItem('test'); // Should return 'value'
```

### Issue: localStorage works but redirects to login anyway
**Solution:**
```javascript
// Timing issue - add dependency array:
useEffect(() => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    navigate('/login');
  }
}, []); // Important: add empty dependency array

// Or better:
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    navigate('/login');
  }
  setIsLoading(false);
}, []);

if (isLoading) return <div>Loading...</div>;
```

---

## Styling Issues

### Issue: Buttons/inputs look plain, no styling
**Solution:**
1. Make sure Tailwind is installed: `npm install -D tailwindcss`
2. Check `tailwind.config.js` exists
3. Check `postcss.config.js` exists
4. Restart dev server after installation
5. Hard refresh browser (Ctrl+Shift+R)

### Issue: Colors not matching design
**Solution:**
```javascript
// Check color values in tailwind.config.js:
colors: {
  primary: '#6366f1',   // Indigo
  secondary: '#8b5cf6', // Purple
  accent: '#ec4899',    // Pink
}

// Use correct color classes:
text-indigo-500      // ✅ correct
text-[#6366f1]       // Also works
bg-primary           // Won't work without extending config
```

### Issue: Responsive design breaking on mobile
**Solution:**
```javascript
// Check breakpoints in className:
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
// This should show 1 column on mobile, 2 on tablet, 3 on desktop

// Test with browser DevTools:
// Device Toolbar (Ctrl+Shift+M)
// Try different screen sizes
```

---

## Browser Compatibility Issues

### Issue: App doesn't work in certain browser
**Solution:**
1. Test in Chrome, Firefox, Safari
2. Check browser console for errors
3. Try different browser
4. Update browser to latest version

### Issue: localStorage not available in private mode
**Solution:**
- localStorage disabled in private/incognito mode
- Test in normal browsing mode
- Or implement sessionStorage fallback

---

## Build/Production Issues

### Issue: `npm run build` fails
**Solution:**
```bash
# Check for errors first
npm run lint

# Clear build cache
rm -r dist

# Try building again
npm run build

# If still fails, check error messages carefully
```

### Issue: Build succeeds but app doesn't work
**Solution:**
```bash
# Preview production build
npm run preview

# Make sure API endpoints are correct in production
# Edit src/config/api.js with production URL
```

---

## Common Error Messages & Fixes

| Error | Fix |
|-------|-----|
| "Cannot read property 'email'" | Check form state initialization |
| "useNavigate is not defined" | Import: `import { useNavigate } from 'react-router-dom'` |
| "React is not defined" | Add: `import React from 'react'` at top |
| "Tailwind CSS not loaded" | Restart dev server and hard refresh |
| "Port 5173 already in use" | Kill process or use different port |
| "CORS error" | Backend needs CORS headers |
| "Cannot find '/api/...'" | Check API URL in `config/api.js` |

---

## Debugging Tips

### 1. Browser DevTools
```javascript
// Open DevTools: F12 or Ctrl+Shift+I

// Console tab:
- Check for errors (red messages)
- Test code in console
- Use console.log() for debugging

// Network tab:
- See API requests
- Check status codes
- View request/response bodies

// Application tab:
- View localStorage
- View cookies
- Check storage limits
```

### 2. React DevTools
```
- Install React DevTools extension
- View component tree
- Check props and state
- Profile performance
```

### 3. Add Debug Logs
```javascript
// In LoginPage.jsx
console.log('Form data:', formData);
console.log('Error:', error);
console.log('Loading:', loading);
```

### 4. Use Network Speed Throttling
```
DevTools → Network tab → Throttling dropdown
- Test with slow network
- Simulate mobile conditions
```

---

## Getting Help

1. **Check error message** - Usually tells you what's wrong
2. **Look in browser console** - Red errors show problems
3. **Check Network tab** - See if API requests are working
4. **Review documentation** - QUICKSTART.md, ARCHITECTURE.md
5. **Search the web** - Copy exact error message
6. **Ask for help** - Include:
   - Error message
   - Screenshots
   - What you were doing
   - Steps to reproduce

---

## Performance Issues

### Issue: App is slow
**Solution:**
1. Check Network tab for slow API
2. Reduce number of re-renders
3. Use React DevTools Profiler
4. Check for missing keys in lists
5. Optimize images

### Issue: Large bundle size
**Solution:**
```bash
# Analyze bundle
npm install --save-dev @vitejs/plugin-visualize
# Then check build output
```

---

**Still stuck? Check the error in the browser console first - that's usually the answer!** 🔍
