import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const read_comments = createAsyncThunk(
  'READ_COMMENTS',
  async (chapterId) => {
    try {
      const token = await getToken()
      let { data } = await axios.get(`https://mobile-minga-zarratea.onrender.com/api/comments?chapter_id=${chapterId}`, { headers: { Authorization: `Bearer ${token}` }})
      return data.comments
    } catch (error) {
      return { comments: [] }
    }
  }
)

const post_comments = createAsyncThunk(
  'POST_COMMENTS',
  async ({chapterId, datos}) => {
    try {
      const token = await getToken()
      let { data } = await axios.post(`https://mobile-minga-zarratea.onrender.com/api/comments?chapter_id=${chapterId}`, datos, { headers: { Authorization: `Bearer ${token}` }})
      return data.comment
    } catch (error) {
      return { comments: [] }
    }
  }
)

const setPaginationComments = createAsyncThunk(
  'SET_PAGINATION',
  async (paginationComments) => {
    try {
      return paginationComments
    } catch (error) {
      console.log(error)
    }
  }
)

const updateComment = createAsyncThunk(
  'UPDATE_COMMENTS',
  async ({commentId, text }) => {
    try{
      const token = await getToken()
      const { data } = await axios.put(`https://mobile-minga-zarratea.onrender.com/api/comments/${commentId}`, {text}, { headers: { Authorization: `Bearer ${token}` }})
      return data.comment
    } catch (error) {
      console.log(error)
      return { comments: [] }

    }
  }
)

const deleteComment = createAsyncThunk(
  'DELETE_COMMENTS',
  async (commentId) => {
    try{
      const token = await getToken()
      const { data } = await axios.delete(`https://mobile-minga-zarratea.onrender.com/api/comments/${commentId}`, { headers: { Authorization: `Bearer ${token}` }})
      return data.comments
    } catch (error) {
      console.log(error)
    }
  }
)

const commentActions = { read_comments, setPaginationComments, updateComment, post_comments, deleteComment }

export default commentActions
