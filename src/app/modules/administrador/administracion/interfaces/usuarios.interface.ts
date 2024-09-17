export interface Usuarios {
    id?: number;
    nombre: string;
    apellido: string;
    correo: string;
    nombre_usuario: string;
    ci: number;
    password?: string;
    estado?: boolean;
    rol_id?: number;
    entidad_id?: number;
    rol?: string;
}