export interface IDisposable {
  Dispose(): void|Promise<void>;
}