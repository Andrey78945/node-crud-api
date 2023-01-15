// import { Request } from "../types.js";

import { IncomingMessage } from "node:http";
import { validate as uuidValidate } from 'uuid';


// export const parseRequest = (s: string): Request => {
//     const [firstLine, rest] = divideStringOn(s, '\r\n')
//     const [method, url, protocol] = firstLine.split(' ', 3)
//     const [headers, body] = divideStringOn(rest, '\r\n\r\n')
//     const parsedHeaders = headers.split('\r\n').reduce((map, header) => {
//         const [key, value] = divideStringOn(header, ': ')
//         return map.set(key, value)
//     }, new Map())
//     return {protocol, method, url, headers: parsedHeaders, body}
// }

// const divideStringOn = (s: string, search: string): string[] => {
//     const index = s.indexOf(search)
//     const first = s.slice(0, index)
//     const rest = s.slice(index + search.length)
//     return [first, rest]
// }

function getJSONDataFromRequestStream<T>(request: IncomingMessage): Promise<T> {
  return new Promise(resolve => {
    const chunks: Uint8Array[] = [];
    request.on('data', (chunk) => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      resolve(
        JSON.parse(
          Buffer.concat(chunks).toString()
        )
      )
    });
  })
}
export default getJSONDataFromRequestStream

export const parseUrl = (url: string): string => {
    const path: string[] = url.split('/')
    const id: string = path.splice(3).join('/')
    return id
}

export const isUuid = (inputId: string): boolean => {
    return uuidValidate(inputId)
}

// console.log(isUuid(parseUrl('/api/users/8a6e0804-2bd0-4672-b79d-d97027f9071a')))