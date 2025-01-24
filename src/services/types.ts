export interface Size {
    width: null | number
    height: null | number
}

interface Comments {
    id: number
    productId: number
    description: string
    date: string
}

export interface AddProduct {
    imageUrl: string
    name: string
    count: number
    size: Size
    weight: string
    comments: Comments[]
}
export interface ProductData {
    productData: AddProduct[]
}
export interface InitialState {
    getProducts: {
        productsData: AddProduct[]
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
        size: Size
        weight: string
        comments: Comment[]
    }
}

interface Comment {
    id: null | number
    productId: null | number
    description: string
    date: string
}

