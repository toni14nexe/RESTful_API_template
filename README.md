# RESTful API app basic template

Express Node JS RESTful API app ready to get on the server with example routes
for debts and users. Access to certain routes requires a token authentication

- some routes are protected with auth middleware. It's connected to MongoDB
  Atlas cluster as database.

## Setup and installation

- Install all dependencies: `npm install`
- After installation run API: `npm run start`
- API is starting on port 3000: http://localhost:3000

## Project dependencies

Node JS with dependencies:

- Express - Web framework
- Morgan - HTTP request logger middleware
- Mongoose - MongoDB object modeling tool
- JsonWebToken - Token authentication
- DotEnv - .env variables
- BodyParser - Body parsing middleware
- BCrypt - Password cryption and decryption

## .env

.env file using is enabled using the DotEnv package.

- .env file EXAMPLE:

  - MONGO_USERNAME = "`<mongoUsername>`"
  - MONGO_PASS = "`<mongoPassword>`"
  - MONGO_LINK = "`<mongoClusterLink>`"
  - TOKEN_SECRET_KEY = "`<cryptSecretKey>`"

- MONGO_USERNAME = username for connecting to MongoDB Atlas Cluster
- MONGO_PASS = password for connecting to MongoDB Atlas Cluster
- MONGO_LINK = MongoDB Atlas Cluster connection link
- TOKEN_SECRET_KEY = secret key for crypting and decrypting passwords - used
  by BCrypt

## API explanation

### Datatypes

API have two data types (debts and users). For every data type main route
options are in folder routes. Functions for connecting and manipulating to
database are called from controllers while type models are descripted in
models repository.

### Routes

#### Route availability

##### Without authorization:

- POST login
- POST signup
- GET all debts
- GET one debt - by id

##### Authorization required:

- POST debt
- PATCH debt - changing `done` state
- DELETE debt
- GET all users
- GET one user - by id
- DELETE user

#### Route approach

##### Debts

- GET all debts - GET `<URL prefix>/debts/`
- GET one debt - GET `<URL prefix>/debts/<debtId>`
- POST debt - POST `<URL prefix>/debts/`
  - Require header parameters:
    Name: `Authorization`, value: `Bearer <token>`
  - Body parameters:
    {
    "name": "Debtors Name",
    "date": "date string",
    "description": "Some debt description.",
    "done": true - optional, default: `false`
    }
- PATCH debt - PATCH `<URL prefix>/debts/<debtId>` - changing `done` state
  - Require header parameters:
    Name: `Authorization`, value: `Bearer <token>`
- DELETE debt - DELETE `<URL prefix>/debts/<debtId>`
  - Require header parameters:
    Name: `Authorization`, value: `Bearer <token>`

##### Users

- POST login - POST `<URL prefix>/users/login`
  - Body parameters:
    {
    "username": "yourUsername",
    "password": "yourPassword"
    }
- POST signup - POST <URL prefix>/users/signup
  - Body parameters:
    {
    "username": "newUsername",
    "password": "newPassword",
    "role": "userRole" -> optional
    }
- GET all users - GET `<URL prefix>/users/`
  - Require header parameters:
    Name: `Authorization`, value: `Bearer <token>`
- GET one user - GET `<URL prefix>/users/<userId>`
  - Require header parameters:
    Name: `Authorization`, value: `Bearer <token>`
- DELETE one user - DELETE `<URL prefix>/users/<userId>`
  - Require header parameters:
    Name: `Authorization`, value: `Bearer <token>`

### Database

Database is connected to free MongoDB Atlas cluster through env variables:
https://www.mongodb.com/

### Middleware - Authentication

File authCheck.js represents authentification middleware and it's blocking
unauthorized users from API routes access.

- Used only on routes that require protection against unauthorized access

#### Password cryption and decryption

Password encryption is enabled using the BCrypt package. The encrypted
password is saved in the database, and during the verification itself, the
data is re-encrypted and compared with those from the database, thus
authorizing the user.

### Authorization

Authorization is enabled using the JsonWebToken package. A token is used that
is created from the user's data. Connecting to route require:

- Request header - `Authorization` with string `Token` (or some other string
  without space), then space, then token. EXAMPLE:
  `Token abcdefgijk123456789...wxyz`

### Models

#### Debt model

- \_id: generated id by mongoose
- name: string, required
- done: boolean, default: `false`
- date: string, required
- description: string, required

#### User model

- \_id: generated id by mongoose
- role: string, default: `"user"`
- username: string, required
- password: string, required

### Error handling

Error handling is basic. crucial things are not allowed and they are taken
care of. Errors were added when retrieving data from routes for easier
frontend handling.
