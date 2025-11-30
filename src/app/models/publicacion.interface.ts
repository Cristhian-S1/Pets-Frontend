import { Etiqueta } from "./etiqueta.interface";

export interface Publicacion {
  pu_id: number;
  pu_titulo: string;
  pu_descripcion: string;
  pu_image: string;
  pu_fecha: string;
  pu_estado: boolean;
  pu_ubicacion: string;
  us_id: number;
  us_nombre: string;
  us_apellido: string;
  us_contacto: string;

  etiquetas?: Etiqueta[];
}

export interface CrearPublicacion {
  pu_titulo: string;
  pu_descripcion: string;
  pu_ubicacion: string;
  pu_imagen: string;
  pu_imagenes?: string[];
  pu_etiquetas?: number[];
}

