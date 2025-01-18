import { useState } from "react";
import { router } from "@inertiajs/react";
import InputForm from "../../../components/InputForm";

const Page = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        router.post(
            "/login",
            { username, password },
            {
                onSuccess: () => {
                    setLoading(false);
                },
                onError: (errors) => {
                    setLoading(false);
                    setError(
                        errors.username || errors.password || "Login failed"
                    );
                },
            }
        );
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 h-screen w-full gap-2">
            <div className="hidden sm:flex items-center justify-center h-screen bg-costumeBlue">
                {/* <img className="blox mx-auto w-56" src={logo} alt="" /> */}
            </div>

            <div className="flex flex-col justify-center items-center col-span-2">
                {/* <img className="sm:hidden w-28" src={logoMobile} alt="" /> */}
                <h1 className="text-costumeBlue text-md sm:text-4xl font-bold">
                    Login User
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
