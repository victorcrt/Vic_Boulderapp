import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native'; // Importez le composant Text
import MapView, { Marker, Callout } from 'react-native-maps';

const Mapview = () => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerPosition(coordinate);
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
      >
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
            draggable // Permet de déplacer le marqueur sur la carte
            onDragEnd={(e) => setMarkerPosition(e.nativeEvent.coordinate)} // Mise à jour de la position du marqueur lorsqu'il est déplacé
          >
            <Callout>
              <TouchableOpacity onPress={copyToClipboard}>
                <Text style={styles.coordinateText}>{`${markerPosition.latitude.toFixed(6)} ${markerPosition.longitude.toFixed(6)}`}</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        )}
      </MapView>
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
