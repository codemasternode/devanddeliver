# devanddeliver

## Production build
1. `docker-compose -f docker-compose.production.yml up`

## Development build
1. `docker-compose up`

## Endpoints

POST /api/auth/sign-in
{
    "email":"email@gmail.com",
    "password": "Abcdef123!"
}

POST /api/auth/sign-up
{
    "email":"email@gmail.com",
    "password": "Abcdef123!"
}

POST /api/auth/logout

GET /api/user/profile

GET /api/user/films
GET /api/user/species
GET /api/user/vehicles
GET /api/user/starships

GET /api/user/films/:id
GET /api/user/species/:id
GET /api/user/vehicles/:id
GET /api/user/starships/:id