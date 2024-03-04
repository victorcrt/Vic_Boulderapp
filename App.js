import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './LoginForm';
import MainScreen from './MainScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ title: 'Main Screen' }}
        />
        <Stack.Screen
          name="LoginForm"
          component={LoginForm}
          options={{ title: 'Login Form' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
