# Notes Application

The Notes Application is a Node.js-based system designed to manage and store notes securely. It offers functionalities to create, read, update, and delete notes via a RESTful API.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Curl Commands](#curl-commands)
- [Allowed Users](#allowed-users)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Deployed API Link](#Deployed-Link)

## Introduction

The Notes Application is a built using Node.js and Express.js, designed to facilitate efficient note-taking functionalities. Leveraging MongoDB for data storage, it allows users to manage notes through a RESTful API while ensuring data security.

## Features

- **Create, Read, Update, Delete (CRUD) Operations**: Provides API endpoints to perform CRUD operations on notes.
- **User Authentication**: Implements user authentication using JSON Web Tokens (JWT) to secure API routes.

## Folder Structure

The application follows a well-organized folder structure:

```
notes-app/
│
├── controllers/
│   ├── authController.js
│   └── notesController.js
│
├── models/
│   └── Note.js
│
├── routes/
│   ├── authRoutes.js
│   └── notesRoutes.js
│
├── tests/
│   └── notes.test.js
│
├── app.js
└── .env
```

- **controllers**: Contains controller logic for authentication and notes.
- **models**: Defines the schema for the Note model.
- **routes**: Handles API endpoints for authentication and notes.
- **tests**: Includes test files for endpoint testing.
- **app.js**: Main entry point of the application.
- **.env**: Stores environment variables such as database credentials and tokens.

## Installation

To set up the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/saikrishnayadav764/notes-app.git`
2. Install dependencies: `npm install`
3. Configure environment variables: Create a .env file and define DB_URI = "mongodb+srv://naruto:naruto@cluster0.be644zi.mongodb.net/db?retryWrites=true&w=majority"
4. Start the server: `npm start`

## Usage

The server starts at http://localhost:3000 by running `npm start`. Once the server is running, you can access the defined API endpoints.

## API Endpoints

### Notes

- **GET /api/notes**: Retrieve all notes.
- **GET /api/notes/:id**: Retrieve a specific note by ID.
- **POST /api/notes**: Create a new note.
- **PUT /api/notes/:id**: Update a note by ID.
- **DELETE /api/notes/:id**: Delete a note by ID.

### Authentication

- **POST /api/login**: Authenticate users and generate JWT tokens.

## Curl Commands

Execute these `curl` commands in your terminal to interact with the API endpoints:

### Obtain Token (Login)

```bash
curl -X POST "http://localhost:3000/api/login" -H "Content-Type: application/json" -d "{\"username\": \"user1\", \"password\": \"password1\"}"
```

Replace `username` and `password` with the credentials of the allowed users.

### Create a Note

```bash
curl -X POST "http://localhost:3000/api/notes" -H "Content-Type: application/json" -H "Authorization: Bearer <Token>" -d '{"title": "New Note", "content": "This is a new note."}'
```

### Get All Notes

```bash
curl -X GET "http://localhost:3000/api/notes" -H "Authorization: Bearer <Token>"
```

### Get a Specific Note by ID

```bash
curl -X GET "http://localhost:3000/api/notes/:id" -H "Authorization: Bearer <Token>"
```

Replace `:id` with the actual ID of the note you want to retrieve.

### Update a Note by ID

```bash
curl -X PUT "http://localhost:3000/api/notes/:id" -H "Content-Type: application/json" -H "Authorization: Bearer <Token>" -d '{"title": "Updated Note", "content": "This note has been updated."}'
```

Replace `:id` with the actual ID of the note you want to update.

### Delete a Note by ID

```bash
curl -X DELETE "http://localhost:3000/api/notes/:id" -H "Authorization: Bearer <Token>"
```

Replace `:id` with the actual ID of the note you want to delete.

## Allowed Users

The application allows the following users to authenticate:

- Username: user1, Password: password1
- Username: user2, Password: password2

## Testing

The application includes comprehensive test suites to validate the implemented functionalities. To run the tests, use the command `npm test`.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Deployed Link

https://puce-aggressive-anemone.cyclic.app/api/notes

