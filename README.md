# acme reservations planner

![tested methods](https://i.imgur.com/b2pkMxl.png)
![data seeded](https://i.imgur.com/KLCEsPU.png)
![postman documentation](https://i.imgur.com/BT4Cc27.png)

## Overview

A RESTful API for managing restaurant reservations using Express.js and PostgreSQL. Provides full CRUD operations for customers, restaurants, and reservations with proper database relationships and error handling.

## Features

- View all customers and restaurants
- Create new reservations
- Delete existing reservations
- Maintain relational data integrity
- Robust error handling

## Technologies Used

- Node.js
- Express.js
- PostgreSQL

## API Endpoints

Base URL: `http://localhost:3000/api`

| Method | Endpoint                                   | Description            |
| ------ | ------------------------------------------ | ---------------------- |
| GET    | `/customers`                               | Get all customers      |
| GET    | `/restaurants`                             | Get all restaurants    |
| POST   | `/customers/:id/reservations`              | Create new reservation |
| DELETE | `/customers/:customer_id/reservations/:id` | Delete reservation     |

## Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/elvis-espinoza/)

✉️ elvis.espinoza.navarrete@outlook.com

## Acknowledgments

- Fullstack Academy instructors
