import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(undefined);

const DEMO_USER = {
  id: 'demo-user-id-12345',
  email: 'admin@clinicaestetica.com.br',
  name: 'Dr. André Oliver',
  clinicName: 'Clínica Oliver Estética',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const checkDemo = localStorage.getItem('crm_demo_mode') === 'true';
    if (checkDemo) {
      setUser(DEMO_USER);
      setIsDemo(true);
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || 'Profissional',
            clinicName: session.user.user_metadata?.clinicName || 'Minha Clínica',
            role: 'admin',
          });
        }
      } catch (e) {
        console.error('Erro ao verificar sessão Supabase:', e);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || 'Profissional',
            clinicName: session.user.user_metadata?.clinicName || 'Minha Clínica',
            role: 'admin',
          });
          setIsDemo(false);
        } else {
          if (!localStorage.getItem('crm_demo_mode')) {
            setUser(null);
          }
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) {
      if (email === 'admin@clinicaestetica.com.br' && password === 'admin123') {
        loginAsDemo();
        return { error: null };
      }
      return { error: 'O Supabase não está configurado. Use o botão "Entrar como Demo" para testar.' };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      return { error: null };
    } catch (e) {
      return { error: e.message || 'Erro inesperado ao fazer login.' };
    }
  };

  const signUp = async (email, password, name, clinicName) => {
    if (!isSupabaseConfigured) {
      return { error: 'O Supabase não está configurado. Não é possível cadastrar novas contas reais.' };
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            clinicName,
          },
        },
      });
      if (error) return { error: error.message };
      return { error: null };
    } catch (e) {
      return { error: e.message || 'Erro inesperado ao cadastrar.' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('crm_demo_mode');
    setIsDemo(false);
    setUser(null);

    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
  };

  const loginAsDemo = () => {
    localStorage.setItem('crm_demo_mode', 'true');
    setIsDemo(true);
    setUser(DEMO_USER);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isDemo,
        signIn,
        signUp,
        signOut,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
