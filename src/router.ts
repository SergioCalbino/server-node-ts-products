import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/Product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router =  Router();
/** 
* @swagger
* components:
*   schemas:
*       Product:
*           type: object
*           properties:
*               id:
*                   type: integer
*                   description: The Product ID
*                   example: 1
*               name:
*                   type: string
*                   description: The Product name
*                   example: Monitor
*               price:
*                   type: number
*                   description: The Product price
*                   example: 300
*               availability:
*                   type: boolean
*                   description: The Product availability
*                   example: true

*/

/** 
* @swagger
* /api/products:
*      get:
*         summary: Get a list of products
*         tags:
*              - Products
*         description: Return a lis of products
*         responses:
*            200:
*                description: Successful response
*                content:
*                    application/json:
*                        schema:
*                           type: array
*                           items:
*                               $ref:  '#/components/schemas/Product'
* 
*               
* 
* */





// Routing
router.get('/', getProducts);

/** 
* @swagger
* /api/products/{id}:
*   get:
*       summary: Get a product by Id
*       tags:
*            - Products
*       description: Return a product based on its unique ID
*       parameters:
*         - in: path 
*           name: id
*           description: The id of the product to retrieve
*           required: true
*           schema:
*                  type: integer
*       responses:
*           200:
*               description: Successful Response
*               content:
*                   application/json:
*                      schema:
*                          $ref: '#/components/schemas/Product'
*           404:
*                description: Product not found
*           400:
*                description: Bad Request - Invalid product ID
* 
* 
*       
* 
*/
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
);

/** 
* @swagger
* /api/products:
*   post:
*       summary: Creates a new product
*       tags: 
*            - Products
*       description: Return a new record in the database
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           name:
*                               type: string
*                               example: "Monitor curvo de 49 pulgadas"
*                           price:
*                               type: number
*                               example: 399
*       responses:
*           201:
*               description: Succesfull response
*               content:
*                   application/json:
*                       schema:
*                          $ref: '#/components/schemas/Product'
*           400:
*               description: Bad Request - invalid input data
* 
*/

router.post('/',
    //Validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct
);

/** 
* @swagger
* /api/products/{id}:
*   put:
*       summary: Updates a product with user input
*       tags: 
*            - Products
*       description: Return the updated product
*       parameters:
*         - in: path 
*           name: id
*           description: The id of the product to retrieve
*           required: true
*           schema:
*                  type: integer
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           name:
*                               type: string
*                               example: "Monitor curvo de 49 pulgadas"
*                           price:
*                               type: number
*                               example: 399
*                           availability:
*                               type: boolean
*                               example: true
*       responses:
*           200:
*               description: Succesfull response
*               content:
*                   application/json:
*                       schema:
*                          $ref: '#/components/schemas/Product'
*           400:
*               description: Bad Request - invalid input data
*           404:
*               description: Product Not Found
* 
*/    

router.put('/:id', 
    //Validacion
    param('id').isInt().withMessage('ID no válido'),

    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct);



/** 
* @swagger
* /api/products/{id}:
*   patch:
*       summary: Updates availability
*       tags: 
*            - Products
*       description: Return the updated availability
*       parameters:
*         - in: path 
*           name: id
*           description: The id of the product to retrieve
*           required: true
*           schema:
*                  type: integer
*       responses:
*           200:
*               description: Succesfull response
*               content:
*                   application/json:
*                       schema:
*                          $ref: '#/components/schemas/Product'
*           400:
*               description: Bad Request - invalid id
*           404:
*               description: Product Not Found
*/
router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability);


/** 
* @swagger
* /api/products/{id}:
*   delete:
*       summary: Delete Product
*       tags: 
*            - Products
*       description: Delete a product
*       parameters:
*         - in: path 
*           name: id
*           description: The id of the product to detele
*           required: true
*           schema:
*                  type: integer
*       responses:
*           200:
*               description: Succesfull response
*               content:
*                   application/json:
*                       schema:
*                          type: string
*                          velue: 'Producto eliminado' 
*           400:
*               description: Bad Request - invalid id
*           404:
*               description: Product Not Found
*/    
router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
);

export default router