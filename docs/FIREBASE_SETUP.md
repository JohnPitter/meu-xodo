# Configuracao do Firebase

Guia completo para configurar o Firebase no projeto Meu Xodo.

---

## 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto" ou "Create a project"
3. Digite o nome do projeto: "meu-xodo" (ou o nome que preferir)
4. Siga os passos de configuracao (pode desabilitar Google Analytics se quiser)

---

## 2. Configurar Autenticacao Anonima

1. No console do Firebase, va para **Authentication** (Autenticacao)
2. Clique na aba **Sign-in method** (Metodo de login)
3. Ative o metodo **Anonymous** (Anonimo)
4. Clique em "Salvar"

---

## 3. Configurar Firestore Database

1. No console do Firebase, va para **Firestore Database**
2. Clique em "Criar banco de dados"
3. Escolha o modo:
   - **Modo de producao** (recomendado para producao)
   - **Modo de teste** (permite leitura/escrita por 30 dias - util para desenvolvimento)
4. Escolha a localizacao do servidor (recomendado: southamerica-east1 - Sao Paulo)
5. Clique em "Ativar"

### Regras de Seguranca

Apos criar o banco, configure as regras de seguranca:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sessions/{sessionId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null &&
                             request.auth.uid == resource.data.userId;
      allow delete: if false;
    }
  }
}
```

---

## 4. Obter Credenciais do Projeto

1. No console do Firebase, clique no icone de engrenagem ao lado de "Visao geral do projeto"
2. Selecione "Configuracoes do projeto"
3. Role ate a secao "Seus aplicativos"
4. Clique no icone `</>` para adicionar um app web
5. Digite um nome para o app (ex: "Meu Xodo Web")
6. **NAO** marque "Configurar o Firebase Hosting"
7. Clique em "Registrar app"
8. Copie as credenciais do `firebaseConfig`

---

## 5. Configurar Variaveis de Ambiente

```bash
cp .env.example .env
```

Adicione as credenciais do Firebase no arquivo `.env`:

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

**IMPORTANTE**: Adicione `.env` ao `.gitignore` para nao commitar suas credenciais.

---

## 6. Testar a Configuracao

1. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

2. Acesse a aplicacao no navegador
3. Clique em "Iniciar Jornada" na pagina inicial
4. Verifique no console do navegador se ha logs de "Session created"
5. Verifique no Firebase Console se uma nova sessao foi criada na colecao `sessions`

---

## Estrutura dos Dados no Firestore

### Colecao: sessions

Cada documento de sessao contem:

| Campo | Tipo | Descricao |
|-------|------|-----------|
| `userId` | string | ID do usuario anonimo do Firebase Auth |
| `createdAt` | timestamp | Quando a sessao foi criada |
| `lastActivity` | timestamp | Ultima atividade |
| `isActive` | boolean | Se a sessao esta ativa |
| `vehicle` | object | Dados do veiculo (marca, modelo, ano) |
| `activities` | array | Array de atividades |

---

## Solucao de Problemas

| Erro | Solucao |
|------|---------|
| `Firebase: Error (auth/configuration-not-found)` | Verifique se o `.env` existe e esta preenchido. Reinicie o servidor. |
| `Missing or insufficient permissions` | Verifique as regras de seguranca e a autenticacao anonima. |
| Sessao nao esta sendo criada | Abra DevTools (F12) e verifique o console e a aba Network. |
