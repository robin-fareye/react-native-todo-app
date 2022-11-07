/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodo from './component/AddTodo';
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */


const App=() => {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    
     <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
          headerShown: false
        }}
        initialRouteName="Login">
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
