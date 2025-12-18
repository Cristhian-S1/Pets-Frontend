import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); 

  // --- DEBUG: MIRA LA CONSOLA DEL NAVEGADOR ---
  console.log("INTERCEPTOR EJECUTÁNDOSE");
  console.log("Token encontrado en LocalStorage:", token);
  // ---------------------------------------------

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};