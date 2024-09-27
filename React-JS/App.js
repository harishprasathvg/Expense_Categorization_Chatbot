import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { AuthProvider } from './AuthContext';
import AuthManager from './AuthManager';
import { useEffect } from "react";
import PredictionPage from "./PredictionPage";
import ChatBot from "./ChatBot";

export default function App() {
  useEffect(() => {
    document.title = 'Auction Platform';
  }, []);
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Render Layout for all routes except index and /auth */}
          <Route
            path="/"
            element={<Layout />}
          >
            <Route index element={<AuthManager />} />
            <Route path="/predict" element={<PredictionPage />} />
            <Route path="/chatbot" element={<ChatBot />} />
          </Route>

          {/* AuthManager will be rendered for index and /auth routes */}
          <Route index element={<AuthManager />} />
          <Route path="/auth" element={<AuthManager />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
