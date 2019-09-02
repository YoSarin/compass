import React from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native'
import { NavigationScreenProp } from "react-navigation"
import * as Location from 'expo-location';


export class Main extends React.Component<{navigation:NavigationScreenProp<any>}> {

  private positionWatch:{remove():void} = {remove : () => {}};
  private location:string = "unknown";
  private gpsCounter:number = 0;
  private storedLocations:Array<string> = [];

  async componentDidMount() {
      await Location.requestPermissionsAsync()
      this.watchLocation()
  }

  componentWillUnmount() {
    this.stopWatch()
  }

  private async watchLocation() {
    await this.stopWatch()
    this.positionWatch = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 0,
    }, (position) => {
      console.log(position)
      this.location = "" + position.coords.latitude + ";" + position.coords.longitude + " [±" + position.coords.accuracy + "]",
      this.gpsCounter++
      this.setState({refresh: true})
    })
  }

  private async stopWatch() {
    if (this.positionWatch != null && typeof(this.positionWatch) === 'object') {
      this.positionWatch.remove()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Typescript! Version 2!</Text>
        <Text>{this.location}</Text>
        <Text>refresshed: {this.gpsCounter}</Text>
        <Text>Stored: {this.storedLocations.length}</Text>
        <Button
          onPress={ () => {
            this.storedLocations.push(this.location)
            this.setState({refresh: true})
          }}
          title="Store location"
        />
        <FlatList
          data={this.storedLocations}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <Text>{item}</Text>}
          extraData={this.storedLocations.length} />
        <Button
          onPress={ () => this.props.navigation.navigate("Modal")}
          title="Modal"
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
