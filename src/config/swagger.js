const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

module.exports = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Products CRUD API',
      version: '1.0.0',
      description: 'ตัวอย่าง CRUD API พร้อมเอกสารด้วย Swagger',
    },
    servers: [{ url: 'https://curly-tribble-x5v6jj6qvgw53rwg-3000.app.github.dev', description: 'Local' }],
    tags: [{ name: 'Products', description: 'จัดการสินค้า' }],
    components: {
      schemas: {
        ProductInput: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: { type: 'string', minLength: 1, example: 'คีย์บอร์ดไร้สาย' },
            price: { type: 'number', minimum: 0, example: 1290 },
            stock: { type: 'integer', minimum: 0, default: 0, example: 25 },
            category: {
              type: 'string',
              enum: ['electronics', 'books', 'fashion'],
              example: 'electronics',
            },
          },
        },
        Product: {
          allOf: [
            {
              type: 'object',
              properties: {
                id: { type: 'integer', readOnly: true, example: 1 },
                createdAt: { type: 'string', format: 'date-time', readOnly: true },
              },
            },
            { $ref: '#/components/schemas/ProductInput' },
          ],
        },
        Error: {
          type: 'object',
          properties: { error: { type: 'string', example: 'ไม่พบสินค้า' } },
        },
      },
      parameters: {
        ProductId: {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer', minimum: 1 },
          description: 'รหัสสินค้า',
        },
      },
      responses: {
        NotFound: {
          description: 'ไม่พบสินค้า',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
        BadRequest: {
          description: 'ข้อมูลไม่ถูกต้อง',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
      },
    },
  },
  apis: [path.join(__dirname, '../routes/*.js')],
});