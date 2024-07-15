---

# StockTicker

StockTicker is a Next.js application that displays real-time prices of five most popular cryptocurrencies: Bitcoin, Ethereum, Tether, Solana and Dogecoin. The application updates prices every 10 seconds, fetching data from [`api.livecoinwatch.com`](https://www.livecoinwatch.com/tools/api) and storing it in a MongoDB database. It features a simple UI with a table for displaying cryptocurrency prices and a modal for selecting a specific cryptocurrency.

## Features

- Real-time price updates every 10 seconds 

- Supports Bitcoin, Ethereum, Tether, Solana and Dogecoin

- Simple and intuitive UI with a modal for coin selection

- Uses Redux for state management

- Dockerized application for easy setup and deployment

## Prerequisites

- Docker installed on your machine. If you don't have Docker, follow the installation guide [here](https://docs.docker.com/get-docker/).

## Setup and Running Locally

1. Clone the repository to your local machine

2. Navigate to the project directory

3. Ensure Docker is running on your machine

4. Run the following command to build and start the application:

```shell
docker compose up --build
```

5. Once the build is complete, the application will be accessible at `http://localhost:3000`

## Application Structure

### Frontend

The frontend of the StockTicker application is built using Next.js providing a fast and responsive user interface. It leverages Redux for comprehensive state management across the application, ensuring that the UI remains consistent with the application's state. The main components of the frontend include:

- **Price Display Table**: At the heart of the UI is a table that displays the real-time prices of the selected cryptocurrency. The table's first row serves as a header, showing the currently selected coin and a button to open the modal for coin selection. The second row contains column headers for "Timestamp" and "Price". The table then lists the most recent 20 prices fetched from the MongoDB database,  updating in real-time every 10 seconds as new data is available. Timestamps are displayed in the local string format, and prices are shown in USD with two decimal precision.

- **Coin Selection Modal**: A simple yet functional modal that allows user to change the cryptocurrency they wish to track. It contains a brief message prompting the user to select a coin and a dropdown list of available cryptocurrencies(Bitcoin, Ethereum, Tether, Solana, Dogecoin). The modal also features a close button(represented by a &times; symbol) that closes the modal upon clicking. Selecting a coin from the dropdown automatically updates the table with the selected coin's price data and closes the modal.

- **Styling**: The frontend does not rely on external libraries for its styling. Instead, it uses straightforward CSS for styling the table and modal, ensuring a clean and minimalistic design that focuses on functionality and ease of use. All the styles are stored in the `src/styles` folder.

- **State Management with Redux**: The application state,  including the selected cryptocurrency, price data, and modal visibility, is managed using Redux. This setup is centralized in the `src/store` folder, which contains the `store.ts` for creating the store and combining reducers, `actions.ts` for defining the actions that can be dispatched to update the application's state, and `reducer.ts` for handling state updates based on the dispatched actions. This approach ensures that the application's state is easily manageable and scalable.

### Backend

A simple Express.js server in the `server` folder, polls the [`livecoinwatch`](https://www.livecoinwatch.com/tools/api) API for the latest prices and stores them in a MongoDB database. It also serves the latest prices to the frontend via a server-sent-events API.

### Database

MongoDB is used for storing price data. The database setup is included in the `docker-compose.yaml` file, requiring no additional configuration.

## API Key

The application uses the [`livecoinwatch`](https://www.livecoinwatch.com/tools/api) API to fetch cryptocurrency prices. An API key is required and included in the `server/index.js` file. This  key allows for 10,000 requests per day. The API requires the following parameter in a POST request:

- `currency`: "USD"
- `code`: Symbol of the cryptocurrency (eg., "BTC" for Bitcoin)
- `meta`: `false`

## Changing the Polling Interval

To change the polling interval, modify the `setInterval` function call in the `server/index.js` file. The default interval is set to 10 seconds.

## Redux State Management

The application uses Redux for managing all states, including selected cryptocurrency, price data, and modal state. The Redux setup is located in the `src/store` folder, which contains:

- `store.ts`: Logic for creating the store and combining reducers
- `actions.ts`: Actions that can be dispatched to update the application state
- `reducer.ts`: Reducer functions that update the state based on dispatched actions

## Known Limitations

The application is designed to be straightforward and does not have any known limitations regarding the setup and running. All dependencies are handled through Docker, ensuring a smooth setup process.

---
