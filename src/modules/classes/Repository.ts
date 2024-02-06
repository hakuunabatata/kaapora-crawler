export abstract class Repository {
  public abstract write(file: Buffer, path: string): Promise<void>
  public abstract read<T>(path: string, isJson: boolean): Promise<T>
}
