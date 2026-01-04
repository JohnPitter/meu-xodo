import { useState } from 'react';
import './ActivityModal.css';

export default function ActivityModal({ type, onClose, onSave }) {
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    descricao: '',
    valor: '',
    km: '',
    observacoes: '',
    vencimento: '',
    parcela: '1'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, tipo: type, id: Date.now() });
    onClose();
  };

  const getTitulo = () => {
    const titulos = {
      manutencao: 'Nova Manutenção',
      lavagem: 'Nova Lavagem',
      revisao: 'Nova Revisão',
      ipva: 'Registrar Pagamento IPVA',
      lembrete: 'Criar Lembrete'
    };
    return titulos[type] || 'Nova Atividade';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{getTitulo()}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Data</label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>

          {type !== 'ipva' && (
            <div className="form-group">
              <label>Descrição</label>
              <input
                type="text"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder={`Ex: ${type === 'manutencao' ? 'Troca de óleo' : type === 'lavagem' ? 'Lavagem completa' : 'Revisão dos 10.000km'}`}
                required
              />
            </div>
          )}

          {type === 'ipva' && (
            <>
              <div className="form-group">
                <label>Ano do IPVA</label>
                <input
                  type="number"
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                  placeholder="2026"
                  required
                />
              </div>
              <div className="form-group">
                <label>Parcela</label>
                <select name="parcela" value={formData.parcela} onChange={handleChange}>
                  <option value="1">Cota única</option>
                  <option value="2">1ª Parcela</option>
                  <option value="3">2ª Parcela</option>
                  <option value="4">3ª Parcela</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Valor (R$)</label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              placeholder="0,00"
              step="0.01"
              min="0"
            />
          </div>

          {(type === 'manutencao' || type === 'revisao') && (
            <div className="form-group">
              <label>Quilometragem (km)</label>
              <input
                type="number"
                name="km"
                value={formData.km}
                onChange={handleChange}
                placeholder="Ex: 15000"
              />
            </div>
          )}

          {type === 'lembrete' && (
            <div className="form-group">
              <label>Data do Lembrete</label>
              <input
                type="date"
                name="vencimento"
                value={formData.vencimento}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Adicione detalhes adicionais..."
              rows="3"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
