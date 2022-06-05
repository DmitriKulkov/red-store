export interface Product{
    id: number,
    price: string,
    startsAt: string|null,
    endsAt: string|null,
    discount: {
        discount_id: number,
        percent: number,
        starts_at: string,
        ends_at: string
    }|null,
    model: {
        id: number,
        name: string,
        slug: string,
        description: string,
        released: boolean
    },
    color: {
        id: number,
        name: string,
        hex: string
    },
    files: {
        id: number,
        name: string,
        encoded_img: string
    }[]
}