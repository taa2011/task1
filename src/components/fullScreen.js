
import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

export default class FullScreen extends Component {

  static navigationOptions = {
    title: 'fullscreen',
  };

  
  render() {
    const { params } = this.props.navigation.state;    
    return (
      <View style={styles.container} >
        <Image
          style={styles.container}
          source={{ uri: params.uri }}
          resizeMode= 'contain'
        />
      </View>
    );
  }
}

'use strict';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});




 