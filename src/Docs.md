# eBook Library API Documentation
- Version: 1.0.0
- [GitHub Repo](https://github.com/puri-adityakumar/eBookLib-RestAPI)

## Base URL
```
http://localhost:5513/api
```

## Authentication
Bearer token authentication required for protected endpoints.
```
Authorization: Bearer <token>
```

## Endpoints Summary

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /users/register | Register new user | No |
| POST | /users/login | User login | No |

### Books
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /books/add | Add new book | Yes |
| PATCH | /books/:bookId | Update book | Yes |
| GET | /books | List all books | No |
| GET | /books/:bookId | Get book details | No |
| DELETE | /books/:bookId | Delete book | Yes |

## API Reference

### Authentication Endpoints

#### Register User
```http
POST /users/register
```
Body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Login User
```http
POST /users/login
```
Body:
```json
{
  "email": "string",
  "password": "string"
}
```

### Book Endpoints

#### Add Book
```http
POST /books/add
```
Body (multipart/form-data):
```json
{
  "title": "string",
  "author": "string",
  "description": "string",
  "genre": "string",
  "coverImage": "file",
  "file": "file"
}
```

#### Update Book
```http
PATCH /books/:bookId
```
Body (multipart/form-data):
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "genre": "string (optional)",
  "coverImage": "file (optional)",
  "file": "file (optional)"
}
```

#### List All Books
```http
GET /books
```
Query Parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10)

#### Get Single Book
```http
GET /books/:bookId
```

#### Delete Book
```http
DELETE /books/:bookId
```

## Error Responses
Standard error response format:
```json
{
  "message": "Error description",
  "code": "ERROR_CODE",
  "validation": {
    "field": "Error detail"
  }
}
```

## Status Codes
| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

## Rate Limits
- Auth endpoints: 5 requests/minute
- General endpoints: 100 requests/minute
- File uploads: 10 requests/minute

***
<div align="center">
Made with ❤️ by <a src = "https://github.com/puri-adityakumar/eBookLib-RestAPI">Aditya. </a>
</div>

