import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './LoginForm';
import Mapview from './Mapview';
import Blocform from './Blocform';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Assurez-vous d'importer Ionicons depuis react-native-vector-icons

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Map"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Plus') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Login') {
              iconName = focused ? 'log-in' : 'log-in-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Map" component={Mapview} />
        <Tab.Screen name="Plus" component={Blocform} />
        <Tab.Screen name="Login" component={LoginForm} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
