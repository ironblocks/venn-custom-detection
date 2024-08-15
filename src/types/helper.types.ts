export type PublicClassFields<T> = {
    [K in keyof T]: T[K]
}
