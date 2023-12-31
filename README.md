# iBeer - Craft Beer E-commerce

![iBeer Logo](assets/ibeer/logo.png)

## Overview

**iBeer** is a craft beer e-commerce developed in Node.js, employing advanced practices of Domain Driven Design (DDD), CQRS, and Clean Architecture. The project features two databases, one for write operations (PostgreSQL) and another for read operations (MongoDB). The coordination between these databases is managed by a custom event bus, promoting consistency and integrity in the data.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Configuration](#configuration)
  - [Start Containers](#start-containers)
  - [Run Prisma Migrations](#run-prisma-migrations)
- [License](#license)

## Features

- Craft beer commerce
- Implementation of DDD, CQRS, and Clean Architecture
- PostgreSQL for write operations
- MongoDB for read operations
- Data synchronization through a custom event bus
- Containerized with Docker
- Container management with Docker Compose

## Prerequisites

Before starting, make sure you have Docker and Docker Compose installed on your environment.

## Project Structure

**iBeer** is composed of 4 layers:

- **Application**: Responsible for orchestrating business operations.
- **Domain**: Responsible for defining business rules.
- **Infrastructure**: Responsible for implementing integrations with external services.
- **Presentation**: Responsible for implementing user communication interfaces.

Tech Stack:

- Node.js
- TypeScript
- Express
- Prisma
- Mongoose
- PostgreSQL
- MongoDB
- Docker
- Docker Compose

## Getting Started

### Configuration

Create a `.env` file at the root of the project with the necessary configurations, such as environment variables for database connections. Refer to the `.env.example` file for more details.

### Start Containers

```bash
# Start Docker containers
docker compose --env-file .env up -d --build --force-recreate app_dev
```

### Run Prisma Migrations

```bash
# Run Prisma migrations
docker compose --env-file .env exec app_dev yarn prisma migrate reset
```

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.
