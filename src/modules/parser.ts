import { IncomingMessage } from 'node:http';
import { validate as uuidValidate } from 'uuid';

function getJSONDataFromRequestStream<T>(request: IncomingMessage): Promise<T> {
  return new Promise((resolve) => {
    const chunks: Uint8Array[] = [];
    request.on('data', (chunk) => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      resolve(JSON.parse(Buffer.concat(chunks).toString()));
    });
  });
}

export default getJSONDataFromRequestStream;

export const parseUrl = (url: string): string => {
  const path: string[] = url.split('/');
  const id: string = path.splice(3).join('/');
  return id;
};

export const isUuid = (inputId: string): boolean => {
  return uuidValidate(inputId);
};
