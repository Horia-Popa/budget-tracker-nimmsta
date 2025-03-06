import React, {useRef, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Alert,
  PanResponder,
  InteractionManager,
  Pressable,
} from 'react-native';
import CardTransactionComponent from './CardTransactionComponent';
import {useTransactionStore} from '../stores/transactionStore';

const {width} = Dimensions.get('window');
const SWIPE_THRESHOLD = 20;

interface SwipableItemProps {
  id: string;
  title: string;
  description: string;
  date: string;
  amount: string;
  type: string;
  category: string;
};

const SwipableItem = ({item}: {item: SwipableItemProps}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const rowHeight = useRef(new Animated.Value(80)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteTransaction = useTransactionStore(
    state => state.deleteTransaction,
  );

  // Use useCallback to memorize function
  const resetPosition = useCallback(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 9,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    }).start();
  }, [translateX]);

  // Create pan responder
  const panResponder = useRef(
    PanResponder.create({
      // Improve responsiveness by playing with the threshold
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 4 && Math.abs(gestureState.dy) < 20;
      },
      onPanResponderGrant: () => {
        setIsSwipeActive(true);
      },
      onPanResponderMove: Animated.event([null, {dx: translateX}], {
        useNativeDriver: false,
        // Apply resistance to the drag
        listener: (_, gestureState) => {
          if (gestureState.dx < 0) {
            const newX = Math.max(-width, gestureState.dx);
            translateX.setValue(newX);
          } else if (gestureState.dx > 0) {
            const newX = Math.min(0, gestureState.dx);
            translateX.setValue(newX);
          }
        },
      }),
      onPanResponderRelease: (_, gestureState) => {
        setIsSwipeActive(false);

        // Check if user swiped far enough to delete
        if (gestureState.dx < SWIPE_THRESHOLD) {
          InteractionManager.runAfterInteractions(() => {
            showDeleteConfirmation();
          });
        } else {
          resetPosition;
        }
      },
      onPanResponderTerminationRequest: () => !isSwipeActive,
    }),
  ).current;

  const showDeleteConfirmation = () => {
    Animated.spring(translateX, {
      toValue: -width * 0.4,
      useNativeDriver: true,
      bounciness: 0,
      speed: 12,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    }).start();

    Alert.alert('Delete Transaction', `Delete "${item.title}" transaction?`, [
      {
        text: 'Cancel',
        onPress: resetPosition,
      },
      {
        text: 'Delete',
        onPress: () => {
          if (isDeleting) {
            return;
          }
          setIsDeleting(true);

          Animated.timing(translateX, {
            toValue: -width,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            Animated.parallel([
              Animated.timing(rowHeight, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
              }),
              Animated.timing(opacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
              }),
            ]).start(() => {
              InteractionManager.runAfterInteractions(() => {
                deleteTransaction(item.id);
              });
            });
          });
        },
        style: 'destructive',
      },
    ]);
  };

  const deleteButtonOpacity = translateX.interpolate({
    inputRange: [-width, -100, -10],
    outputRange: [1, 0.9, 0],
    extrapolate: 'clamp',
  });

  //Reveal right side delete button
  const renderRightActions = () => {
    return (
      <Animated.View
        style={[styles.deleteContainer, {opacity: deleteButtonOpacity}]}>
        <Pressable
          onPress={showDeleteConfirmation}
          disabled={isDeleting}
          style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </Animated.View>
    );
  };

  if (isDeleting) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: rowHeight,
          opacity: opacity,
        },
      ]}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.itemContainer,
          {
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [-width, 0],
                  outputRange: [-width, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
          isSwipeActive && styles.activeSwipe,
        ]}>
        {renderRightActions()}
        <View
          style={[
            styles.contentContainer,
            isSwipeActive && styles.contentSwipeActive,
          ]}>
          <CardTransactionComponent
            title={item.title}
            description={item.description}
            date={item.date}
            amount={item.amount}
            type={item.type}
            category={item.category}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 15,
    zIndex: 2,
    backgroundColor: '#fff',
  },
  activeSwipe: {
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  contentSwipeActive: {
    backgroundColor: '#f9f9f9',
  },
  infoContainer: {
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteContainer: {
    width: 100,
    height: '100%',
    position: 'absolute',
    right: -100,
    zIndex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    height: '100%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SwipableItem;
