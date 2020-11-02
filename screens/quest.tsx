import React from 'react';
import { ITask } from '../task/iTask';
import { TrackingTask } from '../task/trackingTask';

export class Quest extends React.Component {
  private static task: ITask<any> = new TrackingTask({ title: "K Borovici", targetPoint: { latitude: 50.21349540911615, longitude: 17.536071315407753 }, tolerance: 2 });

  public constructor(props:any) {
    super(props);
    Quest.task.Track();
  }

  render() {
    return Quest.task.render();
  }
}
