import AppController from './controller.js';
import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { ErrorCode, StatusCode } from '../types.js';

class App {
  controller: AppController;

  constructor() {
    this.controller = new AppController();
  }

  start(): void {
    const PORT = process.env.PORT || 4000;
    const server = createServer((request: IncomingMessage, response: ServerResponse): void => {
      try {
        this.controller.resolveRequest(request, response);
      } catch (error) {
        response.statusCode = StatusCode.INNER_ERROR;
        response.statusMessage = ErrorCode.ERROR;
        response.end();
      }
    });

    server.listen(PORT, (): void => {
      console.log(`Server listening on port ${PORT}`);
    });
  }
}

export default App;
