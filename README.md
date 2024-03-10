
# Keep-Notes

- Keep-Notes is a web application where user can create a Notes.
- User create the Notes about the task they want to do in future.
- User will receive the E-mail about the note 10 minute before the reminder time.
- Notes will delete automatically when they expire.


## Features

- User Friendly
- Email Verification
- Encrypted passwords
- Light/dark mode toggle
- Reminder about note via E-mail
- Responsive Design for all devices
- Edit and Delete Notes

## Tech Stack

**Client:** React, Redux, Css

**Server:** Node, Express , Mongodb

# Live Preview

[Keep-Notes](https://keep-notes-phi.vercel.app/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`REACT_APP_API_HOST:- Mongodb database host link` 

`PORT:- Backend server port number`

`JWT_SEC:- JWT token`

`EMAIL_ADD:- Email address to Send Emails`

`EMAIL_APP_PASS:- Email Password `

## Run Locally(Localhost)

Clone the project

```bash
  git clone https://github.com/AarshPrajapati/Keep-Notes
```

Go to the project directory

```bash
  cd keepnotes
```

Install dependencies in Backend-keepnotes and keepnotes both file

```bash
  npm install
```
Add environment variables

```bash
    Environment variables mentioned above
```
Start the app

```bash
  npm run both
```

## Created API for Keep-Notes

### Authentication

#### create user

```http
  POST /api/auth/Createuser
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. user name |
| `email` | `string` | **Required**. user email  |
| `password` | `string` | **Required**. user password |

#### Verify User Email

```http
  PUT /api/auth/verifyemail
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `to`      | `string` | **Required**. User Email |


#### Login User

```http
  POST /api/auth/Login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. User Email Address |
| `password`   | `string` | **Required**. User Password |

#### Get User data

```http
  GET /api/auth/getuser
```

#### Change User password

```http
  POST /api/email/Changepassword
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. User Email Address |
| `password`   | `string` | **Required**. User New Password |
| `otp`   | `number` | **Required**. verify otp |

#### Update User

```http
  PUT /api/auth/Updateuser/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. User Name |

### Notes

#### Add note

```http
  POST /api/notes/addnote
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Minimun length 3 |
| `description`   | `string` | **Required**. Minimun length 5 |
| `reminder`   | `string` | **Required**.  |


#### Get note

```http
  GET /api/notes/fetchnotes
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. User id  |

#### Update note

```http
  PUT /api/notes/updatenote/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Not Required**. Minimun length 3 |
| `description`   | `string` | **Not Required**. Minimun length 5 |
| `reminder`   | `string` | **Not Required**.  |

#### Delete note

```http
  POST /api/notes/deletenote/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Note Id |

### Emails

#### Send OTP

```http
  POST /api/email/sendotp
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `to`      | `string` | **Required**. Recevier E-mail |


#### Check OTP

```http
  POST /api/email/checkotp
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Recevier E-mail |
| `otp`      | `number` | **Required**. otp  |


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aarsh-prajapati-167825270//)

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/aarsh._.802/)

## Author

- [@AarshPrajapati](https://github.com/AarshPrajapati)


## 🛠 Skills
Javascript, JQuery, HTML, CSS, Bootstrap, React js, Node js, Express js, Asp.net MVC, php, python, Unix, Mongodb, MSSQL, XAMPP, Orecal
