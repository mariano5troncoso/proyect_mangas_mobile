import { configureStore } from "@reduxjs/toolkit";
import mangasReducer from "../redux/reducers/mangas.js";
import mangaReducer from "./reducers/manga.js";
import authReducer from "./reducers/auth.js";
import commentReducer from "./reducers/comment.js";
import chapterReducer from "./reducers/chapter.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mangas: mangasReducer,
    manga: mangaReducer,
    comments: commentReducer,
    chapter: chapterReducer,
  },
})

export default store;
