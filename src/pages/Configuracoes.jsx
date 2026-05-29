import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Settings, 
  User, 
  Building, 
  Shield, 
  CreditCard, 
  Database, 
  Check, 
  Bell, 
  Lock,
  CheckCircle,
  Link,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Configuracoes = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('perfil');
  const [isSaved, setIsSaved] = useState(false);

  // Form states
  const [clinicName, setClinicName] = useState(user?.clinicName || 'Clinica OS');
  const [name, setName] = useState(user?.name || 'Profissional');
  const [email, setEmail] = useState(user?.email || 'admin@clinica.com');
  const [phone, setPhone] = useState('(11) 98765-4321');

  const [notifWhatsApp, setNotifWhatsApp] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { id: 'perfil', label: 'Perfil da Clínica', icon: Building },
    { id: 'equipe', label: 'Equipe & Acessos', icon: Shield },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'integracoes', label: 'Integrações', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Configurações</h2>
        <p className="text-xs text-muted-foreground mt-1">Gerencie a identidade da sua clínica, equipe, integrações e notificações automáticas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Tabs Selection */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer
                  ${isActive 
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'}
                `}
              >
                <Icon size={14} className="shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Tab Contents */}
        <div className="lg:col-span-9">
          
          {/* PERFIL DA CLÍNICA */}
          {activeTab === 'perfil' && (
            <Card className="p-6">
              <h3 className="font-bold text-sm text-foreground mb-4">Dados de Identidade</h3>
              
              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    label="Nome da Clínica" 
                    value={clinicName} 
                    onChange={(e) => setClinicName(e.target.value)} 
                    required 
                  />
                  <Input 
                    label="Nome do Administrador" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    label="E-mail de Contato" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                  <Input 
                    label="Telefone Comercial" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                  />
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-5 mt-2">
                  <div className="flex items-center gap-2">
                    {isSaved && (
                      <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                        <CheckCircle size={14} /> Alterações salvas com sucesso!
                      </span>
                    )}
                  </div>
                  <Button variant="primary" type="submit">Salvar Perfil</Button>
                </div>
              </form>
            </Card>
          )}

          {/* EQUIPE & ACESSOS */}
          {activeTab === 'equipe' && (
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-sm text-foreground mb-1">Membros da Clínica</h3>
                <p className="text-xs text-muted-foreground">Colaboradores com acesso ao painel de atendimento e agenda.</p>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Dra. Beatriz Costa', role: 'doctor', email: 'beatriz@clinica.com', active: true },
                  { name: 'Dr. Rodrigo Mello', role: 'doctor', email: 'rodrigo@clinica.com', active: true },
                  { name: 'Amanda Souza', role: 'reception', email: 'amanda.recepcao@clinica.com', active: true },
                  { name: 'Claudio Lins', role: 'admin', email: 'admin@clinica.com', active: true }
                ].map((member, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3.5 border border-border/60 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-secondary text-foreground flex items-center justify-center font-bold text-xs">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-foreground leading-none">{member.name}</h4>
                        <span className="text-[10px] text-muted-foreground block mt-1">{member.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Badge 
                        variant={
                          member.role === 'admin' 
                            ? 'default' 
                            : member.role === 'doctor' 
                              ? 'info' 
                              : 'secondary'
                        }
                        className="text-[9px] font-bold"
                      >
                        {member.role === 'admin' ? 'Administrador' : member.role === 'doctor' ? 'Médico' : 'Recepção'}
                      </Badge>
                      
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span className="text-[10px] text-muted-foreground">Ativo</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/40 pt-4 flex justify-end">
                <Button variant="outline" size="sm" className="text-xs">Convidar Novo Membro</Button>
              </div>
            </Card>
          )}

          {/* NOTIFICAÇÕES */}
          {activeTab === 'notificacoes' && (
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-sm text-foreground mb-1">Notificações Automáticas</h3>
                <p className="text-xs text-muted-foreground">Configure como e quando os pacientes receberão confirmações e lembretes.</p>
              </div>

              <div className="space-y-4">
                {/* Whatsapp notifications toggle */}
                <div className="flex items-start justify-between p-4 border border-border/60 rounded-xl bg-secondary/5">
                  <div className="space-y-1 pr-4">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <MessageSquare size={14} className="text-green-500" /> Confirmar Consulta via WhatsApp
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-normal">
                      Envia um WhatsApp automático de confirmação para o paciente 24h antes da consulta agendada.
                    </p>
                  </div>
                  <button 
                    onClick={() => setNotifWhatsApp(!notifWhatsApp)}
                    className={`
                      w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0
                      ${notifWhatsApp ? 'bg-primary' : 'bg-neutral-300 dark:bg-neutral-700'}
                    `}
                  >
                    <div className={`h-4 w-4 rounded-full bg-white transition-transform ${notifWhatsApp ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Email notifications toggle */}
                <div className="flex items-start justify-between p-4 border border-border/60 rounded-xl bg-secondary/5">
                  <div className="space-y-1 pr-4">
                    <h4 className="text-xs font-bold text-foreground">Aviso de Novo Lead por E-mail</h4>
                    <p className="text-[10px] text-muted-foreground leading-normal">
                      Envia um e-mail de alerta para o administrador da clínica sempre que um novo lead se cadastrar via Instagram/WhatsApp.
                    </p>
                  </div>
                  <button 
                    onClick={() => setNotifEmail(!notifEmail)}
                    className={`
                      w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0
                      ${notifEmail ? 'bg-primary' : 'bg-neutral-300 dark:bg-neutral-700'}
                    `}
                  >
                    <div className={`h-4 w-4 rounded-full bg-white transition-transform ${notifEmail ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              <div className="border-t border-border/40 pt-4 flex justify-end">
                <Button variant="primary" onClick={() => {
                  setIsSaved(true);
                  setTimeout(() => setIsSaved(false), 3000);
                }}>
                  {isSaved ? 'Configurações Salvas!' : 'Salvar Preferências'}
                </Button>
              </div>
            </Card>
          )}

          {/* INTEGRAÇÕES (SUPABASE) */}
          {activeTab === 'integracoes' && (
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-sm text-foreground mb-1">Backend & Integrações</h3>
                <p className="text-xs text-muted-foreground">Conecte e gerencie seus bancos de dados e APIs parceiras.</p>
              </div>

              <div className="space-y-4">
                {/* Supabase Connection card */}
                <div className="border border-border/60 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-secondary/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Database size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-foreground">Supabase Database</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Sincronização em tempo real de contatos, leads e agendamentos.</p>
                    </div>
                  </div>
                  <Badge variant="success" className="text-[9px] font-bold py-0.5 px-2">
                    Conectado (Demo)
                  </Badge>
                </div>

                {/* WhatsApp API Connection card */}
                <div className="border border-border/60 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-secondary/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-foreground">API do WhatsApp Business</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Envio de disparos automáticos e recepção de mensagens direta.</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-[10px] h-8 font-bold border-dashed">
                    Configurar Token
                  </Button>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};
