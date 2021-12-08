import { Login } from '../interfaces/login.interface';
import { CrudService } from './../shared/crud.service';


class LoginService extends CrudService<Login>{

    constructor() {
        super('/user/login');
    }


    public async login(login: Login): Promise<Login | string | null> {
        try {
            return await this.create(login);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}

export const loginService = new LoginService();