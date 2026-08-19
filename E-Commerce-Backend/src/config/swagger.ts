import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "E-commerce backend API documentation generated from route annotations",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
      schemas: {
        RegisterDTO: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            password: { type: "string", example: "password123" },
          },
        },
        LoginDTO: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "john@example.com" },
            password: { type: "string", example: "password123" },
          },
        },
        CreateProductDTO: {
          type: "object",
          required: ["name", "price", "category"],
          properties: {
            name: { type: "string", example: "Wireless Headphones" },
            description: { type: "string", example: "Noise cancelling headphones" },
            price: { type: "number", example: 199.99 },
            category: { type: "string", example: "Electronics" },
            stock: { type: "number", example: 50 },
            imageUrl: { type: "string", example: "https://example.com/item.jpg" },
          },
        },
        UpdateProductDTO: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: { type: "string" },
            stock: { type: "number" },
            imageUrl: { type: "string" },
          },
        },
        AddCartItemDTO: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            quantity: { type: "number", example: 2 },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
