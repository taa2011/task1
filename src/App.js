import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainScreen from "./components/mainScreen";
import FullScreen from "./components/fullScreen";

export default StackNavigator({
  Main: {
    screen: MainScreen,
  },
  Full: {
    screen: FullScreen,
  },

});