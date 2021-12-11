import axios from 'axios';


export class CrudService<T> {

    constructor(
        public apiPath: string,
        public token?: string
        ){

    }
    private readonly api = axios.create({
        baseURL: 'https://example-ecommerce.herokuapp.com'
    });


    public async create(requestBody: T, extraPath?:string){
        try {
            let response;
            if(this.token != null){
                const config = this.createConfig(this.token);
                response = await this.api.post<T>(this.extraPath(`${extraPath}`), requestBody, config);
            }else {
                response = await this.api.post<T>(this.extraPath(`${extraPath}`), requestBody);
            }
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    public async read(extraPath?: string){
        try {
            let response;
            if(this.token){
                const config = this.createConfig(this.token);
                response = await this.api.get<T>(this.extraPath(`${extraPath}`), config);
            }else {
                response = await this.api.get<T>(this.extraPath(`${extraPath}`));
            }
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    public async readAll(extraPath?: string){
        try {
            let response;
            if(this.token){
                const config = this.createConfig(this.token);
                response = await this.api.get<T[]>(this.extraPath(`${extraPath}`), config);
            }else {
                response = await this.api.get<T[]>(this.extraPath(`${extraPath}`));
            }
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    public async update(requestBody: T, extraPath?: string){
        try {
            let response;
            if(this.token){
                const config = this.createConfig(this.token);
                response = await this.api.put<T>(this.extraPath(`${extraPath}`), requestBody, config);
            }else {
                response = await this.api.put<T>(this.extraPath(`${extraPath}`), requestBody);
            }
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async delete(idToDelete: string, extraPath?: string){
        try {
            let response;
            if(this.token){
                const config = this.createConfig(this.token);
                response = await this.api.delete<T>(this.extraPath(`${idToDelete}/${extraPath}`),config);
            }else {
                response = await this.api.delete<T>(this.extraPath(`${idToDelete}/${extraPath}`));
            }
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    private extraPath(path: string): string {
        return path ? `${this.apiPath}/${path}` : this.apiPath;
    }


    private createConfig(token: string) {
        return { headers: { Authorization: `Bearer ${token}` } };
    }
}