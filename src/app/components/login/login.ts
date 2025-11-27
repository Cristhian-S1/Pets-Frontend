import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  showPassword = false;
  errorMessage = '';
  isLoading = false;
  private servicioAuth: AuthService = inject(AuthService)
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  loginForm: FormGroup = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]]
  });

  public ngOnInit(){
    
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      /*
      this.servicioAuth.ingresarUsuario(email, password).subscribe({
        next: (response) => {
           console.log('Login exitoso', response);
           this.router.navigate(['/home']);
         },
         error: (error) => {
          console.log('Error: ', error);
           this.errorMessage = 'Credenciales inválidas. Por favor intenta de nuevo.';
           this.isLoading = false;
          },
         complete: () => {
           this.isLoading = false;
         }
      });
      */
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


