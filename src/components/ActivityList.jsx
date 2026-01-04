import './ActivityList.css';

export default function ActivityList({ activities, onDelete }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!activities || activities.length === 0) {
    return <p className="empty-state">Nenhum registro encontrado</p>;
  }

  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div className="activity-header">
            <div className="activity-main">
              <h4>{activity.descricao || (activity.ano ? `IPVA ${activity.ano}` : 'Sem descrição')}</h4>
              <span className="activity-date">{formatDate(activity.data)}</span>
            </div>
            <button
              className="delete-button"
              onClick={() => onDelete(activity.id)}
              title="Excluir"
            >
              🗑️
            </button>
          </div>

          <div className="activity-details">
            {activity.valor && (
              <div className="detail-item">
                <span className="detail-label">Valor:</span>
                <span className="detail-value">{formatCurrency(activity.valor)}</span>
              </div>
            )}

            {activity.km && (
              <div className="detail-item">
                <span className="detail-label">KM:</span>
                <span className="detail-value">{Number(activity.km).toLocaleString('pt-BR')} km</span>
              </div>
            )}

            {activity.parcela && activity.parcela !== '1' && (
              <div className="detail-item">
                <span className="detail-label">Parcela:</span>
                <span className="detail-value">
                  {activity.parcela === '2' ? '1ª Parcela' :
                   activity.parcela === '3' ? '2ª Parcela' :
                   activity.parcela === '4' ? '3ª Parcela' : 'Cota única'}
                </span>
              </div>
            )}

            {activity.vencimento && (
              <div className="detail-item">
                <span className="detail-label">Vencimento:</span>
                <span className="detail-value">{formatDate(activity.vencimento)}</span>
              </div>
            )}

            {activity.observacoes && (
              <div className="activity-notes">
                <p>{activity.observacoes}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
