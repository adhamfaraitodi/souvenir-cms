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
                        errors.username || errors.password || "Login failed",
                    );
                },
            },
        );
    };

    return (
        <div className="grid h-screen w-full grid-cols-2 gap-2">
            <div className="col-span-2 flex flex-col items-center justify-center">
                <h1 className="text-md font-bold text-costumeBlue sm:text-4xl">
                    Login Admin
                </h1>
                <br />
                <form
                    className="xs:max-w-xs relative mx-auto w-[350px] max-w-md sm:w-full"
                    onSubmit={handleLogin}
                >
                    <InputForm
                        customClass="mb-4"
                        handleChange={setUsername}
                        label="Username"
                        placeholder="Fill Username"
                    />
                    <InputForm
                        customClass="mb-4"
                        handleChange={setPassword}
                        label="Password"
                        placeholder="Fill Password"
                        type="password"
                    />
                    <Checkbox
                        customClass="mb-4"
                        label="Remember Me"
                        name="remember"
                    />
                    <div className="flex flex-col items-start gap-2">
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit">
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
