import { createReducer } from "@reduxjs/toolkit";
import { setMangas, setChapters, setPagination } from "../actions/manga.js";

const initialState = {
  manga: {},
  chapters: [],
  pagination: {
    prev: false,
    next: true,
    currentPage: 1
  }
}

  const mangaReducer = createReducer(initialState, (builder) => { 
    builder
      .addCase(setMangas, (state, action) => {
        const newState = {
          ...state,
          manga : action.payload
        }
        return newState
      })
      .addCase(setChapters, (state, action) => {
        const newState = {
          ...state,
          chapters : action.payload
        }
        return newState
      })
      .addCase(setPagination, (state, action) => {
        const newState = {
          ...state,
          pagination : action.payload
        }
        return newState
      })
  })

export default mangaReducer