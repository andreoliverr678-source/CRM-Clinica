import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Sparkles, Mail, Lock, Building2, User, ArrowRight } from 'lucide-react';

export const Login = () => {
  const { user, signIn, signUp, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [clinicName, setClinicName] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const res = await signUp(email, password, name, clinicName);
        if (res.error) setError(res.error);
      } else {
        const res = await signIn(email, password);
        if (res.error) setError(res.error);
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-neutral-950 text-neutral-100 overflow-hidden px-4">
      {/* Background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center select-none">
          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-2">
            CRM Estética
          </h1>
          <p className="text-xs text-neutral-400 max-w-[280px]">
            Gestão inteligente, leads integrados e agenda ágil para sua clínica.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <>
              <Input
                label="Seu Nome"
                placeholder="Ex: Dra. Juliana Costa"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User size={16} />}
                className="bg-neutral-900/40 border-neutral-800 text-white placeholder:text-neutral-600"
              />
              <Input
                label="Nome da Clínica"
                placeholder="Ex: Clínica Lumina"
                type="text"
                required
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                leftIcon={<Building2 size={16} />}
                className="bg-neutral-900/40 border-neutral-800 text-white placeholder:text-neutral-600"
              />
            </>
          )}

          <Input
            label="E-mail"
            placeholder="seuemail@exemplo.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={16} />}
            className="bg-neutral-900/40 border-neutral-800 text-white placeholder:text-neutral-600"
          />

          <Input
            label="Senha"
            placeholder="••••••••"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={16} />}
            className="bg-neutral-900/40 border-neutral-800 text-white placeholder:text-neutral-600"
          />

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-95 shadow-md shadow-indigo-500/10 font-semibold"
            rightIcon={<ArrowRight size={16} />}
          >
            {isSignUp ? 'Criar Conta' : 'Acessar Painel'}
          </Button>
        </form>

        {/* Toggle */}
        <div className="text-center text-xs text-neutral-400 mt-2">
          {isSignUp ? (
            <p>
              Já possui uma conta?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-indigo-400 hover:text-indigo-300 font-medium underline cursor-pointer"
              >
                Faça login
              </button>
            </p>
          ) : (
            <p>
              Novo por aqui?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-indigo-400 hover:text-indigo-300 font-medium underline cursor-pointer"
              >
                Cadastre sua clínica
              </button>
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-neutral-800" />
          <span className="flex-shrink mx-4 text-neutral-500 text-[10px] uppercase font-bold tracking-widest">Ou</span>
          <div className="flex-grow border-t border-neutral-800" />
        </div>

        {/* Demo Button */}
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={loginAsDemo}
            className="w-full border-neutral-800/80 bg-neutral-900/20 hover:bg-neutral-800 hover:text-white text-neutral-300 text-xs font-semibold"
          >
            ✦ Entrar como Demo (Visualização Rápida)
          </Button>
          <div className="text-center text-[10px] text-neutral-500 font-medium leading-normal">
            Acesso imediato com dados fictícios.<br />
            Configure o <code className="text-neutral-400 font-mono">.env.local</code> para login real com Supabase.
          </div>
        </div>
      </div>
    </div>
  );
};
