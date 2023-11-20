import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../../redux/actions/auth.js';
import LogoMinga from '../../assets/logo.png';
import Menu from '../../assets/Menu.png';
import FondoHome from '../../assets/mangas-hero.png';
import NavBar from '../components/NavBar.js';

const Home = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  let token = useSelector((state) => state.auth.token);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        return value;
      } else {
        console.log('token:' + error)
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const getTokenFromStorage = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        dispatch(setToken(storedToken));
      }
    };

    getTokenFromStorage();
  }, []);

  const isLoggedIn = () => {
    return token && user;
  };
  
  return (
    <ImageBackground source={FondoHome} style={styles.container} imageStyle={{ marginTop: 60, opacity: 0.3 }}>
      <NavBar/>
      
        
          
        
        
      
      <View style={{ display: "flex", justifyContent: "center", flex: 1, paddingHorizontal: 20 }}>
        <Text style={styles.TextWhite}>Your favourite manga reader😏</Text>
        <Text style={styles.TextSub}>
          is an exceptional app for all manga lovers. With a wide range of
          titles available, from classics to the latest releases, this app is
          perfect for those who want to read manga anytime, anywhere.
        </Text>
        {!isLoggedIn() && (
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <LinearGradient colors={['gray', 'gray']} start={[0, 0]} end={[0, 1]} style={styles.buttonGradient}>
              <Text style={styles.textButtonHome}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {isLoggedIn() && (
          <TouchableOpacity onPress={() => props.navigation.navigate('Mangas')}>
            <LinearGradient colors={['gray', 'gray']} start={[0, 0]} end={[0, 1]} style={styles.buttonGradient}>
              <Text style={styles.textButtonHome}>Search Mangas</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
      <StatusBar style="auto" backgroundColor="red" hidden={true} />
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'start',
  },
  LogoMinga: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  NavBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  TextWhite: {
    color: '#fff',
    fontSize: 51,
    letterSpacing: 2.4,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  TextSub: {
    color: '#fff',
    fontSize: 16,
    padding: 20,
  },
  buttonGradient: {
    width: 363,
    paddingVertical: 15,
    paddingHorizontal: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    margin: 15,
    alignSelf: 'center',
  },
  textButtonHome: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: 'white',
  },
});


  