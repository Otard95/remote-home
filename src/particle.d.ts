declare module 'particle-api-js' {

  export default class Particle {
    login(options?: RequestOptions): Promise<ParticleResponse<ParticleAuthenticationResponse>>;
    listDevices(options?: RequestOptions): Promise<ParticleResponse<PartilceDevice[]>>;
    getDevice(options?: RequestOptions): Promise<ParticleResponse<PartilceDeviceInfo>>;
    getVariable(options?: RequestOptions): Promise<ParticleResponse<PartilceVariable>>;
    callFunction(options?: RequestOptions): Promise<ParticleResponse<ParticleGeneralResponse>>;
  }

  interface RequestOptions {
    auth?: string,
    deviceId?: string,
    name?: string,
    argument?: string,
    password?: string,
    username?: string,
  }

  interface ParticleResponse<T> {
    body: T
  }

  interface ParticleAuthenticationResponse {
    access_token: string
  }

  interface PartilceDevice {
    id: string,
    name?: string,
    last_ip_address?: string,
  }

  interface PartilceDeviceInfo {
    id: string,
    name?: string,
    variables?: {
      [key: string]: string
    },
    functions?: string[],
    connected: boolean,
    platform_id: number,
    product_id: number,
    system_firmware_version: string
    cellular: boolean,
    serial_number: string
    last_ip_address: string,
    last_heard: string,
    notes?: any
  }

  interface PartilceVariable {
    name: string,
    result: string | number | boolean,
  }

  interface ParticleGeneralResponse {
    return_value: number
  }

}