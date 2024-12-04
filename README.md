NestJS REST API Boilerplate
==================

A **NestJS TypeScript Boilerplate** project with the following features:

-   **TypeORM** for database interactions.
-   **JWT Authentication** using Passport.js.
-   **Swagger** integration for API documentation.
-   Scalable architecture with modular organization.
-   Ready-to-use configuration for development and production.

* * * * *

🚀 Features
-----------

-   **Authentication**: Secure JWT-based authentication with Passport.js.
-   **TypeORM Integration**: Preconfigured ORM with support for migrations and multiple databases.
-   **Swagger Documentation**: Interactive API documentation accessible via `/api`.
-   **Modular Architecture**: Easily extendable project structure.
-   **Environment Configuration**: Centralized configuration management with `.env` files.
-   **Preconfigured Scripts**: For development, production, and testing.

* * * * *

📦 Installation
---------------

### Prerequisites

-   Node.js (>= 16.x)
-   npm (>= 8.x)
-   A database (MySQL, PostgreSQL, etc., compatible with TypeORM)

### Steps

1.  **Clone the repository**:
    ```
    ~$ git clone https://github.com/ashenud/nest-rest-api.git
    ~$ cd nest-rest-api
    ```

2.  **Install dependencies**:
    ```
    ~$ npm install
    ```

3.  **Configure environment variables**: 
    Copy the `.env.example` file to `.env` and update the values:
    ```
    cp .env.example .env
    ```

* * * * *

🔑 Authentication
-----------------

This boilerplate uses JWT-based authentication. To access protected routes:

1.  Register or log in to get a JWT token.
2.  Use the token in the `Authorization` header as `Bearer <token>`.

* * * * *

🛠️ Development
---------------

1.  **Run the development server**:
    ```
    ~$ npm run start:dev
    ```

2.  **Swagger documentation**: Visit http://localhost:3000/api to view the Swagger UI.

* * * * *

🐳 Docker
---------

A `docker-compose.yml` is included for containerized deployments.

### Build and Run

1.  **Configure environment variables if not done previously**:
    The MySQL container will be built using the values from the .env file. Make sure to set up the .env file before starting the containers.
    ```
    cp .env.example .env
    ```

2.  **Build and Run the container**:
    ```
    docker-compose up -d
    ```

3.  **Install dependencies**:
    ```
    docker exec -it nest-rest-api npm install
    ```

4.  **Run the development server**:
    ```
    docker exec -it nest-rest-api npm run start:dev
    ```

* * * * *

🏗️ Project Structure
---------------------

```
src/
├── common/        # Common utilities and decorators
├── modules/       # Feature modules
│   ├── auth/      # Authentication module (JWT, Passport)
│   ├── user/      # User module (example)
│   ├── company/   # Company module (example)
├── database/      # TypeORM configuration and entities
├── main.ts        # Application entry point
├── app.module.ts  # Root module
```

* * * * *

📘 API Documentation
--------------------

Swagger documentation is auto-generated and available at `/api`. Use it to explore and test API endpoints.

* * * * *

🖋️ Contributing
----------------

1.  Fork the project.
2.  Create a feature branch.
3.  Commit your changes.
4.  Open a Pull Request.

* * * * *

📄 License
----------

This project is licensed under the MIT License. See the LICENSE file for details.

* * * * *

🛠️ Built With
--------------

-   [NestJS](https://nestjs.com/)
-   [TypeORM](https://typeorm.io/)
-   [Swagger](https://swagger.io/)
-   [Passport.js](http://www.passportjs.org/)

* * * * *

Feel free to customize this file further according to your project's specific needs!
