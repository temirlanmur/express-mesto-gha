[![Tests](https://github.com/temirlanmur/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/temirlanmur/express-mesto-gha/actions/workflows/tests-13-sprint.yml)
[![Tests](https://github.com/temirlanmur/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/temirlanmur/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Mesto express backend


## Project structure

`/routes` — route files and main router  
`/controllers` — user and card controller functions  
`/models` — model schemas  
`/middlewares` — error handlers and authorization middleware  
`/utils` — utility classes: API models and custom errors  


## Commands

`npm run start` — start server  
`npm run dev` — start server with hot-reload  
`npm run lint` — start linter  


## Technology

- Custom error handling
- Async controller function
- JWT based authentication
- Token gets stored in http only cookie in production
- MongoDB store
- Joi and celebrate for request input validation
- Basic security: helmet and express-rate-limit
