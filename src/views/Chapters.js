import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import NavBar from '../components/NavBar';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import commentActions from '../../redux/actions/comment';
import ListComments from '../components/ListComments';

const Chapter = () => {
    const route = useRoute();
    const { chapter } = route.params; 

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { read_comments, post_comments, setPaginationComments } = commentActions;
    const { pagination } = useSelector((state) => state.comments);
    const [commentText, setCommentText] = useState('');

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

    return (
      <View style={styles.container}>
        <NavBar/>
        <LinearGradient colors={['#525558', '#394651']} top={[1, 0]} bottom={[0, 0]}>
            <View style={styles.header}></View>
            <Text style={styles.titleChapter}>{chapter.title}</Text>
        </LinearGradient>
        <ScrollView >
            <View style={styles.content}>
                <Image source={{uri: chapter.pages[0]}} style={styles.pagesImages} />
                <View style={styles.botones}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Image source={require('../../assets/prev.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Image source={require('../../assets/next.png')}/>
                    </TouchableOpacity>
                </View>
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
                <TouchableOpacity onPress={() => handleShowModal(chapter._id)}>
                    <View style={styles.contentComments}>
                        <Text style={{ marginLeft: 10, fontSize: 18 }}>Cant. </Text>
                        <Image source={require('../../assets/icon_comment.png')} style={styles.commentIcon} />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
      );
    };
  
  export default Chapter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e8ee',
    },
    header: {
        height: 90,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: '100%',
        width: '100%',
    },
    pagesImages: {
        marginTop: 50,
        marginBottom: 50,
        width: '100%',
        height: 480,
    },
    commentIcon: {
        width: 30,
        height: 30,
        marginLeft: 15
    },
    contentComments: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    titleChapter: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: -55,
        marginBottom: 30
    },
    botones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: '40%',
        left: 0,
        right: 0,
        marginLeft: 20,
        marginRight: 20,
      },
      buttonContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20
      },
      modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        width: '90%',
        height: '80%',
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
        backgroundColor: 'red',
        borderRadius: 5,
        marginBottom: 15
      },
      paginationButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
})