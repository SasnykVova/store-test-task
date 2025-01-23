interface Size {
    width: number
    height: number
}

interface Comments {
    id: number
    productId: number
    description: string
    date: string
}

export interface StoreState {
    id: number
    imageUrl: string
    name: string
    count: number
    size: Size
    weight: string
    comments: Comments[]
}
export interface ProductData {
    productData: StoreState[]
}
export interface InitialState {
    getProducts: {
        productsData: StoreState[]
        loading: boolean,
        success: boolean,
        error: null | string,
    },
    addProduct: {
        loading: boolean
        success: boolean
        error: null | string
        name: string
        imageUrl: string
        count: null | number
        width: null | number
        height: null | number
        weight: string
    }
}