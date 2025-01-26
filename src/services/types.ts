
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

export interface GetProducts {
    id: number
    imageUrl: string
    name: string
    count: number
    size: Size
    weight: string
    comments: Comments[]
}
export interface ProductData {
    productData: GetProducts[]
}
export interface InitialState {
    getProducts: {
        productsData: GetProducts[]
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
    },
    deleteProduct: {
        loading: boolean
        success: boolean
        error: null | string
        modalOpen: boolean
    },
    getOne: {
        data: GetOne
        loading: boolean
        success: boolean
        error: null | string
    }
}
export interface AddProduct {
    imageUrl: string
    name: string
    count: number
    size: Size
    weight: string
    comments: Comments[]
}

interface Comment {
    id: null | number
    productId: null | number
    description: string
    date: string
}

export interface GetOne {
    id: number | string
    imageUrl: string
    name: string
    count: null | number
    size: Size
    weight: string
    comments: Comments[]
}

