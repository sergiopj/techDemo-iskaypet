# Animal Clinic API

REST API built with NestJS and a hexagonal structure. The current API surface is
intentionally limited to listing pets; new resources and routes will be added
as they are designed.

## Current endpoint

- `GET /api/v1/pets` — returns the pets as a JSON array.
- `GET /api/v1/docs` — interactive OpenAPI documentation.

## Architecture

The pets flow separates the HTTP controller, application use case, domain model,
repository port, and PostgreSQL/TypeORM adapter.

## Security

Authentication and authorization have not been added yet. Choose the mechanism
before introducing business routes that need access control; do not expose this
development API publicly until that decision and its protections are in place.

## Run locally

Requirements: Node.js 20 or later and PostgreSQL.

1. Configure the database values in `.env` using `.env.example` as a reference.
2. Apply the database migrations:

   ```console
   npm run migration:run
   ```

3. Build and start the API:

   ```console
   npm run build
   npm start
   ```

For development with automatic restarts:

```console
npm run start:dev
```

The API listens on port `3000` by default. Set `PORT` to override it.

## Run with Docker Compose

Set `DB_PASSWORD` in the local `.env` file, then run:

```console
docker compose up --build
```

The API is available at `http://localhost:3000`; PostgreSQL is exposed on port
`5432`. Run migrations against the running database with `npm run migration:run`
from a local environment configured with the same connection details.

## Tests

```console
npm test
```
