export interface IProduct{
    id: number;
    amount: number;
    factory: ProductFactory;
    name: string;
    price: number;
}

interface ProductFactory {
    id: number;
    name: string;
}