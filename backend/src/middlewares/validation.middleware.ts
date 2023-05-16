import { validationPipe } from '../pipes/validation.pipe';

export const validationMiddleware = (validationSchema) => async (req, res, next) => {
    const result = await validationPipe(validationSchema, { ...req.body, ...req.params });
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.errors,
        });
    }
    res.locals.transformedClass = result.transformedClass
    return next();
};