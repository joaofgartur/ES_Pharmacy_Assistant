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
