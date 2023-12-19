export function validator({ type, value }) {
    let error = '';
    switch (type) {
        case 'email':
            const emailPattern =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            emailPattern.test(String(value).toLowerCase())
                ? error = ''
                : error = 'Введите валидный Email';
            break;

        case 'name':
            const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
            namePattern.test(String(value).toLowerCase())
                ? error = ''
                : error = 'Допустима только латиница, кириллица, пробел или дефис';
            break;

        default:
            break;

    }
    return error
}