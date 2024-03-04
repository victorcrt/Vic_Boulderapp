import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MainScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('LoginForm');
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <Button
        title="Accéder au formulaire de connexion"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MainScreen;
