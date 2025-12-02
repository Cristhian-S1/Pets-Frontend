import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl: string = "http://localhost:3000/pets/auth";
  private http = inject(HttpClient);

  public registrarUsuario(
    nombreCompleto: string,
    correo: string,
    telefono: string,
    contraseña: string
  ): Observable<any> {
    const body = {
      us_nombre: nombreCompleto,
      us_email: correo,
      us_contrasena: contraseña,
      us_contacto: telefono,
    };
    console.log(nombreCompleto);
    return this.http.post<any>(`${this.apiUrl}/register`, body);
  }

  public ingresarUsuario(correo: string, contraseña: string) {
    const usuario = {
      email: correo,
      password: contraseña,
    };

    return this.http.post<any>(`${this.apiUrl}/login`, usuario);
  }
}
