import { configureStore } from '@reduxjs/toolkit'
import cryptosReducer from '../features/cryptosSlice'
import newsReducer from '../features/newsSlice'

export const store = configureStore({
  reducer: {
    cryptos: cryptosReducer,
    news: newsReducer,
  },
})
