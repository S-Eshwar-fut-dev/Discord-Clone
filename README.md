# Discord Frontend

This repository houses the frontend client for a distributed, microservices-based Discord clone. Built with Next.js and TypeScript, this application serves as the user interface layer within a scalable system architecture, designed to replicate the core interaction patterns of the Discord platform.

**Note:** The backend infrastructure is currently **in progress**. The application presently utilizes a mock server environment for UI development. A transition to a fully containerized microservices architecture (orchestrated via Kubernetes) is planned for the next phase of development.

## Table of Contents

- [About the Project]
- [System Architecture]
- [Technical Architecture (Frontend)]
- [Current Status & Roadmap]
- [Technologies Used]
- [Getting Started]
- [Project Structure]
- [Contributing]
- [License]

## About the Project

This project implements a modern, high-performance chat interface designed to interact with a complex distributed backend. Unlike a monolithic application, this frontend is engineered to eventually consume data from various independent services.

The primary goal is to demonstrate proficiency in handling distributed systems concepts—including eventual consistency, real-time communication, and resilient service interaction—while maintaining a modular and type-safe codebase.

## System Architecture

The full system is designed as a microservices architecture. This repository represents the **Client Layer**.

- **Frontend (This Repository):** Handles user interaction, state management, and acts as the API gateway consumer.
- **Backend (In Progress):** A suite of decoupled services handling authentication, chat messages, voice/video processing, and user presence.
- **Infrastructure (Planned):** The system will be orchestrated using Kubernetes (K8s) with containerization via Docker, ensuring scalability, fault tolerance, and automated deployment (CI/CD).

## Technical Architecture (Frontend)

Internally, the frontend codebase follows a modular and type-safe approach:

- **Component-Driven Development**: The UI is built using atomic, reusable components located in the `components` directory.
- **Service Layer Pattern**: API interactions and external data fetching are encapsulated within the `services` directory to maintain separation of concerns.
- **Centralized State Management**: Application state is handled via a dedicated store (located in `store`), ensuring consistent data flow across the application.
- **Strict Typing**: The project utilizes TypeScript throughout, with shared type definitions found in the `types` directory to prevent runtime errors.
- **Schema Validation**: Data structures and forms are validated using schemas defined in the `schemas` directory.

## Current Status & Roadmap

The frontend development is active, while the backend is undergoing significant architectural development.

### Phase 1: Frontend Foundation (Current)

- Implementation of UI/UX using Next.js and Tailwind CSS.
- State management setup.
- **Mock Server Integration**: Utilizing mock data to simulate API responses for development and testing.

### Phase 2: Backend Integration (Upcoming)

- Replacement of mock services with real microservices.
- Integration of WebSocket connections for real-time messaging.
- Implementation of distinct services for Authentication, Messaging, and Media.

### Phase 3: Infrastructure & Deployment

- **Containerization**: Dockerizing the frontend and backend services.
- **Orchestration**: Deploying services to a Kubernetes cluster.
- **CI/CD**: Establishing automated pipelines for testing and deployment.

## Technologies Used

### Frontend (Current)

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks / External Store Integration
- **Validation**: Zod (inferred from schemas)
- **Linting**: ESLint

### Infrastructure (Planned)

- **Containerization**: Docker
- **Orchestration**: Kubernetes (K8s)
- **CI/CD Pipelines**: GitHub Actions / Jenkins

## Getting Started

Follow these instructions to set up the project locally. Note that this will currently run against the mock environment until the backend services are published.

### Prerequisites

Ensure you have the following software installed on your machine:

- Node.js (LTS version recommended)
- npm, yarn, pnpm, or bun package manager

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/S-Eshwar-fut-dev/Discord-Frontend.git
    ```

2.  **Navigate to the project directory**

    ```bash
    cd Discord-Frontend
    ```

3.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Configuration

Create a `.env.local` file in the root directory to store environment variables.

```bash
# Currently pointing to internal mock or local backend
NEXT_PUBLIC_API_URL=http://localhost:3000/api/mock
```

4.  **Start the development server**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## Project Structure

The project is organized to facilitate maintenance and feature expansion:

- `app/`: Contains the application routes, layouts, and pages (Next.js App Router).
- `components/`: Houses all reusable UI components (buttons, modals, chat interfaces).
- `hooks/`: Custom React hooks for shared logic.
- `lib/`: Utility functions and library configurations.
- `public/`: Static assets such as images and icons.
- `schemas/`: Validation schemas used for forms and data verification.
- `services/`: Functions dedicated to making API calls and handling backend logic.
- `store/`: State management configuration and slices.
- `types/`: TypeScript interfaces and type definitions.

## Contributing

Contributions focusing on frontend optimization or preparation for backend integration are welcome.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`)
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`)
4.  Push to the Branch (`git push origin feature/NewFeature`)
5.  Open a Pull Request

## License

This project is available for use. Please refer to the repository settings or the LICENSE file for specific distribution rights.
