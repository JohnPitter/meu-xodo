# ✅ Checklist de Configuração dos Workflows

## Status da Configuração

### Secrets Configurados ✅
- [x] VITE_FIREBASE_API_KEY
- [x] VITE_FIREBASE_AUTH_DOMAIN
- [x] VITE_FIREBASE_PROJECT_ID
- [x] VITE_FIREBASE_STORAGE_BUCKET
- [x] VITE_FIREBASE_MESSAGING_SENDER_ID
- [x] VITE_FIREBASE_APP_ID
- [x] FIREBASE_SERVICE_ACCOUNT
- [ ] SEMGREP_APP_TOKEN (opcional)

### Próximos Passos

#### 1. Verificar Execução dos Workflows
Acesse a aba Actions no GitHub:
```
https://github.com/JohnPitter/meu-xodo/actions
```

Você deve ver 3 workflows executando:
- ✅ **Build**: Validação e build da aplicação
- ✅ **Security Scan**: Verificações de segurança
- ✅ **Deploy to Firebase**: Deploy no Firebase Hosting

#### 2. Monitorar os Workflows

**Se todos passarem (✅):**
- Seu código está funcionando corretamente
- Build foi gerado com sucesso
- Não há vulnerabilidades críticas
- Deploy foi realizado no Firebase

**Se algum falhar (❌):**

##### Build Workflow falhou:
```bash
# Possíveis causas:
1. Erro de lint - Execute localmente: npm run lint
2. Erro de build - Execute localmente: npm run build
3. Secrets incorretos - Verifique os valores no GitHub

# Como corrigir:
git pull
npm install
npm run lint
npm run build
# Se tudo passar localmente, o problema é nos secrets
```

##### Security Workflow falhou:
```bash
# Possíveis causas:
1. Vulnerabilidades em dependências - Execute: npm audit
2. CodeQL encontrou problemas - Revise o relatório
3. Secrets commitados - Revise o código

# Como corrigir:
npm audit fix
# Revise os alertas e corrija conforme necessário
```

##### Deploy Workflow falhou:
```bash
# Possíveis causas:
1. FIREBASE_SERVICE_ACCOUNT incorreto
2. Permissões insuficientes no Firebase
3. Projeto Firebase não configurado

# Como corrigir:
1. Gere novo service account no Firebase Console
2. Verifique permissões de deploy no Firebase
3. Confirme que firebase.json existe e está correto
```

#### 3. Configurar Firebase Hosting (Se ainda não configurado)

Se o deploy falhar por falta de configuração do Firebase Hosting:

```bash
# 1. Instalar Firebase CLI
npm install -g firebase-tools

# 2. Login no Firebase
firebase login

# 3. Inicializar Firebase Hosting
firebase init hosting

# Responda as perguntas:
# - Select project: Escolha seu projeto
# - Public directory: dist
# - Single-page app: Yes
# - GitHub deploys: No (já temos workflow)

# 4. Commit e push
git add firebase.json .firebaserc
git commit -m "Configure Firebase Hosting"
git push origin main
```

#### 4. Habilitar Recursos de Segurança (Opcional)

Para melhorar ainda mais a segurança:

##### A. Habilitar Dependabot
1. Vá em Settings > Security > Code security and analysis
2. Habilite "Dependabot alerts"
3. Habilite "Dependabot security updates"

##### B. Habilitar Branch Protection
1. Vá em Settings > Branches
2. Add rule para branch `main`
3. Configure:
   - [x] Require status checks to pass before merging
   - [x] Require branches to be up to date before merging
   - Selecione: Build, Security Scan
   - [x] Include administrators

##### C. Configurar Semgrep (Opcional)
1. Crie conta gratuita em: https://semgrep.dev/
2. Conecte seu repositório
3. Copie o token
4. Adicione secret: SEMGREP_APP_TOKEN

#### 5. Testar Deploy Preview

Crie um Pull Request para testar o deploy de preview:

```bash
# Crie uma branch de teste
git checkout -b test/preview-deploy

# Faça uma mudança simples
echo "# Test" >> TEST.md

# Commit e push
git add TEST.md
git commit -m "Test: Preview deploy"
git push origin test/preview-deploy

# Crie PR no GitHub
# O workflow vai criar um preview e comentar no PR com a URL
```

## Troubleshooting Comum

### Erro: "Resource not accessible by integration"
**Solução**: Vá em Settings > Actions > General > Workflow permissions
- Selecione: "Read and write permissions"
- [x] Allow GitHub Actions to create and approve pull requests

### Erro: "Firebase service account authentication failed"
**Solução**:
1. No Firebase Console, vá em Project Settings > Service Accounts
2. Gere nova chave privada
3. Copie TODO o conteúdo JSON
4. Atualize o secret FIREBASE_SERVICE_ACCOUNT

### Erro: "npm ERR! code ELIFECYCLE"
**Solução**: Verifique se o projeto builda localmente:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Métricas de Sucesso

Após configuração completa, você terá:

- ✅ Build automático em cada push/PR
- ✅ Testes de segurança automatizados
- ✅ Deploy automático para produção (main)
- ✅ Preview de PRs antes de merge
- ✅ Proteção contra vulnerabilidades
- ✅ Proteção contra secrets vazados
- ✅ Compliance de licenças

## Links Úteis

- [Documentação dos Workflows](.github/README.md)
- [Guia de Secrets](.github/SECRETS.md)
- [Actions do Repositório](https://github.com/JohnPitter/meu-xodo/actions)
- [Firebase Console](https://console.firebase.google.com/)

---

**Data de Configuração**: 2026-01-04
**Status**: ✅ Secrets Configurados - Aguardando primeira execução dos workflows
