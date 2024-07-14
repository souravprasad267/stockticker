"use client"
import React, { useEffect } from "react"
import Modal from "@/components/Modal"
import "../styles/table.css"
import { useDispatch, useSelector } from "react-redux"
import { addStockData, stockDataError, setSelectedStock, setShowModal } from "@/store/actions"
import { StockData } from "@/types"
import { RootState } from "@/store/store"

const StockPage = () => {
    const dispatch = useDispatch()
    const { data: stockData, error, selectedStock, showModal } = useSelector((state: RootState) => state.stock)

    useEffect(() => {
        let eventSource: EventSource
        const connectSSE = () => {
            eventSource = new EventSource(`http://localhost:3001/api/prices/${selectedStock}`)

            eventSource.onmessage = (event) => {
                const newStockData = JSON.parse(event.data)
                dispatch(addStockData(newStockData))
            }

            eventSource.onerror = (error) => {
                dispatch(stockDataError(`Failed to connect to the server for stock data updates. Error: ${error} `))
                eventSource.close()
            }
        }
        connectSSE()

        return () => {
            if (eventSource) eventSource.close()
        }
    }, [selectedStock, dispatch])

    const handleSymbolSelection = (symbol: string) => {
        dispatch(setSelectedStock(symbol))
        dispatch(setShowModal(false))
    }

    return (
        <div>
            <h1 style={{ margin: "10px 28%" }}>Real-Time Price Data for 5 Most Popular Crypto Currencies</h1>
            {showModal && <Modal onConfirm={handleSymbolSelection} />}
            {error && <p>Error:{error}</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th colSpan={2}>
                            Current Cryptocurrency Selected: {selectedStock} <button onClick={() => dispatch(setShowModal(true))}>Change</button>
                        </th>
                    </tr>
                    <tr>
                        <th>TIMESTAMP</th>
                        <th>PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    {stockData.map((item: StockData, index: number) => (
                        <tr key={index}>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                            <td>{item.price?.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StockPage
