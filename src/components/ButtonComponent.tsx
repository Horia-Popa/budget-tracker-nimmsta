import React from 'react';
import {
  Pressable,
  StyleProp,
  ViewStyle,
  Animated,
} from 'react-native';

interface AnimatedPressableProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const ButtonComponent = ({
  children,
  onPress,
  style,
}: AnimatedPressableProps) => {
  const animatedValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.90,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{scale: animatedValue}],
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}>
        {children}
      </Pressable>
    </Animated.View>
  );
};

// Usage example
// const App = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <AnimatedPressable
//       onPress={() => console.log('Pressed!')}
//       style={{
//         backgroundColor: '#2196F3',
//         padding: 16,
//         borderRadius: 8,
//       }}
//     >
//       <Text style={{ color: 'white', fontSize: 16 }}>Press Me</Text>
//     </AnimatedPressable>
//   </View>
// );

export default ButtonComponent;
