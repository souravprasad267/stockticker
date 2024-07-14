import { StockData } from "@/types"

export enum ActionTypes {
    ADD_STOCK_DATA = "ADD_STOCK_DATA",
    STOCK_DATA_ERROR = "STOCK_DATA_ERROR",
    SELECTED_STOCK = "SELECTED_STOCK",
    SHOW_MODAL = " SHOW_MODAL",
}

export const addStockData = (data: StockData) => ({
    type: ActionTypes.ADD_STOCK_DATA,
    payload: data,
})

export const stockDataError = (error: string) => ({
    type: ActionTypes.STOCK_DATA_ERROR,
    payload: error,
})

export const setSelectedStock = (selectedStock: string) => ({
    type: ActionTypes.SELECTED_STOCK,
    payload: selectedStock,
})

export const setShowModal = (showModal: boolean) => ({
    type: ActionTypes.SHOW_MODAL,
    payload: showModal,
})
