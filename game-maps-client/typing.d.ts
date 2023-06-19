export { }
declare global {
    interface Window {
        settings: Appsettings
    }
    declare interface InitialState<T, TD = T[0]> {
        loading?: boolean,
        detail?: TD
        data?: T,
        error?: string,
    };
    declare interface Appsettings {
        url: string;
    };
}
