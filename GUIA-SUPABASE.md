# Guia de Configuração do Supabase - achados.ignacio

## Passo 1: Criar Conta no Supabase

1. Acesse **https://supabase.com**
2. Clique em **"Start your project"** ou **"Começar gratuitamente"**
3. Você pode entrar com:
   - **GitHub** (recomendado se tiver conta)
   - **Google** (conta Gmail)
   - **Email** (criar nova conta)
4. Preencha os dados solicitados:
   - Nome
   - Email
   - Crie uma senha

---

## Passo 2: Criar Novo Projeto

1. Após fazer login, você verá o **Dashboard**
2. Clique em **"New Project"** (Novo Projeto)
3. Preencha os dados:
   - **Name**: `brecho-achados` (ou nome que preferir)
   - **Database Password**: Crie uma senha forte (anote!)
   - **Region**: `South America` (São Paulo)
4. Clique em **"Create new project"**
5. Aguarde a criação (pode levar 1-2 minutos)

---

## Passo 3: Obter Credenciais

1. Após criar o projeto, você verá uma tela de **"Connecting"**
2. Clique em **"Settings"** (ícone de engrenagem) no menu lateral
3. Clique em **"API"**
4. Você verá duas informações importantes:

**Project URL** (URL do Projeto):
```
https://seu-projeto.supabase.co
```

**anon public** (Chave Pública):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNl...
```

5. **Copie as duas informações** (URL e Key)

---

## Passo 4: Configurar no Código

1. Abra o arquivo **`supabase.js`** na pasta do seu projeto
2. Substitua as linhas no início do arquivo:

```javascript
// ANTES (não funciona):
const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_KEY = 'SUA_CHAVE_AQUI';

// DEPOIS (cole suas credenciais):
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## Passo 5: Criar Tabela de Produtos

1. No painel do Supabase, clique em **"Table Editor"** (Editor de Tabela) no menu
2. Clique em **"New Table"** (Nova Tabela)
3. Configure:
   - **Name**: `pecas`
   - **Columns** (adicione os campos):
     - `id` → tipo: `int8` → marcar como `Primary key`
     - `nome` → tipo: `text`
     - `categoria` → tipo: `text`
     - `preco` → tipo: `float8`
     - `tamanho` → tipo: `text`
     - `descricao` → tipo: `text` (marcado como nullable)
     - `imagem_url` → tipo: `text` (marcado como nullable)
     - `disponivel` → tipo: `text` (marcado como nullable)
     - `tipo` → tipo: `text` (marcado como nullable)
     - `created_at` → tipo: `timestamptz` (marcado como nullable)
4. Clique em **"Save"**

---

## Passo 6: Configurar Storage (para imagens)

1. No menu do Supabase, clique em **"Storage"**
2. Clique em **"New Bucket"**
3. Configure:
   - **Name**: `produtos`
   - **Public**: Ative (marque a opção)
4. Clique em **"Create bucket"**

---

## Passo 7: Configurar Permissões (Importante!)

1. No **Table Editor**, clique na tabela `pecas`
2. Clique em **"Policies"** (Políticas)
3. Clique em **"New Policy"** para cada uma:

### Política 1 - Ler (Select)
- **Name**: `Allow read`
- **Command**: `SELECT`
- **Target roles**: `anon`
- **WITH CHECK**: `true`
- Clique em **"Save policy"**

### Política 2 - Inserir (Insert)
- **Name**: `Allow insert`
- **Command**: `INSERT`
- **Target roles**: `anon`
- **WITH CHECK**: `true`
- Clique em **"Save policy"**

### Política 3 - Atualizar (Update)
- **Name**: `Allow update`
- **Command**: `UPDATE`
- **Target roles**: `anon`
- **WITH CHECK**: `true`
- Clique em **"Save policy"**

### Política 4 - Deletar (Delete)
- **Name**: `Allow delete`
- **Command**: `DELETE`
- **Target roles**: `anon`
- **WITH CHECK**: `true`
- Clique em **"Save policy"**

---

## Passo 8: Testar a Conexão

1. Abra o arquivo `admin.html` no navegador
2. Faça login com:
   - Usuário: `admin`
   - Senha: `brecho2024`
3. No painel, tente adicionar uma peça
4. Depois vá na `loja-online.html` e veja se aparece

---

## Estrutura dos Dados

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | número | ID automático |
| nome | texto | Nome da peça |
| categoria | texto | blusas, calças, etc |
| preco | número | Preço em reais |
| tamanho | texto | PP, P, M, G, GG |
| descricao | texto | Descrição detalhada |
| imagem_url | texto | Link da imagem |
| disponivel | texto | "sim" ou "nao" |
| tipo | texto | "loja" ou "brecho" |
| created_at | data | Data de cadastro |

---

## Solução de Problemas

### "Erro ao carregar produtos"
- Verifique se as credenciais estão corretas no `supabase.js`
- Verifique se a tabela foi criada com os campos corretos

### "Erro ao fazer upload de imagem"
- Verifique se o Bucket foi criado no Storage
- Verifique se as políticas do Storage estão habilitadas

### "Access denied"
- Verifique as políticas (Policies) da tabela
- Todas as 4 políticas devem estar criadas

---

## Próximos Passos

Após configurar, você pode:
1. Acessar `admin.html` e fazer login
2. Adicionar produtos com imagens
3. Gerenciar peças no painel administrativo
4. Ver as peças aparecerem na `loja-online.html` e `brecho.html`