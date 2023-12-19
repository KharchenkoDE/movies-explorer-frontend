export const getErrorMessage = (errorBody) => {
    if(errorBody.validation) {
        return errorBody.validation.body.message;
    } else if(errorBody.message) {
        return errorBody.message
    }
}