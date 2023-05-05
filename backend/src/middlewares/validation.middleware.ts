import { validationPipe } from '../pipes/validation.pipe';

export const validationMiddleware = (validationSchema) => async (req, res, next) => {
    const errors = await validationPipe(validationSchema, { ...req.body, ...req.params });
    if (errors) {
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    next();
    return true;
};