export interface IProduct {
    _id: string | number,
    name: string,
    price: number,
    description: string,
    image: string[],
    brand: string,
    quality:number | string,
    categoryId: ICategory,
    totalPrice?: number
}

export interface ICategory {
    _id: string,
    name: string,
    products:string[]
}

export interface ICartProduct {
    _id?: string | number,
    name: string,
    image: string,
    price: number,
    quantity:number,
    totalPrice:number
}