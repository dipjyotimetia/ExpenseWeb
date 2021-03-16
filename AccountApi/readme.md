
### POST(Create User)

### http://localhost:3000/users/

```json
{
  "firstName": "Test",
  "lastName": "Auto",
  "username": "Testautos",
  "email": "testauton@gmail.com",
  "password": "Password1"
}
```

### POST(Login User)

### http://localhost:3000/users/login

```json
{
  "email": "testautonew@gmail.com",
  "password": "Password1"
}
```

### POST(Logout All)

### http://localhost:3000/users/me/logoutall

Bearertoken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRiOTE2YWI5ZmI1YzdjZDNmOTdiY2MiLCJpYXQiOjE1NjUyMzQyNTl9.X59xUrJAbEv_KugAxEGt7OEWHQPgl-cj4QNPSBXkD54

### POST(Logout)

### http://localhost:3000/users/me/logout

Bearertoken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRiOTE2YWI5ZmI1YzdjZDNmOTdiY2MiLCJpYXQiOjE1NjUyMzQyNTl9.X59xUrJAbEv_KugAxEGt7OEWHQPgl-cj4QNPSBXkD54

### GET(Users)

### http://localhost:3000/users/me

Bearertoken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRiOTE2YWI5ZmI1YzdjZDNmOTdiY2MiLCJpYXQiOjE1NjUyMzQyNTl9.X59xUrJAbEv_KugAxEGt7OEWHQPgl-cj4QNPSBXkD54
