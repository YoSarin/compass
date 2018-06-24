import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationScreenProp } from "react-navigation"

export class Main extends React.Component<{navigation:NavigationScreenProp<any>}> {

  private location:string = "unknown";
  private gpsCounter:number = 0;
  private positionWatch:number = -1;


  componentDidMount() {
      this.watchLocation()
  }

  componentWillUnmount() {
    this.stopWatch()
  }

  private watchLocation() {
    this.stopWatch()
    this.positionWatch = navigator.geolocation.watchPosition((position) => {
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

  private stopWatch() {
    if (this.positionWatch >= 0) {
      navigator.geolocation.clearWatch(this.positionWatch)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Typescript! Version 2!</Text>
        <Text>{this.location}</Text>
        <Text>{this.gpsCounter}</Text>
        <Button
          onPress={ () => this.props.navigation.navigate("Modal")}
          title="bububu"
        />
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
