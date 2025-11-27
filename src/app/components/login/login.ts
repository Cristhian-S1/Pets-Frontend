import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-login',
  imports: [ CommonModule, ReactiveFormsModule ],
  // Nota: Deberías usar 'template' en lugar de 'templateUrl' si usas Standalone, 
  // pero mantendremos tu estructura actual. Asumiendo 'standalone: true'
  templateUrl: './login.html', 
  styleUrls: ['./login.css'] // Corregido a styleUrls
})
export class LoginComponent implements OnInit {
  // Usamos '!' ya que la inicialización puede ocurrir en el constructor o ngOnInit
  // Pero lo moveremos al constructor para mayor seguridad y buenas prácticas.
  loginForm!: FormGroup; 
  showPassword = false;
  errorMessage = '';
  isLoading = false;
  
  private servicioAuth: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  // Inicialización del FormGroup en el constructor (Mejor práctica)
  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Si no se usa para lógica adicional, se puede omitir, pero lo mantengo
  // por si tu app la necesita.
  public ngOnInit(): void {
    // Si la inicialización se movió al constructor, esta función puede quedar vacía
    // o se usa para otra lógica de inicialización.
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    // 1. Verificar validez del formulario
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      // 2. LLAMADA AL SERVICIO DE AUTENTICACIÓN
      /* this.servicioAuth.ingresarUsuario(email, password).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          // 💡 Manejo de token o sesión aquí (guardar en localStorage/sessionStorage/cookies)
          // Ejemplo: localStorage.setItem('auth_token', response.token); 
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error de Login:', error);
          // Mostrar mensaje de error del backend o un mensaje genérico.
          this.errorMessage = error.error?.message || 'Credenciales inválidas. Por favor intenta de nuevo.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      }); */
    } else {
      this.formGroupVal(this.loginForm);
      this.errorMessage = 'Por favor, introduce credenciales válidas.';
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Función de utilidad para marcar todos los campos como tocados
  private formGroupVal(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para fácil acceso a los controles
  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}