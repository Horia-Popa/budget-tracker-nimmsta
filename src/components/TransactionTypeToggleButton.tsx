import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
} from 'react-native';

interface TransactionTypeToggleProps {
  onTypeChange: (value: string) => void;
}

const TransactionTypeToggleButton = ({
  onTypeChange,
}: TransactionTypeToggleProps) => {
  const screenWidth = Dimensions.get('screen').width;
  const [isIncome, setIsIncome] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const toggleType = (value: boolean) => {
    const toValue = value ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();

    setIsIncome(value);
    if (onTypeChange) {
      onTypeChange(value ? 'income' : 'expense');
    }
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth / 2],
  });

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Animated.View
          style={[styles.pressableContainer, {transform: [{translateX}]}]}
        />
        <Pressable
          style={({pressed}) => [
            styles.toggleOption || {},
            {opacity: pressed ? 0.8 : 1},
          ]}
          onPress={() => toggleType(true)}>
          <Text
            style={[
              styles.toggleText,
              isIncome ? styles.activeText : styles.inactiveText,
            ]}>
            Income
          </Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            styles.toggleOption || {},
            {opacity: pressed ? 0.8 : 1},
          ]}
          onPress={() => toggleType(false)}>
          <Text
            style={[
              styles.toggleText,
              !isIncome ? styles.activeText : styles.inactiveText,
            ]}>
            Expense
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 40,
    margin: 10,
    paddingTop: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: 40,
  },
  toggleOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeText: {
    color: 'white',
  },
  inactiveText: {
    color: 'grey',
  },
  pressableContainer: {
    position: 'absolute',
    width: '50%',
    height: 40,
    borderRadius: 12,
    backgroundColor: '#0090bd',
    zIndex: 1,
  },
});

export default TransactionTypeToggleButton;
