# Evergreen API Design Document

## Overview

The Evergreen API, an indispensable tool in agricultural innovation, offers a robust platform for accessing comprehensive agricultural data and services. Designed to empower users with tailored insights into crop cultivation, soil management, climate adaptation, and more, the Evergreen API serves as a vital resource for farmers, researchers, and enthusiasts alike. With its seamless integration of user, climate, location-based functionalities, and external APIs, the Evergreen API revolutionizes the way agricultural decisions are made.

## Base URL

The Evergreen API operates on the following base URL:

```
https://evergreen-api.com/api/v1
```

## Authentication

Access to the Evergreen API does not require authentication for public endpoints. However, certain endpoints may necessitate authentication for specific operations such as creating or updating user data.

## Endpoints

### User Management

#### `POST /users`

- **Description**: Registers a new user with the Evergreen API.
- **Request Body**:
  - `username` (string): The username of the new user.
  - `password` (string): The password of the new user.
  - `location` (object): The geographic location of the user.
    - `latitude` (float): The latitude coordinate of the location.
    - `longitude` (float): The longitude coordinate of the location.
- **Response**:
  - Status: 201 Created
  - Body: JSON object containing user data, including username and location.

#### `GET /users/{userId}`

- **Description**: Retrieves user data by user ID.
- **Parameters**:
  - `userId` (string): The unique identifier of the user.
- **Response**:
  - Status: 200 OK
  - Body: JSON object containing user data, including username and location.

### Climate Information

#### `GET /climate`

- **Description**: Retrieves climate information for a given location.
- **Parameters**:
  - `latitude` (float): The latitude coordinate of the location.
  - `longitude` (float): The longitude coordinate of the location.
- **Response**:
  - Status: 200 OK
  - Body: JSON object containing climate data for the specified location.

#### Example:

```
GET /climate?latitude=37.7749&longitude=-122.4194
```

### Soil Information

#### `GET /soil`

- **Description**: Retrieves soil information for a given location.
- **Parameters**:
  - `latitude` (float): The latitude coordinate of the location.
  - `longitude` (float): The longitude coordinate of the location.
- **Response**:
  - Status: 200 OK
  - Body: JSON object containing soil data for the specified location.

#### Example:

```
GET /soil?latitude=37.7749&longitude=-122.4194
```

### Crop Data

#### `GET /crops/{cropName}`

- **Description**: Retrieves detailed information about a specific crop by its name.
- **Parameters**:
  - `cropName` (string): The name of the crop to retrieve information for.
- **Response**:
  - Status: 200 OK
  - Body: JSON object containing crop data, including name, description, care instructions, and other pertinent information.

#### `GET /crops/search`

- **Description**: Allows users to search for crops based on specific criteria such as climate, soil type, growth requirements, etc.
- **Parameters**:
  - `climate` (string, optional): The climate conditions suitable for the crop (e.g., tropical, temperate, arid).
  - `soilType` (string, optional): The type of soil suitable for the crop (e.g., sandy, clay, loamy).
  - `growthRequirements` (string, optional): Specific growth requirements of the crop (e.g., full sun, partial shade, acidic soil).
- **Response**:
  - Status: 200 OK
  - Body: JSON array containing a list of crops matching the search criteria.

#### `GET /recommendations`

- **Description**: Retrieves a list of recommended crops based on given conditions such as soil type, climate, and location.
- **Parameters**:
  - `latitude` (float): The latitude coordinate of the location.
  - `longitude` (float): The longitude coordinate of the location.
- **Response**:
  - Status: 200 OK
  - Body: JSON array containing a list of recommended crops for the specified location.

## Data Format

All data exchanged with the Evergreen API adheres to the JSON format.

### User Data Structure

```json
{
  "username": "john_doe",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

### Climate Data Structure

```json
{
  "temperature": 25,
  "humidity": 70,
  "precipitation": "low"
}
```

### Soil Data Structure

```json
{
  "type": "sandy",
  "ph": 6.5,
  "moisture": "dry"
}
```

### Crop Data Structure

```json
{
  "name": "Wheat",
  "description": "Wheat is a cereal grain that is a staple food in many parts of the world.",
  "careInstructions": "Plant wheat seeds in well-drained soil and ensure adequate watering during the growing season."
}
```

## Error Handling

The Evergreen API follows standard HTTP status codes to convey the success or failure of requests. In the

 event of an error, the API responds with an appropriate HTTP status code accompanied by an error message in the response body.

## Rate Limiting

To maintain fair usage of resources and prevent abuse, the Evergreen API enforces rate limits on the number of requests. These rate limits are subject to adjustment and are applied per API key or IP address.

## External APIs

The Evergreen API integrates with several external APIs to provide additional functionalities:

- **OpenWeatherMap API**: Used to retrieve climate information based on latitude and longitude coordinates.
  - Endpoint: `https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API key}`

- **Google Maps API**: Utilized to fetch map images of specified locations.
  - Endpoint: [Google Maps Static API](https://developers.google.com/maps/documentation/maps-static/overview)

- **ISRIC SoilGrids API**: Accessible to retrieve soil information based on geographic coordinates.
  - Endpoint: `https://rest.isric.org/soilgrids/v2.0/`

- **FAO BigQuery API**: Provides crop data and information for agricultural analysis and research.
  - Endpoint: `https://api.data.apps.fao.org/api/v2/bigquery?sql_url=https://data.apps.fao.org/catalog/dataset/86b7daf0-4fae-450b-b88f-76690e2fdc17/resource/0026de2e-c12c-457c-b4f5-8c4cd2ef7960/download/crop-calendar-parameterized-query.sql&crop_process=all&crop=all&download=true`

## Conclusion

The Evergreen API emerges as a pivotal resource in the realm of agriculture, offering a wealth of information and services to support crop cultivation, soil management, climate adaptation, and more. With its user-centric design, seamless integration of external APIs, and robust functionality, the Evergreen API propels agricultural innovation forward, empowering users to make informed decisions and achieve sustainable agricultural practices.
