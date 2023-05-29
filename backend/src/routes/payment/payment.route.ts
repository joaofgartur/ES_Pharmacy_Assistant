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

router.post('/pay', async (req, res) => {
    const id = req.query.id;
    if(!id)
        return res.sendStatus(400)
    
    var params = {
        stateMachineArn: 'arn:aws:states:us-east-1:131138995872:stateMachine:robot',
        input: JSON.stringify({
            items: [
                {name: 'teste', generic: false},
                {name: 'teste2', generic: true},
                {name: 'teste3', generic: false},
                {name: 'teste4', generic: true},
            ]
        })
    };

    const response = await client.send(new AWS.StartExecutionCommand(params))
    console.log(response)

    /*dynamodb.put_item({
        id: {
            S: '1'
        },
        order: {
            L: [
                {
                    M: {
                        name: {
                            S: 'teste1'
                        },
                        generic: {
                            BOOL: false
                        }
                    }
                },
                {
                    M: {
                        name: {
                            S: 'teste2'
                        },
                        generic: {
                            BOOL: true
                        }
                    }
                },
            ]
        },
        status: {
            S: 'COLLECTING ITEMS'
        }
    })*/

    //console.log(await dynamodb.get_item('1'))

    res.status(200).json(response)
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
