# 🎬 Movie App - Frontend (React + Tailwind CSS)

![toontime_page-0001](https://github.com/user-attachments/assets/2029861a-5d26-4874-af95-52d5283a5611)
![toontime_page-0002](https://github.com/user-attachments/assets/ce98d1a9-f503-4533-987f-160af32bacd7)
![toontime_page-0003](https://github.com/user-attachments/assets/bd69156c-d1f9-4ede-97b4-7ed49fa66e50)
![toontime_page-0004](https://github.com/user-attachments/assets/64400140-6386-498a-af90-616aa6810952)

---

## 📋 Overview

This is the **frontend** component of a comprehensive Movie Application built with **React 18** and **Tailwind CSS**. The application provides users with an intuitive interface to browse, search, and interact with movie content. This repository contains only the UI/frontend layer, which communicates with a separate **ASP.NET Core backend API**.

### 🔗 Architecture
- **Frontend (this repo):** React + Tailwind CSS
- **Backend:** ASP.NET Core (separate repository)
- **Communication:** RESTful API

---

## ✨ Features

### 🎯 Core Functionality
- **Browse Movies:** Explore a curated collection of movies with detailed information
- **Search & Filter:** Advanced search capabilities with genre, rating, and date filters
- **Movie Details:** Comprehensive movie information including synopsis, cast, ratings, and reviews
- **Responsive Design:** Fully responsive UI that works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX:** Clean, intuitive interface with smooth interactions and animations

### 🛠️ Technical Features
- ⚡ **Fast Performance:** Optimized with React lazy loading and code splitting
- 🎨 **Beautiful Styling:** Tailwind CSS for consistent, scalable design system
- 🔄 **State Management:** Efficient state management for data flow
- 📱 **Mobile-First:** Progressive enhancement for all device sizes
- ♿ **Accessibility:** WCAG compliant components and interactions

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v16.0 or higher
- **npm:** v8.0 or higher (or yarn, pnpm)
- **Backend API:** Running ASP.NET Core API (see Backend Setup section)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/zineb-elgaout/movie-app-project-react-tailwind.git
cd movie-app-project-react-tailwind
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a `.env.local` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_KEY=your_api_key_here
```

4. **Start the development server:**
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`

---

## 📦 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── MovieCard/      # Movie card display component
│   ├── SearchBar/      # Search functionality
│   ├── Header/         # Navigation header
│   └── ...
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── MovieDetail.jsx # Movie detail page
│   ├── Search.jsx      # Search results page
│   └── ...
├── services/           # API services
│   └── movieService.js # API calls to backend
├── styles/             # Global styles and Tailwind config
├── hooks/              # Custom React hooks
├── context/            # React Context for state management
├── App.jsx             # Main App component
└── index.jsx           # Entry point
```

---

## 🔧 Available Scripts

### Development
```bash
npm start
```
Runs the app in development mode with hot-reload

### Build
```bash
npm run build
```
Creates an optimized production build

### Testing
```bash
npm test
```
Runs the test suite in watch mode

### Linting
```bash
npm run lint
```
Checks code quality and formatting

---

## 🌐 Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Backend API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_KEY=your_api_key_here

# Optional: Feature flags
REACT_APP_ENABLE_REVIEWS=true
REACT_APP_ENABLE_RATINGS=true

# Optional: Analytics
REACT_APP_GA_ID=your_google_analytics_id
```

---

## 🔌 Backend Integration

This frontend application communicates with a separate **ASP.NET Core backend API**. 

### Backend Setup
To run the complete application, you'll need to:

1. **Clone the backend repository** (ASP.NET Core)
2. **Install .NET dependencies** and configure the database
3. **Start the backend API** (typically runs on `http://localhost:5000`)
4. **Update `REACT_APP_API_URL`** in your `.env.local` to match your backend URL

### API Endpoints Used
- `GET /api/movies` - Fetch all movies
- `GET /api/movies/{id}` - Fetch movie details
- `GET /api/movies/search` - Search movies
- `GET /api/genres` - Fetch available genres
- `POST /api/reviews` - Submit movie review
- And more...

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### State Management
- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic

### API Communication
- **Fetch API** / **Axios** - HTTP requests

### Development Tools
- **Vite** / **Create React App** - Build tool
- **ESLint** - Code quality
- **Prettier** - Code formatting

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari  | ✅ Latest 2 versions |
| Edge    | ✅ Latest 2 versions |

---

## 📝 Development Guidelines

### Code Style
- Follow the existing code structure and naming conventions
- Use functional components with React Hooks
- Keep components small and focused (single responsibility)
- Use Tailwind CSS utility classes for styling

### Component Structure
```jsx
export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      {/* Component JSX */}
    </div>
  );
}
```

### Committing Changes
```bash
git add .
git commit -m "feat: Add new feature description"
git push origin main
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** API connection errors
- **Solution:** Verify backend API is running and `REACT_APP_API_URL` is correct

**Issue:** Styles not loading
- **Solution:** Ensure Tailwind CSS is properly configured in `tailwind.config.js`

**Issue:** Dependencies not installing
- **Solution:** Delete `node_modules` and `package-lock.json`, then run `npm install` again

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


---

## 🔗 Related Repositories

- **Backend API:** [ASP.NET Core Backend]

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Guide](https://reactrouter.com)

---

**Version:** 1.0.0
