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

router.post('/pay', async (req, res) => {
    const id = req.query.id;
    if(!id)
        return res.sendStatus(400)
    try {
        let order = (await dynamodb.get_item(id)).Item;
        if(!order)
            return res.sendStatus(404)
        if(order.payed.BOOL)
            return res.status(400).json({
                errors: [
                    { msg: 'This orded has already been paid' }
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

export default router
