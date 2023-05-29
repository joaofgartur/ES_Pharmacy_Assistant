import express from 'express'
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

router.get('/scan', async (req, res) => {
    return res.status(200).json({
        purchase: get_medicine()
    })
})

export default router
