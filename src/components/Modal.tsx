import React from "react"
import "../styles/modal.css"
import "../styles/select.css"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setSelectedStock, setShowModal } from "@/store/actions"

const Modal = ({ onConfirm }: { onConfirm: any }) => {
    const { selectedStock } = useSelector((state: RootState) => state.stock)
    const dispatch = useDispatch()

    const cryptoCurrencies = [
        { symbol: "BTC", name: "Bitcoin" },
        { symbol: "ETH", name: "Ethereum" },
        { symbol: "USDT", name: "Tether" },
        { symbol: "SOL", name: "Solana" },
        { symbol: "DOGE", name: "Dogecoin" },
    ]

    const handleSymbolChange = (e: any) => {
        e.preventDefault()
        dispatch(setSelectedStock(e.target.value))
        dispatch(setShowModal(false))
    }

    const handleClose = (e: any) => {
        e.preventDefault()
        dispatch(setShowModal(false))
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>
                    &times;
                </span>
                <div className="checkbox-group">
                    <h2>Select Crypto Currency to fetch the latest price</h2>
                    <span>
                        <select className="select" onChange={handleSymbolChange} value={selectedStock}>
                            {cryptoCurrencies.map((cryptocurrency: { symbol: string; name: string }, index: number) => (
                                <option key={index} value={cryptocurrency.symbol}>
                                    {cryptocurrency.name}: {cryptocurrency.symbol}
                                </option>
                            ))}
                        </select>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Modal
