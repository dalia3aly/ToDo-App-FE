# Todo App Frontend

This is the frontend of the Todo App built with Vite, React, TypeScript, and Tailwind CSS. The frontend allows users to interact with the Todo API to get, create, update, and delete tasks, categorize them, and mark them as complete or incomplete.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Features

- **Create Tasks**: Add new tasks with a title, description, and category.
- **Update Tasks**: Edit task titles and descriptions.
- **Delete Tasks**: Remove tasks from the list.
- **Categorize Tasks**: Organize tasks by categories.
- **Mark as Complete/Incomplete**: Toggle tasks between complete and incomplete statuses.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Installation

1. **Clone the Repository**:

```sh
 git clone https://github.com/dalia3aly/ToDo-App-FE.git
 cd ToDo-App-FE
```

2. **Install Dependencies**:

```sh
npm install
```

## Running the App

To run the Todo App frontend, follow these steps:

1. Start the Development Server:

```sh
npm run dev
```

2. Open the App:

Open your browser and navigate to http://localhost:5173. If Vite default port is busy, check the correct port in the console.

## Usage

Once the Todo App is up and running, you can perform the following actions:

- Create a new task by clicking on the "Add Task" button and filling in the required details.
- Update a task by clicking on the task card and editing the title or description.
- Delete a task by clicking on the "Delete" button on the task card.
- Categorize tasks by selecting a category from the dropdown menu on the task card.
- Mark a task as complete or incomplete by clicking on the relevant button.

## Testing

The frontend of the Todo App uses Jest and React Testing Library for unit testing. For more details on Jest configuration and setup for **Vite** applications, you can refer to this [article](https://dev.to/teyim/effortless-testing-setup-for-react-with-vite-typescript-jest-and-react-testing-library-1c48).

### Testing Tech Stack

- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **React Testing Library**: A very light-weight solution for testing React components.

### Running Unit Tests

To run the unit tests for the Todo App frontend, follow these steps:

1. **Run Tests**:

```sh
npm test
```

OR for individual component testing

```sh
npm test <file-name>
```

2. **Watch Tests**
   To run tests in watch mode, use the following command:

```sh
npm run test:watch
```

This will execute the test suites and provide feedback on the tests' results.

## Folder Structure

The folder structure of the Todo App frontend is as follows:

```
todo-app-fe/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AllTodos/
│   │   │   ├── AllTodos.test.tsx
│   │   │   └── AllTodos.tsx
│   │   ├── Button/
│   │   │   └── Button.tsx
│   │   ├── EditableField/
│   │   │   ├── EditableField.test.tsx
│   │   │   └── EditableField.tsx
│   │   ├── Modal/
│   │   │   ├── Modal.test.tsx
│   │   │   └── Modal.tsx
│   │   ├── TaskForm/
│   │   │   ├── TaskForm.test.tsx
│   │   │   └── TaskForm.tsx
│   │   ├── TodoCard/
│   │   │   ├── TodoCard.test.tsx
│   │   │   └── TodoCard.tsx
│   │   └── TodosContainer/
│   │       ├── TodosContainer.test.tsx
│   │       └── TodosContainer.tsx
│   ├── services/
│   │   ├── todoService.test.ts
│   │   └── todoService.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── public/
│   ├── index.html
├── .eslintrc.cjs
├── .gitignore
├── babel.config.js
├── jest.config.js
├── jest.setup.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── setupTests.ts
```

## Contributing

Contributions are welcome! If you would like to contribute to the Todo App frontend, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push to the branch.
6. Open a pull request.

Please ensure that your code follows the project's coding style and conventions.
