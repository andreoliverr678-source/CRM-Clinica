import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Leads } from './pages/Leads';
import { Conversas } from './pages/Conversas';
import { Pipeline } from './pages/Pipeline';
import { Agenda } from './pages/Agenda';
import { Configuracoes } from './pages/Configuracoes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Core App Routes wrapped in MainLayout */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              {/* Dashboard is index route */}
              <Route index element={<Dashboard />} />
              
              {/* Other panels */}
              <Route path="leads" element={<Leads />} />
              <Route path="conversas" element={<Conversas />} />
              <Route path="pipeline" element={<Pipeline />} />
              <Route path="agenda" element={<Agenda />} />
              <Route path="configuracoes" element={<Configuracoes />} />
            </Route>

            {/* Fallback to index / redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
