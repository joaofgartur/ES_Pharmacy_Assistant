import express from 'express'
import dynamodb from '../../utils/dynamodb.utils'
import * as AWS from "@aws-sdk/client-sfn";

const router = express.Router()
const client = new AWS.SFNClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

function parse_items(order) {
    let parsed = []
    for(let item of order.L) {
        parsed.push({
            name: item.M.name.S,
            quantity: parseInt(item.M.quantity.N),
            price: parseInt(item.M.price.N),
            generic: item.M.generic.BOOL,
            frequency: item.M.frequency.S
        })
    }
    return parsed
}

let cache = {}

/**
 * @openapi
 * '/payment/pay':
 *     post:
 *       summary: Process payment and initiate order collection
 *       parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the order
 *       responses:
 *         '200':
 *           description: Payment processed and order collection initiated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   step_function_state:
 *                      type: object
 *         '304':
 *           description: Not Modified
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         msg:
 *                           type: string
 *         '404':
 *           description: Order not found
 *         '500':
 *           description: Internal server error
 *       tags:
 *         - Payment
 */
router.post('/pay', async (req: any, res) => {
    const id = req.query.id;
    if(!id)
    return res.sendStatus(400)
    if (cache[`${req.headers['uuid']}:${req.query.id}`]) {
        return res.status(304).send('Not Modified');
    }
    try {
        let order = (await dynamodb.get_item(id)).Item;
        if(!order)
            return res.sendStatus(404)
        if(order.payed.BOOL)
            return res.status(400).json({
                errors: [
                    { msg: 'This order has already been paid' }
                ]
            })
        order.payed.BOOL = true
        order.status.S = 'COLLECTING ITEMS'
        await dynamodb.put_item(order)
        let items = parse_items(order.order)
        var params = {
            stateMachineArn: process.env.AWS_ROBOT_ARN,
            input: JSON.stringify({
                id,
                items
            })
        };
        const response = await client.send(new AWS.StartExecutionCommand(params))
        cache[`${req.headers['uuid']}:${req.query.id}`] = response;
        res.status(200).json(response)
    } catch(err) {
        console.log(err)
        return res.sendStatus(404)
    }
})

/**
 * @openapi
 * '/payment/info':
 *     get:
 *       summary: Get information about a payment
 *       parameters:
 *         - in: query
 *           name: arn
 *           schema:
 *             type: string
 *           required: true
 *           description: The ARN of the payment
 *       responses:
 *         '200':
 *           description: Information about the payment
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   step_function_state:
 *                      type: object
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 *       tags:
 *         - Payment
 */
router.get('/info', async (req, res) => {
    const arn = req.query.arn;
    if(!arn)
        return res.sendStatus(400)
    
    try {
        var params = {
            executionArn: `${arn}`
        };
    
        const response = await client.send(new AWS.DescribeExecutionCommand(params))
        console.log(response)
    
        res.status(200).json(response)
    } catch(err) {
        res.sendStatus(500)
    }
})

/**
 * @openapi
 * '/payment/status':
 *     get:
 *       summary: Get the status of a payment
 *       parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the payment
 *       responses:
 *         '200':
 *           description: Payment status retrieved with success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Order not found
 *         '500':
 *           description: Internal server error
 *       tags:
 *         - Payment
 */
router.get('/status', async (req, res) => {
    const id = req.query.id;
    if(!id)
        return res.sendStatus(400)
    try {
        let order = (await dynamodb.get_item(id)).Item;
        if(!order)
            return res.sendStatus(404)
        res.status(200).json({msg: order.status.S})
    } catch(err) {
        console.log(err)
        return res.sendStatus(404)
    }
})

router.get('/all', async (req, res) => {
    let items = (await dynamodb.get_items()).Items
    let parsed_items = []
    for(let item of items) {
        parsed_items.push({
            order: parse_items(item.order),
            payed: item.payed.BOOL,
            id: item.id.S,
            status: item.status.S
        })
    }
    res.status(200).json(parsed_items)
})

export default router
