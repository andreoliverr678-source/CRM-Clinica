import React from 'react';
import { Menu, Sun, Moon, Bell, Search, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

export const Topbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { isDemo } = useAuth();
  const location = useLocation();

  const getPageTitle = (path) => {
    switch (path) {
      case '/': return 'Dashboard';
      case '/leads': return 'Gestão de Leads';
      case '/conversas': return 'Conversas Integradas';
      case '/pipeline': return 'Funil de Vendas';
      case '/agenda': return 'Agenda da Clínica';
      case '/configuracoes': return 'Configurações do Sistema';
      default: return 'CRM Estética';
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border/40 glass flex items-center justify-between px-6 transition-all duration-200">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors md:hidden cursor-pointer"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold tracking-tight text-foreground select-none">
            {getPageTitle(location.pathname)}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isDemo && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold animate-pulse">
            <Sparkles size={12} />
            Modo Demo
          </div>
        )}

        <div className="relative hidden md:block w-48 lg:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full h-8 pl-9 pr-3 rounded-lg border border-border bg-input/20 hover:bg-input/40 focus:bg-input/10 text-xs transition-all duration-200 outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring"
          />
        </div>

        <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
          title={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
};
