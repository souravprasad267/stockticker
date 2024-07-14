import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"

// CONNNECTING TO THE DB
const MONGO_CONNECTION_STRING = "mongodb://mongo:27017"
const dbName = "stockData"
let dbInstance = null
const connectToDatabase = async () => {
    try {
        if (dbInstance) return dbInstance

        const client = new MongoClient(MONGO_CONNECTION_STRING)
        await client.connect()
        const db = client.db(dbName)
        console.log(`connected to db of length: ${dbName.length}`)

        dbInstance = { client, db }

        return dbInstance
    } catch (error) {
        console.log("error connecting to db: ", error)
    }
}

// FETCHING THE STOCK DATA FROM EXTERNAL API AND RETURN TO SUBSCRIBED FRONTEND API
const HOST = "https://api.livecoinwatch.com/coins/single"
const API_KEY = "3392e430-ab41-4864-97e2-d0cab8b819c1"
const cryptoCurrencies = [
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "USDT", name: "Tether" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "DOGE", name: "Dogecoin" },
]

const fetchAndStoreData = async () => {
    try {
        const { db } = await connectToDatabase()
        const collection = db.collection("prices")

        cryptoCurrencies.forEach(async (cryptoCurrency) => {
            console.log("calling api for: ", cryptoCurrency.name)

            const response = await fetch(new Request(HOST), {
                method: "POST",
                headers: new Headers({ "content-type": "application/json", "x-api-key": API_KEY }),
                body: JSON.stringify({ currency: "USD", code: cryptoCurrency.symbol, meta: false }),
            })

            const data = await response.json()
            const stockData = {
                name: cryptoCurrency.name,
                symbol: cryptoCurrency.symbol,
                price: data.rate,
                timestamp: new Date(),
            }
            if (stockData.price) {
                await collection.insertOne(stockData)
                broadcastData(stockData)
                console.log(`data for ${cryptoCurrency.name} stored successfully`)
            } else {
                console.log(`latest price for ${cryptoCurrency.name} unavailable`)
            }
        })
    } catch (error) {
        console.log("error fetching or storing data:", error)
    }
}
setInterval(fetchAndStoreData, 10000) //10sec polling

const broadcastData = (data) => {
    Object.keys(clients).forEach((clientId) => {
        const client = clients[clientId]

        if (client.symbol === data.symbol || client.symbol.length === 0) {
            client.response.write(`data:${JSON.stringify(data)}\n\n`)
        }
    })
}

// API FOR FETCHING THE STOCK DATA
const app = express()
const port = 3001
const clients = {}

app.get("/api/prices/:symbol", cors({ origin: "*" }), async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    res.setHeader("Content-Encoding", "none")

    try {
        const { symbol } = req.params
        const { db } = await connectToDatabase()
        const collection = db.collection("prices")
        const clientId = Date.now().toString()
        clients[clientId] = { response: res, symbol }

        const data = await collection.find({ symbol: symbol.toUpperCase() }).sort({ timestamp: -1 }).limit(20).toArray()
        data.reverse()
        data.forEach((individualData) => {
            res.write(`data: ${JSON.stringify(individualData)}\n\n`)
        })

        req.on("close", () => {
            console.log(`connection closed for ${clientId}`)
            delete clients[clientId]
        })
    } catch (error) {
        res.status(500).json({ messsage: "error fetching data:", error })
    }
})

app.listen(port, async () => {
    await connectToDatabase()
    console.log(`server listening on port ${port}`)
})
