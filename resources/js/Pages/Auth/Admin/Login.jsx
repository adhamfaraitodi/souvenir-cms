import { useState,useEffect, use } from "react";
import { router,useForm } from "@inertiajs/react";
import InputForm from "../../../components/InputForm";
import axios from "axios";


const Page = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { data, setData, post, errors, reset, processing } = useForm(
        {
            username: "",
            password: "",
            remember: false,
        },
    );
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);
    useEffect(() => {
        setData({
            username: username,
            password: password,

        });
    }, [username, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        // router.post(
        //     "/login",
        //     { username, password },
        //     {
        //         onSuccess: () => {
        //             setLoading(false);
        //         },
        //         onError: (errors) => {
        //             setLoading(false);
        //             setError(
        //                 errors.username || errors.password || "Login failed"
        //             );
        //         },
        //     }
        // );

        post("/admin/login");
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 h-screen w-full gap-2">
            <div className="hidden sm:flex items-center justify-center h-screen bg-costumeBlue">
                {/* <img className="blox mx-auto w-56" src={logo} alt="" /> */}
            </div>

            <div className="flex flex-col justify-center items-center col-span-2">
                {/* <img className="sm:hidden w-28" src={logoMobile} alt="" /> */}
                <h1 className="text-costumeBlue text-md sm:text-4xl font-bold">
                    Login Admin
                </h1>
                <br />
                <form
                    className="w-[350px] sm:w-full max-w-md xs:max-w-xs mx-auto relative"
                    onSubmit={handleLogin}
                >
                    <InputForm
                        className="mb-4"
                        handleChange={setUsername}
                        label="Username"
                        placeholder="Masukan Username"
                        
                    />
                    <InputForm
                        className="mb-4"
                        handleChange={setPassword}
                        label="Password"
                        placeholder="Masukan Password"
                        type="password"

                    />
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            className="mr-2"
                            id="remember"
                            name="remember"
                            onChange={(e) => setData('remember', (e.target.checked))}
                        />
                        <label htmlFor="remember" className="text-sm">
                            Remember me
                        </label>
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            className="bg-costumeBlue text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
