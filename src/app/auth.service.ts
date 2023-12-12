// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedUsers: any[] = [];
  private listQr: any[] = [];
  private listQrA: any[] = [];
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

    return true; // Registro exitoso
  }

  login(username: string, password: string): { success: boolean; reason?: string; input?: string } {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const authenticatedUser = users.find((user: any) => user.username === username && user.password === password);
  
    if (authenticatedUser) {
      this.currentUser = authenticatedUser;
      this.authenticatedUsers.push(authenticatedUser);
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      return { success: true }; // Inicio de sesión exitoso
    }
  
    // Determina la razón del fallo en el inicio de sesión
    const reason = users.some((user: any) => user.username === username) ? 'contrasenaNoValida' : 'usuarioNoValido';
    const input = users.some((user: any) => user.username === username) ? 'contrasenaNoValida' : 'usuarioNoValido';
    return { success: false, reason, input };
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

  newQr(seccion: string, clase: string, hora: string): boolean {
    const storedQr = localStorage.getItem('qrs');
    const qrs = storedQr ? JSON.parse(storedQr) : [];

    const newQr = { seccion, clase, hora };
    qrs.push(newQr);
    localStorage.setItem('qrs', JSON.stringify(qrs));

    this.listQr.push(newQr);
    return true;
  }

  getQr(): any[]{
    return this.listQr;
  }

  newQrA(seccion: string, clase: string, hora: string): boolean {
    const storedQrA = localStorage.getItem('qras');
    const qras = storedQrA ? JSON.parse(storedQrA) : [];

    const newQrA = { seccion, clase, hora };
    qras.push(newQrA);
    localStorage.setItem('qras', JSON.stringify(qras));

    this.listQrA.push(newQrA);
    return true;
  }

  getQrA(): any[]{
    return this.listQrA;
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