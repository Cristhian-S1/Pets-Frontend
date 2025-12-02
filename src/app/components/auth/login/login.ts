import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: "app-login",
  imports: [CommonModule, ReactiveFormsModule],
  // Nota: Deberías usar 'template' en lugar de 'templateUrl' si usas Standalone,
  // pero mantendremos tu estructura actual. Asumiendo 'standalone: true'
  templateUrl: "./login.html",
  styleUrls: ["./login.css"], // Corregido a styleUrls
})
export class LoginComponent {
  // Usamos '!' ya que la inicialización puede ocurrir en el constructor o ngOnInit
  // Pero lo moveremos al constructor para mayor seguridad y buenas prácticas.
  loginForm!: FormGroup;
  showPassword = false;
  errorMessage = "";
  isLoading = false;

  private servicioAuth: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  // Inicialización del FormGroup en el constructor (Mejor práctica)
  constructor() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = "";

      const { email, password } = this.loginForm.value;

      this.servicioAuth.ingresarUsuario(email, password).subscribe({
        next: (response) => {
          const token = response.datos.token;
          localStorage.setItem("authToken", token);
          console.log("Login exitoso", response);
          this.router.navigate(["/home"]);
        },
        error: (error) => {
          console.error("Error de Login:", error);
          this.errorMessage =
            error.error?.message ||
            "Credenciales inválidas. Por favor intenta de nuevo.";
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.formGroupVal(this.loginForm);
      this.errorMessage = "Por favor, introduce credenciales válidas.";
    }
  }

  navigateToRegister(): void {
    this.router.navigate(["/register"]);
  }

  private formGroupVal(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get email() {
    return this.loginForm.get("email") as FormControl;
  }

  get password() {
    return this.loginForm.get("password") as FormControl;
  }
}
