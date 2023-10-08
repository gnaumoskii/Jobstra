export interface ErrorResponse {
    message: string;
}

export const isErrorResponse = (obj: object): obj is ErrorResponse => {
    return 'message' in obj;
}

export interface AuthResponse {
    username: string;
}