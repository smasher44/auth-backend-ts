# Backend API Documentation

This project provides a backend implementation with JWT-based authentication and an organized project structure. Below are the features and endpoints supported.

---

## Key Features

1. **Proper Error Handling**  
2. **JWT-Based Authentication**  
3. **Password Hashing with bcrypt**  
4. **Middleware for Protected Routes**  
5. **Development Logging with Morgan**  
6. **Environment Variable Configuration**  
7. **Organized Project Structure**  

---

## Endpoints

### **1. User Registration**

**Endpoint:**  
`POST /api/auth/register`  

**Request Body:**  
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### **2. User Login**
**Endpoint:**  
`POST /api/auth/login`

**Request Body:**  
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### **3. User Profile**
**Endpoint:**  
`GET /api/auth/profile`

**Headers:**  
`Authorization: Bearer <your-jwt-token>`


**Description:**  
Returns user profile information for authenticated users.


### **4. Update User Credentials**
**Endpoint:**  
`PUT /api/auth/update-credentials`

**Request Body:**  
```json
{
  "currentPassword": "currentPassword123",
  "newPassword": "newPassword123",
  "newEmail": "newuser@example.com"
}
```

**Description:**  
Returns user profile information for authenticated users.

# Key Improvements in the TypeScript Version

## Strong Typing for:
- **Request and response objects**  
- **User data structure**  
- **JWT payload**  
- **Authentication interfaces**  
- **Configuration**

## Type Safety for:
- **Route handlers**  
- **Middleware functions**  
- **Error handling**  
- **JWT verification**

## Better IDE Support with:
- **Type definitions**  
- **Interface declarations**  
- **Custom type augmentation for Express**

## Enhanced Maintainability Through:
- **Strict TypeScript configuration**  
- **ESLint integration**  
- **Prettier formatting**  
- **Proper module resolution**

## Development Improvements:
- **Source maps for debugging**  
- **Nodemon configuration**  
- **Build scripts**  
- **Type checking**

---

## Future Enhancements

Would you like to:  
- Add **request validation** using a validation library like [Zod](https://github.com/colinhacks/zod)?  
- Add more **TypeScript utility types**?  
- Implement **error handling classes**?  
- Add **database integration** with [TypeORM](https://typeorm.io/) or [Prisma](https://www.prisma.io/)?  
