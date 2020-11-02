import React from 'react';
import { FlatList, Text, View, Button } from 'react-native'
import { NavigationScreenProp } from "react-navigation"
import { Location } from '../lib/location';
import { ICoords, DistanceBetween } from '../lib/icoords';
import { Compass, HeadingType } from '../components';
import { IDisposable } from '../lib/iDisposable';
import { Quest } from './quest';

export class Main extends React.Component<{navigation:NavigationScreenProp<any>}> {

  private positionWatch:IDisposable = {Dispose : () => {}};
  private location: string = "unknown";
  private distanceToBrno: string = "unknown";
  private distanceToBorovice: string = "unknown";
  private gpsCounter:number = 0;
  private storedLocations: Array<string> = [];
  
  private brnoLocation: ICoords = {latitude: 49.195060, longitude: 16.606837};
  private boroviceLocation: ICoords = {latitude: 50.21349540911615, longitude: 17.536071315407753};

  async componentDidMount() {
    this.watchLocation()
  }

  async componentWillUnmount() {
    await this.stopWatch()
  }

  private async watchLocation() {
    await this.stopWatch()
    this.positionWatch = await Location.WatchLocation(
      (position) => {
        if (position) {
          this.location = "" + position.coords.latitude + ";" + position.coords.longitude + " [±" + position.coords.accuracy + "]";
          this.distanceToBrno = "" + DistanceBetween(position.coords, this.brnoLocation);
          this.distanceToBorovice = "" + DistanceBetween(position.coords, this.boroviceLocation);
        }
        this.gpsCounter++
        this.setState({refresh: true})
      }, "Main.Positions"
    )
  }

  private async stopWatch() {
    if (this.positionWatch != null && typeof(this.positionWatch) === 'object') {
      this.positionWatch.Dispose()
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", padding: 5 }}>
        <View style={{flex:1}}>
          <Text>Typescript! Version 2! YaY!</Text>
          <Text>Location: {this.location}</Text>
          <Text>Distance to Hell: {this.distanceToBrno}</Text>
          <Text>Distance to borovice: {this.distanceToBorovice}</Text>
          <Text>refreshed: {this.gpsCounter}</Text>
          <Text>Stored: {this.storedLocations.length}</Text>
        </View>
        <View style={{flex:2, flexDirection: "row"}}>
          <View style={{flex:1}}>
            <Compass scale={10} />
          </View>
          <View style={{flex:1}}>
            <Compass scale={10} style={{ arrowColor: "green" }} />
          </View>
          <View style={{flex:1}}>
            <Compass scale={10} style={{ arrowColor: "blue" }} headingType={HeadingType.MagneticHeading} />
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <Quest />
        </View>
        <View style={{flex: 2}}>
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
          <View style={{flex:1}}>
            <Button
              onPress={ () => this.props.navigation.navigate("Quest")}
              title="Quest"
            />
          </View>
        </View>
      </View>
    );
  }
}
