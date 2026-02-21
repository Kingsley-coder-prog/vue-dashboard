Vue Dashboard Backend

Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Install dependencies: `npm install`.
3. Run migrations: `npm run migrate` (requires `psql` CLI) or run the SQL in your Postgres client.
4. Seed data: `npm run seed`.
5. Start server: `npm run dev` or `npm start`.

API

- `GET /api/stats` — dashboard summary
- `GET /api/charts` — chart points
- `GET /api/recent-orders` — recent orders
- `GET /api/recent-activity` — recent activity
