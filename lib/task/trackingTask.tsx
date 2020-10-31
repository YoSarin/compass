import { DistanceBetween, ICoords } from '../icoords';
import { ITaskResult, Status, ITask } from './ITask';
import { ILocationObject, Location, PositionWatcher } from '../location';
import { Disposable } from '../iDisposable';
import { Compass } from '../../components';
import { CompassProps } from '../../components/compass';

export class TrackingTask implements ITask<CompassProps> {

  private target: ICoords;
  private currentLocation?: ICoords;
  private tolerance: number;

  private locationWatch: (watcher: PositionWatcher) => Promise<Disposable>;

  public constructor(target: ICoords, tolerance: number, locationWatch: (watcher: PositionWatcher) => Promise<Disposable>) {
    this.target = target;
    this.locationWatch = locationWatch;
    this.tolerance = tolerance;
  }

  public async Track(): Promise<ITaskResult> {
    return new Promise<ITaskResult>(async (resolve, reject) => {
      try {
        let locationWatcher = await this.locationWatch((location: ILocationObject) => {
          this.currentLocation = location.coords;
          if (DistanceBetween(location.coords, this.target) <= this.tolerance) {
            locationWatcher.Dispose();
            resolve({ Status: () => Status.Completed });
          };
        });
      } catch (e) {
        console.log(e);
        resolve({ Status: () => Status.SystemError });
      }
    });
  }

  public Content(): React.Component<CompassProps> {
    return new Compass({
      targetPoint: this.target,
      startingPoint: this.currentLocation
    });
  }
}