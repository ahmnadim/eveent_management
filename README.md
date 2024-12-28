# Project Setup and Run Instructions

## Prerequisites

- **Node.js**: Ensure you have Node.js version **20.13** installed.
- **Docker**: Make sure Docker is installed and running on your system.
- **PostgreSQL**: You will need PostgreSQL for the database setup.

---

## Steps to Run the Project

0. **Environment**
   Rename the .env.example to .env

1. **Install Dependencies**  
   Open a terminal in the project root directory and install the required dependencies:

   ```bash
   nvm use 20.13
   npm install

   ```

2. **Create a Database**
   create a postgresql database and enter the db name in the .env

3. **Run Redis**  
   Open a terminal in the project root directory and run the following command:

   ```bash
   docker compose up

   ```

4. **RUN the app**
   CD into project root and RUN **npm run start:dev** Command and that's it. project should be up and running.

**HAPPY TESTING**
