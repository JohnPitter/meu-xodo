import { useState } from 'react';
import './VehicleSelection.css';

const MARCAS = [
  'Chevrolet', 'Fiat', 'Ford', 'Honda', 'Hyundai',
  'Jeep', 'Nissan', 'Peugeot', 'Renault', 'Toyota',
  'Volkswagen', 'Outra'
];

const MODELOS_POR_MARCA = {
  'Chevrolet': ['Onix', 'Tracker', 'S10', 'Spin', 'Cruze', 'Outro'],
  'Fiat': ['Argo', 'Mobi', 'Pulse', 'Toro', 'Strada', 'Outro'],
  'Ford': ['Ka', 'EcoSport', 'Ranger', 'Territory', 'Outro'],
  'Honda': ['Civic', 'City', 'HR-V', 'CR-V', 'Fit', 'Outro'],
  'Hyundai': ['HB20', 'Creta', 'Tucson', 'ix35', 'Outro'],
  'Jeep': ['Renegade', 'Compass', 'Commander', 'Outro'],
  'Nissan': ['Kicks', 'Versa', 'Frontier', 'Sentra', 'Outro'],
  'Peugeot': ['208', '2008', '3008', 'Outro'],
  'Renault': ['Kwid', 'Sandero', 'Duster', 'Captur', 'Outro'],
  'Toyota': ['Corolla', 'Hilux', 'Yaris', 'SW4', 'Outro'],
  'Volkswagen': ['Gol', 'Polo', 'T-Cross', 'Tiguan', 'Amarok', 'Outro'],
  'Outra': ['Outro']
};

const ANOS_DISPONIVEIS = Array.from(
  { length: 30 },
  (_, i) => new Date().getFullYear() - i
);

export default function VehicleSelection({ onComplete }) {
  const [step, setStep] = useState(1);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [modeloCustom, setModeloCustom] = useState('');

  const handleMarcaSelect = (selectedMarca) => {
    setMarca(selectedMarca);
    setModelo('');
    setStep(2);
  };

  const handleModeloSelect = (selectedModelo) => {
    setModelo(selectedModelo);
    setStep(3);
  };

  const handleAnoSelect = (selectedAno) => {
    setAno(selectedAno);
    const finalModelo = modelo === 'Outro' ? modeloCustom : modelo;
    onComplete({ marca, modelo: finalModelo, ano: selectedAno });
  };

  const modelos = MODELOS_POR_MARCA[marca] || [];

  return (
    <div className="vehicle-selection">
      <div className="selection-container">
        <div className="selection-header">
          <img src="/logo.svg" alt="Meu Xodó Logo" className="selection-logo" />
          <h1>Meu Xodó</h1>
          <p className="selection-subtitle">Configure seu veículo</p>
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>
        </div>

        {step === 1 && (
          <div className="selection-content">
            <h2>Qual a marca do seu carro?</h2>
            <div className="options-grid">
              {MARCAS.map((m) => (
                <button
                  key={m}
                  className="option-button"
                  onClick={() => handleMarcaSelect(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="selection-content">
            <h2>Qual o modelo?</h2>
            <button className="back-button" onClick={() => setStep(1)}>
              ← Voltar
            </button>
            <div className="options-grid">
              {modelos.map((m) => (
                <button
                  key={m}
                  className="option-button"
                  onClick={() => handleModeloSelect(m)}
                >
                  {m}
                </button>
              ))}
            </div>
            {modelo === 'Outro' && (
              <div className="custom-input">
                <input
                  type="text"
                  placeholder="Digite o modelo do seu carro"
                  value={modeloCustom}
                  onChange={(e) => setModeloCustom(e.target.value)}
                  autoFocus
                />
                <button
                  className="continue-button"
                  onClick={() => setStep(3)}
                  disabled={!modeloCustom.trim()}
                >
                  Continuar
                </button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="selection-content">
            <h2>Qual o ano?</h2>
            <button className="back-button" onClick={() => setStep(2)}>
              ← Voltar
            </button>
            <div className="options-grid years-grid">
              {ANOS_DISPONIVEIS.map((a) => (
                <button
                  key={a}
                  className="option-button"
                  onClick={() => handleAnoSelect(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
