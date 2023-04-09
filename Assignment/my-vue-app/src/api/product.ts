import instance from ".";

export const getAll = () => {
    const uri = "/product"
    return instance.get(uri)
}
export const getOne = (id:string | number) => {
    const uri = `/products/`+id
    return instance.get(uri)
}