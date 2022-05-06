import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  news: [],
  loading: true,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setNews, setLoading } = newsSlice.actions

export default newsSlice.reducer
