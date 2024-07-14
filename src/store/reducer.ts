import { ActionTypes } from "./actions"
import { StockData, StockState } from "@/types"

const initialState: StockState = {
    data: [],
    error: null,
    selectedStock: "BTC",
    showModal: false,
}

type Action =
    | { type: ActionTypes.ADD_STOCK_DATA; payload: StockData }
    | { type: ActionTypes.STOCK_DATA_ERROR; payload: string | null }
    | { type: ActionTypes.SELECTED_STOCK; payload: string }
    | { type: ActionTypes.SHOW_MODAL; payload: boolean }

const stockReducer = (state = initialState, action: Action): StockState => {
    switch (action.type) {
        case ActionTypes.ADD_STOCK_DATA:
            return { ...state, data: [action.payload, ...state.data.slice(0, 19)], error: null }

        case ActionTypes.STOCK_DATA_ERROR:
            return { ...state, error: action.payload }

        case ActionTypes.SELECTED_STOCK:
            return { ...state, selectedStock: action.payload, data: [] }

        case ActionTypes.SHOW_MODAL:
            return { ...state, showModal: action.payload }

        default:
            return state
    }
}

export default stockReducer
