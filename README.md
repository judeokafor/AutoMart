# AutoMart

[![Coverage Status](https://coveralls.io/repos/github/judeokafor/AutoMart/badge.svg?branch=Develop)](https://coveralls.io/github/judeokafor/AutoMart?branch=Develop)
![Build Status](https://travis-ci.org/judeokafor/AutoMart.svg?branch=Develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/1ad7219a7366249e0b59/maintainability)](https://codeclimate.com/github/judeokafor/AutoMart/maintainability)

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type.
Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Testing](#testing)
  - [Development](#development)

### Pivotal Tracker

Project is currently being built with the Project Management Tool, Pivotal Tracker.
You can find the template at [https://www.pivotaltracker.com/n/projects/2346025](https://www.pivotaltracker.com/n/projects/2346025)

### Template

Template is hosted at [AutoMart Github Pages](https://judeokafor.github.io/AutoMart/)

### API Deployment

API is deployed at [AutoMart Heroku App](https://auto-mart01.herokuapp.com/)

### Documentation

Documentation was done with swagger and hosted at [SwaggerHub](https://app.swaggerhub.com/apis-docs/AutoMart/auto-mart/1.0.0)

## Technologies

- [NodeJS](https://nodejs.org/) - Runtime Environment
- [ExpressJs](https://expressjs.com/) - Web Application Framework
- [NPM](https://www.npmjs.com/) - Dependency Manager
- [HTML](https://www.w3c.com/) - Hyper Text Markup language
- [CSS](https://www.w3c.com/) - Casacading Style Sheet

## Requirements

- Node.js v10.x or higher
- npm
- Postgres Sql instance (local or remote)

### Supporting Packages

#### Linter(s)

- [ESLint](https://eslint.org/) - Linter Tool to adhere to standards using AirBnB.

#### Compiler

- [Babel](https://babel.io/) - Compiler for Next Generation JavaScript

#### Continous Integration

- [Travis](https://travis-ci.org/) - Travis CI supports your development process by automatically building and testing code changes

#### Code Climate

- [Code Climate](https://codeclimate.com) - Actionable metric for engineering leaders, checks maintainability status and test coverage.

## Test Tools

- [Mocha](https://mochajs.org/) - Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun
- [Chai](https://www.chaijs.com) - TDD/BDD Assertion Library for Node, HTTP integration testing with Chai assertions.

## Features

### Users

- User can sign up and sign in.
- User (seller) can post a car sale advertisement.
- User (buyer) can make a purchase order.
- User (buyer) can update the price of his/her purchase order.
- User (seller) can mark his/her posted AD as sold.
- User (seller) can update the price of his/her posted AD.
- User can view a specific car, view all unsold cars, all unsold cars within a price range, all cars of a specific body type, all unsold cars of a specific make (manufacturer), all used unsold cars, all new unsold cars.
- User can reset password.
- User can flag/report a posted AD as fraudulent.

### Admin

- User(admin) can delete a posted AD record.
- User (admin) can view all posted ads whether sold or unsold.

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th></tr>
<tr><td>POST</td><td>api/v2/auth/signUp</td><td>Creates a new user</td></tr>
<tr><td>POST</td><td>api/v2/auth/signIn</td><td>User login</td></tr>
<tr><td>GET</td><td>/api/v2/auth</td><td>User profile details</td></tr>
<tr><td>POST</td><td>/api/v2/users/<:user-email>/reset_password</td><td>User password reset</td></tr>
<tr><td>POST</td><td>/api/v2/flag</td><td>Flag fradulent advert</td></tr>
<tr><td>GET</td><td>/api/v2/flag</td><td>View all fradulent advert</td></tr>
<tr><td>POST</td><td>/api/v2/car</td><td>Post a car advert</td></tr>
<tr><td>GET</td><td>/api/v2/car</td><td>View all adverts</td></tr>
<tr><td>PATCH</td><td>/api/v2/car/<:id>/status</td><td>Update an advert status</td></tr>
<tr><td>PATCH</td><td>/api/v2/car/<:id>/price</td><td>Update an advert price</td></tr>
<tr><td>DELETE</td><td>/api/v2/car/<:id></td><td>Delete a specific car</td></tr>
<tr><td>GET</td><td>/api/v2/car/<:id></td><td>View a specific car</td></tr>
<tr><td>GET</td><td>/api/v2/car?status=available</td><td>All available cars</td></tr>
<tr><td>GET</td><td>/api/v2/car?status=available&min=xxx_value&max=xxx_value</td><td>All available cars within a price range</td></tr>
<tr><td>GET</td><td>/api/v2/car?status=available&manufacturer=<:manufacturer></td><td>All available cars from a specific manufacturer</td></tr>
<tr><td>GET</td><td>/api/v2/car?status=available&state=used</td><td>All available cars with a used condition</td></tr>
<tr><td>GET</td><td>/api/v2/car?status=available&state=new</td><td>All available cars with a new condition</td></tr>
<tr><td>GET</td><td>/api/v2/car?bodyType=<:bodyType></td><td>All cars with a specific body type</td></tr>
<tr><td>POST</td><td>/api/v2/order</td><td>Create a buy order</td></tr>
<tr><td>PATCH</td><td>/api/v2/order/<:id>/price</td><td>Update the price of a buy order</td></tr>
</table>

## Getting Started

### Installation

- git clone
  [AUTOMART](https://github.com/judeokafor/AutoMart.git)
- Run - npm install to install packages
- Run npm run build to build the project
- Run npm run dev to start the server for development
- Run npm start to start the server for production
- Navigate to [localhost:8080](http://localhost:8080/) in browser to access the
  application

**NOTE:** Create a `.env` file configuration following the `.sample.env`.

### Testing

#### Prerequisites

- [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

- After installing as shown above
- Navigate to [localhost:8080](http://localhost:8080/) in
  [Postman](https://getpostman.com/) to access the application

#### Testing with Coverage Data

- After installing as shown

- Run npm test
- It will lint code, run test and display coverage data as generated by
  [nyc](https://github.com/nyc)

### Development

You can run npm run dev in development to use [Nodemon](https://nodemon.io/)

[Nodemon](https://nodemon.io/) restarts your code after a file change or type 'rs' to restart.
