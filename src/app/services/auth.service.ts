import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ruta: string = 'http://localhost:3000/pets';
  private http = inject(HttpClient);

  public registrarUsuario(nombreCompleto: string, correo: string, telefono: string, contraseña: string){

  }

  public ingresarUsuario(correo: string, contraseña: string){
    
  }

}
