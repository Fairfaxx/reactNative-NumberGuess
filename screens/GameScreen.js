import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/game/NumberContainer';
import { InstructionsText } from '../components/InstructionsText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

let minBoundary = 0;
let maxBoundary = 100;

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

function GameScreen({ userNumber, onGameIsOverHandler }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      Alert.alert('You did it!', 'You are the best', {
        text: 'Congratulations',
        style: 'cancel',
      });
      onGameIsOverHandler();
      return;
    }
  }, [currentGuess, userNumber, onGameIsOverHandler]);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'higher' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!!!", 'You know that this is wrong...', {
        text: 'Sorry',
        style: 'cancel',
      });
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndmNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndmNumber);
  }

  return (
    <View style={styles.screen}>
      <Title>"Opponent's Guess"</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionsText style={styles.instructionText}>
          Higher or Lower?
        </InstructionsText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
              +
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              -
            </PrimaryButton>
          </View>
        </View>
      </Card>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 32,
  },
});
