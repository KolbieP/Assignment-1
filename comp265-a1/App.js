import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Switch, ScrollView, TextInput, Button } from 'react-native';

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
    if (currentIndex < phrases.english.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Language Learning App</Text>
        <Text>Icelandic</Text>
        <Image
          source={require('./flag.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Switch
          onValueChange={toggleSwitch}
          value={isEnglish}
        />
        <View style={styles.phraseContainer}>
          <Text style={styles.phrase}>{isEnglish ? phrases.english[currentIndex][0] : phrases.english[currentIndex][1]}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Back" onPress={handleBack} />
          <Button title="Next" onPress={handleNext} />
        </View>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="New phrase"
          value={newPhrase}
          onChangeText={setNewPhrase}
        />
        <TextInput
          style={styles.input}
          placeholder="Translation"
          value={newTranslation}
          onChangeText={setNewTranslation}
        />
        <Button title="Add Phrase" onPress={addPhrase} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
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
    borderColor: 'gray',
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
    fontSize: 18,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
});
