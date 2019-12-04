# Gantri_backend_project
Use Tate Modern art data set to create an API that allows user to create users, view art data and create a comment for each art entry.

# Table of Contents
1. [Getting Started](#Getting-Started)
1. [API Endpoints](#API-Endpoints)

# Getting Started

To run this project, install it locally following the instructions below.

### Prerequisites:

- Navigate to https://github.com/primanbo/Gantri_backend_project and fork the repository to your personal Github account.
- Open a new terminal and clone the forked repository

```
git clone https://github.com/YOUR-GIT-HANDLE/Gantri_backend_project
```
- Navigate to the newly created directory
```
cd Gantri_backend_project/
```

### Installing Dependencies:

From within the root directory:

```sh
npm install
```
An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 8.16.0

### Startup:

#### Start server
- In a new terminal, navigate to project's root directory
- Run `npm run start-server`
- Keep this terminal window open to keep server running

#### Start database
- Start a PostgreSQL database server
- From this repository's local root directory, create a `.env` file with the following content
  ```sh
  DB_USER=user
  DB_PASSWORD=password
  DB_HOST=localhost
  DB_PORT=5432
  DB_DATABASE=art_api
  PORT=4000

  // Replace user and password with your own Postgres username and password
  // Save this file
  ```

- In a terminal, navigate to project's root directory
- Run `npm run start-db` to migrate schema to database

#### Other scripts
Run scripts by navigating to this project's root directory from the terminal and entering `npm run <script name>`.


# API Endpoints

- /api/art - GET, view the entire art data set
- /api/art/ID - GET, view art data by ID
- /api/art/ID/comments - POST, add a comment for an art data entry
```
Data to send when creating a new comment
- userID: STRING, optional
- name: STRING, required if no user ID is sent,
- content: STRING, required
```
- /api/users - POST, create user
```
Data to send when creating a new user
- name: STRING, required
- age: INTEGER, required
- location: STRING, required
```
- /api/users - GET, see all users