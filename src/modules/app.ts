import AppController from './controller.js';
import 'dotenv/config'
import http from "node:http"

class App {
 //   controller: AppController;

    start(): void {
        const PORT = process.env.PORT
        const server = http.createServer()

        server.listen(PORT, (): void => {
            console.log(`Server is listening on port ${PORT}`)
        })
    }
}

export default App;
