// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  register(username: string, password: string): boolean {
    // Verifica si el usuario ya existe
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user: any) => user.username === username);

    if (existingUser) {
      return false; // Usuario ya registrado
    }

    // Registra al nuevo usuario
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    return true; // Registro exitoso
  }

  login(username: string, password: string): boolean {
    // Verifica si el usuario existe
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const authenticatedUser = users.find((user: any) => user.username === username && user.password === password);

    if (authenticatedUser) {
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      return true; // Inicio de sesión exitoso
    }

    return false; // Credenciales incorrectas
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}
