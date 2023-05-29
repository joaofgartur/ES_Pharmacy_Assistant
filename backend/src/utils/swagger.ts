import {Express, Request, Response} from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Pharmacy Assistant REST API Documentation",
            version: "1.0.0",
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: "bearer",
                    bearerFormat: "JWT"
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ["./src/routes/auth/auth.route.ts", "./src/routes/faces/faces.route.ts", "./src/routes/qr/qr.route.ts", "./src/routes/payment/payment.route.ts"]
}

export const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express) {

    // Swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

export default swaggerDocs;