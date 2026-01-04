# Meu Xodó 🚗

**Meu Xodó** é um aplicativo de diário de atividades automotivas que ajuda você a gerenciar a manutenção do seu veículo, lavagens, lembretes e datas importantes.

## ✨ Funcionalidades

- 📝 **Registro de Veículo** - Cadastre marca, modelo e ano do seu carro
- 🎨 **Visualização 3D** - Veja seu veículo em 3D interativo
- 🔧 **Histórico de Manutenção** - Acompanhe todos os serviços realizados
- 💧 **Agenda de Lavagens** - Registre e agende lavagens
- 📅 **Calendário de Atividades** - Visualize todas as atividades em um calendário
- 🔔 **Lembretes** - Crie lembretes personalizados para seu veículo
- 💰 **Controle de IPVA** - Gerencie pagamentos de IPVA
- 🌓 **Temas** - Modo claro, escuro ou automático
- ☁️ **Sincronização** - Dados salvos localmente e sincronizados com Firebase

## 🛠️ Tecnologias

- **Frontend**: React 19 + Vite 7
- **3D**: Three.js + React Three Fiber + Drei
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Estilo**: CSS com variáveis para temas
- **Linguagem**: JavaScript (ES6+)

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Firebase (para configuração do backend)

## 🚀 Início Rápido

### 1. Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/meu-xodo.git
cd meu-xodo

# Instale as dependências
npm install
```

### 2. Configuração do Firebase

Crie um arquivo `.env` na raiz do projeto com suas credenciais Firebase:

```env
VITE_FIREBASE_API_KEY=sua_chave_api
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

Para instruções detalhadas de configuração Firebase, consulte `FIREBASE_SETUP.md`.

### 3. Modelo 3D

Baixe o modelo 3D do Chevrolet Tracker:

1. Acesse [Sketchfab - Chevy Tracker](https://sketchfab.com/3d-models/chevy-tracker-5aad1bae1d934d8c8781dc589a67c0ec)
2. Faça download no formato GLB
3. Salve em `public/models/chevy-tracker.glb`

### 4. Executar o Projeto

```bash
# Ambiente de desenvolvimento
npm run dev

# O aplicativo estará disponível em http://localhost:5173
```

## 📦 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa verificação de código
```

## 📁 Estrutura do Projeto

```
meu-xodo/
├── src/
│   ├── components/         # Componentes React
│   │   ├── Landing.jsx     # Página inicial
│   │   ├── VehicleSelection.jsx
│   │   ├── CarViewer3D.jsx # Visualizador 3D
│   │   ├── Sidebar.jsx
│   │   ├── ActivityModal.jsx
│   │   ├── ActivityList.jsx
│   │   ├── Calendar.jsx
│   │   └── ThemeSelector.jsx
│   ├── firebase/           # Configuração Firebase
│   │   └── config.js
│   ├── services/           # Serviços da aplicação
│   │   └── sessionService.js
│   ├── App.jsx             # Componente principal
│   ├── App.css             # Estilos globais
│   └── main.jsx            # Ponto de entrada
├── public/
│   ├── models/             # Modelos 3D (.glb)
│   └── logo.svg
├── CLAUDE.md               # Instruções para Claude Code
├── FIREBASE_SETUP.md       # Setup do Firebase
├── CHANGELOG.md            # Histórico de mudanças
└── package.json
```

## 🎯 Tipos de Atividades

1. **Manutenções** - Registre reparos, trocas de óleo, filtros, etc.
2. **Lavagens** - Controle o histórico de lavagens
3. **Revisões** - Agende e acompanhe revisões periódicas
4. **IPVA** - Gerencie pagamentos de IPVA por ano e parcela
5. **Lembretes** - Crie lembretes personalizados

Cada atividade pode incluir:
- Data
- Descrição
- Valor (R$)
- Quilometragem (para manutenções/revisões)
- Observações

## 💾 Armazenamento de Dados

O aplicativo utiliza uma estratégia de armazenamento dupla:

- **Primary**: localStorage (acesso imediato e suporte offline)
- **Secondary**: Firebase Firestore (backup e sincronização multi-dispositivo)

Os dados são automaticamente sincronizados entre localStorage e Firebase.

## 🎨 Design

O design segue os princípios da Apple, com foco em:
- Interface limpa e minimalista
- Usabilidade e clareza
- Experiência do usuário intuitiva
- Todos os textos em português brasileiro

Referência de design: [Apple iPhone 17](https://www.apple.com/br/iphone-17/)

## 🔐 Segurança

- Autenticação Firebase com sessões anônimas
- Regras de segurança Firestore para proteção de dados
- Validação de entrada do usuário
- Proteção contra vulnerabilidades comuns (XSS, SQL Injection via NoSQL)

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões e feedback são bem-vindos!

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto para fins educacionais.

**Nota sobre o modelo 3D**: O modelo do Chevrolet Tracker é fornecido sob a licença Creative Commons Attribution-NonCommercial-ShareAlike da Sketchfab.

## 📞 Contato

Para dúvidas ou sugestões, abra uma issue no GitHub.

---

Desenvolvido com ❤️ usando React, Firebase e Three.js
