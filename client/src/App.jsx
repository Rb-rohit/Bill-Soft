import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Billing from "../pages/Billing";
import Products from "../pages/Products";
import { AuthProvider } from "../components/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";



const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
              } 
            />
            <Route 
            path="/billing" 
            element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
              } 
            />
            <Route 
            path="/product" 
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
              } 
            />
    
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  )
}

export default App
