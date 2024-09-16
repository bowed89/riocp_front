export interface User {
    id?: number;
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    estado: boolean;
    rol_id: number;
    created_at?: string;
    updated_at?: string;
}