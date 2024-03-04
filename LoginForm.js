import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignupForm, setShowSignupForm] = useState(false); // Ajout de l'état pour contrôler la visibilité du formulaire d'inscription

  const handleLogin = () => {
    // Ajouter ici la logique de connexion
    console.log('Nom d\'utilisateur:', username);
    console.log('Mot de passe:', password);
    // Réinitialiser les champs après la connexion
    setUsername('');
    setPassword('');
  };

  const handleSignup = () => {
    setShowSignupForm(true); // Afficher le formulaire d'inscription lorsque l'utilisateur clique sur "Créer un compte"
  };

  return (
    <View style={styles.container}>
      {!showSignupForm ? (
        <View>
          <Image
            source={require('./assets/adam.jpg')}
            style={styles.image}
          />
          <Text style={styles.label}>Nom d'utilisateur:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={text => setUsername(text)}
            placeholder="Entrez votre nom d'utilisateur"
          />
          <Text style={styles.label}>Mot de passe:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Entrez votre mot de passe"
            secureTextEntry={true}
          />
          
          <TouchableOpacity onPress={() => console.log("Mot de passe oublié")}>
            <Text style={styles.link}>Mot de passe oublié</Text>
          </TouchableOpacity>
          <Button
            title="Se connecter"
            onPress={handleLogin}
          />
                    <Button onPress={handleSignup}
            title="Se Créer un compte"
          />
          
        </View>
      ) : (
        <View>
          <Image
            source={require('./assets/adam.jpg')}
            style={styles.image}
          />
          <Text style={styles.label}>Créer un compte:</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez un nom d'utilisateur"
          />
          <TextInput
            style={styles.input}
            placeholder="Entrez un mot de passe"
            secureTextEntry={true}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Verifiez un mot de passe"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Entrez une adresse email"
          />
          <Button
            title="S'inscrire"
            onPress={() => {
              // Ajouter ici la logique d'inscription
              setShowSignupForm(false); // Masquer le formulaire d'inscription après l'inscription réussie
            }}
          />
          <TouchableOpacity onPress={() => setShowSignupForm(false)}>
            <Text style={styles.link}>Annuler</Text>
          </TouchableOpacity>
        </View>
      )}
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
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
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default LoginForm;
