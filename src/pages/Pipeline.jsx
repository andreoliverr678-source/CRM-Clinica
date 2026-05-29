import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Dialog } from '../components/ui/Dialog';
import { Input } from '../components/ui/Input';
import { 
  Plus, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  DollarSign, 
  Clock, 
  Sparkles, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  User,
  Trash2
} from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const INITIAL_BOARD = {
  'novos': {
    id: 'novos',
    title: 'Novos',
    color: 'border-blue-500/20 dark:border-blue-500/10',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    items: [
      { id: 'p1', name: 'Gabriela Lima', procedure: 'Harmonização Facial', value: 2500, days: 1, source: 'Instagram' },
      { id: 'p2', name: 'Amanda Albuquerque', procedure: 'Toxina Botulínica', value: 1200, days: 2, source: 'Indicação' }
    ]
  },
  'contato': {
    id: 'contato',
    title: 'Em Contato',
    color: 'border-amber-500/20 dark:border-amber-500/10',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    items: [
      { id: 'p3', name: 'Lucas Ferraz', procedure: 'Lipo de Papada', value: 1800, days: 3, source: 'WhatsApp' }
    ]
  },
  'agendado': {
    id: 'agendado',
    title: 'Avaliação',
    color: 'border-purple-500/20 dark:border-purple-500/10',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    items: [
      { id: 'p4', name: 'Priscila Rocha', procedure: 'Fios de Sustentação', value: 3500, days: 5, source: 'Tráfego Pago' }
    ]
  },
  'fechado': {
    id: 'fechado',
    title: 'Fechados',
    color: 'border-emerald-500/20 dark:border-emerald-500/10',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    items: [
      { id: 'p5', name: 'Mariana Costa', procedure: 'Preenchimento Labial', value: 1500, days: 8, source: 'Indicação' }
    ]
  }
};

export const Pipeline = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [procedure, setProcedure] = useState('');
  const [value, setValue] = useState('');
  const [source, setSource] = useState('WhatsApp');
  const [stage, setStage] = useState('novos');

  const moveCard = (cardId, fromStage, toStage) => {
    const sourceColumn = board[fromStage];
    const destColumn = board[toStage];
    const cardToMove = sourceColumn.items.find(item => item.id === cardId);
    
    if (!cardToMove) return;

    setBoard({
      ...board,
      [fromStage]: {
        ...sourceColumn,
        items: sourceColumn.items.filter(item => item.id !== cardId)
      },
      [toStage]: {
        ...destColumn,
        items: [...destColumn.items, cardToMove]
      }
    });
  };

  const deleteCard = (cardId, currentStage) => {
    const column = board[currentStage];
    setBoard({
      ...board,
      [currentStage]: {
        ...column,
        items: column.items.filter(item => item.id !== cardId)
      }
    });
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!name || !procedure) return;

    const newCard = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      procedure,
      value: Number(value) || 0,
      days: 0,
      source
    };

    const targetColumn = board[stage];
    setBoard({
      ...board,
      [stage]: {
        ...targetColumn,
        items: [...targetColumn.items, newCard]
      }
    });

    setIsAddOpen(false);
    setName('');
    setProcedure('');
    setValue('');
    setSource('WhatsApp');
    setStage('novos');
  };

  // Get total pipeline value
  const totalValue = Object.values(board).reduce((sum, col) => {
    return sum + col.items.reduce((colSum, item) => colSum + item.value, 0);
  }, 0);

  const getSourceIcon = (src) => {
    switch (src) {
      case 'WhatsApp':
        return <MessageSquare size={12} className="text-green-500 shrink-0" />;
      case 'Instagram':
        return <InstagramIcon width={12} height={12} className="text-pink-500 shrink-0" />;
      default:
        return <Sparkles size={12} className="text-primary shrink-0" />;
    }
  };

  const stagesList = ['novos', 'contato', 'agendado', 'fechado'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Funil de Vendas</h2>
          <p className="text-xs text-muted-foreground mt-1">Acompanhe a jornada dos leads desde o primeiro contato até o fechamento.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="px-4 py-2 bg-card rounded-lg border border-border/80 flex items-center gap-3 text-xs">
            <TrendingUp size={16} className="text-emerald-500" />
            <div>
              <p className="text-muted-foreground font-medium">Valor em Negociação</p>
              <p className="font-bold text-foreground mt-0.5">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}
              </p>
            </div>
          </div>

          <Button 
            variant="primary" 
            onClick={() => setIsAddOpen(true)} 
            leftIcon={<Plus size={16} />}
            className="w-full sm:w-auto"
          >
            Novo Negócio
          </Button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por nome ou procedimento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-input/40 text-sm transition-all duration-200 outline-none focus:border-primary/50 focus:ring-4 focus:ring-ring"
        />
      </div>

      {/* Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stagesList.map((stageId) => {
          const col = board[stageId];
          const colItems = col.items.filter(item => 
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.procedure.toLowerCase().includes(search.toLowerCase())
          );
          const colTotal = colItems.reduce((acc, item) => acc + item.value, 0);

          return (
            <div key={stageId} className={`flex flex-col rounded-xl border p-4 bg-secondary/20 min-h-[500px] ${col.color}`}>
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">{col.title}</h3>
                  <Badge variant="secondary" className={`text-[10px] font-bold ${col.badgeColor}`}>
                    {colItems.length}
                  </Badge>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(colTotal)}
                </span>
              </div>

              {/* Column Items */}
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[580px]">
                {colItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border/50 rounded-xl p-6 text-center text-muted-foreground select-none">
                    <p className="text-[10px]">Sem leads nesta fase</p>
                  </div>
                ) : (
                  colItems.map((item) => (
                    <Card key={item.id} className="p-4 hover:shadow-md transition-shadow relative group">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-xs text-foreground truncate">{item.name}</span>
                          <span className="text-[10px] text-muted-foreground mt-1 truncate">{item.procedure}</span>
                        </div>
                        <button 
                          onClick={() => deleteCard(item.id, stageId)}
                          className="p-1 rounded text-muted-foreground hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                          title="Remover Negócio"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      {/* Info Row */}
                      <div className="flex items-center justify-between mt-4 text-[10px] text-muted-foreground border-t border-border/30 pt-3">
                        <div className="flex items-center gap-1">
                          {getSourceIcon(item.source)}
                          <span>{item.source}</span>
                        </div>
                        <span className="font-semibold text-foreground">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(item.value)}
                        </span>
                      </div>

                      {/* Card Actions (Move Left / Right) */}
                      <div className="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-dashed border-border/20">
                        {stageId !== 'novos' && (
                          <button
                            onClick={() => {
                              const prevStage = stagesList[stagesList.indexOf(stageId) - 1];
                              moveCard(item.id, stageId, prevStage);
                            }}
                            className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                            title="Mover para fase anterior"
                          >
                            <ChevronLeft size={10} />
                          </button>
                        )}
                        
                        {stageId !== 'fechado' && (
                          <button
                            onClick={() => {
                              const nextStage = stagesList[stagesList.indexOf(stageId) + 1];
                              moveCard(item.id, stageId, nextStage);
                            }}
                            className="p-1.5 rounded-lg border border-border bg-primary text-primary-foreground hover:bg-primary/95 transition-colors cursor-pointer flex items-center justify-center"
                            title="Avançar fase"
                          >
                            <ChevronRight size={10} />
                          </button>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dialog creation */}
      <Dialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Novo Negócio no Funil"
        footerActions={
          <>
            <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Cancelar</Button>
            <Button variant="primary" type="submit" form="add-card-form">Criar Negócio</Button>
          </>
        }
      >
        <form id="add-card-form" onSubmit={handleAddCard} className="space-y-4">
          <Input 
            label="Nome do Paciente" 
            placeholder="Nome Completo" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <Input 
            label="Procedimento de Interesse" 
            placeholder="Ex: Preenchimento Labial" 
            required 
            value={procedure} 
            onChange={(e) => setProcedure(e.target.value)} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Valor Estimado (R$)" 
              placeholder="Ex: 1500" 
              type="number" 
              value={value} 
              onChange={(e) => setValue(e.target.value)} 
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Origem do Lead</label>
              <select 
                className="w-full h-10 px-3 rounded-lg border border-border bg-input/40 text-foreground text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-ring" 
                value={source} 
                onChange={(e) => setSource(e.target.value)}
              >
                <option>WhatsApp</option>
                <option>Instagram</option>
                <option>Tráfego Pago</option>
                <option>Indicação</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Fase Inicial do Funil</label>
            <select 
              className="w-full h-10 px-3 rounded-lg border border-border bg-input/40 text-foreground text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-ring" 
              value={stage} 
              onChange={(e) => setStage(e.target.value)}
            >
              <option value="novos">Novos</option>
              <option value="contato">Em Contato</option>
              <option value="agendado">Avaliação</option>
              <option value="fechado">Fechados</option>
            </select>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
