import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  // registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage = '';
  isLoading = false;
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  /*
  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  */

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { name, email, phone, password } = this.registerForm.value;

      // Espacio para llamar al servicio de registro
      // this.authService.registrarUsuario(name, email, phone, password).subscribe({
      //   next: (response) => {
      //     console.log('Registro exitoso', response);
      //     this.router.navigate(['/login']);
      //   },
      //   error: (error) => {
      //     this.errorMessage = 'Error al registrarse. Por favor intenta de nuevo.';
      //     this.isLoading = false;
      //   },
      //   complete: () => {
      //     this.isLoading = false;
      //   }
      // });

    } else {
      this.formGroupVal(this.registerForm);
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  private formGroupVal(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
} 
