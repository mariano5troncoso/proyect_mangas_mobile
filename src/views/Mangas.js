import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, setCategories, setMangas, setPagination } from '../../redux/actions/mangas.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, apiUrl, endpoints } from '../../utils/api.js';
import NavBar from '../components/NavBar.js';
import { useNavigation } from '@react-navigation/native';
import NextImage from '../../assets/next.png'
import PrevImage from '../../assets/prev.png'
const Mangas = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { filters, categories, mangas, pagination } = useSelector((state) => state.mangas);

  const { title, categoriesSelected, page } = filters;
  const { prev, next } = pagination;

  const getMangas = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const { data } = await api.get(apiUrl + endpoints.read_mangas, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          title: title.trim(),
          category: categoriesSelected.join(','),
          page: page,
        },
      });

      dispatch(setMangas(data.mangas));
      dispatch(setPagination(data.pagination));
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const { data } = await api.get(apiUrl + endpoints.read_categories, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setCategories(data.categories));
    } catch (error) {
      console.log(error);
    }
  };

  const selectCategory = (value) => {
    let updatedCategories = [];

    if (categoriesSelected.includes(value)) {
      updatedCategories = categoriesSelected.filter((category) => category !== value);
    } else {
      updatedCategories = [...categoriesSelected, value];
    }

    const updatedFilters = {
      ...filters,
      categoriesSelected: updatedCategories,
      page: 1,
    };

    dispatch(setFilters(updatedFilters));
  };

  const handlePrevPage = () => {
    if (prev) {
      dispatch(setFilters({ ...filters, page: prev }));
    }
  };

  const handleNextPage = () => {
    if (next) {
      dispatch(setFilters({ ...filters, page: next }));
    }
  };

  const handleTextChange = (text) => {
    dispatch(setFilters({ ...filters, title: text, page: 1 }));
  };

  const borderColor = (index) => {
    const colors = ['border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500'];
    return colors[index % colors.length];
  };

  useEffect(() => {
    getMangas();
    getCategories();
  }, [title, categoriesSelected, page]);

  return (
    <View>
      <NavBar />
      <ScrollView>
        <ImageBackground
          source={require("../../assets/fondo-mangas.png")}
          style={styles.imageBackground}
        >
          <Text style={styles.title}>Search your next manga 🤤</Text>
          <View style={styles.searchContainer}>
            <TextInput
              value={title}
              onChangeText={handleTextChange}
              style={styles.searchInput}
              placeholder="Find your manga here"
            />
          </View>
        </ImageBackground>
        <View style={styles.containerAll}>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category._id}
                onPress={() => selectCategory(category._id)}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: categoriesSelected.includes(category._id)
                      ? category.hover
                      : category.color,
                  },
                  categoriesSelected.includes(category._id) &&
                    styles.selectedCategoryButton,
                ]}
              >
                <Text style={styles.categoryButtonText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.mangaContainer}>
            {mangas.length > 0 ? (
              mangas.map((manga, index) => (
                <TouchableOpacity
                  key={manga._id}
                  style={[
                    styles.mangaCard,
                    { borderColor: borderColor(index) },
                  ]}
                  onPress={() =>
                    navigation.navigate("MangaDetails", { mangaId: manga._id })
                  }
                >
                  <Text style={styles.mangaTitle}>{manga.title}</Text>
                  <Image
                    source={{ uri: manga.cover_photo }}
                    style={styles.mangaImage}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noMangasText}>
                No sleeves were found matching the selected filters.
              </Text>
            )}
          </View>
          <View style={styles.paginationContainer}>
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                onPress={handlePrevPage}
                disabled={!prev}
                style={[
                  styles.paginationButton,
                  !prev && styles.disabledButton,
                ]}
              >
                <Image
                  source={PrevImage}
                  style={styles.paginationButtonImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNextPage}
                disabled={!next}
                style={[
                  styles.paginationButton,
                  !next && styles.disabledButton,
                ]}
              >
                <Image
                  source={NextImage}
                  style={styles.paginationButtonImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 350,
    color:'black'
  },
  searchContainer: {
    marginBottom: 2,
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 90,
    marginBottom: 45,
    color: 'white'
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
    width: '80%'
  },
  containerAll: {
    backgroundColor: 'black',
    borderTopLeftRadius: 65,
    borderTopRightRadius: 65,
    marginTop: -80
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 2,
    marginHorizontal: 5,
    marginTop: 40
  },
  selectedCategoryButton: {
    borderWidth: 2,
    borderColor: 'gray',
  },
  categoryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mangaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  mangaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    height: 180,
    elevation: 6
  },
  mangaTitle: {
    width: 130,
    fontSize: 18,
    paddingStart: 25,
    paddingEnd: 10
  },
  mangaImage: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
    borderTopLeftRadius: 65,
    borderBottomLeftRadius: 65,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  noMangasText: {
    fontSize: 20,
    textAlign: 'center',
    padding: 20
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: 'red',
  },
  disabledButton: {
    backgroundColor: '#B8B8B8',
  },
  paginationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Mangas;