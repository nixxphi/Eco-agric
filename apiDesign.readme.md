

## API Design Document: Evergreen

### Introduction

Evergreen is an API that provides users with plant recommendations based on soil type and location. It enables users to register, login, and fetch personalized plant suggestions tailored to their geographical area.

### Base URL

The base URL for accessing the Evergreen API is `https://evergreen-api.com`.

### Authentication

Evergreen API requires authentication for certain endpoints. Authentication is done via JWT (JSON Web Tokens). Users must register and login to obtain a token, which they can then use to access protected endpoints.

### Endpoints

#### User Registration

- **Endpoint**: `/api/register`
- **Method**: `POST`
- **Description**: Register a new user with Evergreen.
- **Request Body**:
  ```json
  {
    "username": "user123",
    "password": "password123",
    "location": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  }
  ```
- **Response**:
  - Status: `201 Created`
  - Body:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "username": "user123",
        "location": {
          "latitude": 37.7749,
          "longitude": -122.4194
        }
      }
    }
    ```

#### User Login

- **Endpoint**: `/api/login`
- **Method**: `POST`
- **Description**: Log in an existing user with Evergreen.
- **Request Body**:
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```
- **Response**:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "message": "User logged in successfully",
      "user": {
        "username": "user123",
        "location": {
          "latitude": 37.7749,
          "longitude": -122.4194
        }
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMjMiLCJpYXQiOjE2MTUwNTI0MjQsImV4cCI6MTYxNTA1NjAyNH0.aN_Fu2MjxTvYfCDNCtLtkFWUnU2_oF-ySZ3WxS8FVPs"
    }
    ```

#### Get Plant Recommendations

- **Endpoint**: `/api/plants`
- **Method**: `GET`
- **Description**: Get plant recommendations based on the user's location.
- **Authorization**: Bearer token
- **Response**:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "plants": [
        {
          "name": "Lavender",
          "description": "Lavender thrives in sandy soil and full sunlight.",
          "careInstructions": "Water deeply but infrequently and trim after flowering."
        },
        {
          "name": "Rosemary",
          "description": "Rosemary prefers well-drained sandy soil and full sun.",
          "careInstructions": "Water moderately and prune regularly to maintain shape."
        },
        ...
      ]
    }
    ```

#### Get Plant Recommendations by Location

- **Endpoint**: `/api/plants/location`
- **Method**: `GET`
- **Description**: Get plant recommendations based on a specific location.
- **Authorization**: Bearer token
- **Query Parameters**:
  - `latitude`: Latitude of the location.
  - `longitude`: Longitude of the location.
- **Response**:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "plants": [
        {
          "name": "Lavender",
          "description": "Lavender thrives in sandy soil and full sunlight.",
          "careInstructions": "Water deeply but infrequently and trim after flowering."
        },
        {
          "name": "Rosemary",
          "description": "Rosemary prefers well-drained sandy soil and full sun.",
          "careInstructions": "Water moderately and prune regularly to maintain shape."
        },
        ...
      ]
    }
    ```

### Error Handling

Evergreen API returns appropriate HTTP status codes and error messages in case of errors. Common error scenarios include invalid input, unauthorized access, and internal server errors.

- **400 Bad Request**: Invalid request format or missing required parameters.
- **401 Unauthorized**: Access to protected endpoints without a valid authentication token.
- **404 Not Found**: Endpoint or resource not found.
- **500 Internal Server Error**: Unexpected server error occurred.
