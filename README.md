# Project Deployment Guide

## Overview
This guide provides steps to deploy the Django backend and React frontend to Azure, using SQLite as the database.


## Steps for Deployment

### 1. **Creating a Resource Group**
   - Open the Azure Portal.
   - Navigate to "Resource Groups".
   - Click "Create" and provide a name for the resource group (e.g., `django-react-app-group`).

## Azure Services Required (Step-by-Step)

After uploading your project to GitHub, follow these steps to configure all required Azure services for a scalable, secure, and performant deployment:

### 1. Resource Group
- Create a Resource Group to organize all Azure resources (e.g., `django-react-app-group`).

### 2. Azure App Service (Backend)
- Host the Django REST backend.
- Configure environment variables: `DJANGO_SETTINGS_MODULE`, `SECRET_KEY`, `DEBUG`, database connection.
- Enable continuous deployment from GitHub.

### 3. Azure Static Web Apps (Frontend)
- Host the React frontend.
- Link to GitHub for automatic deployment.
- Set build folder to `frontend-app/build`.

### 4. Azure SQL Database
- Migrate from SQLite to Azure SQL for production.
- Configure connection string in backend environment variables.

### 5. Azure Cache for Redis
- Set up for caching API responses and optimizing performance.
- Configure connection in backend settings.

### 6. Azure Monitor
- Enable monitoring for backend and frontend.
- Track metrics, errors, and performance.

### 7. Log Analytics Workspace
- Centralize logs and metrics from all services.
- Connect Azure Monitor for unified analysis.

### 8. Azure Active Directory
- Configure authentication and authorization.
- Use JWT tokens for secure API access.

### 9. Azure Functions (optional)
- Implement serverless mathematical functions if needed.
- Create HTTP-triggered functions for extensibility.

### 10. Azure Event Hubs / Service Bus (optional)
- Integrate with backend for scalable request processing.

---

9. **(Optional) Deploy Azure Functions & Event Hubs/Service Bus**
10. **Configure environment variables and connections for all services**
- For each service, consult Azure documentation for best practices and advanced settings.
   - Select a region (e.g., `East Europe`) and click "Review + Create".
     - Click "Review + Create".
     - Enable continuous deployment from GitHub.
     - Link the repository containing the backend code.

### 3. **Creating Azure Resources for React Frontend**
   - Create an Azure Static Web App:
     - Navigate to "Static Web Apps".
     - Click "Create" and provide a name (e.g., `react-frontend-app`).
     - Select the resource group created earlier.
     - Link the repository containing the frontend code.
     - Specify the build folder (`frontend-app/build`).

### 4. **Explaining Azure Resources**
   - **App Service**: Hosts the Django backend.
   - **Static Web App**: Hosts the React frontend.
   - **Resource Group**: Groups all related resources.

### 5. **Creating Environment Variables**
   - Navigate to the App Service for the backend.
   - Go to "Configuration" > "Application Settings".
   - Add the following environment variables:
     - `DJANGO_SETTINGS_MODULE`: `mathapi.settings`
     - `SECRET_KEY`: Provide a secure key.
     - `DEBUG`: `False`

### 6. **Connecting Code to Azure**
   - Push your code to GitHub.
   - Link the GitHub repository to the Azure resources.
   - Ensure the YAML workflow file is configured for deployment.

### 7. **Modifying the YAML File**
   - Update the GitHub Actions workflow file to include:
     - Steps for installing dependencies.
     - Running database migrations.
     - Deploying the backend and frontend.

         cd backend
     ```

---

# Implementation Steps for the Project

These are a few steps followed to migrate and configure the necessary services in the project, so that all components work correctly.

---

## 1. Uploading the project to GitHub
- Navigate to the root directory of the project.
- Initialize a Git repository:
  ```bash
  git init
  ```
- Add all files:
  ```bash
  git add .
  ```
- Commit the changes:
  ```bash
  git commit -m "Initial commit"
  ```
- Add the GitHub remote:
  ```bash
  git remote add origin https://github.com/Florina-Eugenia-Hategan/Project_OOP1.git
  ```
- Push the code:
  ```bash
  git push -u origin main
  ```

## 2. Configuring Azure App Service for Backend
- Access the Azure portal.
- Select the "App Services" option.
- Add a new web service with runtime stack `Python 3.11`.
- Configure Continuous Deployment from GitHub.
- Add the necessary environment variables:
  - `DJANGO_SETTINGS_MODULE`: `mathapi.settings`
  - `SECRET_KEY`: a secure key.
  - `DEBUG`: `False`.

## 3. Configuring Azure Static Web Apps for Frontend
- Access the Azure portal.
- Select the "Static Web Apps" option.
- Add a new static service.
- Configure Continuous Deployment from GitHub.
- Specify the build folder (`frontend-app/build`).

## 4. Configuring Monitoring
- Enable Azure Monitor for backend and frontend.
- Configure Log Analytics Workspace for centralized logging.

## 5. Testing and Verification
- Access the backend and frontend URLs.
- Check the application's functionality.
- Monitor logs and metrics for errors.

---

# Required Azure Services

## Azure App Service
**Usage**: Hosting the Django REST Framework backend.
**Configuration**: Continuous deployment from GitHub, setting up environment variables for database connection and authentication.

## Azure Static Web Apps
**Usage**: Hosting the React frontend.
**Configuration**: Automatic deployment from GitHub, configuring the `build` folder as the source for static files.

## Azure SQL Database
**Usage**: Data persistence (replacing SQLite).
**Configuration**: Migrating data from SQLite, setting up the connection in the backend.

## Azure Cache for Redis
**Usage**: Caching and performance optimization.
**Configuration**: Storing API responses to reduce processing time.

## Azure Monitor
**Usage**: Monitoring and logs.
**Configuration**: Enabling metrics and logs for both backend and frontend.

## Log Analytics Workspace
**Usage**: Centralizing logs and metrics.
**Configuration**: Setting up the connection with Azure Monitor for data analysis.

## Azure Active Directory
**Usage**: Authentication and authorization.
**Configuration**: Using JWT tokens for secure API access.

## Azure Functions (optional)
**Usage**: Implementing mathematical functions in a serverless architecture.
**Configuration**: Creating HTTP-triggered functions for request processing.

## Azure Event Hubs or Azure Service Bus (optional)
**Usage**: Logging requests in a messaging/streaming framework.
**Configuration**: Setting up the connection for asynchronous processing of API requests.

---

# Implementation Steps for the Mathematical Microservice

These are the steps that will be followed immediately after migrating the frontend and backend to Azure, to implement the mathematical microservice.

---

## 1. Implementing the Mathematical Microservice
- Use a micro framework (e.g., Django Rest Framework).
- Implement the following functions:
  - `pow`: Calculates the power of a number.
  - `fibonacci`: Returns the n-th Fibonacci number.
  - `factorial`: Calculates the factorial of a number.
- Expose the service as a REST API.
- Follow microservices development principles (e.g., MVC/MVCS).

## 2. Request Persistence in Database
- Use SQLite for simplicity.
- Create a model for storing API requests:
  - The endpoint called.
  - The request parameters.
  - The request timestamp.
## 3. Monitoring and Logging
- Integrate Azure Monitor for logs and metrics.
- Configure Log Analytics Workspace for centralized logging.
- Implement a logging framework (e.g., Python `logging`).

## 4. Caching
- Use Azure Cache for Redis for performance optimization.
- Configure caching for API responses.

## 5. Authorization
- Integrate Azure Active Directory for authentication and authorization.
- Configure API access using JWT tokens.

## 6. Request Persistence in a Messaging/Streaming Framework
- Use Azure Event Hubs or Azure Service Bus.
- Implement logging of API requests in a messaging framework.

## 7. Extensibility
- Design the microservice to allow easy addition of new mathematical functionalities.
- Use a modular design.

## 8. Implementing a Serverless Version
- Use Azure Functions for implementing mathematical functions.
- Configure the functions to be triggered via HTTP.
- Test the functionality in Azure Free Tier.

---

# Notes
- All project requirements and constraints are met.
- Modern API standards are used (e.g., REST).
- Simplicity and extensibility are prioritized in the design.

---

# The Story of Implementing Azure Services

After uploading the frontend and backend to GitHub, I started the process of configuring Azure services to ensure the end-to-end operation of my application. The choice of technologies was guided by the project requirements and the need for scalability, performance, and ease of use.

---

## Azure App Service
I chose Azure App Service for hosting the Django REST Framework backend. This service offers native support for Python and allows quick configuration of environment variables and continuous deployment from GitHub. It is ideal for web applications that require a scalable and easy-to-manage infrastructure.

## Azure Static Web Apps
For the React frontend, I opted for Azure Static Web Apps. This service is perfect for hosting static applications and offers direct integration with GitHub for automatic deployment. The build folder of the React application (`frontend-app/build`) is configured as the source for static files.

## Azure SQL Database
Although SQLite is used for simplicity in development, I decided to migrate to Azure SQL Database for data persistence. This service offers support for complex queries and scalability, being suitable for applications that require a robust database.

## Azure Cache for Redis
For performance optimization, I integrated Azure Cache for Redis. This service allows caching of API responses, reducing processing time and server load.

## Azure Monitor
Monitoring is essential for any production application. Azure Monitor provides detailed logs and metrics, helping to identify issues and optimize performance.

## Log Analytics Workspace
For centralized logging and metrics, I configured Log Analytics Workspace. This service facilitates data analysis and provides an overview of the application's status.

## Azure Active Directory
Authentication and authorization are managed through Azure Active Directory. This service allows the use of JWT tokens for secure access to the API.

## Azure Functions (optional)
For implementing mathematical functions in a serverless architecture, I chose Azure Functions. This service is ideal for triggering functions via HTTP and offers automatic scaling.

## Azure Event Hubs or Azure Service Bus (optional)
For logging requests in a messaging framework, I integrated Azure Event Hubs. This service allows asynchronous processing of API requests, improving performance and scalability.

---

# Configuration Process

1. **Uploading code to GitHub**
   - I initialized a Git repository and uploaded the frontend and backend code.
   - I configured continuous deployment from GitHub for Azure App Service and Azure Static Web Apps.

2. **Configuring environment variables**
   - I added the necessary variables in Azure App Service for the backend.

3. **Monitoring and logging**
   - I enabled Azure Monitor and Log Analytics Workspace to centralize logs and metrics.

4. **Caching and optimization**
   - I configured Azure Cache for Redis for API responses.

5. **Authorization**
   - I integrated Azure Active Directory for authentication and authorization.

6. **Extensibility**
   - I designed the microservice to allow easy addition of new mathematical functionalities.

---

This approach ensures a scalable, high-performance, and easy-to-manage application, meeting project requirements and modern development principles.
