import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Card from '../components/Card';
import { InstructionsText } from '../components/InstructionsText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

function StartGameScreen({ pickedNumberHandler }) {
  const [enteredNumber, setEnteredNumber] = useState('');

  const onHandleChange = (enteredText) => {
    setEnteredNumber(enteredText);
  };

  function onConfirmedInputHandler() {
    let chosenNumber = Number(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(`Invalid number`, 'Please enter a number from 1 to 99', [
        { text: 'Okay', style: 'destructive', onPress: onResetInputHandler },
      ]);
      return;
    }
    pickedNumberHandler(chosenNumber);
  }

  function onResetInputHandler() {
    setEnteredNumber('');
  }
  return (
    <View style={styles.rootContainer}>
      <Title>Guess my Number!</Title>
      <Card>
        <InstructionsText>Enter a Number</InstructionsText>
        <TextInput
          style={styles.textInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onHandleChange}
          value={enteredNumber}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={onResetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={onConfirmedInputHandler}>
              Confirm
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.primaryYellow,
    borderBottomWidth: 2,
    color: Colors.primaryYellow,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
