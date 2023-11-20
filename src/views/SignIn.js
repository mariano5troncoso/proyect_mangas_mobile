import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { setToken, setUser, setPhoto } from '../../redux/actions/auth.js';
import { apiUrl, endpoints } from '../../utils/api.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/NavBar.js';

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleFormSubmit() {
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    let data = {
      email: email,
      password: password,
    };

    axios
      .post(apiUrl + endpoints.signin, data)
      .then((res) => {
        if (res && res.data && res.data.response) {
          const { user, photo, token } = res.data.response;

          AsyncStorage.setItem('token', token)
            .then(() => AsyncStorage.setItem('user', JSON.stringify(user)))
            .then(() => AsyncStorage.setItem('photo', photo))
            .then(() => {
              alert('User signed in!');
              navigation.navigate('Home');
            })
            .catch((error) => {
              console.log(error.message);
              alert('An error occurred while saving data. Please try again later.');
            });
        } else {
          alert('Invalid response from the server');
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log('Error details:', error.response.data); // Muestra detalles del error del servidor
          const err = error.response.data.message || 'Unknown error';
          alert(`Authentication failed! Error: ${err}`);
        } else {
          console.log(error.message);
          alert('An error occurred. Please try again later.');
        }
      });
  }

  return (
    <ImageBackground
      source={require("../../assets/fondo-login.jpg")}
      style={styles.container}
    >
      <View style={styles.container}>
        <NavBar />
        <View style={styles.content}></View>
        <View style={styles.form}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            Discover manga and comics, track your progress, have fun, read manga.
          </Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity onPress={handleFormSubmit}>
            <LinearGradient colors={['#525558', '#394651']} style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGoogle}>
            <Image source={require('../../assets/Google.png')} style={styles.iconGoogle} />
            <Text style={styles.buttonTextGoogle}>Sign in with Google</Text>
          </TouchableOpacity>
          <Text style={styles.textEnd}>
            You don't have an account yet? <Text style={styles.destacar}>Sign Up</Text>
          </Text>
          <Text style={styles.textEnd}>Go back to <Text style={styles.destacar}>home page</Text></Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 2,
  },
  destacar: {
    color: 'red',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 2,
    color: '#1F1F1F',
    marginBottom: 100
  },
  form: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 10,
    margin: 16,
    padding: 20,
  },
  label: {
    color: '#808080',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#808080',
    fontSize: 16,
    color: '#000',
    paddingVertical: 6,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#808080',
    paddingVertical: 12,
    marginTop: 8,
  },
  iconGoogle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  buttonTextGoogle: {
    color: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textEnd: {
    textAlign: 'center',
    fontSize: 14,
    color: '#808080',
    marginTop: 16,
  },
});

export default SignIn;
