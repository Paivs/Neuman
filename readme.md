# Neuman

Neuman é uma plataforma de versionamento, gerenciamento e compartilhamento de documentos. Com ele, você pode controlar as versões de seus documentos, gerenciar o acesso e compartilhar com outros usuários.


# Sobre a infraestrutura da aplicação
A infraestrutura do projeto inclui:

- Back: Node.js
- Front: 
  - Next.js
  - Tailwind CSS
  - Radix UI + shadcn/ui
  - Framer Motion
  - Sonner Toast
  - Lucide-react
  - React Hook Form + Zod
  - Zustand
- Design: Figma / Canva
- BD: MySQL
- Docs: Docs do Google compartilhado
- Infra: VPS ubuntu hostinger
- Nginx webserver/proxy reverso
- Docker
- CDN firebase
- Versionamento: Git

### Infraestrutura
- VPS Ubuntu (Hostinger)
- Coolify para deploy
- Firebase CDN
- MySQL
- Nginx

## Começando

### Pré-requisitos
- Node.js 18+
- Postgres 15+
- npm

### Configuração do Ambiente

1. Clone o repositório
```bash
git clone https://github.com/paivs/neuman.git
cd neuman
```

2. Configure as variáveis de ambiente
```bash
# Backend
cd backend
cp .env.example .env
# Configure as variáveis no .env

# Frontend
cd ../frontend
cp .env.example .env
# Configure as variáveis no .env
```

3. Instale as dependências
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. Inicie o banco de dados
```bash
cd bd
docker build -t neuman-postgres .

docker run -d --name neuman-db -e POSTGRES_DB=neuman  -e POSTGRES_USER=neuman_user -e POSTGRES_PASSWORD=supersecret -p 5432:5432 neuman-postgres

```

5. Inicie os serviços
```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

## Documentação

- [Infraestrutura](/docs/infraestrutura.md)
- [Roadmap](/docs/roadmap.md)
- API: http://localhost:8085/api-docs (Swagger)

## Desenvolvimento

### Estrutura do Projeto
```
neuman/
├── backend/         # API Node.js
├── frontend/        # Aplicação Next.js
├── docs/           # Documentação
└── tests/          # Testes
```

### Padrões de Código
- ESLint para linting
- Prettier para formatação
- Conventional Commits

## Deploy

O deploy é feito automaticamente via Coolify quando há push na branch main. Os Dockerfiles necessários estão na raiz de cada projeto (frontend/backend).

## Licença
Este projeto está licenciado sob a GNU General Public License v3.0 - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
