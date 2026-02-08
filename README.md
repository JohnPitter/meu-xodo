# Meu Xodo

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?style=for-the-badge&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=for-the-badge&logo=firebase)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=threedotjs)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)

**Diario de Atividades Automotivas**

*Gerencie manutencao, lavagens, lembretes e datas importantes do seu veiculo*

[Features](#features) •
[Instalacao](#instalacao) •
[Tecnologias](#tecnologias) •
[Documentacao](#documentacao)

</div>

---

## Overview

Meu Xodo e um aplicativo de diario de atividades automotivas que ajuda voce a gerenciar a manutencao do seu veiculo, lavagens, lembretes e datas importantes. Com uma interface inspirada nos principios de design da Apple, o aplicativo oferece uma experiencia limpa e intuitiva, incluindo visualizacao 3D do veiculo.

---

## Features

| Feature | Descricao |
|---------|-----------|
| **Registro de Veiculo** | Cadastre marca, modelo e ano do seu carro |
| **Visualizacao 3D** | Veja seu veiculo em 3D interativo |
| **Historico de Manutencao** | Acompanhe todos os servicos realizados |
| **Agenda de Lavagens** | Registre e agende lavagens |
| **Calendario de Atividades** | Visualize todas as atividades em um calendario |
| **Lembretes** | Crie lembretes personalizados para seu veiculo |
| **Controle de IPVA** | Gerencie pagamentos de IPVA |
| **Temas** | Modo claro, escuro ou automatico |
| **Sincronizacao** | Dados salvos localmente e sincronizados com Firebase |

---

## Instalacao

### Requisitos

| Requisito | Versao |
|-----------|--------|
| Node.js | 18+ |
| npm | 9+ |
| Firebase | Conta gratuita |

### Quick Start

```bash
# Clone o repositorio
git clone https://github.com/JohnPitter/meu-xodo.git
cd meu-xodo

# Instale as dependencias
npm install

# Copie as variaveis de ambiente
cp .env.example .env

# Configure o .env com suas credenciais Firebase
# Veja docs/FIREBASE_SETUP.md para instrucoes detalhadas

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### Modelo 3D

O aplicativo utiliza um modelo 3D do Chevrolet Tracker:

1. Acesse [Sketchfab - Chevy Tracker](https://sketchfab.com/3d-models/chevy-tracker-5aad1bae1d934d8c8781dc589a67c0ec)
2. Faca download no formato GLB
3. Salve em `public/models/chevy-tracker.glb`

---

## Scripts

| Script | Descricao |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de producao |
| `npm run preview` | Preview do build de producao |
| `npm run lint` | Executa verificacao de codigo |

---

## Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| **Frontend** | React 19 + Vite 7 |
| **3D** | Three.js + React Three Fiber + Drei |
| **Backend** | Firebase (Firestore, Authentication, Storage) |
| **Estilo** | CSS com variaveis para temas |
| **Linguagem** | JavaScript (ES6+) |

---

## Arquitetura

### Tipos de Atividades

| Tipo | Descricao |
|------|-----------|
| **Manutencoes** | Reparos, trocas de oleo, filtros, etc. |
| **Lavagens** | Historico e agendamento de lavagens |
| **Revisoes** | Revisoes periodicas do veiculo |
| **IPVA** | Pagamentos de IPVA por ano e parcela |
| **Lembretes** | Lembretes personalizados |

Cada atividade pode incluir: data, descricao, valor (R$), quilometragem (para manutencoes/revisoes) e observacoes.

### Estrutura do Projeto

```
meu-xodo/
├── src/
│   ├── components/         # Componentes React
│   │   ├── Landing.jsx     # Pagina inicial
│   │   ├── VehicleSelection.jsx
│   │   ├── CarViewer3D.jsx # Visualizador 3D
│   │   ├── Sidebar.jsx
│   │   ├── ActivityModal.jsx
│   │   ├── ActivityList.jsx
│   │   ├── Calendar.jsx
│   │   └── ThemeSelector.jsx
│   ├── firebase/           # Configuracao Firebase
│   ├── services/           # Servicos da aplicacao
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Ponto de entrada
├── public/
│   └── models/             # Modelos 3D (.glb)
└── package.json
```

---

## Armazenamento

O aplicativo utiliza uma estrategia de armazenamento dupla:

| Camada | Tecnologia | Finalidade |
|--------|------------|------------|
| **Primaria** | localStorage | Acesso imediato e suporte offline |
| **Secundaria** | Firebase Firestore | Backup e sincronizacao multi-dispositivo |

Os dados sao automaticamente sincronizados entre localStorage e Firebase. A autenticacao utiliza sessoes anonimas do Firebase Authentication.

---

## Documentacao

| Documento | Descricao |
|-----------|-----------|
| [FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md) | Configuracao completa do Firebase |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Documentacao da arquitetura do projeto |

---

## License

Este projeto e de codigo aberto para fins educacionais.

**Nota sobre o modelo 3D**: O modelo do Chevrolet Tracker e fornecido sob a licenca Creative Commons Attribution-NonCommercial-ShareAlike da Sketchfab.

---

## Contributing

Este e um projeto pessoal, mas sugestoes e feedback sao bem-vindos!

1. Faca um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudancas (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## Support

- **Issues:** [GitHub Issues](https://github.com/JohnPitter/meu-xodo/issues)
- **Contato:** Abra uma issue no GitHub para duvidas ou sugestoes
