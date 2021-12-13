import axios from 'axios';


class ImageService {

    constructor() {}

    private readonly api = axios.create({
        baseURL: 'https://pixabay.com/api'
    });

    public async read(query?: string){
        try {
            let response = await this.api.get(`?key=4313518-8aa6edd15443f3a42fe760bdb&q=${query}`);
            return response.data.hits[0].webformatURL;
        } catch (error) {
            return 'https://cdn.pixabay.com/photo/2017/06/05/18/59/phone-2374915_150.png';
        }
    }
    
}
export const imageService = new ImageService();