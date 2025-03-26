export interface ApiResponse<T> {
    reasonPhrase: string;
    data?: T;
    message: string;
}

export interface HttpResponse<T> {
    data?: ApiResponse<T>;
    message: string;
}
