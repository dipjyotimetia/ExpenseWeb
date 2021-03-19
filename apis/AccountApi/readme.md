
### POST(Create User)

### `http://localhost:3002/api/users/`

```json
{
  "firstName": "Test",
  "lastName": "Auto",
  "username": "testauto",
  "email": "testauto@gmail.com",
  "password": "Password1"
}
```

### POST(Login User)

### `http://localhost:3002/api/users/login`

```json
{
  "email": "testauto@gmail.com",
  "password": "Password1"
}
```

### POST(Logout All)

### `http://localhost:3002/api/users/me/logoutall`

Bearertoken: xyz

### POST(Logout)

### `http://localhost:3002/api/users/me/logout`

Bearertoken: xyz
### GET(Users)

### `http://localhost:3002/api/users/me`

Bearertoken: xyz
