import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { setUser } from '../../redux/actions/auth.js'
import { useDispatch, useSelector } from 'react-redux'
import { apiUrl, endpoints } from '../../utils/api.js'
import commentActions from '../../redux/actions/comment.js'
import axios from 'axios'

const ListComments = ({chapterId}) => {
  const [token, setToken] = useState(null);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const comments = useSelector((state) => state.comments.comments)
  const [commentText, setCommentText] = useState('');

  const { updateComment, deleteComment, read_comments } = commentActions
  const [editingCommentId, setEditingCommentId] = useState(null)

  const fetchUserData = async () => {
    try {
      const response = await axios.get(apiUrl + endpoints.signintoken, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { user } = response.data.response

      dispatch(setUser(user))
    } catch (error) {
      console.log(error)
    }
  }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', options)
    }

    const isAuthor = (comment) => {
    if (!user) return false;
    return comment.user_id.email === user;
    };


  const handleEditComment = (comment) => {
    setEditingCommentId(comment._id)
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null)
  }

  const handleSaveComment = (commentId) => {
    let datos = { text: commentText };
    dispatch(updateComment({ commentId, datos }));
    setCommentText('');
  }

  const handleDeleteComment = (commentId, chapterId) => {
    dispatch(deleteComment(commentId))
    dispatch(read_comments(chapterId))
  }

  useEffect(() => {
    if (!user) fetchUserData();
  }, [])

  return (
    <View>
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <View key={comment._id} style={styles.commentContainer}>
            <View style={styles.commentHeader}>
              {isAuthor(comment) && editingCommentId === comment._id ? (
                <View style={styles.editingComment}>
                  <TextInput value={commentText} onChangeText={(text) => setCommentText(text)} style={styles.editTextInput}/>
                  <TouchableOpacity onPress={() => handleSaveComment(comment._id)} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancelEdit} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                isAuthor(comment) && (
                  <View style={styles.commentActions}>
                    <TouchableOpacity onPress={() => handleEditComment(comment)} style={styles.editButton} >
                      <Text style={styles.editButtonText}>Edit</Text>
                      <Image source={require('../../assets/pencil.png')} style={styles.editIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteComment(comment._id, comment.chapter_id)} style={styles.deleteButton}>
                      <Image source={require('../../assets/archive.png')} />
                    </TouchableOpacity>
                  </View>
                  
                )
              )}
              <Image source={{ uri: comment.user_id.photo }} style={styles.userPhoto} />
              {!isAuthor(comment) && (
                <Text style={styles.userName}>{comment.user_id.email}</Text>
              )}
            </View>
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
            <View style={styles.commentFooter}>
              <View style={styles.commentReplyContainer}>
                <Image source={require('../../assets/chat.png')} style={styles.replyIcon} />
                <Text style={styles.replyCount}>Cant</Text>
                <TouchableOpacity style={styles.replyButton}>
                  <Text style={styles.replyButtonText}>Reply</Text>
                  <Image source={require('../../assets/pencil.png')} style={styles.replyIcon} />
                </TouchableOpacity>
              </View>
              <Text style={styles.commentDate}>{formatDate(comment.createdAt)}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noCommentsText}>No hay comentarios disponibles.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  editingComment: {
    flexDirection: 'row',
  },
  editTextInput: {
    width: 160,
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#0079FF',
    fontSize: 14,
    fontStyle: 'normal',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 8,
  },
  cancelButtonText: {
    color: '#FF0000',
    fontSize: 14,
    fontStyle: 'normal',
  },
  commentActions: {
    flexDirection: 'row',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#0079FF',
    fontSize: 14,
    fontStyle: 'normal',
  },
  editIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  deleteButton: {
    marginTop: 8,
    marginLeft: 8,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    padding: 8,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  commentTextContainer: {
    padding: 8,
  },
  commentText: {
    color: '#686868',
  },
  commentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  commentReplyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  replyCount: {
    marginRight: 8,
  },
  replyButton: {
    borderWidth: 1,
    borderColor: '#9D9D9D',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyButtonText: {
    color: '#0079FF',
    fontSize: 14,
    fontStyle: 'normal',
  },
  commentDate: {
    color: '#c3c3c3',
  },
  noCommentsText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff'
  },
});

export default ListComments;