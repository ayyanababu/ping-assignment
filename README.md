# Vue.js Application - ToDo List with Priorities

This is a simple ToDo list application built using Vue.js, PrimeVue components, and TypeScript. It allows users to add, prioritize, and manage tasks efficiently. The application includes end-to-end tests (E2E) using Cypress and unit tests using Vitest.

## Table of Contents

- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Data Normalization in ToDo Application](#data-normalization-in-todo-application)
- [Scripts](#scripts)
- [Testing](#testing)
- [License](#license)

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download Node.js from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ayyanababu/ping-assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ping-assignment
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   The app should now be running at [http://localhost:5173](http://localhost:5173).

## Tech Stack

- **Vue.js** - The progressive JavaScript framework for building user interfaces.
- **PrimeVue** - UI components for Vue.js. See more at [PrimeVue](https://primevue.org/).
- **TailwindCSS** - A utility-first CSS framework for styling.
- **Cypress** - End-to-end testing framework for web apps.
- **Vitest** - A fast unit testing framework for Vue.js applications.
- **TypeScript** - A strongly typed programming language that builds on JavaScript.

## Folder Structure

```plaintext
.
├── cypress/                   # Cypress E2E test cases
│   ├── e2e/
│   │   └── todo.cy.ts          # End-to-end test for ToDo application
│   ├── fixtures/
│   └── support/
├── public/                    # Public assets
├── src/
│   ├── assets/                # Static assets
│   ├── components/
│   │   ├── __tests__/         # Unit tests for components
│   │   ├── atoms/             # Small UI components
│   │   ├── molecules/         # Combined UI components
│   │   ├── TodoItem.vue       # Vue component for a single ToDo item
│   │   └── TodoList.vue       # Vue component for the ToDo list
│   ├── services/
│   │   └── LocalStorageService.ts # Service to handle localStorage interactions
│   ├── types/
│   │   └── Todo.ts            # TypeScript interfaces for ToDo items
│   ├── utils/
│   │   ├── consts.ts          # Constants used in the app
│   │   └── PrioritySort.ts    # Utility function to sort tasks by priority
│   ├── App.vue                # Main Vue component
│   ├── main.ts                # Entry point for the application
├── .eslintrc.cjs              # ESLint configuration
├── .prettierrc.json           # Prettier configuration
├── cypress.config.ts          # Cypress configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation (this file)
```

## Data Normalization in ToDo Application

In this documentation, I will explain the data normalization approach adopted for the ToDo application, specifically why we chose to use **dates as keys** and store **todos as arrays**. This structure was chosen with future scalability in mind, particularly for expanding the application to handle **daily tasks** more efficiently.

1. **Efficient Grouping by Date**
2. **Logical Extension for Future Use**
3. **Extendability for Daily ToDos (Daily, weekly, monthly tasks, Recurring tasks)**

```json
{
  "Mon Oct 07 2024": [
    {
      "title": "first-edit",
      "description": "first-edit",
      "priority": "none",
      "isCompleted": true,
      "timestamp": 1728273126676,
      "subtasks": [],
      "id": 1728273126676,
      "todoIndex": 0
    }
  ],
  "Tue Oct 08 2024": [
    {
      "title": "Recurring Task",
      "description": "This task repeats every day",
      "priority": "moderate",
      "isCompleted": false,
      "timestamp": 1728273180000,
      "subtasks": [],
      "id": 1728273180000,
      "repeat": {
        "interval": "daily",
        "nextOccurrence": "Tue Oct 09 2024"
      }
    }
  ]
}
```

## Scripts

The following npm scripts are available in the project:

- `npm run dev` - Start the development server using Vite.
- `npm run build` - Build the application for production.
- `npm run preview` - Preview the production build.
- `npm run test:unit` - Run the unit tests with Vitest.
- `npm run test:e2e:dev` - Run Cypress E2E tests in development mode.
- `npm run lint` - Run ESLint to lint the codebase.
- `npm run format` - Format the code using Prettier.

## Testing

### End-to-End Testing

End-to-end tests are written using Cypress. To run the E2E tests, use the following command:

```bash
npm run test:e2e:dev
```

### Unit Testing

Unit tests are written using Vitest. To run unit tests, use:

```bash
npm run test:unit
```

## License

This project is licensed under the MIT License.
