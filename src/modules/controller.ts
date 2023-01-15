import { IncomingMessage, ServerResponse } from "node:http";
import { ErrorCode, NewUser, StatusCode, User } from "../types.js";
import { DataBase } from "./databse.js";
import getJSONDataFromRequestStream, { isUuid, parseUrl } from "./parser.js";

class AppController {
    db: DataBase

    constructor() {
        this.db = new DataBase();
    }

    resolveRequest(request: IncomingMessage, response: ServerResponse): void {
        switch (request.method) {
            case 'GET': {
                if (request.url === '/api/users') {
                    const users: User[] = this.db.getUsers()
                    response.statusCode = StatusCode.OK
                    response.end(JSON.stringify(users))
                } else if (request.url?.startsWith('/api/users/')) {
                    const inputId: string = parseUrl(request.url)
                    if (isUuid(inputId)) {
                        const user: User | undefined = this.db.getUser(inputId)
                        if (!user) {
                            response.statusCode = StatusCode.NOT_FOUND
                            response.statusMessage=ErrorCode.USER_NOT_FOUND
                            response.end(JSON.stringify({}))
                        }
                        response.statusCode = StatusCode.OK
                        response.end(JSON.stringify(user))
                    } else {
                        response.statusCode = StatusCode.BAD_REQUEST
                        response.statusMessage=ErrorCode.USER_ID_INVALID
                        response.end(JSON.stringify({}));
                    }
                }
                break
            }
            case 'POST': {
                if (request.url === '/api/users') {
                    getJSONDataFromRequestStream<NewUser>(request)
                    .then(user => {
                      if (user.age && user.username && user.hobbies) {
                        const newUser = this.db.addUser(user);
                        response.statusCode = StatusCode.ENTRY_CREATED
                        response.end(JSON.stringify(newUser))
                      } else {
                        response.statusCode = StatusCode.BAD_REQUEST
                        response.statusMessage=ErrorCode.REQUEST_INVALID
                        response.end(JSON.stringify({}));
                      }
                    })
                }
                break
            }
            case 'DELETE': {
                if (request.url?.startsWith('/api/users/')) {
                    const inputId: string = parseUrl(request.url)
                    if (isUuid(inputId)) {
                        this.db.deleteUser(inputId)
                        response.end(JSON.stringify({}))
                    }
                }
                break
            }
            case 'PUT': {
                if (request.url?.startsWith('/api/users/')) {
                    const inputId: string = parseUrl(request.url)
                    if (isUuid(inputId)) {
                        const user: User | undefined = this.db.getUser(inputId)
                        if (user) {
                            getJSONDataFromRequestStream<{username?: string, age?: number, hobbies?: string[]}>(request)
                                .then(userUpdate => {
                                    if (userUpdate.username) user.username = userUpdate.username
                                    if (userUpdate.age) user.age = userUpdate.age
                                    if (userUpdate.hobbies) user.hobbies = userUpdate.hobbies
                                    response.end(JSON.stringify(user))
                                })
                        }
                    }
                }
                break
            }
        }
    }
}

export default AppController;