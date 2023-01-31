import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/colors';

export const InstructionsText = ({ children, style }) => {
  return <Text style={[styles.titleInstructions, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  titleInstructions: {
    fontFamily: 'open-sans',
    color: Colors.primaryYellow,
    fontSize: 26,
  },
});
