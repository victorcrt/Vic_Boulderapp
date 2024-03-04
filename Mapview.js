import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MainScreen = ({ navigation }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleLogin = () => {
    navigation.navigate('LoginForm');
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    print("coordinate" + coordinate)
    setMarkerPosition(coordinate); // Remplacer le marqueur existant par le nouveau
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        zoomEnabled={true}
        scrollEnabled={true}
        onPress={handleMapPress}
      >
        {markerPosition && (
          <Marker  pinColor="green"
          coordinate={markerPosition} />
        )}
      </MapView>
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
