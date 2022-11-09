/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import type { Node } from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Login from './component/Login';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Todos from './component/Todos';
import SplashScreen from './component/SplashScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodo from './component/AddTodo';
import { useSharedValue } from 'react-native-reanimated';
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */


const App=() => {

  const [isLoggedIn,setIsLoggedIn]=useState()
  const Stack = createNativeStackNavigator();
  const getInitialRoute = async () => {
    try {
      const userId = await AsyncStorage.getItem('loginUser')
      if(userId!==null){
        console.log("is loggedIn): ",isLoggedIn);
        
        return("Todos")
      }
      else{
        return("Login")
      }
    } catch(e) {
      // error reading value
    }
  }


  // useEffect(()=>{
  //     getData().then(res=>{
  //     console.log("My user",res);
  
  //     console.log("is loggedIn: ",isLoggedIn);
  //   })
    
  // },[])
  

  return (
    
     <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
          headerShown: false
        }}
        initialRouteName={SplashScreen}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Todos" component={Todos} />
          <Stack.Screen name="AddTodo" component={AddTodo} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
