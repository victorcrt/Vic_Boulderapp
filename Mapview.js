import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, FlatList, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Mapview = ({ navigation }) => { // Assurez-vous d'ajouter `navigation` comme prop si vous utilisez React Navigation
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [pin, setPin] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
      centerMapOnLocation(latitude, longitude);
    })();
  }, []);

  const centerMapOnLocation = (latitude, longitude) => {
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }, 1000);
  };

  const recenter = () => {
    if (location) {
      centerMapOnLocation(location.latitude, location.longitude);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    Keyboard.dismiss();
  };

  const handleSearchChange = async (text) => {
    setSearchTerm(text);
    if (text.length > 2) {
      const query = encodeURIComponent(text);
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`);
      const results = await response.json();
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSelect = (item) => {
    setSearchTerm(item.display_name);
    setSearchResults([]);
    Keyboard.dismiss();
    centerMapOnLocation(parseFloat(item.lat), parseFloat(item.lon));
  };

  const SearchResultItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleSearchSelect(item)}>
      <Text>{item.display_name}</Text>
    </TouchableOpacity>
  );

  const handleMapPress = (e) => {
    if (isAddingPin) {
      setPin({
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      });
      setIsAddingPin(false);
      // Naviguez vers Blocform avec les coordonnées
      navigation.navigate('Blocform', { positions: e.nativeEvent.coordinate });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Rechercher un lieu..."
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={SearchResultItem}
          keyExtractor={(item, index) => `result-${index}`}
          style={styles.resultsContainer}
        />
      )}
      <MapView
        ref={mapRef}
        style={styles.map}
        zoomEnabled={true}
        scrollEnabled={true}
        showsUserLocation={true}
        initialRegion={{
          latitude: location ? location.latitude : 0,
          longitude: location ? location.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {pin && <Marker coordinate={pin} />}
      </MapView>
      <TouchableOpacity onPress={() => setIsAddingPin(true)} style={[styles.recenterButton, { bottom: 80 }]}>
        <Text style={styles.recenterButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={recenter} style={styles.recenterButton}>
        <Text style={styles.recenterButtonText}>🎯</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBoxContainer: {
    position: 'absolute',
    top: 40,
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    zIndex: 5,
  },
  searchBox: {
    flex: 1,
  },
  clearButton: {
    marginLeft: 10,
  },
  clearButtonText: {
    fontSize: 20,
    color: '#000',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  resultsContainer: {
    position: 'absolute',
    top: 80,
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 10,
    width: '90%',
    maxHeight: 200,
    zIndex: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recenterButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 3,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    zIndex: 5,
  },
  recenterButtonText: {
    fontSize: 24,
  },
});

export default Mapview;
