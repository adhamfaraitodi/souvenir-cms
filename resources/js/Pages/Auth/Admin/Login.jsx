import { useState } from "react";
import { router } from "@inertiajs/react";
import InputForm from "../../../components/InputForm";
import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";

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
        <div className="grid grid-cols-2 h-screen w-full gap-2">
            <div className="flex flex-col justify-center items-center col-span-2">
                <h1 className="text-costumeBlue text-md sm:text-4xl font-bold">
                    Login Admin
                </h1>
                <br />
                <form
                    className="w-[350px] sm:w-full max-w-md xs:max-w-xs mx-auto relative"
                    onSubmit={handleLogin}
                >
                    <InputForm
                        customClass="mb-4"
                        handleChange={setUsername}
                        label="Username"
                        placeholder="Masukan Username"
                    />
                    <InputForm
                        customClass="mb-4"
                        handleChange={setPassword}
                        label="Password"
                        placeholder="Masukan Password"
                        type="password"
                    />
                    <Checkbox
                        customClass="mb-4"
                        label="Remember Me"
                        name="remember"
                    />
                    <div className="flex flex-col gap-2 items-start">
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit">
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
