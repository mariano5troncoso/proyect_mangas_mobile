import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import commentActions from '../../redux/actions/comment';
import ListComments from './ListComments';
import { useNavigation } from '@react-navigation/native';

const ChapterCaps = ({ chapter }) => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { read_comments, post_comments, setPaginationComments } = commentActions;
    const { pagination } = useSelector((state) => state.comments);
    const [commentText, setCommentText] = useState('');
    const navigation = useNavigation()
    
    const handleShowModal = (chapterId) => {
        dispatch(read_comments(chapterId));
        dispatch(setPaginationComments({ currentPage: 1, totalPages: 1, totalComments: 0, prev: false, next: false }));
        setShowModal(true);
      };

      const handleCloseModal = () => {
        setShowModal(false);
      };

      const handlePrevPageComments = async () => {
        if(pagination.currentPage > 1){
          dispatch(setPaginationComments({currentPage: pagination.currentPage -1, totalPages: pagination.totalPages, totalComments: pagination.totalComments, prev: true, next: true}))
          dispatch(read_comments(chapter._id))
        }
      }

      const handleNextPageComments = async () => {
        if(pagination.currentPage < pagination.totalPages){
          dispatch(setPaginationComments({currentPage: pagination.currentPage +1, totalPages: pagination.totalPages, totalComments: pagination.totalComments, prev: true, next: true }))
          dispatch(read_comments(chapter._id))
        }
      }

      const handleCommentSubmit = (chapterId) => {
        let datos = { text: commentText };
        dispatch(post_comments({ chapterId, datos }));
        setCommentText('');
      };

      const handleReadChapter = () => {
        navigation.navigate('Chapters', { chapter });
      };

      useEffect(() => {
        dispatch(read_comments(chapter._id));
      }, [chapter._id]);

  return (
    <View key={chapter._id} style={styles.container}>
      <Image source={{ uri: chapter.cover_photo }} style={styles.chapterImage} />
      <View style={styles.chapterDetails}>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
        <TouchableOpacity onPress={() => handleShowModal(chapter._id)}>
          <View style={{flexDirection: 'row'}}>
          <Text style={{marginTop: 10, marginRight: 10}}>Cant: </Text>
          <Image source={require('../../assets/icon_comment.png')} style={styles.commentIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.readButton} onPress={handleReadChapter}>
        <Text style={styles.readButtonText}>Read</Text>
      </TouchableOpacity>
      {showModal && (
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Image source={require('../../assets/close.png')} style={styles.closeIcon} />
          </TouchableOpacity>
          <ScrollView style={styles.scrollView}>
          <ListComments chapterId={chapter._id} />
          </ScrollView>
          <View style={styles.commentForm}>
            <TextInput style={styles.commentInput} value={commentText} onChangeText={(text) => setCommentText(text)} placeholder="Say something here..." />
            <TouchableOpacity style={styles.sendButton} onPress={() => handleCommentSubmit(chapter._id)}>
              <Image source={require('../../assets/paper-airplane.png')} style={styles.sendIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.paginationContainer}>
            <TouchableOpacity style={[styles.paginationButton, { backgroundColor: pagination.prev ? '#FF97DB' : '#9D9D9D' }]} onPress={handlePrevPageComments} disabled={!pagination.prev}>
              <Text style={styles.paginationButtonText}>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.paginationButton, { backgroundColor: pagination.next ? '#FF97DB' : '#9D9D9D' }]} onPress={handleNextPageComments} disabled={!pagination.next}>
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChapterCaps;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterImage: {
    width: '25%',
    height: 80, 
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  chapterDetails: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  chapterTitle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  commentIcon: {
    width: 24,
    height: 24,
    margin: 8,
  },
  readButton: {
    width: '25%',
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  readButtonText: {
    color: '#FAFCFC',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(250, 80, 180, 0.5)',
    width: '100%',
    borderRadius: 10,
    zIndex: 3,
    position: 'absolute',
  },
  scrollView: {
    maxHeight: '90%',
    width: '100%',
    marginTop: 10,
  },
  closeButton: {
    top: 10,
    marginRight: -320,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  commentForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white'
  },
  sendButton: {
    marginLeft: 10,
  },
  sendIcon: {
    width: 40,
    height: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationButton: {
    padding: 10,
    marginRight: 5,
    backgroundColor: '#FF97DB',
    borderRadius: 5,
    marginBottom: 15
  },
  paginationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
