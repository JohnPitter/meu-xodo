# Configuração do Firebase para Meu Xodó

Este documento explica como configurar o Firebase para o projeto Meu Xodó.

## Passo 1: Criar um Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto" ou "Create a project"
3. Digite o nome do projeto: "meu-xodo" (ou o nome que preferir)
4. Siga os passos de configuração (pode desabilitar Google Analytics se quiser)

## Passo 2: Configurar Autenticação Anônima

1. No console do Firebase, vá para **Authentication** (Autenticação)
2. Clique na aba **Sign-in method** (Método de login)
3. Ative o método **Anonymous** (Anônimo)
4. Clique em "Salvar"

## Passo 3: Configurar Firestore Database

1. No console do Firebase, vá para **Firestore Database**
2. Clique em "Criar banco de dados"
3. Escolha o modo:
   - **Modo de produção** (recomendado para produção)
   - **Modo de teste** (permite leitura/escrita por 30 dias - útil para desenvolvimento)
4. Escolha a localização do servidor (recomendado: southamerica-east1 - São Paulo)
5. Clique em "Ativar"

### Configurar Regras de Segurança (Importante!)

Após criar o banco, configure as regras de segurança:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para a coleção de sessões
    match /sessions/{sessionId} {
      // Permitir criação de novas sessões
      allow create: if request.auth != null;

      // Permitir leitura e escrita apenas para o dono da sessão
      allow read, update: if request.auth != null &&
                             request.auth.uid == resource.data.userId;

      // Não permitir deleção
      allow delete: if false;
    }
  }
}
```

## Passo 4: Obter Credenciais do Projeto

1. No console do Firebase, clique no ícone de engrenagem ⚙️ ao lado de "Visão geral do projeto"
2. Selecione "Configurações do projeto"
3. Role até a seção "Seus aplicativos"
4. Clique no ícone **</>** para adicionar um app web
5. Digite um nome para o app (ex: "Meu Xodó Web")
6. **NÃO** marque "Configurar o Firebase Hosting"
7. Clique em "Registrar app"
8. Copie as credenciais do `firebaseConfig`

## Passo 5: Configurar Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto (copie do `.env.example`):

```bash
cp .env.example .env
```

2. Adicione as credenciais do Firebase no arquivo `.env`:

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

3. **IMPORTANTE**: Adicione `.env` ao `.gitignore` para não commitar suas credenciais!

## Passo 6: Testar a Configuração

1. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

2. Acesse a aplicação no navegador
3. Clique em "Iniciar Jornada" na página inicial
4. Verifique no console do navegador se há logs de "Session created"
5. Verifique no Firebase Console > Firestore Database se uma nova sessão foi criada na coleção `sessions`

## Estrutura dos Dados no Firestore

### Coleção: `sessions`

Cada documento de sessão contém:

```javascript
{
  userId: "string",           // ID do usuário anônimo do Firebase Auth
  createdAt: timestamp,        // Quando a sessão foi criada
  lastActivity: timestamp,     // Última atividade
  isActive: boolean,           // Se a sessão está ativa
  vehicle: {                   // Dados do veículo (null inicialmente)
    marca: "string",
    modelo: "string",
    ano: number
  },
  activities: [                // Array de atividades
    {
      id: "string",
      tipo: "string",          // manutencao, lavagem, revisao, ipva, lembrete
      data: "string",
      valor: number,
      descricao: "string",
      // ... outros campos específicos do tipo
    }
  ]
}
```

## Solução de Problemas

### Erro: "Firebase: Error (auth/configuration-not-found)"

- Verifique se o arquivo `.env` existe e está na raiz do projeto
- Verifique se todas as variáveis `VITE_FIREBASE_*` estão preenchidas
- Reinicie o servidor de desenvolvimento após criar/editar o `.env`

### Erro: "Missing or insufficient permissions"

- Verifique as regras de segurança do Firestore
- Certifique-se de que a autenticação anônima está ativada

### Sessão não está sendo criada

- Abra o DevTools (F12) e veja o console para erros
- Verifique a aba Network para ver se há requisições falhando
- Certifique-se de que o Firebase está configurado corretamente

## Próximos Passos

Após configurar o Firebase, você pode:

1. Implementar sincronização em tempo real (opcional)
2. Adicionar exportação de dados
3. Implementar backup automático
4. Adicionar analytics para entender o uso da aplicação

## Recursos Úteis

- [Documentação do Firebase](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
