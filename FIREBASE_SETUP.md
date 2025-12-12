# Configuração do Firebase

## Passo a Passo para Configurar o Firebase

### 1. Criar um Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto" ou "Create a project"
3. Digite um nome para o projeto (ex: "thaffny-website")
4. Siga as instruções para criar o projeto

### 2. Configurar o Firestore Database

1. No painel do Firebase, vá em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha o modo de produção (ou modo de teste para desenvolvimento)
4. Selecione uma localização (escolha a mais próxima do Brasil, ex: `southamerica-east1`)
5. Clique em **Ativar**

### 3. Configurar as Regras de Segurança do Firestore

1. Vá em **Firestore Database** > **Regras**
2. Para desenvolvimento, você pode usar estas regras temporárias:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /appointments/{document=**} {
      allow read, write: if true; // ATENÇÃO: Isso permite acesso total. Ajuste para produção!
    }
  }
}
```

⚠️ **IMPORTANTE**: Essas regras permitem acesso total. Para produção, configure regras mais seguras!

### 4. Obter as Credenciais do Firebase

1. No painel do Firebase, clique no ícone de engrenagem ⚙️ ao lado de "Visão geral do projeto"
2. Clique em **Configurações do projeto**
3. Role até a seção **Seus aplicativos**
4. Clique no ícone **</>** (Web) para adicionar um app web
5. Dê um nome ao app (ex: "Thaffny Website")
6. **NÃO** marque "Também configurar o Firebase Hosting"
7. Clique em **Registrar app**
8. Copie as credenciais que aparecem (firebaseConfig)

### 5. Configurar as Variáveis de Ambiente

1. No projeto, crie um arquivo `.env` na raiz (copie do `.env.example`)
2. Cole as credenciais do Firebase:

```env
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-messaging-sender-id
VITE_FIREBASE_APP_ID=seu-app-id
```

### 6. Testar a Configuração

1. Execute `npm run dev` para iniciar o servidor
2. Preencha o formulário de agendamento
3. Verifique no Firebase Console se os dados foram salvos em **Firestore Database** > **appointments**

## Estrutura dos Dados no Firestore

A coleção `appointments` armazena documentos com a seguinte estrutura:

```javascript
{
  name: "Nome do Cliente",
  phone: "11999999999",
  email: "cliente@email.com",
  service: "extensao-cilios",
  date: "2025-12-20",
  time: "14:00",
  message: "Mensagem opcional",
  source: "website_form",
  status: "pending", // pending, confirmed, completed, cancelled
  createdAt: Timestamp,
  updatedAt: Timestamp (quando atualizado)
}
```

## Próximos Passos

- Configure regras de segurança mais restritivas para produção
- Adicione autenticação se necessário
- Configure notificações por email (usando Cloud Functions)

