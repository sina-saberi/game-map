export { }
declare global {
    declare interface InitialState<T, TD = T[0]> {
        loading?: boolean,
        detail?: TD
        data?: T,
        error?: string,
    }
}