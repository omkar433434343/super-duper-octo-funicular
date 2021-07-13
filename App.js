import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import homeScreen from './screens/homeScreen';
import listScreen from './screens/listScreen';

export default function App() {
  return (
    <View style={styles.container}>
    
     <AppContainer/>
    </View>
  );
}
 var AppNavigator = createSwitchNavigator({
  homeScreen: homeScreen,
  listScreen: listScreen
 });
 const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }

});
