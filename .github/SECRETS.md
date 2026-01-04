# GitHub Secrets Configuration

Este documento descreve os secrets necessários para configurar os workflows CI/CD do projeto.

## Secrets Necessários

Para que os workflows funcionem corretamente, você precisa configurar os seguintes secrets no GitHub:

### Firebase Configuration Secrets

Estes secrets contêm as configurações do Firebase que são usadas para build e deploy:

1. **VITE_FIREBASE_API_KEY**
   - Chave da API do Firebase
   - Encontrada em: Firebase Console > Project Settings > General

2. **VITE_FIREBASE_AUTH_DOMAIN**
   - Domínio de autenticação do Firebase
   - Formato: `seu-projeto.firebaseapp.com`

3. **VITE_FIREBASE_PROJECT_ID**
   - ID do projeto Firebase
   - Encontrado em: Firebase Console > Project Settings > General

4. **VITE_FIREBASE_STORAGE_BUCKET**
   - Bucket de storage do Firebase
   - Formato: `seu-projeto.appspot.com`

5. **VITE_FIREBASE_MESSAGING_SENDER_ID**
   - ID do sender para mensagens
   - Encontrado em: Firebase Console > Project Settings > Cloud Messaging

6. **VITE_FIREBASE_APP_ID**
   - ID da aplicação Firebase
   - Encontrado em: Firebase Console > Project Settings > General

### Firebase Deployment Secret

7. **FIREBASE_SERVICE_ACCOUNT**
   - Service Account JSON do Firebase para deploy
   - Como obter:
     1. Acesse Firebase Console > Project Settings > Service Accounts
     2. Clique em "Generate New Private Key"
     3. Salve o JSON completo como secret (todo o conteúdo do arquivo)

### Optional Security Secrets

8. **SEMGREP_APP_TOKEN** (Opcional)
   - Token para Semgrep Cloud (análise SAST avançada)
   - Como obter: https://semgrep.dev/
   - Pode ser removido do workflow se não utilizar

## Como Adicionar Secrets no GitHub

1. Acesse seu repositório no GitHub
2. Vá em **Settings** > **Secrets and variables** > **Actions**
3. Clique em **New repository secret**
4. Adicione o nome do secret e o valor
5. Clique em **Add secret**

## Exemplo de Configuração

### Para obter as credenciais Firebase:

```bash
# 1. Acesse o Firebase Console
https://console.firebase.google.com/

# 2. Selecione seu projeto

# 3. Vá em Project Settings (⚙️ ícone de engrenagem)

# 4. Na aba "General", role até "Your apps"

# 5. Copie os valores de configuração do Firebase
```

### Para obter o Service Account:

```bash
# 1. No Firebase Console, vá em Project Settings > Service Accounts

# 2. Clique em "Generate New Private Key"

# 3. Confirme e faça download do arquivo JSON

# 4. Copie TODO o conteúdo do arquivo JSON

# 5. Cole no GitHub Secret FIREBASE_SERVICE_ACCOUNT
```

## Verificação

Após adicionar todos os secrets, você pode verificar se estão corretos:

1. Vá em **Actions** no seu repositório
2. Execute manualmente um workflow (se disponível)
3. Verifique os logs para ver se há erros relacionados a secrets

## Segurança

**IMPORTANTE:**
- Nunca commite arquivos `.env` ou secrets diretamente no repositório
- Os secrets são encriptados pelo GitHub e não podem ser visualizados depois de adicionados
- Apenas pessoas com acesso de admin/write ao repositório podem adicionar/editar secrets
- Secrets são mascarados nos logs dos workflows

## Workflows que Usam Secrets

- **build.yml**: Usa secrets do Firebase para criar o arquivo `.env` durante o build
- **deploy.yml**: Usa todos os secrets Firebase + FIREBASE_SERVICE_ACCOUNT para deploy
- **security.yml**: Opcionalmente usa SEMGREP_APP_TOKEN

## Troubleshooting

### Build falha com "env variable undefined"
- Verifique se todos os secrets VITE_FIREBASE_* foram adicionados
- Confirme que os nomes dos secrets estão corretos (case-sensitive)

### Deploy falha com "permission denied"
- Verifique se FIREBASE_SERVICE_ACCOUNT contém o JSON completo
- Confirme que o service account tem permissões de deploy no Firebase

### Security scan falha
- SEMGREP_APP_TOKEN é opcional - você pode remover essa etapa do workflow
- Ou crie uma conta gratuita no Semgrep para obter um token
