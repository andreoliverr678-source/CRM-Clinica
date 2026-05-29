import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MessageSquare, Send, Paperclip, Smile, Phone, Mail, Calendar, Sparkles, ExternalLink } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const INITIAL_CHATS = [
  {
    id: '1', patientName: 'Gabriela Lima', lastMessage: 'Gostaria de saber os horários para botox nesta sexta', time: '09:32',
    unreadCount: 2, source: 'Instagram', procedure: 'Toxina Botulínica', email: 'gabriela.lima@email.com', phone: '(11) 98765-4321',
    history: [
      { id: '1-1', text: 'Olá! Vi o post de vocês sobre botox preventivo e fiquei interessada.', sender: 'user', time: '09:15' },
      { id: '1-2', text: 'Olá Gabriela! A toxina botulínica preventiva é excelente. Qual seria o melhor período para você vir fazer uma avaliação?', sender: 'clinic', time: '09:20' },
      { id: '1-3', text: 'Gostaria de saber os horários para botox nesta sexta', sender: 'user', time: '09:32' },
    ]
  },
  {
    id: '2', patientName: 'Lucas Ferraz', lastMessage: 'Perfeito, vou confirmar com a minha esposa e te aviso.', time: 'Ontem',
    unreadCount: 0, source: 'WhatsApp', procedure: 'Lipo de Papada', email: 'lucas.ferraz@email.com', phone: '(11) 97654-3210',
    history: [
      { id: '2-1', text: 'Boa tarde, gostaria de informações sobre a lipo de papada enzimática.', sender: 'user', time: 'Ontem 14:10' },
      { id: '2-2', text: 'Olá Lucas! A lipo enzimática é feita em sessões com agulha bem fina. Indicamos de 3 a 5 sessões.', sender: 'clinic', time: 'Ontem 14:15' },
      { id: '2-3', text: 'Perfeito, vou confirmar com a minha esposa e te aviso.', sender: 'user', time: 'Ontem 14:22' },
    ]
  },
  {
    id: '3', patientName: 'Priscila Rocha', lastMessage: 'A consulta está confirmada para amanhã às 14h?', time: 'Ontem',
    unreadCount: 0, source: 'WhatsApp', procedure: 'Fios de Sustentação', email: 'priscila.rocha@email.com', phone: '(11) 96543-2109',
    history: [
      { id: '3-1', text: 'Olá, gostaria de agendar uma avaliação para fios de sustentação PDO.', sender: 'user', time: 'Ontem 10:00' },
      { id: '3-2', text: 'Claro, Priscila! Temos vaga para amanhã às 14:00. Fica bom?', sender: 'clinic', time: 'Ontem 10:12' },
      { id: '3-3', text: 'A consulta está confirmada para amanhã às 14h?', sender: 'user', time: 'Ontem 10:45' },
    ]
  }
];

export const Conversas = () => {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState('1');
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.history]);

  useEffect(() => {
    if (activeChat.unreadCount > 0) {
      setChats(prev => prev.map(c => c.id === activeChat.id ? { ...c, unreadCount: 0 } : c));
    }
  }, [activeChatId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const msg = { id: Math.random().toString(36).substr(2, 9), text: inputText, sender: 'clinic', time: now };
    setChats(prev => prev.map(c => c.id === activeChat.id ? { ...c, lastMessage: inputText, time: 'Agora', history: [...c.history, msg] } : c));
    const currentInput = inputText;
    setInputText('');
    setTimeout(() => {
      const reply = { id: Math.random().toString(36).substr(2, 9), text: 'Obrigada pelo retorno! Vou analisar e te respondo.', sender: 'user', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) };
      setChats(prev => prev.map(c => c.id === activeChat.id ? { ...c, lastMessage: reply.text, time: 'Agora', history: [...c.history, reply] } : c));
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex border border-border bg-card rounded-xl overflow-hidden shadow-sm">
      {/* Contact List */}
      <div className="w-80 border-r border-border flex flex-col h-full bg-sidebar/20">
        <div className="p-4 border-b border-border/40 flex items-center justify-between">
          <span className="font-semibold text-sm">Mensagens</span>
          <Badge variant="default" className="text-[10px] font-bold">
            {chats.reduce((acc, c) => acc + c.unreadCount, 0)} não lidas
          </Badge>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-border/20">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`p-4 flex gap-3 cursor-pointer transition-all duration-150 relative ${
                chat.id === activeChatId ? 'bg-secondary/80 border-l-2 border-primary' : 'hover:bg-secondary/40'
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0 font-semibold border border-border">
                {chat.patientName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-foreground truncate">{chat.patientName}</span>
                  <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Badge variant="secondary" className="text-[8px] font-bold gap-0.5 py-0 px-1 border-none bg-neutral-200 dark:bg-neutral-800">
                    {chat.source === 'WhatsApp' ? <MessageSquare size={8} className="text-green-500" /> : <InstagramIcon width={8} height={8} className="text-pink-500" />}
                    {chat.source}
                  </Badge>
                  <span className="text-[9px] text-muted-foreground truncate max-w-[120px]">{chat.procedure}</span>
                </div>
              </div>
              {chat.unreadCount > 0 && <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col h-full bg-card">
        <div className="h-16 border-b border-border/40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">
              {activeChat.patientName.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-xs text-foreground leading-none">{activeChat.patientName}</h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-muted-foreground">Online via {activeChat.source}</span>
              </div>
            </div>
          </div>
          <Badge variant="default" className="text-[10px] font-bold">{activeChat.procedure}</Badge>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/5">
          {activeChat.history.map((msg) => {
            const isClinic = msg.sender === 'clinic';
            return (
              <div key={msg.id} className={`flex w-full ${isClinic ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-xl px-4 py-2.5 text-xs leading-normal shadow-sm ${
                  isClinic ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-foreground border border-border rounded-bl-none'
                }`}>
                  <p>{msg.text}</p>
                  <span className="block text-[9px] mt-1.5 text-right opacity-70">{msg.time}</span>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-border/40 flex items-center gap-3 bg-card">
          <button type="button" className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
            <Paperclip size={16} />
          </button>
          <input
            type="text"
            placeholder={`Responder a ${activeChat.patientName} via ${activeChat.source}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 h-10 px-4 rounded-lg border border-border bg-input/40 text-xs transition-all duration-200 outline-none focus:border-primary/50 focus:ring-4 focus:ring-ring"
          />
          <button type="button" className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
            <Smile size={16} />
          </button>
          <Button type="submit" size="sm" className="h-10 px-4" rightIcon={<Send size={12} />}>Enviar</Button>
        </form>
      </div>

      {/* Lead CRM Panel */}
      <div className="w-80 border-l border-border h-full bg-sidebar/20 hidden xl:flex flex-col p-6 space-y-6">
        <div className="text-center flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground text-xl font-bold select-none mb-3">
            {activeChat.patientName.charAt(0)}
          </div>
          <h4 className="font-bold text-sm text-foreground">{activeChat.patientName}</h4>
          <span className="text-[10px] text-muted-foreground mt-1">Lead Cadastrado</span>
        </div>
        <div className="space-y-4 border-t border-b border-border/40 py-5">
          <div className="flex gap-3 text-xs">
            <Mail size={14} className="text-muted-foreground shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-muted-foreground text-[10px] leading-none">E-mail</p>
              <p className="font-medium text-foreground truncate mt-1">{activeChat.email}</p>
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <Phone size={14} className="text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-muted-foreground text-[10px] leading-none">WhatsApp</p>
              <p className="font-medium text-foreground mt-1">{activeChat.phone}</p>
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <Calendar size={14} className="text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-muted-foreground text-[10px] leading-none">Procedimento</p>
              <p className="font-medium text-foreground mt-1 flex items-center gap-1">
                <Sparkles size={12} className="text-yellow-500" /> {activeChat.procedure}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2.5">
          <Button variant="outline" size="sm" className="w-full text-xs font-semibold" leftIcon={<Calendar size={14} />}>Agendar Avaliação</Button>
          <Button variant="secondary" size="sm" className="w-full text-xs font-semibold" leftIcon={<ExternalLink size={14} />}>Abrir Prontuário</Button>
        </div>
      </div>
    </div>
  );
};
