export interface IProduct {
    _id: string | number,
    name: string,
    price: number,
    description: string,
    image: string[],
    brand: string,
    quality:number | string,
    categoryId: ICategory
}

export interface ICategory {
    _id: string,
    name: string,
    products:string[]
}