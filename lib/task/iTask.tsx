export interface ITask<T> {
  Track(): Promise<ITaskResult>;
  Content(): React.Component<T>;
}

export interface ITaskResult {
  Status(): Status;
}

export enum Status {
  Completed,
  InProgress,
  Inactive,
  Failed,
  GivenUp,
  Retreated,
  SystemError
}