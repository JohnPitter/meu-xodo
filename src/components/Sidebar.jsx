import { useState } from 'react';
import ActivityList from './ActivityList';
import './Sidebar.css';

export default function Sidebar({ vehicle, onAddActivity, activities, onDeleteActivity }) {
  const [activeSection, setActiveSection] = useState('info');

  const menuItems = [
    { id: 'info', label: 'Informações', icon: '📋' },
    { id: 'manutencoes', label: 'Manutenções', icon: '🔧' },
    { id: 'lavagens', label: 'Lavagens', icon: '💧' },
    { id: 'revisoes', label: 'Revisões', icon: '✅' },
    { id: 'ipva', label: 'IPVA', icon: '💳' },
    { id: 'lembretes', label: 'Lembretes', icon: '🔔' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>{vehicle.marca} {vehicle.modelo}</h2>
        <p className="vehicle-year">{vehicle.ano}</p>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-content">
        {activeSection === 'info' && (
          <div className="section-content">
            <h3>Informações do Veículo</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Marca</label>
                <p>{vehicle.marca}</p>
              </div>
              <div className="info-item">
                <label>Modelo</label>
                <p>{vehicle.modelo}</p>
              </div>
              <div className="info-item">
                <label>Ano</label>
                <p>{vehicle.ano}</p>
              </div>
            </div>
            <button className="action-button" onClick={() => setActiveSection('manutencoes')}>
              + Nova Atividade
            </button>
          </div>
        )}

        {activeSection === 'manutencoes' && (
          <div className="section-content">
            <h3>Manutenções</h3>
            <p className="section-description">Registre manutenções do seu veículo</p>
            <button className="action-button" onClick={() => onAddActivity('manutencao')}>
              + Adicionar Manutenção
            </button>
            <ActivityList
              activities={activities.filter(a => a.tipo === 'manutencao')}
              onDelete={onDeleteActivity}
            />
          </div>
        )}

        {activeSection === 'lavagens' && (
          <div className="section-content">
            <h3>Lavagens</h3>
            <p className="section-description">Histórico de lavagens do veículo</p>
            <button className="action-button" onClick={() => onAddActivity('lavagem')}>
              + Adicionar Lavagem
            </button>
            <ActivityList
              activities={activities.filter(a => a.tipo === 'lavagem')}
              onDelete={onDeleteActivity}
            />
          </div>
        )}

        {activeSection === 'revisoes' && (
          <div className="section-content">
            <h3>Revisões</h3>
            <p className="section-description">Controle de revisões periódicas</p>
            <button className="action-button" onClick={() => onAddActivity('revisao')}>
              + Adicionar Revisão
            </button>
            <ActivityList
              activities={activities.filter(a => a.tipo === 'revisao')}
              onDelete={onDeleteActivity}
            />
          </div>
        )}

        {activeSection === 'ipva' && (
          <div className="section-content">
            <h3>IPVA</h3>
            <p className="section-description">Pagamentos e vencimentos do IPVA</p>
            <button className="action-button" onClick={() => onAddActivity('ipva')}>
              + Registrar Pagamento
            </button>
            <ActivityList
              activities={activities.filter(a => a.tipo === 'ipva')}
              onDelete={onDeleteActivity}
            />
          </div>
        )}

        {activeSection === 'lembretes' && (
          <div className="section-content">
            <h3>Lembretes</h3>
            <p className="section-description">Configure lembretes automáticos</p>
            <button className="action-button" onClick={() => onAddActivity('lembrete')}>
              + Criar Lembrete
            </button>
            <ActivityList
              activities={activities.filter(a => a.tipo === 'lembrete')}
              onDelete={onDeleteActivity}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
