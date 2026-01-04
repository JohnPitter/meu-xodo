# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado
- Página inicial (Landing Page) com apresentação do produto
- Sistema de autenticação Firebase com sessões anônimas
- Seleção inicial de veículo (marca, modelo e ano)
- Visualização 3D interativa do veículo usando Three.js
- Gerenciamento completo de atividades (CRUD)
- Tipos de atividades: Manutenções, Lavagens, Revisões, IPVA e Lembretes
- Visualização em calendário com indicadores de atividades
- Sistema de temas (Claro/Escuro/Sistema)
- Persistência de dados com estratégia dual (localStorage + Firebase Firestore)
- Sidebar de navegação com informações do veículo
- Modal para adicionar/editar atividades
- Suporte a campos específicos por tipo de atividade (km, valor, notas)
- Sincronização automática de dados com Firebase
- Modelo 3D do Chevrolet Tracker

### Configurado
- Vite 7 como ferramenta de build
- React 19 como framework frontend
- Firebase (Firestore, Authentication, Storage)
- React Three Fiber para renderização 3D
- Sistema de design inspirado na Apple
- Variáveis CSS para temas
- ESLint para qualidade de código

### Estrutura
- Componentes React modulares
- Serviço de sessão Firebase
- Configuração Firebase centralizada
- Armazenamento local como storage primário
- Firebase como backup e sincronização multi-dispositivo

## Notas de Desenvolvimento

### Próximas Funcionalidades Planejadas
- Sistema de notificações e lembretes
- Upload de fotos de manutenções e recibos
- Suporte a múltiplos veículos por usuário
- Estatísticas e relatórios de custos
- Exportação de dados
- PWA (Progressive Web App) para instalação mobile
- Modo offline completo
- Sincronização multi-dispositivo
- Autenticação com email/senha
- Compartilhamento de veículos entre usuários

### Modelos 3D
Atualmente o projeto inclui apenas o modelo do Chevrolet Tracker. Novos modelos serão adicionados conforme necessidade.

### Firebase
A configuração Firebase requer variáveis de ambiente (.env) para funcionar corretamente. Consulte `FIREBASE_SETUP.md` para instruções detalhadas.
