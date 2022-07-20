export interface Model {
    id: number,
    name: string,
    slug: string,
    description: string,
    released: boolean
    category: {
        id: number,
        name: string
    }
}