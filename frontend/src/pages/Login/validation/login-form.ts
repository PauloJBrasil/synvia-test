import * as yup from 'yup';

export const schema = yup.object().shape({
    email: yup.string().required('Email obrigatório').email('Email não é válido'),
    senha: yup.string().required('Password obrigatório').min(6, 'Senha precisa ter pelo menos 6 caracteres'),
});