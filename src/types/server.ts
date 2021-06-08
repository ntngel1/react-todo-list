export interface ServerResponse<Type> {
    ok: boolean,
    content: Type | null,
    errorCode: number | null,
    errorMessage: string | null
}