import ThemeSelector from './ThemeSelector';
import './Landing.css';

export default function Landing({ onStartJourney }) {
  return (
    <div className="landing">
      {/* Animated Background Elements */}
      <div className="bg-decoration">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      {/* Theme Selector in Top Right */}
      <div className="landing-theme-selector">
        <ThemeSelector />
      </div>

      <div className="landing-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span className="badge-text">Novo</span>
          </div>

          <div className="hero-logo-wrapper">
            <div className="hero-logo-glow"></div>
            <img src="/logo.svg" alt="Meu Xodó Logo" className="hero-logo" />
          </div>

          <h1 className="hero-title">
            Meu Xodó
            <span className="hero-title-accent">.</span>
          </h1>

          <p className="hero-subtitle">O diário digital do seu carro</p>

          <p className="hero-description">
            Mantenha o histórico completo de manutenções, lavagens, revisões e IPVA
            do seu veículo em um só lugar. Simples, bonito e eficiente.
          </p>

          <div className="hero-cta-group">
            <button className="cta-button cta-button-primary" onClick={onStartJourney}>
              <span className="cta-button-text">Iniciar Jornada</span>
              <span className="cta-button-icon">→</span>
            </button>
            <button className="cta-button cta-button-outline" onClick={() => {
              document.querySelector('.features').scrollIntoView({ behavior: 'smooth' });
            }}>
              <span className="cta-button-text">Saiba Mais</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Gratuito</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Anúncios</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">∞</div>
              <div className="stat-label">Carros</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="features-header">
            <span className="features-label">Recursos</span>
            <h2 className="features-title">Tudo que você precisa para cuidar do seu carro</h2>
            <p className="features-description">
              Ferramentas completas para manter o histórico e a saúde do seu veículo
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card feature-card-highlight">
              <div className="feature-card-header">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🔧</div>
                </div>
                <div className="feature-badge">Popular</div>
              </div>
              <h3>Manutenções</h3>
              <p>Registre todas as manutenções do seu veículo com detalhes de valor, data e quilometragem.</p>
              <ul className="feature-list">
                <li>Histórico completo</li>
                <li>Controle de custos</li>
                <li>Acompanhamento de km</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-card-header">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">💧</div>
                </div>
              </div>
              <h3>Lavagens</h3>
              <p>Acompanhe o histórico de lavagens e mantenha seu carro sempre impecável.</p>
              <ul className="feature-list">
                <li>Registro rápido</li>
                <li>Controle de gastos</li>
                <li>Lembretes personalizados</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-card-header">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">✅</div>
                </div>
              </div>
              <h3>Revisões</h3>
              <p>Nunca mais perca o prazo das revisões programadas do seu veículo.</p>
              <ul className="feature-list">
                <li>Agendamento fácil</li>
                <li>Notificações automáticas</li>
                <li>Histórico detalhado</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-card-header">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🚗</div>
                </div>
              </div>
              <h3>IPVA</h3>
              <p>Controle os pagamentos do IPVA e receba lembretes para não perder prazos.</p>
              <ul className="feature-list">
                <li>Controle de parcelas</li>
                <li>Alertas de vencimento</li>
                <li>Histórico anual</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-card-header">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">📅</div>
                </div>
              </div>
              <h3>Calendário</h3>
              <p>Visualize todas as atividades do seu carro em um calendário intuitivo.</p>
              <ul className="feature-list">
                <li>Visão mensal</li>
                <li>Indicadores visuais</li>
                <li>Navegação rápida</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-card-header">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🎨</div>
                </div>
              </div>
              <h3>Temas</h3>
              <p>Escolha entre tema claro, escuro ou deixe seguir o sistema.</p>
              <ul className="feature-list">
                <li>Modo claro/escuro</li>
                <li>Automático</li>
                <li>Personalização</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <div className="cta-icon">🚀</div>
            <h2>Pronto para cuidar do seu xodó?</h2>
            <p>Comece agora e nunca mais esqueça de cuidar do seu veículo</p>
            <button className="cta-button cta-button-large" onClick={onStartJourney}>
              <span className="cta-button-text">Começar Agora - É Grátis</span>
              <span className="cta-button-icon">→</span>
            </button>
            <p className="cta-note">Sem necessidade de cadastro • 100% gratuito</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="/logo.svg" alt="Meu Xodó" className="footer-logo" />
              <p className="footer-tagline">Cuide do que você ama ❤️</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Recursos</h4>
                <ul>
                  <li>Manutenções</li>
                  <li>Lavagens</li>
                  <li>Revisões</li>
                  <li>IPVA</li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Suporte</h4>
                <ul>
                  <li>Central de Ajuda</li>
                  <li>Contato</li>
                  <li>FAQ</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Meu Xodó © 2026 - Todos os direitos reservados</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
