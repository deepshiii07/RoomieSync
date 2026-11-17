# RoomieSync

RoomieSync is a roommate-matching application for college students. The project has a React/Vite frontend and a separate Spring Boot backend.

## Project repositories

- Frontend: https://github.com/deepshiii07/RoomieSync
- Backend: https://github.com/deepshiii07/roommate-backend

## Requirements

- Node.js 20.19+ or 22.12+
- Java 17
- Maven 3.6.3+ (or use the Maven wrapper if one is added later)
- Docker Desktop with Docker Compose, or a local MySQL 8 server

## 1. Clone both repositories

Keep the frontend and backend in sibling folders:

```bash
git clone -b local-setup https://github.com/deepshiii07/RoomieSync.git
git clone -b local-setup https://github.com/deepshiii07/roommate-backend.git
```

## 2. Start MySQL

From the backend repository:

```bash
docker compose up -d
```

This starts MySQL 8.4 and creates a persistent Docker volume. The local development database is named `roomiesync`.

The default local credentials are intentionally for local development only. Do not reuse them in a public deployment.

If you already have MySQL installed, create a database named `roomiesync` and set `DB_URL`, `DB_USERNAME` and `DB_PASSWORD` in your environment.

## 3. Run the backend

In the backend repository:

```bash
mvn spring-boot:run
```

The API runs at:

```
http://localhost:8080
```

Spring Boot reads database settings from environment variables. Defaults match the included Docker Compose configuration.

## 4. Run the frontend

In the frontend repository:

```bash
cd roommate-frontend
npm install
```

Copy `.env.example` to `.env` (or create `.env` yourself):

```env
VITE_API_BASE_URL=http://localhost:8080
```

Then start Vite:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## 5. Stop the database

From the backend repository:

```bash
docker compose down
```

To delete the local database volume as well (this permanently deletes local database data):

```bash
docker compose down -v
```

## Configuration notes

- The frontend API base URL is configurable with `VITE_API_BASE_URL`.
- The backend database URL, username, password and server port can be configured with `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` and `PORT`.
- Hibernate is currently configured with `ddl-auto=update` for local development. Before production deployment, introduce managed schema migrations (for example, Flyway) and review the schema strategy.
- CORS currently allows the local Vite origin `http://localhost:5173`. Add the actual deployed frontend origin before deploying the frontend publicly.
- The current application still needs the authentication, password-storage, authorization and API-response security work identified in the project audit. Do not expose this local development build as a public production service until those are addressed.

## Troubleshooting

- If the backend cannot connect to MySQL, check that Docker is running and that `docker compose ps` reports the database as healthy.
- If port 3306 is already in use, stop the other MySQL service or change the host-side port mapping in `docker-compose.yml` and update `DB_URL`.
- If the frontend reports a network or CORS error, verify the backend is running on port 8080 and that `VITE_API_BASE_URL` is correct.
- Restart Vite after changing a `.env` file.
