<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Food Hunters</h1>

<p align="center">A full-featured RESTful API for restaurant discovery and social following, built with NestJS and MongoDB</p>

## Description

Food Hunters is a sophisticated platform that enables users to discover restaurants, follow their favorites, and get personalized recommendations based on shared culinary interests. The application leverages MongoDB's powerful geospatial queries and aggregation pipeline to deliver an engaging and personalized experience.

## Features Implemented

### Restaurant Management

**Restaurant Creation**

- Create new restaurants with detailed information:
  - Restaurant names in both Arabic and English
  - Unique slug identifier
  - Cuisine types (supporting 1-3 cuisines per restaurant)
  - Geolocation data for proximity searches

**Restaurant Listing & Filtering**

- List all restaurants in the system
- Filter restaurants by cuisine type

**Restaurant Detail Retrieval**

- Get detailed information about specific restaurants
- Support for lookup by either ID or slug (unique name)

**Nearby Restaurant Discovery**

- Find restaurants within a 1km radius using MongoDB's geospatial queries
- Location-aware search functionality

### User Interaction

**User Profile Management**

- Comprehensive user schema including:
  - Full name
  - Favorite cuisines

**Restaurant Following System**

- Robust relationship modeling:
  - Users can follow multiple restaurants
  - Restaurants can have multiple followers
  - Optimized database schema with appropriate indexing

**Personalized Recommendation Engine**

- Advanced recommendation system that:
  - Identifies users with similar culinary preferences
  - Aggregates followed restaurants from users with similar tastes
  - Returns both similar users and their followed restaurants
- Implemented using MongoDB's aggregation pipeline for efficient processing

## Technical Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Class-validator & class-transformer
- **Environment Management**: dotenv with NestJS ConfigModule

## API Documentation

The API is fully documented using Swagger & Postman.

After starting the application, you can access the interactive API documentation at:

```
http://localhost:3000/api
```

You can also import the Postman collection from the `postman` directory to explore the API endpoints interactively.
You can view the API documentation in your browser at:

```
https://documenter.getpostman.com/view/31783929/2sB34cohyh
```

## Key Endpoints

### Restaurants

- `POST /api/v1/restaurants` - Create a new restaurant
- `GET /api/v1/restaurants` - List all restaurants (with optional cuisine filtering)
- `GET /api/v1/restaurants/:id` - Get restaurant details by ID or slug
- `GET /api/v1/restaurants/nearby/:id` - Find restaurants within 1km of specified restaurant

### Users

- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users` - List all users
- `GET /api/v1/users/:id` - Get user details
- `GET /api/v1/users/:id/similar-recommendations` - Get users with similar tastes and their followed restaurants

### Following

- `POST /api/v1/users/:userId/restaurants/:restaurantId/follow` - Follow a restaurant
- `DELETE /api/v1/users/:userId/restaurants/:restaurantId/unfollow` - Unfollow a restaurant

## Data Models

### Restaurant

```typescript
{
  name_en: string;           // English name
  name_ar: string;           // Arabic name
  slug: string;              // Unique identifier
  cuisines: string[];        // 1-3 cuisine types
  location: {
    type: 'Point',
    coordinates: number[]    // [longitude, latitude]
  }
}
```

### User

```typescript
{
  fullName: string;
  favoriteCuisines: string[];
}
```

### Follow Relationship

```typescript
{
  userId: ObjectId // Reference to User
  restaurantId: ObjectId // Reference to Restaurant
}
```

## Project Setup

```bash
# install dependencies
$ npm install

# set up environment variables in .env
MONGODB_URI=your_mongodb_connection_string
PORT=3000

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Architecture

The application follows a modular architecture based on NestJS best practices:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and database interactions
- **DTOs**: Define data transfer objects for request/response validation
- **Entities**: Define MongoDB document schemas
- **Modules**: Organize related components

## License

This project is [MIT licensed](LICENSE).
