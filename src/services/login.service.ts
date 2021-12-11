import { ILogin } from '../interfaces/login.interface';
import { CrudService } from './../shared/crud.service';


class LoginService extends CrudService<ILogin | string>{

    constructor() {
        super('/user/login');
    }


    public async logged(login: ILogin): Promise<ILogin | string | null> {
        try {
            return await this.create(login, '');
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}

export const loginService = new LoginService();