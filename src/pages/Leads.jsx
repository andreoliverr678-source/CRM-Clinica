import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Dialog } from '../components/ui/Dialog';
import { Plus, Search, MoreHorizontal, Mail, Phone, MessageSquare, Globe, Trash2 } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const INITIAL_LEADS = [
  { id: '1', name: 'Gabriela Lima', email: 'gabriela.lima@email.com', phone: '(11) 98765-4321', procedure: 'Harmonização Facial', source: 'Instagram', status: 'Novo', createdAt: '29/05/2026' },
  { id: '2', name: 'Lucas Ferraz', email: 'lucas.ferraz@email.com', phone: '(11) 97654-3210', procedure: 'Lipo de Papada', source: 'WhatsApp', status: 'Em Contato', createdAt: '29/05/2026' },
  { id: '3', name: 'Priscila Rocha', email: 'priscila.rocha@email.com', phone: '(11) 96543-2109', procedure: 'Fios de Sustentação', source: 'Tráfego Pago', status: 'Agendado', createdAt: '28/05/2026' },
  { id: '4', name: 'Amanda Albuquerque', email: 'amanda.a@email.com', phone: '(11) 95432-1098', procedure: 'Toxina Botulínica', source: 'Indicação', status: 'Novo', createdAt: '27/05/2026' },
  { id: '5', name: 'Camila Fernandes', email: 'camila.f@email.com', phone: '(11) 94321-0987', procedure: 'Preenchimento Labial', source: 'Instagram', status: 'Arquivado', createdAt: '25/05/2026' },
];

const getStatusVariant = (status) => {
  switch (status) {
    case 'Novo': return 'default';
    case 'Em Contato': return 'info';
    case 'Agendado': return 'success';
    case 'Arquivado': return 'secondary';
    default: return 'default';
  }
};

export const Leads = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newProcedure, setNewProcedure] = useState('');
  const [newSource, setNewSource] = useState('WhatsApp');
  const [newStatus, setNewStatus] = useState('Novo');

  const handleAddLead = (e) => {
    e.preventDefault();
    const newLead = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName, email: newEmail, phone: newPhone,
      procedure: newProcedure, source: newSource, status: newStatus,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    setLeads([newLead, ...leads]);
    setIsCreateOpen(false);
    setNewName(''); setNewEmail(''); setNewPhone(''); setNewProcedure('');
    setNewSource('WhatsApp'); setNewStatus('Novo');
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.procedure.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Pacientes e Oportunidades</h2>
          <p className="text-xs text-muted-foreground mt-1">Lista de leads, status de contato e procedimentos de interesse.</p>
        </div>
        <Button variant="primary" onClick={() => setIsCreateOpen(true)} leftIcon={<Plus size={16} />} className="w-full sm:w-auto">
          Novo Lead
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou procedimento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-input/40 text-sm transition-all duration-200 outline-none focus:border-primary/50 focus:ring-4 focus:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['Todos', 'Novo', 'Em Contato', 'Agendado', 'Arquivado'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 cursor-pointer ${
                statusFilter === status
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-muted-foreground font-semibold text-xs uppercase tracking-wider select-none">
                <th className="p-4">Nome do Lead</th>
                <th className="p-4">Procedimento</th>
                <th className="p-4">Origem</th>
                <th className="p-4">Data</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground text-xs font-medium">
                    Nenhum lead encontrado com os filtros atuais.
                  </td>
                </tr>
              ) : filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-secondary/20 transition-all duration-150">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{lead.name}</span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1"><Mail size={12} /> {lead.email}</span>
                        <span className="flex items-center gap-1"><Phone size={12} /> {lead.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-foreground">{lead.procedure}</td>
                  <td className="p-4">
                    <Badge variant="secondary" className="gap-1 font-semibold text-[10px]">
                      {lead.source === 'WhatsApp' && <MessageSquare size={10} className="text-green-500" />}
                      {lead.source === 'Instagram' && <InstagramIcon width={10} height={10} className="text-pink-500" />}
                      {lead.source === 'Tráfego Pago' && <Globe size={10} className="text-indigo-500" />}
                      {lead.source === 'Indicação' && <Plus size={10} className="text-purple-500" />}
                      {lead.source}
                    </Badge>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">{lead.createdAt}</td>
                  <td className="p-4">
                    <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setLeads(leads.filter(l => l.id !== lead.id))}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Excluir Lead"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Adicionar Novo Lead"
        footerActions={
          <>
            <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
            <Button variant="primary" type="submit" form="add-lead-form">Salvar Lead</Button>
          </>
        }
      >
        <form id="add-lead-form" onSubmit={handleAddLead} className="space-y-4">
          <Input label="Nome do Paciente" placeholder="Nome Completo" required value={newName} onChange={(e) => setNewName(e.target.value)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="E-mail" placeholder="email@exemplo.com" type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            <Input label="Telefone / WhatsApp" placeholder="(00) 00000-0000" required value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
          </div>
          <Input label="Procedimento de Interesse" placeholder="Ex: Botox, Preenchimento Labial" required value={newProcedure} onChange={(e) => setNewProcedure(e.target.value)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Origem / Canal</label>
              <select className="w-full h-10 px-3 rounded-lg border border-border bg-input/40 text-foreground text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-ring" value={newSource} onChange={(e) => setNewSource(e.target.value)}>
                <option>WhatsApp</option><option>Instagram</option><option>Tráfego Pago</option><option>Indicação</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Status Inicial</label>
              <select className="w-full h-10 px-3 rounded-lg border border-border bg-input/40 text-foreground text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-ring" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option>Novo</option><option>Em Contato</option><option>Agendado</option><option>Arquivado</option>
              </select>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
