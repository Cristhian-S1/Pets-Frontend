import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Necesitas importar Observable

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 💡 **PASO CRÍTICO 1: DEFINIR EL ENDPOINT**
  // Reemplaza 'http://localhost:3000/api/auth' con la URL base real de tu backend
  private apiUrl: string = 'http://localhost:3000/api/auth'; 
  private http = inject(HttpClient);

  // **PASO CRÍTICO 2: IMPLEMENTAR LA LLAMADA POST**
  public registrarUsuario(
    nombreCompleto: string, 
    correo: string, 
    telefono: string, 
    contraseña: string
  ): Observable<any> {
    
    // Crear el objeto (payload) que se enviará en el cuerpo de la solicitud JSON
    const body = {
      name: nombreCompleto,
      email: correo,
      phone: telefono, 
      password: contraseña
    };

    // Usar HttpClient.post() para enviar la solicitud.
    // Asumimos que el endpoint de registro es '/register' dentro de tu ruta base.
    return this.http.post<any>(`${this.apiUrl}/register`, body); 
  }

  // Si tienes otras funciones de autenticación (ej. login)
  public ingresarUsuario(correo: any, contraseña: any){
     // Lógica para iniciar sesión
  }

}
