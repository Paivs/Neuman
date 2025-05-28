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

# Get started
## Docker Compose

Este projeto utiliza o Docker Compose para orquestrar os containers. Para subir o ambiente, basta executar o comando `docker-compose up` na pasta raiz do projeto.

## Variáveis de ambiente

As variáveis de ambiente do projeto estão configuradas no arquivo `.env` na pasta raiz do projeto. É importante respeitar as seguintes variáveis:

* `DB_NAME`: nome do banco de dados
* `DB_USER`: usuário do banco de dados
* `DB_PASS`: senha do banco de dados
* `DB_HOST`: host do banco de dados
* `DB_PORT`: porta do banco de dados

## Ambiente de desenvolvimento

É possível fazer o docker-compose e montar o front, back e banco em ambiente de desenvolvimento... No entanto, as respostas demoram a surtir efeito. Recomenda-se montar o docker somente do banco  

Caso nunca tenha criado o container
```bash 
docker run -d --name mysql --restart always -e MYSQL_ROOT_PASSWORD=neuman@123 -e MYSQL_DATABASE=neuman -e MYSQL_USER=dev -e MYSQL_PASSWORD=dev@123 -p 3306:3306 -v mysql_data:/var/lib/mysql mysql
```

Caso já o tenha configurado
```bash
docker start mysql
```

## Swagger 

A documentação da API foi gerada com o Swagger e pode ser acessada em `http://localhost:4000/api-docs`.

## Nginx

O Nginx é usado como proxy reverso para o frontend e o backend. A configuração do Nginx está no arquivo `nginx/default`.

teste final