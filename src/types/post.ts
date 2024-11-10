export interface PostRequestBody {
    title: string,
    content: string,
    timestamp: number,
}

export interface Post {
    title: string,
    content: string
}

export interface PostParams {
    id: string
}
