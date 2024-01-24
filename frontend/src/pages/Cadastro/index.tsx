import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation/cadastro-form";
import { Eye, EyeSlash } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../config/cookies";

const Cadastro = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const form = useForm<any>({
        resolver: yupResolver(schema)
    });

    const submit = () => {
        api.post('/usuario', {
            email: form.getValues().email,
            nome: form.getValues().nome,
            senha: form.getValues().senha
        }).then((res) => {
            if (res?.data?.error) {
                toast.error(res?.data?.error);
                return;
            }
            setCookie('@token', res.data.token);
            setCookie('@user', JSON.stringify({ email: res.data.email, nome: res.data.nome }));

            navigate('/')
            toast.success('Cadastro efetuado com sucesso!')
        }).catch((err: any) => {
            toast.error(err.response?.data?.message || 'Erro ao cadastrar!')

        })
    }

    useEffect(() => {
        if (form.watch('senha') !== form.watch('senha2')) {
            form.setError('senha2', {
                type: 'manual',
                message: 'As senhas não coincidem!'
            })
        } else {
            form.clearErrors('senha2')
        }
    }, [form.watch('senha'), form.watch('senha2')])

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-8 w-full sm:w-1/2 bg-white border-[#dadada] border-solid border-1 border rounded">
                <div className="flex flex-col gap-6">
                    <h4 className="font-600 text-center text-2xl">Criar Usuário</h4>
                    <FormProvider {...form}>
                        <div className="flex flex-col gap-3">
                            <TextInput name="email" label="E-mail" placeholder="Digite o seu email" type="email" />
                            <TextInput name="nome" label="Nome" placeholder="Digite o seu nome" />
                            <div className="w-full relative">
                                {
                                    showPassword ?
                                        <EyeSlash className="absolute top-2 right-3 cursor-pointer z-10" size={24} color="#c0c0c0" onClick={() => setShowPassword(!showPassword)} />
                                        :
                                        <Eye className="absolute top-2 right-3 cursor-pointer z-10" size={24} color="#c0c0c0" onClick={() => setShowPassword(!showPassword)} />
                                }
                                <TextInput className="w-full" name="senha" label="Senha" type={showPassword ? 'text' : 'password'} />
                            </div>
                            <div className="w-full relative">
                                {
                                    showPassword ?
                                        <EyeSlash className="absolute top-2 right-3 cursor-pointer z-10" size={24} color="#c0c0c0" onClick={() => setShowPassword1(!showPassword1)} />
                                        :
                                        <Eye className="absolute top-2 right-3 cursor-pointer z-10" size={24} color="#c0c0c0" onClick={() => setShowPassword1(!showPassword1)} />
                                }
                                <TextInput className="w-full" name="senha2" label="Confirme sua senha" type={showPassword1 ? 'text' : 'password'} />
                            </div>

                        </div>
                    </FormProvider>
                    <div className="flex gap-3 justify-end">
                        <button className="w-32 h-8 rounded text-[#fafafa] px-2 bg-[#35c949]" type="submit" onClick={() => submit()}>Enviar</button>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Cadastro;