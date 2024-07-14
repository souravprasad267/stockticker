export interface StockData {
    name: string
    symbol: string
    price: number
    timestamp: Date
}

export interface StockState {
    data: StockData[]
    error: string | null
    selectedStock: string
    showModal: boolean
}
