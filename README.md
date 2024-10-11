# Crypto Stats API

This project is an API service that fetches cryptocurrency data from the CoinGecko API, stores it in a MongoDB database, and provides endpoints to retrieve the latest cryptocurrency stats and calculate the standard deviation of a cryptocurrency's price from the last 100 records.

## Technologies Used

- **Node.js**: Backend JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling tool
- **MongoDB**: Database for storing cryptocurrency data
- **CoinGecko API**: Source of cryptocurrency data
- **Axios**: HTTP client for fetching data from CoinGecko
- **Node-cron**: Scheduler for periodic background tasks

## Features

- Fetches real-time cryptocurrency data from the CoinGecko API.
- Stores cryptocurrency data (price, market cap, and 24h price change) in MongoDB.
- Provides API endpoints for retrieving the latest stats for a specific cryptocurrency.
- Calculates the standard deviation of cryptocurrency prices from the last 100 records stored.
- Background service automatically fetches and stores cryptocurrency data every 2 hours using a cron job.

## Project Structure

```
├── config
│   └── db.js                   # MongoDB connection setup
├── controllers
│   └── cryptoController.js      # Controllers for API endpoints
├── models
│   └── Crypto.js                # Mongoose schema for cryptocurrency data
├── routes
│   └── cryptoRoutes.js          # API route definitions
├── services
│   └── cryptoService.js         # Service to fetch data from CoinGecko API
├── app.js                       # Main entry point for the server
├── .env                         # Environment variables file (not included in repo)
└── package.json                 # Project dependencies
```

## API Endpoints

### `/api/stats`

- **Description**: Fetches the latest stats (price, market cap, and 24-hour price change) for a specific cryptocurrency.
- **Method**: `GET`
- **Query Params**:
  - `coin`: The ID of the cryptocurrency (e.g., `bitcoin`, `ethereum`).
- **Example Request**:
  ```
  GET /api/stats?coin=bitcoin
  ```
- **Example Response**:
  ```json
  {
    "price": 60564.5,
    "marketCap": 1000000000,
    "change24h": 2.5
  }
  ```

<img width="1552" alt="Screenshot 2024-10-11 at 11 26 19 AM" src="https://github.com/user-attachments/assets/34114272-b34b-4052-9cd9-451b6add26df">

### `/api/deviation`

- **Description**: Calculates the standard deviation of the price of a specific cryptocurrency over the last 100 records.
- **Method**: `GET`
- **Query Params**:
  - `coin`: The ID of the cryptocurrency (e.g., `bitcoin`, `ethereum`).
- **Example Request**:
  ```
  GET /api/deviation?coin=bitcoin
  ```
- **Example Response**:
  ```json
  {
    "deviation": "4082.48"
  }
  ```

<img width="1552" alt="Screenshot 2024-10-11 at 11 26 31 AM" src="https://github.com/user-attachments/assets/a07ad7c2-0703-4671-a59d-cc4b69ee1b1c">

## Setup and Installation

### Prerequisites

- **Node.js** and **npm**: Ensure you have Node.js installed (version 14 or higher recommended).
- **MongoDB**: You will need a MongoDB instance running either locally or remotely.
- **CoinGecko API**: No API key is required to use CoinGecko.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/crypto-stats-api.git
   cd crypto-stats-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the project root and add the following variables:

```
MONGODB_URI=<your-mongodb-uri>
PORT=<optional-port-number>
```

Replace `<your-mongodb-uri>` with your actual MongoDB connection string.

## Running the Project

Start the server using:

```bash
node app.js
```

This will start the server and begin fetching cryptocurrency data. By default, the server will run on port 5000, but you can specify a different port in the `.env` file.

## Cron Job

The application uses `node-cron` to fetch cryptocurrency data every 2 hours. When the server starts, the following tasks occur:

- **Initial Data Fetch**: The server fetches and stores the latest data for all specified cryptocurrencies (e.g., Bitcoin, Ethereum, Matic).
- **Scheduled Fetch**: Every 2 hours, the server will automatically fetch new data and store it in the MongoDB database.

## Example API Requests

- **Fetch Latest Crypto Stats**:
  ```
  GET http://localhost:5000/api/stats?coin=bitcoin
  ```
  Example response:
  ```json
  {
    "price": 60564.5,
    "marketCap": 1000000000,
    "change24h": 2.5
  }
  ```
- **Fetch Standard Deviation for Last 100 Bitcoin Records**:
  ```
  GET http://localhost:5000/api/deviation?coin=bitcoin
  ```
  Example response:
  ```json
  {
    "deviation": "4082.48"
  }
  ```
---

## Notes

- Ensure your MongoDB instance is running before starting the server.
- The CoinGecko API fetches real-time cryptocurrency data, so ensure you have an active internet connection for the API service to work correctly.

