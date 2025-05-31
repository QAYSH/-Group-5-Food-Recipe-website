import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import HomePage from "./pages/HomePage";
import LoginForm from '@/components/Auth/LoginForm';
import SignupForm from '@/components/Auth/SignupForm';
import Dashboard from '@/pages/Dashboard';
import UploadRecipe from '@/pages/UploadRecipe';
import RecipeDetail from '@/pages/RecipeDetail';
import MyRecipes from '@/pages/MyRecipes';
import Favorites from '@/pages/Favorites';
import Profile from '@/pages/Profile';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper
const ProtectedRoute = ({ children }: {children: React.ReactNode;}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" data-id="d8lbyqrcg" data-path="src/App.tsx">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" data-id="fprd1rdb3" data-path="src/App.tsx"></div>
      </div>);

  }

  return user ? <>{children}</> : <Navigate to="/login" replace data-id="chdc513km" data-path="src/App.tsx" />;
};

// Public Route wrapper (redirect if already logged in)
const PublicRoute = ({ children }: {children: React.ReactNode;}) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace data-id="aq04j100l" data-path="src/App.tsx" /> : <>{children}</>;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background" data-id="eac6wtzh5" data-path="src/App.tsx">
      {user && <Header data-id="195l60uww" data-path="src/App.tsx" />}
      <Routes data-id="9wz9i6iqd" data-path="src/App.tsx">
        <Route path="/" element={<HomePage data-id="412bxhtnq" data-path="src/App.tsx" />} data-id="7prvxbadk" data-path="src/App.tsx" />
        <Route
          path="/login"
          element={
          <PublicRoute data-id="kbx1zclhb" data-path="src/App.tsx">
              <LoginForm data-id="97pemd810" data-path="src/App.tsx" />
            </PublicRoute>
          } data-id="3honr8yhp" data-path="src/App.tsx" />

        <Route
          path="/signup"
          element={
          <PublicRoute data-id="16jspckc4" data-path="src/App.tsx">
              <SignupForm data-id="4g6ai0ylw" data-path="src/App.tsx" />
            </PublicRoute>
          } data-id="r18r13gmi" data-path="src/App.tsx" />

        <Route
          path="/dashboard"
          element={
          <ProtectedRoute data-id="wthk9fn2w" data-path="src/App.tsx">
              <Dashboard data-id="kaug1cv6m" data-path="src/App.tsx" />
            </ProtectedRoute>
          } data-id="sny7lphvp" data-path="src/App.tsx" />

        <Route
          path="/upload"
          element={
          <ProtectedRoute data-id="aqdz97sko" data-path="src/App.tsx">
              <UploadRecipe data-id="10g0fwrfz" data-path="src/App.tsx" />
            </ProtectedRoute>
          } data-id="kl9opudwi" data-path="src/App.tsx" />

        <Route
          path="/recipe/:id"
          element={<RecipeDetail data-id="7p3uq96tr" data-path="src/App.tsx" />} data-id="fntwlfzq2" data-path="src/App.tsx" />

        <Route
          path="/my-recipes"
          element={
          <ProtectedRoute data-id="7xo40lxhi" data-path="src/App.tsx">
              <MyRecipes data-id="sylxyo16k" data-path="src/App.tsx" />
            </ProtectedRoute>
          } data-id="7fdtq7pcn" data-path="src/App.tsx" />

        <Route
          path="/favorites"
          element={
          <ProtectedRoute data-id="pwjt7ikjv" data-path="src/App.tsx">
              <Favorites data-id="dq67c2ddo" data-path="src/App.tsx" />
            </ProtectedRoute>
          } data-id="65vswnezv" data-path="src/App.tsx" />

        <Route
          path="/profile"
          element={
          <ProtectedRoute data-id="ilxiox916" data-path="src/App.tsx">
              <Profile data-id="jfwg0r8zd" data-path="src/App.tsx" />
            </ProtectedRoute>
          } data-id="sa5b2g7hm" data-path="src/App.tsx" />

        <Route path="*" element={<NotFound data-id="8yfzwvjxr" data-path="src/App.tsx" />} data-id="cpyr34ldv" data-path="src/App.tsx" />
      </Routes>
      <Toaster data-id="toha64x1p" data-path="src/App.tsx" />
    </div>);

}

const App = () =>
<QueryClientProvider client={queryClient} data-id="0ed46l72l" data-path="src/App.tsx">
    <TooltipProvider data-id="af978rigu" data-path="src/App.tsx">
      <BrowserRouter data-id="mjqrqal6h" data-path="src/App.tsx">
        <AuthProvider data-id="49dds0xdg" data-path="src/App.tsx">
          <AppContent data-id="l8skjw6my" data-path="src/App.tsx" />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;

export default App;