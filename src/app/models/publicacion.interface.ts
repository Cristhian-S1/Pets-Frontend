export interface Publicacion {
  pu_titulo: string;
  pu_descripcion: string;
  pu_image: string;
  pu_fecha: string;
  pu_estado: boolean;
  pu_ubicacion: string;
  nombre: string;
  us_contacto: number;
}

export interface CrearPublicacion {
  pu_titulo: string;
  pu_descripcion: string;
  pu_ubicacion: string;
  pu_imagen: string;
}
