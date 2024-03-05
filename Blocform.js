import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const Blocform = () => {
  const [nomBloc, setNomBloc] = useState('');
  const [cotation, setCotation] = useState('');
  const [adresse, setAdresse] = useState('');
  const [coordonnees, setCoordonnees] = useState('');
  const [photo, setPhoto] = useState(null); // Pour stocker la photo sélectionnée

  const handleSubmit = () => {
    // Logique de traitement du formulaire
    console.log('Nom du bloc:', nomBloc);
    console.log('Cotation:', cotation);
    console.log('Adresse:', adresse);
    console.log('Coordonnées GPS:', coordonnees);
    console.log('Photo:', photo);
    // Réinitialiser les champs après soumission
    setNomBloc('');
    setCotation('');
    setAdresse('');
    setCoordonnees('');
    setPhoto(null);
  };

  const handleSelectPhoto = () => {
    const options = {
      title: 'Sélectionnez une photo',
      mediaType: 'photo', // Spécifiez 'video' pour sélectionner une vidéo
      quality: 0.7,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé la sélection de la photo');
      } else if (response.error) {
        console.log('Erreur:', response.error);
      } else {
        setPhoto(response.uri);
      }
    });
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
      <Text style={styles.label}>Cotation:</Text>
      <TextInput
        style={styles.input}
        value={cotation}
        onChangeText={text => setCotation(text)}
        placeholder="Entrez la cotation"
      />
  
      <Text style={styles.label}>Coordonnées GPS:</Text>
      <TextInput
        style={styles.input}
        value={coordonnees}
        onChangeText={text => setCoordonnees(text)}
        placeholder="Entrez les coordonnées GPS"
      />
      <Button
        title="Télécharger une photo"
        onPress={handleSelectPhoto}
      />
      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button
        title="Soumettre"
        onPress={handleSubmit}
      />
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
});

export default Blocform;
