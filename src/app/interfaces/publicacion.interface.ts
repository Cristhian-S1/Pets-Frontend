import { Etiqueta } from "./etiqueta.interface";

export interface Publicacion {
    pu_id: number;
    pu_titulo: string;
    pu_descripcion: string;
    pu_image: string;
    pu_fecha: string | Date;
    pu_publicacion: boolean;
    pu_estado: boolean;
    pu_ubicacion: string;
    us_id: number;
    fo_id: number | null;
    us_nombre_completo?: string;
    us_contacto?: string;
    etiquetas?: Etiqueta[];
}