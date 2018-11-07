import EventDispatcher from '@/SupportClasses/EventDispatcher';

export default class IsReadyCollection extends EventDispatcher {
  
  private _states: boolean[] = [];
  
  constructor () {
    super();
  }
  
  public register (initial_value: boolean = false): number {
    this._states.push(initial_value);
    return this._states.length - 1;
  }
  
  public setReady (id: number, state: boolean): void {
    this._states[id] = state;
    if (this.allReady) {
      this.invoke('allReady');
    }
  }
  
  public isReady (id: number): boolean {
    return this._states[id];
  }
  
  public get allReady (): boolean {
    for (const state of this._states) {
      if (!state) { return false; }
    }
    return true;
  }
  
}
