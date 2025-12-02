import { Component, inject, OnInit } from "@angular/core";
import { Router, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [RouterLinkActive],
  templateUrl: "./header.html",
  styleUrl: "./header.css",
})
export class Header implements OnInit {
  private router = inject(Router);

  public isLogged: boolean = true;
  public userRole: string = "user";

  ngOnInit(): void {
    // obtener authToken logica
    const token = localStorage.getItem("authToken");

    this.isLogged = token ? true : false;

    // obtener rol de usuario
    const userRole = localStorage.getItem("role");
    this.userRole = userRole ? userRole : "user";
  }

  viewPosts() {
    this.router.navigate(["/publicaciones"]);
  }

  createPost() {
    this.router.navigate(["/publicaciones/crear"]);
  }

  login() {
    this.router.navigate(["/login"]);
  }

  register() {
    this.router.navigate(["/register"]);
  }

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    this.isLogged = false;
    this.router.navigate(["/login"]);
  }
}
