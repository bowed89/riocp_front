import { Menu } from "./menu.interface";

export interface ResponseMenu {
    status: boolean;
    message: string;
    data: Menu[];
}