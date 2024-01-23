import * as yup from 'yup';

export const schema = yup.object().shape({
    titulo: yup.string().required('Titulo obrigatório').nullable(),
});