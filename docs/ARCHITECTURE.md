# Arquitetura

Documentacao da arquitetura do projeto Meu Xodo.

---

## Visao Geral

Meu Xodo e um aplicativo de diario de atividades automotivas construido com React 19, Vite 7, Firebase e Three.js. A aplicacao segue uma arquitetura frontend-first com backend serverless (Firebase).

---

## Estrutura do Projeto

```
meu-xodo/
├── src/
│   ├── components/         # Componentes React
│   │   ├── Landing.jsx     # Pagina inicial
│   │   ├── VehicleSelection.jsx  # Selecao de veiculo
│   │   ├── CarViewer3D.jsx # Visualizador 3D (Three.js)
│   │   ├── Sidebar.jsx     # Menu lateral
│   │   ├── ActivityModal.jsx  # Modal de atividades
│   │   ├── ActivityList.jsx   # Lista de atividades
│   │   ├── Calendar.jsx    # Calendario
│   │   └── ThemeSelector.jsx  # Seletor de tema
│   ├── firebase/           # Configuracao Firebase
│   │   └── config.js       # Inicializacao do Firebase
│   ├── services/           # Servicos da aplicacao
│   │   └── sessionService.js  # Gerenciamento de sessoes
│   ├── App.jsx             # Componente principal
│   ├── App.css             # Estilos globais
│   └── main.jsx            # Ponto de entrada
├── public/
│   ├── models/             # Modelos 3D (.glb)
│   └── logo.svg
└── package.json
```

---

## Camadas da Aplicacao

### Componentes (UI)

Os componentes React gerenciam a interface do usuario. O fluxo principal e:

1. **Landing** - Pagina inicial com apresentacao
2. **VehicleSelection** - Cadastro do veiculo (marca, modelo, ano)
3. **CarViewer3D** - Visualizacao 3D interativa do veiculo
4. **Sidebar** - Navegacao entre secoes
5. **ActivityModal** - Criacao/edicao de atividades
6. **ActivityList** - Listagem e filtragem de atividades
7. **Calendar** - Visualizacao em calendario

### Servicos

| Servico | Responsabilidade |
|---------|-----------------|
| `sessionService` | Gerenciamento de sessoes de usuario |
| `firebase/config` | Inicializacao e configuracao do Firebase |

### Armazenamento

O aplicativo utiliza uma estrategia de armazenamento dupla:

| Camada | Tecnologia | Finalidade |
|--------|------------|------------|
| **Primaria** | localStorage | Acesso imediato e suporte offline |
| **Secundaria** | Firebase Firestore | Backup e sincronizacao multi-dispositivo |

Os dados sao automaticamente sincronizados entre localStorage e Firebase.

---

## Tipos de Atividades

| Tipo | Campos Especificos |
|------|--------------------|
| **Manutencao** | Data, descricao, valor, quilometragem, observacoes |
| **Lavagem** | Data, descricao, valor, observacoes |
| **Revisao** | Data, descricao, valor, quilometragem, observacoes |
| **IPVA** | Ano, parcela, valor, data de vencimento |
| **Lembrete** | Data, descricao, observacoes |

---

## Autenticacao

O aplicativo utiliza autenticacao anonima do Firebase Authentication. Cada usuario recebe um `userId` unico que e vinculado a sua sessao e dados no Firestore.

---

## Temas

O sistema de temas utiliza variaveis CSS:

| Tema | Descricao |
|------|-----------|
| **Claro** | Cores claras, fundo branco |
| **Escuro** | Cores escuras, fundo preto |
| **Automatico** | Segue a preferencia do sistema operacional |

---

## Visualizacao 3D

O componente `CarViewer3D` utiliza:
- **Three.js** - Motor de renderizacao 3D
- **React Three Fiber** - Binding React para Three.js
- **Drei** - Helpers e componentes utilitarios

O modelo 3D e carregado no formato GLB a partir de `public/models/`.

---

## Seguranca

| Recurso | Descricao |
|---------|-----------|
| Autenticacao Firebase | Sessoes anonimas seguras |
| Regras Firestore | Protecao de dados por usuario |
| Validacao de entrada | Sanitizacao de inputs do usuario |
| Protecao XSS | Prevencao contra cross-site scripting |

---

## Design

O design segue os principios da Apple, com foco em:
- Interface limpa e minimalista
- Usabilidade e clareza
- Experiencia do usuario intuitiva
- Todos os textos em portugues brasileiro
