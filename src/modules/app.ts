import AppController from './controller.js';
import 'dotenv/config'
import { createServer, IncomingMessage, ServerResponse } from 'http';
// import { Response } from "../types.js";

class App {
    controller: AppController;

    constructor() {
        this.controller = new AppController()
    }

    start(): void {
            const PORT = process.env.PORT || 4000
            const server = createServer((request: IncomingMessage, response: ServerResponse) => {
                const answer: string = this.controller.resolveRequest(request, response)
                response.end(answer);
            });

            server.listen(PORT, (): void => {
                console.log(`Server listening on port ${PORT}`);
            });


        //      const answer: Response = this.controller.resolveRequest(request)
    }
}

export default App;
