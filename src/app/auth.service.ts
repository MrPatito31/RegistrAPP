// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedUsers: any[] = [];
  private currentUser: any;

  constructor() { }

  register(username: string, password: string, name: string, lastname: string, email: string, rut: string): boolean {
    // Verifica si el usuario ya existe
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const existingUser = users.find((user: any) => user.username === username);

    if (existingUser) {
      return false; // Usuario ya registrado
    }

    // Registra al nuevo usuario
    const newUser = { username, password, name, lastname, email, rut };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Almacena el usuario actual
    this.currentUser = newUser;

    // Agrega el usuario actual a la lista de usuarios autenticados
    this.authenticatedUsers.push(newUser);

    return true; // Registro exitoso
  }

  login(username: string, password: string): boolean {
    // Verifica si el usuario existe
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const authenticatedUser = users.find((user: any) => user.username === username && user.password === password);

    if (authenticatedUser) {
      // Almacena el usuario actual
      this.currentUser = authenticatedUser;

      // Agrega el usuario actual a la lista de usuarios autenticados
      this.authenticatedUsers.push(authenticatedUser);

      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      return true; // Inicio de sesión exitoso
    }

    return false; // Credenciales incorrectas
  }

  logout(): void {
    // Elimina el usuario actual de la lista de usuarios autenticados
    const index = this.authenticatedUsers.findIndex(user => user.username === this.currentUser.username);
    if (index !== -1) {
      this.authenticatedUsers.splice(index, 1);
    }
  
    // Elimina el usuario actual almacenado en localStorage
    localStorage.removeItem('currentUser');
  
    // Limpia la referencia al usuario actual en el servicio
    this.currentUser = null;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  getAuthenticatedUsers(): any[] {
    return this.authenticatedUsers;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}
