export default abstract class EventDispatcher {
  
  private _events: Events = {};
  
  
  public addEventListener (event: string, callback: () => void): void {
    if (!this._events[event]) { this._events[event] = []; }
    this._events[event].push(callback);
  }
  
  public removeEventListener (event: string, callback: () => void): void {
    if (!this._events[event]) { throw new Error('[EventDispatcher] No such event!'); }
    this._events[event].forEach((e: () => void, i: number) => {
      if (e === callback) {
        this._events[event].splice(i, 1);
      }
    });
  }
  
  protected invoke (event: string) {
    if (this._events[event]) {
      this._events[event].forEach(e => e());
    }
  }
  
}

export interface Events {
  [key: string]: Array<() => void>;
}
