import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // Inyecta aquí tu servicio de autenticación
    // private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      // Espacio para llamar al servicio de autenticación
      // this.authService.ingresarUsuario(email, password).subscribe({
      //   next: (response) => {
      //     console.log('Login exitoso', response);
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error: (error) => {
      //     this.errorMessage = 'Credenciales inválidas. Por favor intenta de nuevo.';
      //     this.isLoading = false;
      //   },
      //   complete: () => {
      //     this.isLoading = false;
      //   }
      // });

      
    } else {
      this.formGroupVal(this.loginForm);
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  private formGroupVal(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
