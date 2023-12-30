# ibeer - E-commerce de Cerveja Artesanal

Versão: 1.0.0

## Descrição

O **ibeer** é um e-commerce de cerveja artesanal desenvolvido em Node.js, utilizando as práticas avançadas de Domain Driven Design (DDD), CQRS e Clean Architecture. O projeto conta com dois bancos de dados, um para operações de escrita (PostgreSQL) e outro para operações de leitura (MongoDB). A harmonização desses bancos de dados é coordenada por um event bus customizado, promovendo consistência e integridade nos dados.

## Bounded Contexts

O **ibeer** é composto por 2 Bounded Contexts:

- **Beer**: responsável por gerenciar as cervejas do e-commerce.

- **Order**: responsável por gerenciar os pedidos de cerveja.

## Estrutura do Projeto

[module]/
|-- presentation/
|-- application/
| |-- command/
| |-- query/
| |-- event/
|-- domain/
| |-- aggregate/
| |-- model/
| |-- value-object/
| |-- repository/
|-- infra/
|-- repository/

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma
- Mongoose
- PostgreSQL
- MongoDB
- Docker
- Docker Compose

## Instalação

Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema.

```bash
# Clone o repositório
git clone https://github.com/andre-ols/ibeer.git

# Navegue até o diretório do projeto
cd ibeer

# Inicie os contêineres Docker
docker compose --env-file .env up -d --build --force-recreate app_dev

# Rode as migrations do Prisma
docker compose --env-file .env exec app_dev yarn prisma migrate reset
```

## Configuração

o **ibeer** utiliza PostgreSQL (ORM Prisma) para operações de escrita e MongoDB (ORM Mongoose) para leitura. Certifique-se de configurar corretamente as variáveis de ambiente no arquivo `.env` antes de iniciar o projeto. Veja o arquivo `.env.example` para mais detalhes.
