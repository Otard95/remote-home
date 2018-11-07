export default class SimpleStore {
  
  private static _instance: SimpleStore;
  public static get Instance (): SimpleStore {
    return this._instance || (this._instance = new SimpleStore());
  }
  
  private _dictionary: Dictionary = {};
  
  public addItem (key: string, value: any): void {
    this._dictionary[key] = value;
  }
  
  public removeItem (key: string): void {
    delete this._dictionary[key];
  }
  
  public getItem (key: string): any {
    return this._dictionary[key];
  }
  
}

export interface Dictionary {
  [key: string]: any;
}
