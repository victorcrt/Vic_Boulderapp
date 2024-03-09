import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const Mapview = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [location, setLocation] = useState(null);
  const [showBlocForm, setShowBlocForm] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentLocation.coords;
    setMarkerPosition({ latitude, longitude });
    setLocation({ latitude, longitude });
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerPosition(coordinate);
  };

  const handleCoordinatePress = () => {
    if (markerPosition) {
      setShowBlocForm(true);
    }
  };

  const copyToClipboard = () => {
    if (markerPosition) {
      const coordinateString = `${markerPosition.latitude.toFixed(6)} ${markerPosition.longitude.toFixed(6)}`;
      Clipboard.setString(coordinateString);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        zoomEnabled={true}
        scrollEnabled={true}
        onPress={handleMapPress}
        initialRegion={{
          latitude: location ? location.latitude : 0,
          longitude: location ? location.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
            draggable
            onDragEnd={(e) => setMarkerPosition(e.nativeEvent.coordinate)}
          >
            <Callout>
              <TouchableOpacity onPress={copyToClipboard}>
                <Text style={styles.coordinateText}>{`${markerPosition.latitude.toFixed(6)} ${markerPosition.longitude.toFixed(6)}`}</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        )}
      </MapView>
      {showBlocForm && (
        <Blocform coordinates={markerPosition} onClose={() => setShowBlocForm(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coordinateText: {
    fontSize: 16,
  },
});

export default Mapview;
