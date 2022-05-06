import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  globalCryptoStats: {},
  coins: [],
  searchCoin: [],
  searchText: '',
  loading: true,
}

const cryptosSlice = createSlice({
  name: 'cryptos',
  initialState,
  reducers: {
    setGlobalCryptoStats: (state, action) => {
      state.globalCryptoStats = action.payload
    },
    setCoins: (state, action) => {
      state.coins = action.payload
    },
    searchCoin: (state, action) => {
      state.searchCoin = action.payload
    },
    searchText: (state, action) => {
      state.searchText = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const {
  setGlobalCryptoStats,
  setCoins,
  setLoading,
  searchCoin,
  searchText,
} = cryptosSlice.actions

export default cryptosSlice.reducer
