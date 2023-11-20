import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { api, apiUrl, endpoints } from '../../utils/api.js';
import { setMangas, setChapters, setPagination } from '../../redux/actions/manga.js';
import axios from 'axios';
import ChapterCaps from '../components/ChapterCaps.js';

const MangaDetails = ({ route }) => {
  const dispatch = useDispatch();
  
  const [token, setToken] = useState(null);
  const { mangaId } = route.params;
  const { manga, chapters, pagination} = useSelector((state) => state.manga)
  const [totalPages, setTotalPages] = useState(0)
  const [totalChapters, setTotalChapters] = useState(0)
  const [activeTab, setActiveTab] = useState("mangas")
  const {prev, next } = pagination

  const company_name =(manga.author_id?.name ? ` ${manga.author_id.name}` : '') + ' ' + (manga.author_id?.last_name ? ` ${manga.author_id.last_name}` : '')

  const fetchMangaDetail = async () => {

    if (manga._id !== mangaId) {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        const { data } = await axios.get(apiUrl + "/mangas/" + mangaId, { headers: { Authorization: `Bearer ${token}` } })
        dispatch(setMangas(data.manga))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchChapters = async (page) => {
    try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);

      const { data } = await api.get(`/chapters?page=${page}&manga_id=${mangaId}`, { headers: { Authorization: `Bearer ${token}` } })
      dispatch(setChapters(data.chapters))
      setTotalPages(data.totalPages)
      setTotalChapters(data.totalChapters)
    } catch (error) {
      console.log(error)
    }
  };

  const handlePrevPage = async () => {
    if(pagination.currentPage > 1){
      dispatch(setPagination({currentPage: pagination.currentPage -1, prev: true, next: true}))
    }
  }

  const handleNextPage = async () => {
    if(pagination.currentPage < totalPages){
      dispatch(setPagination({currentPage: pagination.currentPage +1, prev: true, next: true}))
    }
  }

  const switchToMangaTab = () => {
    setActiveTab("mangas")
  };

  const switchToChaptersTab = () => {
    setActiveTab("chapters")
  }

  useEffect(() => {
    fetchMangaDetail()
  },[])

  useEffect(() => {
    fetchChapters(pagination.currentPage)
  }, [pagination])

  return (
    <View style={styles.container}>
      <ScrollView >
      <NavBar />
        <Image source={{ uri: manga.cover_photo }} style={styles.mangaCover} />
        {activeTab === 'mangas' && (
        <View>
          <Text style={styles.mangaTitle}>{manga.title}</Text>
          <View style={styles.mangaDetails}>
            <View style={styles.categoryText}>
                <Text>{manga.category_id?.name}</Text>
            </View>
            <View style={styles.authorText}>
                <Text>{company_name}</Text>
            </View>
          </View>
          
          <View style={styles.containerInfo}>
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.ratingText}>4.5/5</Text>
                    <Text style={styles.secondaryText}>Rating</Text>
                </View>
                <Text style={styles.separator}>|</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.ratingText}>{totalChapters}</Text>
                    <Text style={styles.secondaryText}>Chapters</Text>
                </View>
                <Text style={styles.separator}>|</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.ratingText}>Eng</Text>
                    <Text style={styles.secondaryText}>Language</Text>
                </View>
            </View>
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity style={[styles.tabButton, { backgroundColor: activeTab === 'mangas' ? '#525558' : '#394651', elevation: activeTab === 'mangas' ? 20 : 0, width: activeTab === 'mangas' ? '60%' : '60%', marginLeft: activeTab === 'mangas' ? '-5%' : '20%', marginRight: activeTab === 'mangas' ? '-5%' : '20%', zIndex: activeTab === 'mangas' ? 1 : 0 }]} onPress={switchToMangaTab}>
              <Text style={[styles.tabButtonText, { color: activeTab === 'mangas' ? 'white' : 'black' }]}>Manga</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabButton, { backgroundColor: activeTab === 'chapters' ? '#525558' : '#394651', elevation: activeTab === 'chapters' ? 10 : 0, width: activeTab === 'chapters' ? '60%' : '60%', marginLeft: activeTab === 'chapters' ? '-5%' : '20%', marginRight: activeTab === 'chapters' ? '-5%' : '10%', zIndex: activeTab === 'chapters' ? 1 : 0 }]} onPress={switchToChaptersTab}>
              <Text style={[styles.tabButtonText, { color: activeTab === 'chapters' ? 'white' : 'black' }]}>Chapters</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.mangaDescription}>{manga.description}</Text>
        </View>
      )}
      {activeTab === 'chapters' && (
        <View>
            <ScrollView>
              <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tabButton, { backgroundColor: activeTab === 'mangas' ? '#525558' : '#394651', elevation: activeTab === 'mangas' ? 20 : 0, width: activeTab === 'mangas' ? '60%' : '60%', marginLeft: activeTab === 'mangas' ? '-5%' : '20%', marginRight: activeTab === 'mangas' ? '-5%' : '10%', zIndex: activeTab === 'mangas' ? 1 : 0 }]} onPress={switchToMangaTab}>
                  <Text style={[styles.tabButtonText, { color: activeTab === 'mangas' ? 'white' : 'black' }]}>Manga</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, { backgroundColor: activeTab === 'chapters' ? '#525558' : '#394651', elevation: activeTab === 'chapters' ? 10 : 0, width: activeTab === 'chapters' ? '60%' : '60%', marginLeft: activeTab === 'chapters' ? '-5%' : '20%', marginRight: activeTab === 'chapters' ? '-5%' : '18%', zIndex: activeTab === 'chapters' ? 1 : 0 }]} onPress={switchToChaptersTab}>
                  <Text style={[styles.tabButtonText, { color: activeTab === 'chapters' ? 'white' : 'black' }]}>Chapters</Text>
                </TouchableOpacity>
              </View>
                {chapters.map((chapter) => (
                    <ChapterCaps key={chapter._id} chapter={chapter}/>
                ))}
            </ScrollView>
          <View style={styles.paginationContainer}>
            <TouchableOpacity style={[styles.paginationButton, { backgroundColor: prev ? '#525558' : '#394651' }]} onPress={handlePrevPage}>
              <Text style={styles.paginationButtonText}>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.paginationButton, { backgroundColor: next ? '#525558' : '#394651' }]} onPress={handleNextPage}>
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      </ScrollView>
    </View>
  );
};

export default MangaDetails;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    mangaCover: {
      borderRadius: 10,
      width: '90%',
      height: 250,
      resizeMode: 'cover',
      marginTop: 120,
      alignSelf: 'center',
    },
    mangaTitle: {
      margin: 20,
      fontSize: 24,
      fontWeight: '400',
      textAlign: 'center',
    },
    mangaDetails: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    categoryText: {
      borderRadius: 50,
      padding: 15,
      backgroundColor: '#FFE0DF',
      fontSize: 20,
      fontWeight: 400,
    },
    authorText: {
      padding: 15,
      fontSize: 25,
      fontWeight: 400,
    },
    mangaDescription: {
      marginBottom: 25,
      fontSize: 18,
      width: '80%',
      alignSelf: 'center'
    },
    tabContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      margin: 40,
      position: 'relative'
    },
    tabButton: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      borderRadius: 20,
      position: 'absolute'
    },
    tabButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    paginationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    paginationButton: {
      padding: 10,
      marginHorizontal: 5,
      backgroundColor: 'red',
      borderRadius: 20,
    },
    paginationButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    containerReaction: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 16,
      },
      button: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      },
      reaction: {
        fontSize: 35,
      },
      containerInfo: {
        width: '90%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 4,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center'
      },
      infoContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'center',
      },
      textContainer: {
        alignItems: 'center',
      },
      ratingText: {
        color: '#424242',
        fontSize: 22,
        fontWeight: 'normal',
        marginLeft: 40,
        marginRight: 40
      },
      secondaryText: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'normal',
      },
      separator: {
        color: 'red',
        fontSize: 20,
        fontWeight: '400',
      },
  });