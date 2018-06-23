import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  private location:string = "unknown";
  private gpsCounter:number = 0;

  private reloadLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.location = "" + position.coords.latitude + ";" + position.coords.longitude + " [±" + position.coords.accuracy + "]"
      this.gpsCounter++
      this.setState(() => {return {reload: true} } )
    }, (error) => {
      this.location = error.message
      this.gpsCounter++
      this.setState(() => {return {reload: true} } )
    }, {
      timeout: 1000,
      enableHighAccuracy: true,
      maximumAge: 60000
    })
  }

  render() {
    setTimeout(() => { this.reloadLocation() }, 1000)
    return (
      <View style={styles.container}>
        <Text>Typescript!</Text>
        <Text>{this.location}</Text>
        <Text>{this.gpsCounter}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
