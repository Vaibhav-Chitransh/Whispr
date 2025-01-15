import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
// import { ThemeProvider } from "./components/ui/theme-provider";

const App = () => {
  return (
      <Router>
        <div className="flex flex-col h-screen overflow-hidden">
          <Navbar />
          <Toaster />
          <div className="flex-grow overflow-hidden">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
