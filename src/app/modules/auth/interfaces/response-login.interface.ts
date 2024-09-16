import { User } from '../interfaces/user.interface';

export interface ResponseLogin {
    status: boolean;
    message: string;
    data: User;
    token: string;
}
