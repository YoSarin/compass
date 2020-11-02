import React from "react"
import { DistanceBetween, ICoords } from '../lib/icoords';
import { Status, ITask } from './iTask';
import { ILocationObject, Location } from '../lib/location';
import { IDisposable } from '../lib/iDisposable';
import { Compass } from '../components';
import { Text, View, StyleSheet, TouchableNativeFeedback } from "react-native";

export interface TrackingTaskProps {
  title: string,
  targetPoint: ICoords,
  tolerance: number
}

export class TrackingTask extends React.Component<TrackingTaskProps> implements ITask<TrackingTaskProps>
{
  private currentDistance?: number = 0;
  private locationWatcher: IDisposable = { Dispose: () => { } };
  private updates = 0;
  private status: Status;
  private _mounted: boolean = false;
  private static id: number = 0;

  constructor(props:TrackingTaskProps) {
    super(props);
    this.status = Status.Inactive;
  }

  public Status(): Status {
    return this.status;
  }

  public async Track() {
    console.log("TrackingTask::Track()[start]");
    this.locationWatcher.Dispose();
    this.locationWatcher = await Location.WatchLocation(this.locationUpdated.bind(this), "<TrackingTask #" + (++TrackingTask.id) + ">");

    this.status = Status.WaitingForLocation;
    console.log("TrackingTask::Track()[leaving]");
  }

  private async Stop() {
    console.log("TrackingTask::Stop()");
    this.locationWatcher.Dispose()
  }

  private locationUpdated(position: ILocationObject):void {
    // console.log("TrackingTask::locationUpdated(", position, ")");
    this.status = Status.InProgress;
    this.updates++;
    if (position && this.props) {
      this.currentDistance = DistanceBetween(position.coords, this.props.targetPoint);
      if (this.currentDistance <= this.props.tolerance) {
        this.Stop();
        this.status = Status.Completed;
      };
    }
    if (this._mounted) {
      this.setState({ refresh: true });
    }
  }

  async componentDidMount() {
    this._mounted = true;
    this.setState({ render: true });
    await this.Track();
  }
  
  async componentWillUnmount() {
    this._mounted = false;
    await this.Stop();
    await this.locationWatcher.Dispose();
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", padding: 5 }}>
        <View style={{ flex: 1 }}>
          <Text>Test</Text>
          <Text>{this.props.title} [{this.status.toString()}]</Text>
          <Text>Distance: {this.currentDistance} (#{this.updates})</Text>
        </View>
        <View style={{flex: 2}}>
          <Compass targetPoint={this.props.targetPoint} scale={15} />
        </View>
      </View>
    );
  }
  
  private static styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
}
