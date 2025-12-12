# Configuração do Domínio thaffnybeauty.app no Vercel

## Registros DNS Necessários

Configure estes registros no seu provedor de domínio:

### Registro A (Principal)
- **Tipo**: A
- **Nome/Host**: `@` (ou deixe em branco)
- **Valor/IP**: `216.198.79.1`
- **TTL**: 3600 (ou padrão)

### Registro CNAME (www - Opcional)
- **Tipo**: CNAME
- **Nome/Host**: `www`
- **Valor**: `cname.vercel-dns.com`
- **TTL**: 3600 (ou padrão)

## Instruções por Provedor

### Registro.br (domínios .br)
1. Acesse https://registro.br
2. Faça login
3. Vá em "Meus Domínios" > Selecione `thaffnybeauty.app`
4. Clique em "Gerenciar DNS"
5. Adicione o registro A conforme acima
6. Salve as alterações

### GoDaddy
1. Acesse https://www.godaddy.com
2. Vá em "Meus Produtos" > "DNS"
3. Encontre a seção "Registros"
4. Adicione o registro A
5. Salve

### Namecheap
1. Acesse https://www.namecheap.com
2. Vá em "Domain List" > "Manage"
3. Clique em "Advanced DNS"
4. Adicione o registro A
5. Salve

### Google Domains
1. Acesse https://domains.google.com
2. Clique no domínio
3. Vá em "DNS"
4. Adicione o registro A
5. Salve

## Verificar Propagação DNS

Após configurar, aguarde alguns minutos e verifique:
- https://dnschecker.org
- Digite `thaffnybeauty.app` e verifique se o IP `216.198.79.1` aparece

## Verificar no Vercel

1. Acesse o painel do Vercel
2. Vá em seu projeto > Settings > Domains
3. Verifique o status do domínio `thaffnybeauty.app`
4. Quando estiver configurado corretamente, aparecerá como "Valid Configuration"

## Tempo de Propagação

- Normalmente: 5-30 minutos
- Máximo: até 48 horas
- Se após 48 horas ainda não funcionar, verifique os registros DNS novamente

## Problemas Comuns

### "Invalid Configuration" persiste
- Verifique se o registro A está correto
- Aguarde mais tempo para propagação
- Tente remover e readicionar o domínio no Vercel

### Domínio não carrega
- Verifique se o projeto está deployado no Vercel
- Confirme que os registros DNS estão corretos
- Aguarde a propagação DNS completa

