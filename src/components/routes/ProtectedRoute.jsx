import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-neutral-950 text-neutral-100">
        <div className="relative flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-neutral-800 border-t-purple-500" />
          <div className="animate-pulse text-sm font-medium tracking-wide text-neutral-400">
            Carregando CRM Estética...
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
