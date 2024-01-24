import { Outlet, useNavigate } from "react-router-dom";
import { useLoggedUser } from "../utils/user";
import { SignOut } from "phosphor-react";
import { removeCookie, setCookie } from "../config/cookies";


type MainLayoutProps = {
    loggedIn: boolean;
};

export function MainLayout({ loggedIn }: MainLayoutProps) {
    const user = useLoggedUser();
    const navigate = useNavigate();

    const loggout = () => {
        removeCookie('@token');
        removeCookie('@user');
        navigate('/login');
    }

    return (
        <main className="flex min-h-screen h-full bg-[#f6f6f6]">
            <section className="flex flex-col w-full mb-9">
                {loggedIn && (
                    <div className="flex top-0 w-full min-h-16 sm:h-20 justify-around items-center bg-[#c0c0c0]">
                        <div className="text-lg font-[600]">Olá, {user?.nome}</div>
                        <SignOut className="cursor-pointer" size={32} color="#300F72" onClick={() => loggout()} />
                    </div>
                )}
                <div className="h-full mt-8 p-4 sm:px-12 py-0">
                    <Outlet />
                </div>
            </section>
        </main>
    );
}
