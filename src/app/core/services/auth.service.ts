import { Injectable, signal } from '@angular/core';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  /**
   * Harcodeo un usuario de prueba
   */

  private readonly _user: any = {
    name: "Antoñito",
    surname: "picaTeclas",
    email: "antonio@gmail.com"
  };


  /**
   * Usa signal para guardar el usuario actual. En el constructor
   * Crea un usuario nulo
   * Verifica si hay un token guardado en localStorage
   * Si existe establece el usuario logueado
   */

  public user: any | null;
  constructor() {
    this.user = signal<any>(null);
    let cookie = localStorage.getItem('AUTHENTICATION');
    if (cookie)
      this.user.set(this._user);
  }

  private users: any[] = [];
  register(credentials: Credentials) {
    let users = JSON.parse(localStorage.getItem('USERS') || '[]');

    const userExits = this.users.some(u => u.email === credentials.email);
    if (userExits) {
      throw new Error('El usuario ya existe')
    }

    const newUser = {
      email: credentials.email,
      password: credentials.password
    };

    //lo guardo en lal ista
    this.users.push(newUser);


    localStorage.setItem('AUTHENTICATION', JSON.stringify(credentials));
    //Acutalizar el singal con el nuevo usuario
    this.user.set(newUser);

    return newUser;
  }


  /* Cuando el usuario se logea:
    - Guarda las credenciales en localStorage
    - Actualiza el signal del usuario con los datos
   */
  login(credentials: Credentials) {
    let users = JSON.parse(localStorage.getItem('USERS') ||'[]');

    const user = users.find((u: { email: string; password: string; }) => u.email === credentials.email && u.password === credentials.password);
    if(!user){
      throw new Error('Credenciales inválidas');
    }

    localStorage.setItem('AUTHENTICATION',JSON.stringify(credentials));
    this.user.set(user);
  }



  /*Elimina el token del localStorage y limpia el usuario del singal  */
  logout() {
    localStorage.removeItem('USERS');
    this.user.set(null);
  }
}
