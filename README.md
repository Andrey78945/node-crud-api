# node.js-crud-api

Api for Rolling Scopes School task "CRUD API" (https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md).

## Setup and Running

- Use `node 18.x` or higher.
- Clone this repo: `$ git clone https://github.com/Andrey78945/node-crud-api.git`.
- Go to downloaded folder: `$ cd node-crud-api`.
- Install dependencies: `$ npm install`.
- Rename file ".env.test" in ".env".
- Start server: `$ npm start:dev`.
- Now you can send requests to the address: `http://127.0.0.1:4000`.

## Usage

- **Users**
  - [Get Users](https://github.com/mikhama/async-race-api#get-users)
  - [Get User](https://github.com/mikhama/async-race-api#get-user)
  - [Post User](https://github.com/mikhama/async-race-api#post-user)
  - [Delete User](https://github.com/mikhama/async-race-api#delete-user)
  - [Put User](https://github.com/mikhama/async-race-api#put-user)

## **Get Users**

Returns json data about all users or empti array if any.

<details>

- **URL**

  api/users

- **Method:**

  `GET`

- **Headers:**

  None

- **URL Params**

  None

- **Query Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    [
      {
        "id": " 8a6e0804-2bd0-4672-b79d-d97027f9071a",
        "username": "Max",
        "age": 56,
        "hobbies": ["sport", "TV", ...] || []
      }
    ]
    ```
    **Headers:**
    ```
      "X-Total-Count": "4"
    ```

- **Error Response:**

  None

- **Notes:**

  None

</details>

## **Get User**

Returns json data about specified user.

<details>

- **URL**

  api/users/:id

- **Method:**

  `GET`

- **Headers:**

  None

- **URL Params**

  **Required:**

  `id=[string uuid]`

- **Query Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "id": " 8a6e0804-2bd0-4672-b79d-d97027f9071a",
        "username": "Max",
        "age": 56,
        "hobbies": ["sport", "TV"] || []
    }
    ```

- **Error Response:**

  - **Code:** 400 ID IS NOT UUID FORMAT <br />
    **Content:**
    ```json
    {}
    ```
  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {}
    ```

- **Notes:**

  None

</details>

## **Post User**

Creates a new user.

<details>

- **URL**

  api/users

- **Method:**

  `POST`

- **Headers:**

  `'Content-Type': 'application/json'`

- **URL Params**

  None

- **Query Params**

  None

- **Data Params**

  ```typescript
    {
     required username: string
     required age: number
     required hobbies: string[]
    }
  ```

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:**
    ```json
    {
      "id": " 8a6e0804-2bd0-4672-b79d-d97027f9071a",
      "username": "Max",
      "age": 56,
      "hobbies": ["sport", "TV"] || []
    }
    ```

- **Error Response:**

  - **Code:** 400 DATA DOES NOT HAVE SOME REQUIRED FIELDS <br />
    **Content:**
    ```json
    {}
    ```

- **Notes:**

  None

</details>

## **Delete User**

Delete specified user

<details>

- **URL**

  api/users/:id

- **Method:**

  `DELETE`

- **Headers:**

  None

- **URL Params**

  **Required:**

  `id=[string uuid]`

- **Query Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    {}
    ```

- **Error Response:**

  - **Code:** 400 ID IS NOT UUID FORMAT <br />
    **Content:**

    ```json
    {}
    ```

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {}
    ```

- **Notes:**

  None

</details>

## **Put User**

Updates attributes of specified user.

<details>

- **URL**

  api/users/:id

- **Method:**

  `PUT`

- **Headers:**

  `'Content-Type': 'application/json'`

- **URL Params**

  **Required:**

  `id=[string uuid]`

- **Query Params**

  None

- **Data Params**

  ```typescript
    {
      "username"?: "Max",
      "age"?: 56,
      "hobbies"?: ["sport", "TV"] || []
    }
  ```

- **Success Response:**

  - **Code:** 204 OK USER WAS UPDATED<br />
    **Content:**
    ```json
    {
      "id": " 8a6e0804-2bd0-4672-b79d-d97027f9071a",
      "username": "Max",
      "age": 56,
      "hobbies": ["sport", "TV"] || []
    }
    ```

- **Error Response:**

  - **Code:** 400 ID IS NOT UUID FORMAT <br />
    **Content:**

    ```json
    {}
    ```

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {}
    ```

- **Notes:**

  None

</details>
