# api-admin-cms

This is part of eshop ecommerce system. This project is the backend api for admin cms.

## How to run

- clone the project and go inside the root folder
- run `npm install`
- run `npm run dev` , please run `npm i nodemon` if you already don't have the nodemon installed.

### User API

All user Api will follow the following endPoint `${rooturl}/api/v1/user`

| #   | API                   | METHOD | DESCRIPTION                                                  |
| --- | --------------------- | ------ | ------------------------------------------------------------ |
| 1   | `/`                   | POST   | Expect the user info object and create user in DB            |
| 2   | `/email-verification` | POST   | Expects the user info objects and check if the link is valid |

### Category API

| #   | API     | METHOD | DESCRIPTION                                                                      |
| --- | ------- | ------ | -------------------------------------------------------------------------------- |
| 1   | `/`     | POST   | Expects the category object and send it to DB and returns                        |
| 2   | `/`     | GET    | Display all the data in categories pages                                         |
| 2   | `/ `    | PATCH  | Expects the user to click Edit Button of category name and update if any changes |
| 3   | `/:_id` | DELETE | Expects the user selection of category name and check in DB                      |
