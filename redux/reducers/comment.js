import { createReducer } from "@reduxjs/toolkit"
import commentActions from "../actions/comment.js"

const {read_comments, setPaginationComments, updateComment, post_comments, deleteComment} = commentActions

const initialState = {
    comments: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalComments: 0,
      prev: false,
      next: false
    }
}

const commentReducer = createReducer(initialState, (builder) => { 
    builder
      .addCase(read_comments.fulfilled, (state, action) => {
        const newState = {
          ...state,
          comments : action.payload
        }
        return newState
      })
      .addCase(post_comments.fulfilled, (state, action) => {
        const newState = {
          ...state,
          comments : [...state.comments, action.payload]
        }
        return newState
      })
      .addCase(setPaginationComments.fulfilled, (state, action) => {
        const { currentPage, totalPages, totalComments, prev, next } = action.payload
        const newState = {
          ...state,
          pagination: { currentPage, totalPages, totalComments, prev, next }
        }
        return newState
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        let update = state.comments.map(comment => { 
          if(comment._id == action.payload._id){
            return action.payload
          }
          return comment
         }) 
        const newState = {
          ...state,
          comments : update
        }
        return newState
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const newState = {
          ...state,
          comments : action.payload
        }
        return newState
      })
  })

export default commentReducer