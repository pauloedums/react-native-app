export interface IProduct{
    id: number;
    amount: number;
    factory: ProductFactory;
    name: string;
    price: number;
    image: string;
}

interface ProductFactory {
    id: number;
    name: string;
}