import { validate, ValidationError } from 'class-validator'

import { errors } from '@/errors'

type FormattedError = {
    message: string
    details: string
}

/**
 * Validates a class instance against its class-validator decorators.
 *
 * @param classToValidate - The instance of the class to be validated.
 *
 * @throws If the validation fails, throws a `BadRequestError` with a formatted message.
 *
 * @returns A promise that resolves to void if validation passes, otherwise throws an error.
 *
 * @example
 * ```typescript
 * class UserRequest {
 *     IsString()
 *     name: string;
 * }
 *
 * const request = new UserRequest();
 * request.name = 123; // Invalid value, should be a string
 *
 * await validateRequest(request); // Throws BadRequestError
 * ```
 */
export async function validateRequest(classToValidate: object) {
    const validationErrors = await validate(classToValidate)

    if (!validationErrors.length) return

    const formattedErrors = formatValidationErrors(validationErrors)

    throw new errors.BadRequestError(
        `Failed to parse request: \n${formattedErrors
            .map(el => `${el.message}: ${el.details}`)
            .join('\n')}`,
    )
}

/**
 * Recursively formats a list of validation errors into a more readable format.
 *
 * This function handles nested validation errors by recursively processing the `children` property of each
 * `ValidationError` object. The `message` field in the `FormattedError` output includes the full path to
 * the nested property that failed validation.
 *
 * @param errorsList - An array of `ValidationError` objects returned by class-validator.
 *
 * @returns An array of `FormattedError` objects, each containing a message and details about the validation error.
 *
 * @example
 * ```typescript
 * const validationErrors: ValidationError[] = [
 *     {
 *         property: 'user',
 *         value: { name: 123 },
 *         constraints: {
 *             isObject: 'user must be an object'
 *         },
 *         children: [
 *             {
 *                 property: 'name',
 *                 value: 123,
 *                 constraints: {
 *                     isString: 'name must be a string'
 *                 }
 *             }
 *         ]
 *     }
 * ];
 *
 * const formattedErrors = formatValidationErrors(validationErrors);
 * console.log(formattedErrors);
 * // Output:
 * // [
 * //     {
 * //         message: "'user' not passed the validation",
 * //         details: "'{\"name\":123}' isn't a valid value. user must be an object"
 * //     },
 * //     {
 * //         message: "'user.name' not passed the validation",
 * //         details: "'123' isn't a valid value. name must be a string"
 * //     }
 * // ]
 * ```
 */
const formatValidationErrors = (errorsList: ValidationError[]): FormattedError[] => {
    const errors: FormattedError[] = []

    const processErrors = (error: ValidationError, parentPath = ''): void => {
        const propertyPath = parentPath ? `${parentPath}.${error.property}` : error.property

        if (error.constraints) {
            errors.push({
                message: `'${propertyPath}' not passed the validation`,
                details: `'${JSON.stringify(error.value)}' isn't a valid value. ${Object.values(
                    error.constraints,
                ).join(' ')}`,
            })
        }

        if (error.children && error.children.length > 0) {
            error.children.forEach(childError => processErrors(childError, propertyPath))
        }
    }

    errorsList.forEach(error => processErrors(error))

    return errors
}
