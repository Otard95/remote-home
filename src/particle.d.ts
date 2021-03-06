declare module 'particle-api-js' {

  export default class Particle {
    public login (options?: RequestOptions): Promise<ParticleResponse<ParticleAuthenticationResponse>>;
    public listDevices (options?: RequestOptions): Promise<ParticleResponse<PartilceDevice[]>>;
    public getDevice (options?: RequestOptions): Promise<ParticleResponse<PartilceDeviceInfo>>;
    public getVariable (options?: RequestOptions): Promise<ParticleResponse<PartilceVariable>>;
    public callFunction (options?: RequestOptions): Promise<ParticleResponse<ParticleGeneralResponse>>;
  }

  interface RequestOptions {
    auth?: string;
    deviceId?: string;
    name?: string;
    argument?: string;
    password?: string;
    username?: string;
  }

  interface ParticleResponse<T> {
    body: T;
  }

  interface ParticleAuthenticationResponse {
    access_token: string;
  }

  interface PartilceDevice {
    id: string;
    name?: string;
    last_ip_address?: string;
  }

  interface PartilceDeviceInfo {
    id: string;
    name?: string;
    variables?: ParticleVariableList;
    functions?: string[];
    connected: boolean;
    platform_id: number;
    product_id: number;
    system_firmware_version: string;
    cellular: boolean;
    serial_number: string;
    last_ip_address: string;
    last_heard: string;
    notes?: any;
  }
  
  interface ParticleVariableList {
    [key: string]: string;
  }

  interface PartilceVariable {
    name: string;
    result: string | number | boolean;
  }

  interface ParticleGeneralResponse {
    return_value: number;
  }

}
