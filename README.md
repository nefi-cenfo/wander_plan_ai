# WanderPlan: AI-Powered Travel Planner

Welcome to the WanderPlan project repository! This application is a travel planner that relies on AI to provide destination recommendations based on a user's specified country and estimated travel time.

This project was developed by student Nefi Emanuelle Ureña Salas for the course SOFT-727 React-Ruby under the guidance of Professor Kevin Jiménez Garro at Universidad CENFOTEC on May 26, 2026.

---

## 🚀 Core Features

The system operates with two primary roles: **User** (clients with memberships) and **Admin** (system administrators managing clients and their memberships via a dashboard).

Users can access different features based on their subscription tier:

- **Basic Subscription:** Receive tourist destination recommendations.
- **TripAdvisor Integration:** Obtain place details, photos, and reviews.
- **Trip Storage (Basic):** Save up to 3 trips for future reference.
- **Premium Subscription:** Generate complete travel itineraries using AI.
- **Unlimited Storage:** Premium users can save as many trips as they require.
- **Pocket Mode:** Premium users can download a compact PDF with all travel information for offline consultation.
- **Budgeting:** Users can view a breakdown of the estimated budget for their saved trips.

---

## 🛠️ Technology Stack

The project relies on a modern, robust tech stack specifically chosen to support fast rendering and dynamic data storage:

### Frontend

- **Framework:** React with TypeScript.
- **Styling & UI:** Material UI and Tailwind.

### Backend

- **Framework:** Ruby on Rails.
- **Background Jobs:** Solid Queue, leveraging PostgreSQL's `FOR UPDATE SKIP LOCKED` feature, eliminating the need for Redis.

### Database

- **System:** PostgreSQL.
- **Data Structure:** Utilization of the `JSONB` column type to efficiently store complex AI-generated itineraries without needing highly fragmented relational tables.

### Third-Party APIs

- **Payments:** Stripe for membership management.
- **Content:** TripAdvisor Content API for tourist points of interest.
- **Artificial Intelligence:** Open API utilizing models like GPT 5.5 mini or Deepseek 4.0.

---

## ⚙️ Architecture & Resilience

The platform is designed to be fault-tolerant and easily maintainable.

- **Design Patterns:** The system implements "Abstract Factory" and "Bridge" patterns to allow convenient swapping of AI providers.
- **Job Retries:** Background queues use a rescue system configured for a maximum of 3 attempts before throwing an exception.
- **AI Fallback Mechanisms:** If an AI connection cannot be established, the system searches the database for similar trips based on the proposed destination.
- **Direct API Fallback:** The TripAdvisor Content API serves as a direct fallback to provide a list of top attractions if the AI is unavailable.
- **Contingency Seeds:** The database utilizes seeds to generate data for popular destinations as a contingency against missing data or connection errors with third-party providers.
- **Data Caching:** Successful AI responses are stored in the database to be used as future references, reducing API calls for repeated queries.
