# Como Corrigir o Deploy no Vercel

## Verificações Necessárias

### 1. Verificar se o Vercel está conectado ao GitHub

1. Acesse https://vercel.com
2. Faça login
3. Vá em **Settings** > **Git**
4. Verifique se o repositório `barbozaaaa/Est-tica` está conectado

### 2. Verificar se há Deploy em Andamento

1. No painel do Vercel, clique no seu projeto
2. Vá na aba **Deployments**
3. Verifique se há algum deploy:
   - **Building** = está construindo
   - **Ready** = concluído com sucesso
   - **Error** = falhou (clique para ver o erro)

### 3. Forçar um Novo Deploy

Se não há deploy automático:

1. No painel do projeto, clique em **Deployments**
2. Clique nos **3 pontos** (⋯) no último deploy
3. Selecione **Redeploy**
4. Ou vá em **Settings** > **Git** e clique em **Redeploy**

### 4. Verificar Configurações do Projeto

No Vercel, vá em **Settings** > **General** e verifique:

- **Framework Preset**: Deve ser **Vite**
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 5. Verificar Logs de Erro

Se o deploy está falhando:

1. Clique no deploy que falhou
2. Veja a aba **Logs**
3. Procure por erros em vermelho
4. Erros comuns:
   - Variáveis de ambiente faltando (Firebase)
   - Dependências não instaladas
   - Erro de build

### 6. Verificar Variáveis de Ambiente

Se o Firebase não está configurado:

1. Vá em **Settings** > **Environment Variables**
2. Adicione as variáveis do Firebase (se necessário)
3. **IMPORTANTE**: O Firebase já está hardcoded no código, então isso pode não ser necessário

### 7. Solução Rápida: Conectar Manualmente

Se o repositório não está conectado:

1. No Vercel, clique em **Add New Project**
2. Selecione **Import Git Repository**
3. Escolha `barbozaaaa/Est-tica`
4. Configure:
   - Framework: **Vite**
   - Root Directory: `.` (raiz)
5. Clique em **Deploy**

### 8. Verificar se o GitHub está Recebendo os Pushes

1. Acesse https://github.com/barbozaaaa/Est-tica
2. Verifique se os últimos commits aparecem
3. Se não aparecem, faça um novo push:
   ```bash
   git push origin main
   ```

## Comandos Úteis

Se precisar forçar um novo deploy via terminal:

```bash
# Verificar status
git status

# Fazer um commit vazio para forçar deploy
git commit --allow-empty -m "Trigger Vercel deploy"
git push
```

## Problemas Comuns

### Deploy não inicia automaticamente
- Verifique se o webhook do GitHub está configurado no Vercel
- Tente fazer um commit vazio e push

### Build falha
- Verifique os logs no Vercel
- Teste o build localmente: `npm run build`
- Verifique se todas as dependências estão no `package.json`

### Site não atualiza
- Limpe o cache do navegador
- Aguarde alguns minutos (pode levar até 5 minutos)
- Verifique se o deploy está realmente concluído

