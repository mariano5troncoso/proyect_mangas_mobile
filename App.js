import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js'; 
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/stackNavigator';
import NavBar from './src/components/NavBar.js';


export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer documentTitle={'Minga'}>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
