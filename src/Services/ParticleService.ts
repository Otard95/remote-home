import Particle, { PartilceDevice } from 'particle-api-js';
const P = new Particle();

export default class ParticleService {

  private static _instance: ParticleService;
  public isLoggedIn: boolean = false;
  private _token: string | null;
  private _events: Events;

  private constructor () {
    this._events = {};
    if ((this._token = localStorage.getItem('particle-token'))) {
      this.isLoggedIn = true;
    }
  }

  get Particle (): Particle { return P; }
  set Token (token: string) {
    this._token = token;
    this.isLoggedIn = token ? true : false;
    localStorage.setItem('particle-token', token);
    if (this._events.onLogin) {
      this._events.onLogin.forEach(e => {
        e();
      });
    }
  }
  get Token (): string { return this._token || ''; }

  public static get Instance () { return this._instance || (this._instance = new ParticleService()); }

  public addEventListner (type: string, callback: () => void) {
    if (!this._events[type]) { this._events[type] = []; }
    this._events[type].push(callback);
  }

}

interface Events {
  [key: string]: Array<() => void>;
}
