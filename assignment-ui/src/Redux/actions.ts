export interface ITokenToShow {
    readonly type: 'SET_TOKEN_TO_SHOW',
    payload: string
}

export interface ITokenData {
    readonly type: 'SET_TOKEN_DATA',
    payload: any
}

export type ITableActions = ITokenToShow | ITokenData