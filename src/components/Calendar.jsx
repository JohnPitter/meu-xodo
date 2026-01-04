import { useState } from 'react';
import './Calendar.css';

export default function Calendar({ activities }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getActivitiesForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return activities.filter(activity => {
      const activityDate = activity.data || activity.vencimento;
      return activityDate === dateStr;
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayActivities = getActivitiesForDate(day);
      const hasActivities = dayActivities.length > 0;
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = selectedDate === dateStr;
      const isToday = new Date().toISOString().split('T')[0] === dateStr;

      days.push(
        <div
          key={day}
          className={`calendar-day ${hasActivities ? 'has-activities' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasActivities && (
            <div className="activity-indicators">
              {dayActivities.map((activity, idx) => (
                <span
                  key={idx}
                  className={`activity-dot ${activity.tipo}`}
                  title={activity.descricao || activity.tipo}
                ></span>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const getSelectedDateActivities = () => {
    if (!selectedDate) return [];
    return activities.filter(activity => {
      const activityDate = activity.data || activity.vencimento;
      return activityDate === selectedDate;
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getActivityIcon = (tipo) => {
    const icons = {
      manutencao: '🔧',
      lavagem: '💧',
      revisao: '✅',
      ipva: '💳',
      lembrete: '🔔'
    };
    return icons[tipo] || '📋';
  };

  const selectedActivities = getSelectedDateActivities();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="calendar-nav" onClick={previousMonth}>‹</button>
        <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
        <button className="calendar-nav" onClick={nextMonth}>›</button>
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot manutencao"></span>
          <span className="legend-label">🔧 Manutenção</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot lavagem"></span>
          <span className="legend-label">💧 Lavagem</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot revisao"></span>
          <span className="legend-label">✅ Revisão</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot ipva"></span>
          <span className="legend-label">💳 IPVA</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot lembrete"></span>
          <span className="legend-label">🔔 Lembrete</span>
        </div>
      </div>

      <div className="calendar-weekdays">
        <div className="weekday">Dom</div>
        <div className="weekday">Seg</div>
        <div className="weekday">Ter</div>
        <div className="weekday">Qua</div>
        <div className="weekday">Qui</div>
        <div className="weekday">Sex</div>
        <div className="weekday">Sáb</div>
      </div>

      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>

      {selectedDate && selectedActivities.length > 0 && (
        <div className="selected-date-activities">
          <h4>{formatDate(selectedDate)}</h4>
          <div className="activity-list-calendar">
            {selectedActivities.map((activity, idx) => (
              <div key={idx} className="activity-item-calendar">
                <span className="activity-icon">{getActivityIcon(activity.tipo)}</span>
                <div className="activity-info">
                  <strong>{activity.descricao || (activity.ano ? `IPVA ${activity.ano}` : 'Atividade')}</strong>
                  {activity.valor && <span className="activity-value">{formatCurrency(activity.valor)}</span>}
                  {activity.km && <span className="activity-km">{Number(activity.km).toLocaleString('pt-BR')} km</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedActivities.length === 0 && (
        <div className="no-activities-selected">
          <p>Nenhuma atividade nesta data</p>
        </div>
      )}
    </div>
  );
}
