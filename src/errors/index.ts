import * as httpErrors from './http.errors'

/* 
    Object contains all app errors.

    To maintain consistent errors handling every error thrown 
    by app should have specific class instance
*/
export const errors = {
    ...httpErrors,
}
