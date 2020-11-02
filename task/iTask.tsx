export interface ITask<T> extends React.Component<T> {
  Track(): void|Promise<void>;
  Status(): Status;
}

export enum Status {
  Completed = "Completed",
  InProgress = "In Progress",
  Inactive = "Inactive",
  Failed = "Failed",
  GivenUp = "Given up",
  SystemError = "System Error",
  WaitingForLocation = "Waiting For Location"
}