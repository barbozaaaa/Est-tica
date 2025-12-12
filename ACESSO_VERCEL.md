# Como Acessar o Site no Vercel

## Problema: DNS não configurado

Se você está recebendo o erro `DNS_PROBE_FINISHED_NXDOMAIN`, significa que o domínio personalizado `thaffnybeauty.app` ainda não está configurado corretamente.

## Solução Temporária: Use o Domínio Padrão do Vercel

Enquanto o DNS não está funcionando, você pode acessar o site pelo domínio padrão do Vercel:

### Como encontrar o domínio padrão:

1. Acesse https://vercel.com
2. Faça login na sua conta
3. Clique no seu projeto (Est-tica)
4. Na página do projeto, você verá um link como:
   - `est-tica.vercel.app` ou
   - `est-tica-[hash].vercel.app`

### Links para acessar:

**Site principal:**
```
https://est-tica.vercel.app
```

**Painel Admin (CRM):**
```
https://est-tica.vercel.app/admin
```

(Substitua `est-tica` pelo nome real do seu projeto no Vercel)

## Configurar o DNS do Domínio Personalizado

Para fazer o `thaffnybeauty.app` funcionar, você precisa:

1. **Acessar o painel do seu provedor de domínio** (onde você comprou o domínio)
2. **Configurar o registro DNS tipo A:**
   - Tipo: A
   - Nome: @ (ou deixe em branco)
   - Valor: 216.198.79.1
   - TTL: 3600

3. **Aguardar a propagação DNS** (pode levar de 5 minutos a 48 horas)

4. **Verificar no Vercel:**
   - Vá em Settings > Domains
   - Verifique se o domínio aparece como "Valid Configuration"

## Verificar se o DNS está funcionando

Use estas ferramentas:
- https://dnschecker.org
- Digite `thaffnybeauty.app` e verifique se o IP `216.198.79.1` aparece

## Dica

Enquanto configura o DNS, use o domínio padrão do Vercel para acessar o site e o painel admin. Ele funciona imediatamente após o deploy!

