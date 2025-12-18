import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-register",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./register.html",
  styleUrl: "./register.css",
})
export class RegisterComponent {
  registerForm!: FormGroup; 
  showPassword = false;
  showConfirmPassword = false;
  errorMessage = "";
  isLoading = false;

  // Inyección de dependencias
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService); 

  constructor() {
    this.registerForm = this.fb.group(
      {
        name: ["", [Validators.required, Validators.minLength(3)]],
        lastName: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", [Validators.required, Validators.pattern(/^[0-9]{9,}$/)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = "";

      const { name, lastName, email, phone, password } = this.registerForm.value;
      console.log(name);
      console.log(lastName);
      console.log(email);
      console.log(phone);
      console.log(password);

      this.authService
        .registrarUsuario(name, lastName, email, phone, password)
        .subscribe({
          next: (response) => {
            console.log("Registro exitoso", response);
            this.router.navigate(["/login"]);
          },
          error: (error) => {
            console.error("Error de Registro", error);
            this.errorMessage =
              error.error?.message ||
              "Error al registrarse. Por favor intenta de nuevo.";
            this.isLoading = false; 
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    } else {
      this.formGroupVal(this.registerForm);
      this.errorMessage =
        "Por favor, completa y corrige todos los campos requeridos.";
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value &&
      confirmPassword.value !== ""
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true }; 
    }

    if (confirmPassword && confirmPassword.hasError("passwordMismatch")) {
      confirmPassword.setErrors(null);
    }
    return null; 
  }

  private formGroupVal(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigateToLogin(): void {
    this.router.navigate(["/login"]);
  }

  get name() {
    return this.registerForm.get("name") as FormControl;
  }

  get lastName() {
    return this.registerForm.get("lastName") as FormControl;
  }

  get email() {
    return this.registerForm.get("email") as FormControl;
  }

  get phone() {
    return this.registerForm.get("phone") as FormControl;
  }

  get password() {
    return this.registerForm.get("password") as FormControl;
  }

  get confirmPassword() {
    return this.registerForm.get("confirmPassword") as FormControl;
  }
}
