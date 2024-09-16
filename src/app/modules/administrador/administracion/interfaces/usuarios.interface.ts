export interface Usuarios {
    id?: number;
    nombre: string;
    apellido: string;
    correo: string;
    password?: string;
    estado?: boolean;
    rol_id?: number;
    rol?: string;
}