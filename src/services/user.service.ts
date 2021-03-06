import { ICustomer } from './../interfaces/customer.interface';
import { CrudService } from './../shared/crud.service'

class UserService extends CrudService<ICustomer>{

    constructor() {
        super('/user');
    }


    public async getUser(token: string) {
        try {
            return await this.readAll('logged');
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async createUser(customer: ICustomer) {
        try {
            return await this.create(customer, 'customer/add');
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export const userService = new UserService();