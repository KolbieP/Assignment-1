import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Switch, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

const initialPhrases = {
  english: [
    ["Hello", "Halló"],
    ["Goodbye", "Bless"],
    ["Please", "Vinsamlegast"],
    ["Thank you", "Takk"],
    ["Yes", "Já"],
    ["No", "Nei"],
    ["Excuse me", "Afsakið"],
    ["I'm sorry", "Fyrirgefðu"],
    ["How are you?", "Hvernig hefurðu það?"],
    ["I'm fine, thank you.", "Ég hef það gott, takk."],
    ["What's your name?", "Hvað heitir þú?"],
    ["My name is...", "Ég heiti..."],
    ["Do you speak English?", "Talar þú ensku?"],
    ["I don't understand", "Ég skil ekki"],
    ["Where is the bathroom?", "Hvar er klósettið?"],
    ["Help!", "Hjálp!"],
    ["I need a doctor", "Ég þarf lækni"],
    ["How much does this cost?", "Hvað kostar þetta?"],
    ["Can you help me?", "Geturðu hjálpað mér?"],
    ["I love you", "Ég elska þig"]
  ]
};

export default function App() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [phrases, setPhrases] = useState(initialPhrases);
  const [newPhrase, setNewPhrase] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleSwitch = () => setIsEnglish(previousState => !previousState);

  const addPhrase = () => {
    if (newPhrase && newTranslation) {
      setPhrases({...phrases, english: [...phrases.english, [newPhrase, newTranslation]]});
      setNewPhrase('');
      setNewTranslation('');
    }
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % phrases.english.length);
  };

  const handleBack = () => {
    setCurrentIndex((currentIndex - 1 + phrases.english.length) % phrases.english.length);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header1}>Language Learning App</Text>
        <Image
          source={require('./flag.jpg')}
          style={styles.image}
        />
        <Text style={styles.header2}>Icelandic</Text>
      </View>
      <View style={styles.content}>
        <Switch
          onValueChange={toggleSwitch}
          value={isEnglish}
          trackColor={{ false: "#767577", true: "#d62827" }}
          thumbColor={isEnglish ? "#003897" : "#f4f3f4"}
        />
        <View style={styles.phraseContainer}>
          <Text style={styles.phrase}>{isEnglish ? phrases.english[currentIndex][0] : phrases.english[currentIndex][1]}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
            <FontAwesomeIcon icon={faBackward} size={20} color="#fff" />
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
            <FontAwesomeIcon icon={faForward} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="English Phrase"
          value={newPhrase}
          onChangeText={setNewPhrase}
        />
        <TextInput
          style={styles.input}
          placeholder="Icelandic Phrase"
          value={newTranslation}
          onChangeText={setNewTranslation}
        />
        <Button title="Add Phrase" color="#003897" onPress={addPhrase} />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
    marginBottom: 50,
  },
  header1: {
    alignItems: 'center',
    margin: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#003897',
  },
  header2: {
    alignItems: 'center',
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d62827',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: '#d62827',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  phraseContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  phrase: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    height: 40,
    borderColor: '#d62827',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003897',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    margin: 5,
  },
});

