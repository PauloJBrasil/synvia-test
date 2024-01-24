import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "./validation/login-form";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { setCookie } from "../../config/cookies";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        resolver: yupResolver(schema),
    })

    const submit = () => {
        api.post('/usuario/login', form.getValues()).then((res) => {
            if (res?.data?.error) {
                toast.error(res?.data?.error);
                return;
            }

            if (res.data?.token) {
                setCookie('@token', res.data.token);
                setCookie('@user', JSON.stringify({ email: res.data.email, nome: res.data.nome }));
                navigate('/');
                toast.success('Login efetuado com sucesso!')
            }
        }).catch((err: any) => {
            toast.error(err.response?.data?.message || 'Usuário ou senha incorretos!')
        });

    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-8 w-96 bg-white border-[#dadada] border-solid border-1 border rounded">
                <div className="flex flex-col gap-6">
                    <h4 className="font-600 text-center text-2xl">Login</h4>
                    <FormProvider {...form}>
                        <div className="flex flex-col gap-3">
                            <TextInput name="email" placeholder="exemplo@mecontrata.com" label="E-mail" type="email" />
                            <div className="w-full relative">
                                {
                                    showPassword ?
                                        <EyeSlash className="absolute top-2 right-3 cursor-pointer z-10" size={24} color="#c0c0c0" onClick={() => setShowPassword(!showPassword)} />
                                        :
                                        <Eye className="absolute top-2 right-3 cursor-pointer z-10" size={24} color="#c0c0c0" onClick={() => setShowPassword(!showPassword)} />
                                }
                                <TextInput className="w-full" name="senha" label="Senha" type={showPassword ? 'text' : 'password'} />
                            </div>

                        </div>
                    </FormProvider>
                    <div className="flex flex-col gap-3">
                        <button className="h-8 rounded text-[#fafafa] px-2 bg-[#35c949]" type="submit" onClick={() => submit()}>Entrar</button>
                        <button className="h-8 rounded text-[#fafafa] px-2 bg-[#300F72]" onClick={() => navigate('/cadastro')}>Cadastrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;