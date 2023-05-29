import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import jsonwebtoken from 'jsonwebtoken'
import dynamodb from '../../utils/dynamodb.utils'
const router = express.Router()

function get_medicine() {
    const medicine = [
        { name: 'Paracetamol', quantity: 2, price: 100, frequency: '3 times a day' },
        { name: 'Ibuprofen', quantity: 3, price: 50, frequency: '2 times a day' },
        { name: 'Amoxicillin', quantity: 4, price: 20, frequency: '2 times a day' },
        { name: 'Lisinopril', quantity: 1, price: 30, frequency: '1 time a day' },
        { name: 'Metformin', quantity: 2, price: 25, frequency: '2 times a day' },
        { name: 'Simvastatin', quantity: 5, price: 40, frequency: '1 time a day' },
        { name: 'Omeprazole', quantity: 3, price: 60, frequency: '1 time a day' },
        { name: 'Azithromycin', quantity: 1, price: 15, frequency: '1 time a day' },
        { name: 'Ciprofloxacin', quantity: 4, price: 35, frequency: '2 times a day' },
        { name: 'Tramadol', quantity: 1, price: 10, frequency: '3 times a day' },
        { name: 'Aspirin', quantity: 2, price: 50, frequency: '1 time a day' },
        { name: 'Metoprolol', quantity: 2, price: 30, frequency: '2 times a day' },
        { name: 'Prednisone', quantity: 3, price: 20, frequency: '1 time a day' },
        { name: 'Diazepam', quantity: 5, price: 15, frequency: '3 times a day' },
        { name: 'Levothyroxine', quantity: 1, price: 40, frequency: '1 time a day' },
        { name: 'Warfarin', quantity: 3, price: 25, frequency: '1 time a day' },
        { name: 'Fluoxetine', quantity: 2, price: 60, frequency: '1 time a day' },
        { name: 'Furosemide', quantity: 3, price: 35, frequency: '2 times a day' },
        { name: 'Metronidazole', quantity: 3, price: 10, frequency: '3 times a day' },
        { name: 'Atorvastatin', quantity: 1, price: 45, frequency: '1 time a day' }
    ];

    return medicine.sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 5))
}

/**
 * @openapi
 * '/qr/scan':
 *     get:
 *       summary: Scan a QR code
 *       responses:
 *         '200':
 *           description: Scan successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   purchase:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                         price:
 *                           type: number
 *                         frequency:
 *                           type: string
 *                         generic:
 *                           type: boolean
 *                   payment_code:
 *                     type: string
 *         '500':
 *           description: Internal server error
 *       tags:
 *         - QR code
 */
router.get('/scan', async (req, res) => {
    const medicine = get_medicine()
    let parsed_medicine = []
    for(let med of medicine) {
        parsed_medicine.push({
            M: {
                name: {
                    S: med.name
                },
                quantity: {
                    N: `${med.quantity}`
                },
                price: {
                    N: `${med.price}`
                },
                frequency: {
                    S: med.frequency
                },
                generic: {
                    BOOL: false
                }
            }
        })
    }
    const uuid = uuidv4()
    await dynamodb.put_item({
        id: {
            S: uuid
        },
        order: {
            L: parsed_medicine
        },
        status: {
            S: 'WAITING'
        },
        payed: {
            BOOL: false
        }
    })
    return res.status(200).json({
        purchase: medicine,
        payment_code: uuid
    })
})

export default router
