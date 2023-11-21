

export class UserSignUpRequest {
    accountId: string
    password: string
    username: string
}

export class UserSignUpResponse {
    message: string
    accountId: string
    username: string
}