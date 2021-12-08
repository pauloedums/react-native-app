import { Product } from './../interfaces/product.interface';
import { CrudService } from '../shared/crud.service';

class ProductService extends CrudService<Product> {

    constructor(){
        super('/product');
    }

    public async getProducts(token: string) {
        try {
            return await this.readAll('/list');
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async createProduct(token: string, body: Product) {
        try {
            return await this.create(body, '/add');
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async deleteProduct(token: string, idToDelete: string) {
        try {
            return await this.delete(idToDelete, '/remove');
        } catch (error) {
            console.error(error);
            return null;
        }
    }


}

export const productService = new ProductService();