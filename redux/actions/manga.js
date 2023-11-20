import { createAction } from "@reduxjs/toolkit";

export const setMangas = createAction(
  'SET_MANGAS',
  (manga) => {
    return {
      payload: manga
    }
  }
)
export const setChapters = createAction(
  'SET_CHAPTERS',
  (chapters) => {
    return {
      payload: chapters
    }
  }
)
export const setPagination = createAction(
  'SET_PAGINATION',
  (pagination) => {
    return {
      payload: pagination
    }
  }
)
