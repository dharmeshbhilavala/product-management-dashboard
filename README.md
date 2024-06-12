# Product Management Dashboard

#### Overview

The Product Management Dashboard is a web application designed to streamline the process of managing products efficiently. Built with React, it offers features such as product listing, addition, editing, and deletion, along with filtering and sorting functionalities. The dashboard leverages modern technologies and best practices to provide a user-friendly interface for product management tasks.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Mock Backend Server](#running-the-mock-backend-server)
    - [Installing json-server](#installing-json-server)
    - [Starting the Mock Server](#starting-the-mock-server)
    - [Using the Mock Server](#using-the-mock-server)
    - [Example Requests](#example-requests)
- [Usage](#usage)
- [Contributing](#contributing)

## Technologies Used

- **React**: The project is bootstrapped with Create React App and uses React as the main frontend library.
- **Axios**: For making HTTP requests to a backend server.
- **Formik and Yup**: For form handling and validation.
- **React Icons**: For using icons in the application.
- **React Router Dom**: For handling routing within the application.
- **Redux Toolkit Persist**: For state management and persisting state.
- **UUID**: For generating unique identifiers.
- **Tailwind CSS**: For styling the components.
- **Testing Library**: For testing components and user interactions.
- **Web Vitals**: For monitoring web performance metrics.

## Project Structure

- **public/**: Contains static assets like icons, images, and the main HTML file.
- **src/**: Contains the source code of the application.
  - **api/**: Contains utility functions for making API requests.
  - **components/**: Contains various React components like About, Home, Product, Sidebar, etc.
    - **form/**: Contains form-related components like Input and Modal.
  - **App.js**: The main component where the application is initialized.
  - **index.js**: The entry point of the application.
  - **index.css**: Global styles for the application.
  - **App.css**: Component-specific styles.
- **tailwind.config.js**: Configuration file for Tailwind CSS.
- **README.md**: Contains information about the project and how to run it.
- **package.json**: Contains project metadata, dependencies, and scripts.

## Available Scripts

- **npm start**: Runs the app in development mode on [http://localhost:3000](http://localhost:3000).
- **npm test**: Launches the test runner in interactive watch mode.
- **npm run build**: Builds the app for production.
- **npm run eject**: Allows customization of build tools, but it's a one-way operation.

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your system. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/product-management-dashboard.git
   cd product-management-dashboard
   ```
2. Install NPM packages:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Your application will now be running at [http://localhost:3000](http://localhost:3000).

### Running the Mock Backend Server

For development purposes, this project uses `json-server` to simulate a RESTful API. This allows you to work with real-time data without needing to connect to an actual backend service.

#### Installing json-server

1. If you haven't already installed `json-server`, you can do so globally via npm:

   ```bash
   npm install -g json-server
   ```

   Or, if you prefer to keep it as a dev dependency in your project:

   ```bash
   npm install --save-dev json-server
   ```

2. Starting the Mock Server

   To start the mock server, navigate to the directory containing your db.json file and run:

   ```bash
   json-server --watch db.json --port 3001
   ```

   This command starts the server on port 3001. You can change the port number if needed, just make sure to update your API calls in the application accordingly.

   Now, your mock server is running at [http://localhost:3001](http://localhost:3001). You can perform CRUD operations against [http://localhost:3001/products](http://localhost:3001/products) to interact with the product data defined in db.json.

#### Using the Mock Server

With the server running, you can now make requests to endpoints like `/products` to retrieve, add, update, or delete products. The server supports all standard RESTful operations, including filtering and sorting out of the box.

#### Example Requests

- **Get all products:** GET [http://localhost:3001/products](http://localhost:3001/products)
- **Get a single product:** GET [http://localhost:3001/products/1](http://localhost:3001/products/1)
- **Create a new product:** POST [http://localhost:3001/products](http://localhost:3001/products)
- **Update a product:** PUT [http://localhost:3001/products/1](http://localhost:3001/products/1)
- **Delete a product:** DELETE [http://localhost:3001/products/1](http://localhost:3001/products/1)

> **Note**: Ensure the mock server is running whenever you're developing locally to see live data reflected in your application. Adjust your API service URLs in the application to match the mock server's address and port.

## Usage

After starting the development server, navigate to [http://localhost:3000](http://localhost:3000) in your browser. From there, you can explore the dashboard's features.

## Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**.
2. **Create your feature branch**:
   ```bash
   git checkout -b feature/AmazingFeatureName
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add some amazing feature"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/AmazingFeatureName
   ```
5. **Open a pull request**.

Thank you for your contributions!
