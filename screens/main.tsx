import React from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native'
import { NavigationScreenProp } from "react-navigation"
import * as Location from 'expo-location';
import { Compass } from '../components/compass';


export class Main extends React.Component<{navigation:NavigationScreenProp<any>}> {

  private positionWatch:{remove():void} = {remove : () => {}};
  private headingWatch:{remove():void} = {remove : () => {}};
  private location:string = "unknown";
  private gpsCounter:number = 0;
  private storedLocations:Array<string> = [];
  private compass:Compass|null = null;
  private magCompass:Compass|null = null;

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
      // console.log(position)
      this.location = "" + position.coords.latitude + ";" + position.coords.longitude + " [±" + position.coords.accuracy + "]",
      this.gpsCounter++
      this.setState({refresh: true})
    })
    this.headingWatch = await Location.watchHeadingAsync((heading) => {
      if (this.compass instanceof Compass) {
        this.compass.pointTo(heading.trueHeading)
      }
      if (this.magCompass instanceof Compass) {
        this.magCompass.pointTo(heading.magHeading)
      }
    })
  }

  private async stopWatch() {
    if (this.positionWatch != null && typeof(this.positionWatch) === 'object') {
      this.positionWatch.remove()
    }
    if (this.headingWatch != null && typeof(this.headingWatch) === 'object') {
      this.headingWatch.remove()
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", padding: 5 }}>
        <View style={{flex:1}}>
          <Text>Typescript! Version 2!</Text>
          <Text>{this.location}</Text>
          <Text>refreshed: {this.gpsCounter}</Text>
          <Text>Stored: {this.storedLocations.length}</Text>
        </View>
        <View style={{flex:2, flexDirection: "row"}}>
          <View style={{flex:1}}>
            <Compass scale={10} ref={(compass) => this.compass = compass} />
          </View>
          <View style={{flex:1}}>
            <Compass scale={10} ref={(compass) => this.magCompass = compass} style={{ arrowColor: "blue" }} />
          </View>
        </View>
        <View style={{flex: 4}}>
          <FlatList
            data={this.storedLocations}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => <Text>{item}</Text>}
            extraData={this.storedLocations.length} />
        </View>
        <View style={{flexDirection: "row"}}>
          <View style={{flex:2}}>
            <Button
              onPress={ () => {
                this.storedLocations.push(this.location)
                this.setState({refresh: true})
              }}
              title="Store location"
            />
          </View>
          <View style={{flex:1}}>
            <Button
              onPress={ () => this.props.navigation.navigate("CompassWindow")}
              title="Compass"
            />
          </View>
        </View>
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
