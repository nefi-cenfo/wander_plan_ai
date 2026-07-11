# Agents Guide

## Project Overview

WanderPlan is an AI-powered travel planning application. The README describes user and admin roles, subscription tiers, destination recommendations, saved trips, AI-generated itineraries, budgeting, and integrations with Stripe, TripAdvisor, and AI providers. Treat those integrations as product intent unless corresponding implementation files are present.

## Tech Stack

- Backend: Ruby on Rails `~> 8.1.3` with Ruby `4.0.4` from `.ruby-version`.
- Database: PostgreSQL via the `pg` gem.
- Auth: Devise with custom user controllers under `app/controllers/users`.
- Frontend: React `19`, TypeScript, Inertia Rails, Vite Ruby, Material UI, and Tailwind CSS.
- Background/cache/cable: Solid Queue, Solid Cache, and Solid Cable.
- Testing: Rails Minitest with fixtures under `test/`.
- Quality/security: RuboCop Rails Omakase, Brakeman, bundler-audit, and `bin/importmap audit` in CI.
- Deployment: Dockerfile and Kamal config are present.

## Common Commands

- Setup/update dependencies and database: `bin/setup --skip-server`
- Setup and start development server: `bin/setup`
- Start development processes: `bin/dev`
- Rails server only: `bin/rails s`
- Vite dev server only: `bin/vite dev`
- Prepare database: `bin/rails db:prepare`
- Run Rails tests: `bin/rails test`
- Run system tests: `bin/rails test:system`
- Run TypeScript checks: `npm run check`
- Run Ruby style checks: `bin/rubocop`
- Run Rails security scan: `bin/brakeman --no-pager`
- Run gem audit: `bin/bundler-audit`
- Run local CI workflow: `bin/ci`

CI runs Brakeman, bundler-audit, importmap audit, RuboCop, Rails tests, and system tests against PostgreSQL.

## Repository Structure

- `app/controllers`: Rails controllers, including Devise overrides and dashboard/home controllers.
- `app/models`: Active Record models for users, subscriptions, trips, destinations, itineraries, budgets, saved places, and join models.
- `app/javascript`: Inertia/React frontend entrypoints, pages, components, theme files, assets, and shared types.
- `app/views`: Rails layouts, mailer layouts, and PWA templates.
- `config`: Rails, Vite, database, queue/cache/cable, routes, credentials, deployment, and environment configuration.
- `db`: schema, seeds, migrations, and Solid database schemas.
- `test`: Minitest helpers, model tests, fixtures, and placeholders for controller/integration/system-style areas.
- `bin`: Rails, setup, CI, Vite, RuboCop, Brakeman, bundler-audit, Kamal, and job executables.

## Coding Guidance

- Prefer standard Rails conventions and keep backend changes close to the relevant model, controller, route, migration, or test.
- Follow RuboCop Rails Omakase for Ruby style; do not introduce broad style rewrites.
- Frontend pages live under `app/javascript/pages`; reusable UI belongs under `app/javascript/components` when it is actually shared.
- TypeScript is strict. Use existing path aliases `@/*` or `~/*` for `app/javascript/*` imports when helpful.
- The Inertia entrypoint wraps pages with Material UI `StyledEngineProvider`, `ThemeProvider`, and `CssBaseline`; preserve this pattern for Inertia pages.
- Authentication and role routing are Devise-based. Non-admin authenticated users route to `users_dashboard#index`; admins route under `/admin/dashboard`.
- If changing schema, add a Rails migration and update/verify `db/schema.rb`; do not hand-edit schema as the source of truth.
- Keep generated, cache, log, local env, node_modules, storage, and built asset files out of edits unless the task specifically requires them.

## Testing And Verification

- For Rails model/controller changes, run the relevant Rails tests or `bin/rails test` when feasible.
- For frontend TypeScript changes, run `npm run check` when feasible.
- For style-sensitive Ruby changes, run `bin/rubocop` or the targeted file if supported by the executable.
- For security-sensitive Rails changes, consider `bin/brakeman --no-pager`.
- For broader verification, use `bin/ci`; it may be slower because it installs/checks dependencies, prepares the database, runs audits, style checks, tests, and seeds.

## Environment And Safety Notes

- No `.env.example` was found. Local `.env*` files are ignored by git.
- Development database credentials may be read from `RAILS_PROJECT_DB_USER` and `RAILS_PROJECT_DB_PASSWORD`; test CI uses `DATABASE_URL` for PostgreSQL.
- Production database password is read from `WANDER_PLAN_AI_DATABASE_PASSWORD`; Kamal expects `RAILS_MASTER_KEY` as a secret.
- `config/master.key` exists locally but key files are ignored by `.gitignore`; do not expose or commit secrets.
- `tmp/`, `log/`, `storage/`, `public/assets`, `public/vite*`, `.bundle`, and `node_modules` are generated or local-only paths.
- The README mentions Stripe, TripAdvisor, and AI provider integrations, but no `app/services` files were found during this review. Verify implementation before depending on those APIs.
- The Dockerfile is production-oriented; use `bin/dev`/`bin/setup` for local development unless the task is deployment-related.
