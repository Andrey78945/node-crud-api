import {v4 as uuidv4} from "uuid"

export class User {
    id: string
    username: string
    age: number
    hobbies: string[]

    constructor(newUser: NewUser) {
        this.id = uuidv4();
        this.username = newUser.username
        this.age = newUser.age
        this.hobbies = newUser.hobbies
    }
}

export type NewUser = Omit<User, 'id'>

export const enum StatusCode {
    OK = 200,
    ENTRY_CREATED = 201,
    ENTRY_DELETED = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404
}

export const enum ErrorCode {
    USER_ID_INVALID = 'Users id is not UUID',
    USER_NOT_FOUND = 'User not found',
    REQUEST_INVALID = 'Request does not contain required fields',
    REQUEST_FORMAT_INVALID = 'Request format is not JSON',
    METHOD_INVALID = 'Method of request is not valid for API',
    ERROR = 'Something happened, try later'
}