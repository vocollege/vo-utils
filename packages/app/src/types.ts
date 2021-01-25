export type AuthStorageConfigType = {
    STATE: string,
    VERIFIER: string,
    REFRESH_TOKEN: string,
    ACCESS_TOKEN: string,
    TOKEN_TYPE: string
    EXPIRES_IN: string
}
export type AuthConfigType = {
    BASE_URL: string,
    CLIENT_ID?: string,
    LOGIN?: string,
    ENDPOINT?: string,
    STORAGE?: AuthStorageConfigType
}
export type ApiConfigType = {
    BASE_URL: string,
    ENDPOINT?: string,
    GRAPHQL?: string
}
export type AppConfigType = {
    BASE_URL: string,
    AUTH?: string,
    HOME?: string,
    LOGIN?: string
}
export type VoAppType = {
    configure: Function,
    config?: Function,
    auth: any,
    api: any
}
export type VoTokenType = {
    token_type: string,
    access_token: string,
    refresh_token: string,
    expires_in: string
}