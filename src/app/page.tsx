"use client"
import { Provider } from "react-redux"
import store from "../store/store"
import StockPage from "@/components/StockPage"

export default function Home() {
    return (
        <main>
            <Provider store={store}>
                <StockPage />
            </Provider>
        </main>
    )
}
