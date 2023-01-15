import { IncomingMessage, ServerResponse } from "node:http";
import { NewUser, User } from "../types.js";
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
                    response.end(JSON.stringify(users))
                    response.statusCode=200
                } else if (request.url?.startsWith('/api/users/')) {
                    const inputId: string = parseUrl(request.url)
                    if (isUuid(inputId)) {
                        const user: User | undefined = this.db.getUser(inputId)
                        response.end(JSON.stringify(user))
                    }
                }
                break
            }
            case 'POST': {
                if (request.url === '/api/users') {
                    getJSONDataFromRequestStream<NewUser>(request)
                    .then(user => {
                      const newUser = this.db.addUser(user);
                      response.end(JSON.stringify(newUser))
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