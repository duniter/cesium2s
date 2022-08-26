export interface AuthData {

  password?: string;

  v1?: {
    salt: string;
    password: string;
  }
}
