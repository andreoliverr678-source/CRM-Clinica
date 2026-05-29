import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  DollarSign, 
  UserPlus, 
  TrendingUp, 
  CalendarDays, 
  ArrowUpRight, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const revenueData = [
  { name: 'Jan', receita: 12000 }, { name: 'Fev', receita: 19000 },
  { name: 'Mar', receita: 15000 }, { name: 'Abr', receita: 28000 },
  { name: 'Mai', receita: 35000 }, { name: 'Jun', receita: 42000 },
];

const sourceData = [
  { name: 'WhatsApp', value: 45, color: '#22c55e' },
  { name: 'Instagram', value: 30, color: '#ec4899' },
  { name: 'Tráfego Pago', value: 15, color: '#6366f1' },
  { name: 'Indicações', value: 10, color: '#a855f7' },
];

const nextAppointments = [
  { id: 1, patient: 'Isabela Santana', time: '11:00', procedure: 'Toxina Botulínica', doctor: 'Dra. Carolina', status: 'confirmado' },
  { id: 2, patient: 'Gustavo Mendonça', time: '13:30', procedure: 'Preenchimento Labial', doctor: 'Dr. André', status: 'confirmado' },
  { id: 3, patient: 'Beatriz Vasconcelos', time: '15:00', procedure: 'Bioestimulador', doctor: 'Dra. Carolina', status: 'pendente' },
  { id: 4, patient: 'Mariana Duarte', time: '16:30', procedure: 'Peeling Químico', doctor: 'Dr. André', status: 'confirmado' },
];

const activeLeads = [
  { id: 1, name: 'Gabriela Lima', service: 'Harmonização Facial', date: 'Hoje, 09:32', source: 'Instagram' },
  { id: 2, name: 'Lucas Ferraz', service: 'Lipo de Papada', date: 'Hoje, 08:15', source: 'WhatsApp' },
  { id: 3, name: 'Priscila Rocha', service: 'Fios de Sustentação', date: 'Ontem', source: 'Tráfego Pago' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Olá, Dr. André! <Sparkles size={18} className="text-yellow-500 animate-pulse" />
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Resumo clínico e comercial da sua clínica para hoje.</p>
        </div>
        <Button variant="primary" size="sm" className="shrink-0">Novo Agendamento</Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Faturamento Mensal', value: 'R$ 42.000', change: '+20% vs mês anterior', icon: DollarSign, color: 'green' },
          { label: 'Novos Leads', value: '118', change: '+12% esta semana', icon: UserPlus, color: 'indigo' },
          { label: 'Taxa de Conversão', value: '24.5%', change: '+3.2% nos últimos 30d', icon: TrendingUp, color: 'purple' },
          { label: 'Consultas do Mês', value: '340', change: 'Metas: 92% atingida', icon: CalendarDays, color: 'blue' },
        ].map((kpi) => {
          const Icon = kpi.icon;
          const colorMap = {
            green: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-500' },
            indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-500' },
            purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-500' },
            blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-500' },
          };
          const c = colorMap[kpi.color];
          return (
            <Card key={kpi.label} hoverable>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">{kpi.value}</h3>
                  <span className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                    <TrendingUp size={12} /> {kpi.change}
                  </span>
                </div>
                <div className={`h-10 w-10 rounded-lg ${c.bg} border ${c.border} ${c.text} flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolução Financeira</CardTitle>
            <CardDescription>Comparativo mensal de faturamento.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="receita" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorReceita)" name="Faturamento (R$)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Canais de Captação</CardTitle>
            <CardDescription>Origem dos leads ativos (últimos 30 dias).</CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex flex-col justify-between">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData} layout="vertical" margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
                    {sourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 pt-4 border-t border-border/40">
              {sourceData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Próximos Atendimentos</CardTitle>
              <CardDescription>Pacientes agendados para hoje.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">Ver Agenda <ArrowUpRight size={14} /></Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {nextAppointments.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold font-mono text-primary w-12">{appt.time}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{appt.patient}</p>
                      <p className="text-xs text-muted-foreground">{appt.procedure} · {appt.doctor}</p>
                    </div>
                  </div>
                  <Badge variant={appt.status === 'confirmado' ? 'success' : 'warning'}>{appt.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Leads Recentes</CardTitle>
              <CardDescription>Oportunidades geradas hoje.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">Ver Leads <ArrowUpRight size={14} /></Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {activeLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.service} · {lead.date}</p>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    {lead.source === 'WhatsApp' && <MessageSquare size={10} className="text-green-500" />}
                    {lead.source === 'Instagram' && <InstagramIcon width={10} height={10} className="text-pink-500" />}
                    {lead.source === 'Tráfego Pago' && <Sparkles size={10} className="text-indigo-500" />}
                    {lead.source}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
