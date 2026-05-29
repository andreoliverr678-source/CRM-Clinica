import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Dialog } from '../components/ui/Dialog';
import { Input } from '../components/ui/Input';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const INITIAL_APPOINTMENTS = [
  { id: '1', patientName: 'Gabriela Lima', procedure: 'Harmonização Facial', doctor: 'Dra. Beatriz Costa', date: '2026-05-29', time: '09:00', duration: '60 min', status: 'Confirmado' },
  { id: '2', patientName: 'Lucas Ferraz', procedure: 'Lipo de Papada Enzimática', doctor: 'Dr. Rodrigo Mello', date: '2026-05-29', time: '11:00', duration: '45 min', status: 'Confirmado' },
  { id: '3', patientName: 'Priscila Rocha', procedure: 'Fios de Sustentação PDO', doctor: 'Dra. Beatriz Costa', date: '2026-05-30', time: '14:30', duration: '90 min', status: 'Pendente' },
  { id: '4', patientName: 'Amanda Albuquerque', procedure: 'Toxina Botulínica', doctor: 'Dra. Beatriz Costa', date: '2026-05-29', time: '16:00', duration: '30 min', status: 'Confirmado' },
  { id: '5', patientName: 'Mariana Costa', procedure: 'Preenchimento Labial', doctor: 'Dr. Rodrigo Mello', date: '2026-05-31', time: '10:00', duration: '60 min', status: 'Pendente' }
];

const DAYS_OF_WEEK = [
  { name: 'Seg', date: '25', fullDate: '2026-05-25' },
  { name: 'Ter', date: '26', fullDate: '2026-05-26' },
  { name: 'Qua', date: '27', fullDate: '2026-05-27' },
  { name: 'Qui', date: '28', fullDate: '2026-05-28' },
  { name: 'Sex', date: '29', fullDate: '2026-05-29' },
  { name: 'Sáb', date: '30', fullDate: '2026-05-30' },
  { name: 'Dom', date: '31', fullDate: '2026-05-31' }
];

export const Agenda = () => {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [selectedDate, setSelectedDate] = useState('2026-05-29'); // Default Friday
  const [search, setSearch] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('Todos');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [procedure, setProcedure] = useState('');
  const [doctor, setDoctor] = useState('Dra. Beatriz Costa');
  const [date, setDate] = useState('2026-05-29');
  const [time, setTime] = useState('09:00');
  const [duration, setDuration] = useState('60 min');
  const [status, setStatus] = useState('Confirmado');

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!patientName || !procedure || !time) return;

    const newAppointment = {
      id: Math.random().toString(36).substr(2, 9),
      patientName,
      procedure,
      doctor,
      date,
      time,
      duration,
      status
    };

    setAppointments([...appointments, newAppointment]);
    setIsAddOpen(false);
    
    // Reset Form
    setPatientName('');
    setProcedure('');
    setTime('09:00');
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(ap => ap.id !== id));
  };

  const getStatusVariant = (st) => {
    return st === 'Confirmado' ? 'success' : 'warning';
  };

  // Filtered appointments for the active date and search query
  const filteredAppointments = appointments.filter(ap => {
    const matchesDate = ap.date === selectedDate;
    const matchesDoctor = doctorFilter === 'Todos' || ap.doctor === doctorFilter;
    const matchesSearch = 
      ap.patientName.toLowerCase().includes(search.toLowerCase()) ||
      ap.procedure.toLowerCase().includes(search.toLowerCase());
    return matchesDate && matchesDoctor && matchesSearch;
  }).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Agenda de Consultas</h2>
          <p className="text-xs text-muted-foreground mt-1">Gerencie consultas, horários, profissionais e status de atendimento da clínica.</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setIsAddOpen(true)} 
          leftIcon={<Plus size={16} />}
          className="w-full sm:w-auto"
        >
          Novo Agendamento
        </Button>
      </div>

      {/* Control panel: Calendar selector and filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Calendar view & Weekday selector */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} className="text-primary" />
                <span className="font-bold text-sm text-foreground">Maio de 2026</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer">
                  <ChevronLeft size={14} />
                </button>
                <button className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Weekdays slider */}
            <div className="grid grid-cols-7 gap-2">
              {DAYS_OF_WEEK.map((day) => {
                const isSelected = selectedDate === day.fullDate;
                const dailyAps = appointments.filter(ap => ap.date === day.fullDate);
                
                return (
                  <button
                    key={day.fullDate}
                    onClick={() => setSelectedDate(day.fullDate)}
                    className={`
                      flex flex-col items-center justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-pointer
                      ${isSelected 
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10' 
                        : 'bg-card text-foreground hover:bg-secondary/40 border-border'}
                    `}
                  >
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {day.name}
                    </span>
                    <span className="text-base font-extrabold tracking-tight mt-1">{day.date}</span>
                    
                    {dailyAps.length > 0 && (
                      <span className={`h-1.5 w-1.5 rounded-full mt-2 ${isSelected ? 'bg-primary-foreground' : 'bg-primary animate-pulse'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Timeblocks Visualization for Selected Day */}
          <Card className="p-6">
            <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-4 border-b border-border/40 pb-2">Linha do Tempo</h3>
            <div className="space-y-4">
              {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((hour) => {
                const hourAps = filteredAppointments.filter(ap => {
                  const apHour = ap.time.split(':')[0];
                  return apHour === hour.split(':')[0];
                });

                return (
                  <div key={hour} className="flex gap-4 group">
                    <span className="text-[10px] text-muted-foreground font-semibold w-10 py-1 shrink-0">{hour}</span>
                    
                    <div className="flex-1 min-h-[44px] border-t border-border/30 relative flex flex-col gap-2 pt-1">
                      {hourAps.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                          <button 
                            onClick={() => {
                              setTime(hour);
                              setIsAddOpen(true);
                            }}
                            className="text-[9px] text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={10} /> Agendar neste horário
                          </button>
                        </div>
                      ) : (
                        hourAps.map((ap) => (
                          <div 
                            key={ap.id} 
                            className="bg-primary/5 hover:bg-primary/10 border-l-4 border-primary rounded-r-lg p-2.5 flex items-center justify-between text-xs transition-colors"
                          >
                            <div className="min-w-0">
                              <p className="font-bold text-foreground truncate">{ap.patientName}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{ap.procedure} ({ap.time} • {ap.duration})</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusVariant(ap.status)} className="text-[8px] font-bold px-1.5 py-0">
                                {ap.status}
                              </Badge>
                              <span className="text-[9px] text-muted-foreground font-semibold hidden sm:inline">{ap.doctor}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Appointment details & Side Filtering */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 flex flex-col h-full">
            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <h3 className="font-bold text-xs text-foreground uppercase tracking-wider">Filtrar Agenda</h3>
              
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pesquisar paciente..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-input/40 text-xs transition-all duration-200 outline-none focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Profissional</label>
                <select 
                  className="w-full h-9 px-3 rounded-lg border border-border bg-input/40 text-foreground text-xs outline-none focus:border-primary/50"
                  value={doctorFilter}
                  onChange={(e) => setDoctorFilter(e.target.value)}
                >
                  <option>Todos</option>
                  <option>Dra. Beatriz Costa</option>
                  <option>Dr. Rodrigo Mello</option>
                </select>
              </div>
            </div>

            {/* Daily Summary */}
            <div className="flex-1 flex flex-col">
              <h3 className="font-bold text-xs text-foreground uppercase tracking-wider mb-3">
                Consultas do Dia ({filteredAppointments.length})
              </h3>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[420px]">
                {filteredAppointments.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center border border-dashed border-border/50 rounded-xl p-8 text-center text-muted-foreground">
                    <CalendarIcon size={24} className="text-muted-foreground/40 mb-2" />
                    <p className="text-[11px] font-medium">Nenhuma consulta agendada para hoje com os filtros selecionados.</p>
                  </div>
                ) : (
                  filteredAppointments.map((ap) => (
                    <div 
                      key={ap.id}
                      className="border border-border/60 bg-card rounded-xl p-4 flex flex-col gap-3 relative group hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-secondary text-foreground flex items-center justify-center font-bold text-xs">
                            {ap.patientName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-foreground leading-none">{ap.patientName}</h4>
                            <span className="text-[9px] text-muted-foreground block mt-1">{ap.procedure}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => deleteAppointment(ap.id)}
                          className="p-1 rounded text-muted-foreground hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Cancelar Agendamento"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground border-t border-border/30 pt-3">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-primary shrink-0" />
                          <span>{ap.time} • {ap.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User size={12} className="text-primary shrink-0" />
                          <span className="truncate">{ap.doctor}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusVariant(ap.status)} className="text-[8px] font-bold px-2 py-0.5">
                          {ap.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* Dialog for Scheduling Appointments */}
      <Dialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Agendar Nova Consulta"
        footerActions={
          <>
            <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Cancelar</Button>
            <Button variant="primary" type="submit" form="add-appointment-form">Confirmar Agendamento</Button>
          </>
        }
      >
        <form id="add-appointment-form" onSubmit={handleAddAppointment} className="space-y-4">
          <Input 
            label="Nome do Paciente" 
            placeholder="Nome do Paciente" 
            required 
            value={patientName} 
            onChange={(e) => setPatientName(e.target.value)} 
          />
          <Input 
            label="Procedimento de Interesse" 
            placeholder="Ex: Toxina Botulínica, Preenchimento Labial" 
            required 
            value={procedure} 
            onChange={(e) => setProcedure(e.target.value)} 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Profissional Responsável</label>
              <select 
                className="w-full h-10 px-3 rounded-lg border border-border bg-input/40 text-foreground text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-ring" 
                value={doctor} 
                onChange={(e) => setDoctor(e.target.value)}
              >
                <option>Dra. Beatriz Costa</option>
                <option>Dr. Rodrigo Mello</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Duração Estimada</label>
              <select 
                className="w-full h-10 px-3 rounded-lg border border-border bg-input/40 text-foreground text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-ring" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
              >
                <option>30 min</option>
                <option>45 min</option>
                <option>60 min</option>
                <option>90 min</option>
                <option>120 min</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Data da Consulta" 
              type="date" 
              required 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
            <Input 
              label="Horário" 
              type="time" 
              required 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Status do Agendamento</label>
            <select 
              className="w-full h-10 px-3 rounded-lg border border-border bg-input/40 text-foreground text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-ring" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Confirmado</option>
              <option>Pendente</option>
            </select>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
