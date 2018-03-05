import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import {connect} from "react-redux";
import { nextPageAction, previousPageAction, getPhotoAction} from './../actions'


class MainScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      width:0,
      height:0,
      dimensionsCounted:false,


    };
  }

  static navigationOptions = {
    title: 'View photos',
  };
  

  componentDidMount() {
    this.props.initPhoto(this.props.currentPageCursor);
   
  };
    
  find_dimesions(layout){
    const {x, y, width, height} = layout;
    if (width>0 && height>0) {
      this.setState({width:(width-20)/2,height:(height-30)/3,dimensionsCounted:true})
    }
    

  }
  
 
  render() {
    const {
      currentPage,
      previousPageCursors,
      nextPageCursor,
      hasNextPage,
      photos, 
      onPressPreviousPage, 
      onPressNextPage,

    } = this.props;

    const previousPageCursor = previousPageCursors.slice(-1)[0];

    return (
      <View style = {styles.container}>
        <View style = {styles.containerWithMargin}>
          <View 
            onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
            style = {styles.wrapper}>
            {(photos.length > 0 && this.state.dimensionsCounted) ? photos.map((p, i) => {
            
              return (
                <TouchableOpacity 
                  key={i} 
                  style = {{width:this.state.width,height:this.state.height, margin:5,}}
                  onPress={() => this.props.navigation.navigate('Full',{uri:p.node.image.uri})}
                >
                  <View style={{
                    width:this.state.width,
                    height:this.state.height,
                    position:'absolute',
                    alignItems:'center',
                    justifyContent: 'center',
                  }}>
                    <ActivityIndicator/>
                  </View>
                  <Image 
                    style={styles.container} 
                    source={{ uri: p.node.image.uri }} 
                  />
                </TouchableOpacity>
              );
            }) : <View/>}

          </View>
          
        </View>

        <View style={styles.footer}>
          
          <View style={styles.containerWithMargin}>
            <Button
              onPress={() => onPressPreviousPage(previousPageCursor)}
              title="previous"
              
              disabled={currentPage===1}
            />
          </View>          
          <View style={styles.pageContainer}>
            <Text> page: {currentPage}</Text>
          </View>
          <View style={styles.containerWithMargin}>
            <Button
              onPress= {() => onPressNextPage(nextPageCursor)}
              title="next"
              disabled={!hasNextPage}
            />
          </View>          


          

        </View>      

        

      </View>




      


    );
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.currentPage,
    previousPageCursors: state.previousPageCursors,
    currentPageCursor: state.currentPageCursor,
    nextPageCursor: state.nextPageCursor,
    hasNextPage: state.hasNextPage,
    photos: state.photos
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPressNextPage: (end_cursor) => dispatch(nextPageAction(end_cursor)),
    onPressPreviousPage: (end_cursor) => dispatch(previousPageAction(end_cursor)),
    initPhoto: (end_cursor) => dispatch(getPhotoAction(end_cursor))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWithMargin: {
    flex: 1,
    margin:5,
  },
  wrapper: {
    flex:1, 
    flexDirection:'row',
    flexWrap:'wrap',
  },
  footer: {
    height:45,
    flexDirection:'row',
  },
  pageContainer: {
    flex:1, 
    margin:5, 
    alignItems:'center', 
    justifyContent: 'center',
  },

});
