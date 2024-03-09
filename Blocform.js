import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Video } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const Blocform = () => {
  const [nomBloc, setNomBloc] = useState('');
  const [cotation, setCotation] = useState('');
  const [adresse, setAdresse] = useState('');
  const [coordonnees, setCoordonnees] = useState('');
  const [mediaList, setMediaList] = useState([]);
  const [showCotationPicker, setShowCotationPicker] = useState(false);

  const cotationsEuropeennes = [
    '3', '3+', '4-', '4', '4+', 
    '5a', '5a+', '5b-', '5b', '5b+', 
    '5c-', '5c', '5c+', 
    '6a-', '6a', '6a+', '6b-', '6b', '6b+', 
    '6c-', '6c', '6c+', 
    '7a-', '7a', '7a+', '7b-', '7b', '7b+', 
    '7c-', '7c', '7c+', 
    '8a-', '8a', '8a+', '8b-', '8b', '8b+', 
    '8c-', '8c', '8c+', 
    '9a-', '9a'];
  const cotationsAmericaines = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15'];

  const handleSubmit = () => {
    console.log('Nom du bloc:', nomBloc);
    console.log('Cotation:', cotation);
    console.log('Adresse:', adresse);
    console.log('Coordonnées GPS:', coordonnees);
    console.log('Média:', mediaList);
    setNomBloc('');
    setCotation('');
    setAdresse('');
    setCoordonnees('');
    setMediaList([]);
  };

  const handleSelectMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission refusée pour accéder à la galerie');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.7,
    });
  
    if (!result.cancelled) {
      setMediaList([...mediaList, result.uri]);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom du bloc:</Text>
      <TextInput
        style={styles.input}
        value={nomBloc}
        onChangeText={text => setNomBloc(text)}
        placeholder="Entrez le nom du bloc"
      />
      <Text style={styles.label} onPress={() => setShowCotationPicker(!showCotationPicker)}>Cotation:</Text>
      {showCotationPicker && (
        <Picker
          selectedValue={cotation}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setCotation(itemValue)}>
          <Picker.Item label="Sélectionnez une cotation" value="" />
          <Picker.Item label="Système européen" value="" />
          {cotationsEuropeennes.map((cotation, index) => (
            <Picker.Item key={index} label={cotation} value={cotation} />
          ))}
          <Picker.Item label="Système américain" value="" />
          {cotationsAmericaines.map((cotation, index) => (
            <Picker.Item key={index} label={cotation} value={cotation} />
          ))}
        </Picker>
      )}
      <Text style={styles.label}>Coordonnées GPS:</Text>
      <TextInput
        style={styles.input}
        value={coordonnees}
        onChangeText={text => setCoordonnees(text)}
        placeholder="Entrez les coordonnées GPS"
      />
      <Button
        title="Télécharger un média"
        onPress={handleSelectMedia}
      />
      {mediaList.map((media, index) => (
        <View key={index} style={styles.mediaContainer}>
          {media.endsWith('.mp4') ? (
            <Video
              source={{ uri: media }}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
              controls={true}
            />
          ) : (
            <Image
              source={{ uri: media }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      ))}
      <Button
        title="Soumettre"
        onPress={handleSubmit}
      />
      <View style={styles.cotationContainer}>
        <Text style={styles.cotationTitle}>Cotations:</Text>
        <View style={styles.cotationList}>
          {cotationsEuropeennes.map((cotation, index) => (
            <Text key={index} style={styles.cotationItem}>{cotation}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mediaContainer: {
    marginTop: 20,
  },
  cotationContainer: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cotationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cotationList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cotationItem: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default Blocform;
