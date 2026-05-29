import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  KanbanSquare, 
  Calendar, 
  Settings, 
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const { user, signOut } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Conversas', path: '/conversas', icon: MessageSquare, badge: 3 },
    { name: 'Pipeline', path: '/pipeline', icon: KanbanSquare },
    { name: 'Agenda', path: '/agenda', icon: Calendar },
    { name: 'Configurações', path: '/configuracoes', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-40 flex flex-col
          bg-sidebar text-sidebar-foreground border-r border-sidebar-border
          transition-all duration-300 ease-in-out
          md:static
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        {/* Logo / Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border/40">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <Sparkles size={18} className="animate-pulse" />
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-sm tracking-wide text-foreground truncate max-w-[150px]">
                {user?.clinicName || 'Clinica OS'}
              </span>
            )}
          </div>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                end={item.path === '/'}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10' 
                    : 'text-sidebar-foreground/80 hover:text-foreground hover:bg-secondary/60'}
                `}
              >
                <Icon size={18} className="shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
                
                {item.badge && !isCollapsed && (
                  <span className="ml-auto shrink-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-neutral-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                    {item.name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile / Logout */}
        <div className="p-4 border-t border-sidebar-border/40">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
              alt={user?.name}
              className="h-9 w-9 rounded-full border border-sidebar-border object-cover shrink-0"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  {user?.name || 'Profissional'}
                </p>
                <p className="text-[10px] text-muted-foreground truncate uppercase tracking-wider font-medium">
                  {user?.role === 'admin' ? 'Administrador' : user?.role === 'doctor' ? 'Médico' : 'Recepção'}
                </p>
              </div>
            )}
            {!isCollapsed && (
              <button
                onClick={signOut}
                className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
          {isCollapsed && (
            <button
              onClick={signOut}
              className="mt-3 mx-auto flex p-2 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
              title="Sair"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
