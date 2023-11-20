import { createAction } from "@reduxjs/toolkit";

export const chapterDataAction = createAction(
  `chapterData`, //nombre de la accion
  (object) => {
    return {
      payload: {
        number: object.page,
        title: object.title,
      },
    };
  }
);
// const actions = { chapterData };
// export default actions;