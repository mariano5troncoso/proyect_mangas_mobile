import { createReducer } from "@reduxjs/toolkit";
import { chapterDataAction } from "../actions/chapters";

let initialState = {
  title: "",
  number: 1,
};
const reducer = createReducer(initialState, (builder) =>
  builder.addCase(chapterDataAction, (state, action) => {
    const newState = {
      ...state, // operador spread copia propiedades del estado actual
      title: action.payload.title,
      number: action.payload.number,
    };

    return newState;
  })
);
export default reducer;