# GitHub Workflows

Este diretório contém os workflows de CI/CD para o projeto Meu Xodó.

## Workflows Disponíveis

### 🔨 Build (`build.yml`)

Executa o build da aplicação e validações de código.

**Triggers:**
- Push para branches `main` e `develop`
- Pull requests para branches `main` e `develop`

**Etapas:**
1. Checkout do código
2. Setup do Node.js (versões 18.x e 20.x)
3. Instalação de dependências
4. Lint do código
5. Criação do arquivo `.env` com secrets
6. Build da aplicação
7. Upload dos artifacts de build
8. Análise do tamanho do build

**Matriz de Testes:**
- Node.js 18.x
- Node.js 20.x

### 🔒 Security Scan (`security.yml`)

Executa múltiplas verificações de segurança no código e dependências.

**Triggers:**
- Push para branches `main` e `develop`
- Pull requests para branches `main` e `develop`
- Schedule: Toda segunda-feira às 00:00 UTC

**Jobs:**

#### 1. Dependency Check
- Executa `npm audit` para verificar vulnerabilidades em dependências
- Verifica pacotes desatualizados

#### 2. Code Scanning (CodeQL)
- Análise estática de código usando CodeQL da GitHub
- Detecta vulnerabilidades de segurança e problemas de qualidade
- Queries: security-extended, security-and-quality

#### 3. Secret Scanning (TruffleHog)
- Verifica se há secrets/credenciais commitadas no código
- Analisa todo o histórico do repositório
- Apenas secrets verificados são reportados

#### 4. SAST Scan (Semgrep)
- Static Application Security Testing
- Análise avançada de padrões de código inseguro
- Requer token opcional: `SEMGREP_APP_TOKEN`

#### 5. License Check
- Verifica compatibilidade de licenças das dependências
- Licenças permitidas: MIT, Apache-2.0, BSD-2/3-Clause, ISC, CC0-1.0, Unlicense

### 🚀 Deploy (`deploy.yml`)

Faz deploy da aplicação no Firebase Hosting.

**Triggers:**
- Push para branch `main` (deploy para produção)
- Pull requests (deploy de preview)
- Manualmente via `workflow_dispatch`

**Jobs:**

#### 1. Deploy (Produção)
- Executa apenas em push para `main`
- Build da aplicação com variáveis de ambiente
- Deploy para Firebase Hosting (canal live)

#### 2. Deploy Preview
- Executa em pull requests
- Cria preview temporário (expira em 7 dias)
- Adiciona comentário no PR com URL do preview

## Secrets Necessários

Consulte [SECRETS.md](./SECRETS.md) para instruções detalhadas sobre como configurar os secrets.

**Secrets obrigatórios:**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT`

**Secrets opcionais:**
- `SEMGREP_APP_TOKEN` (para análise SAST avançada)

## Badges de Status

Você pode adicionar badges ao README principal:

```markdown
![Build](https://github.com/JohnPitter/meu-xodo/workflows/Build/badge.svg)
![Security](https://github.com/JohnPitter/meu-xodo/workflows/Security%20Scan/badge.svg)
![Deploy](https://github.com/JohnPitter/meu-xodo/workflows/Deploy%20to%20Firebase/badge.svg)
```

## Fluxo de CI/CD

```
┌─────────────────┐
│   Push/PR       │
└────────┬────────┘
         │
         ├──────────────────┬──────────────────┐
         │                  │                  │
         ▼                  ▼                  ▼
    ┌────────┐       ┌──────────┐      ┌──────────┐
    │ Build  │       │ Security │      │  Deploy  │
    │        │       │   Scan   │      │ Preview  │
    └────┬───┘       └────┬─────┘      └──────────┘
         │                │
         └────────┬───────┘
                  │
                  ▼
         ┌────────────────┐
         │ All checks pass│
         └────────┬───────┘
                  │
                  ▼ (only on main)
         ┌────────────────┐
         │Deploy Production│
         └────────────────┘
```

## Desenvolvimento Local

Para testar os workflows localmente, você pode usar [act](https://github.com/nektos/act):

```bash
# Instalar act
# macOS
brew install act

# Windows
choco install act-cli

# Executar workflow de build localmente
act -j build

# Executar workflow de security localmente
act -j dependency-check
```

## Manutenção

### Atualizando Versões de Actions

Mantenha as actions atualizadas para receber correções de segurança:

```bash
# Verificar versões disponíveis
gh api repos/actions/checkout/releases/latest

# Atualizar nos arquivos .yml
uses: actions/checkout@v4  # Sempre use @v4 ou superior
uses: actions/setup-node@v4
```

### Monitoramento

- Verifique regularmente a aba **Actions** no GitHub
- Configure notificações para falhas de workflow
- Revise logs de security scans semanalmente

## Troubleshooting

### Build falha
1. Verifique se todos os secrets estão configurados
2. Confirme que o código passa no lint localmente
3. Teste o build localmente: `npm run build`

### Security scan reporta falsos positivos
1. Revise o log detalhado do scan
2. Adicione exceções se necessário (com justificativa)
3. Atualize dependências vulneráveis

### Deploy falha
1. Verifique se `FIREBASE_SERVICE_ACCOUNT` está correto
2. Confirme permissões no Firebase Console
3. Teste deploy local: `firebase deploy`

## Recursos Adicionais

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase Hosting GitHub Action](https://github.com/FirebaseExtended/action-hosting-deploy)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [Semgrep Rules](https://semgrep.dev/explore)
