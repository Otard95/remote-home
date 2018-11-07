import EventDispatcher from '@/SupportClasses/EventDispatcher';
import Particle, { PartilceDevice } from 'particle-api-js';
const P = new Particle();

export default class ParticleService extends EventDispatcher {

  private static _instance: ParticleService;
  public isLoggedIn: boolean = false;
  private _token: string | null;

  private constructor () {
    super();
    if ((this._token = localStorage.getItem('particle-token'))) {
      this.isLoggedIn = true;
    }
  }

  get Particle (): Particle { return P; }
  set Token (token: string) {
    this._token = token;
    this.isLoggedIn = token ? true : false;
    localStorage.setItem('particle-token', token);
    this.invoke('onLogin');
  }
  get Token (): string { return this._token || ''; }

  public static get Instance () { return this._instance || (this._instance = new ParticleService()); }

}

export interface Events {
  [key: string]: Array<() => void>;
}

