import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import InputForm from "../../../components/InputForm";
import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";

const Page = () => {
    const { data, setData, post, errors, reset, processing } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        post("/admin/login");
    };

    return (
        <div className="grid h-screen w-full grid-cols-2 gap-2">
            <div className="col-span-2 flex flex-col items-center justify-center">
                <h1 className="text-md font-bold text-blue-600 sm:text-4xl">
                    Login Admin
                </h1>
                <br />
                <form
                    className="xs:max-w-xs relative mx-auto w-[350px] max-w-md sm:w-full"
                    onSubmit={handleLogin}
                >
                    <InputForm
                        className="mb-4"
                        handleChange={(e) => setData({ ...data, username: e })}
                        label="Username"
                        placeholder="Fill Username"
                    />
                    <InputForm
                        className="mb-4"
                        handleChange={(e) => setData({ ...data, password: e })}
                        label="Password"
                        placeholder="Fill Password"
                        type="password"
                    />
                    <Checkbox
                        className="mb-4"
                        label="Remember Me"
                        handleChange={(e) => setData({ ...data, remember: e })}
                    />
                    <div className="flex flex-col items-start gap-2">
                        {Object.keys(errors).length > 0 && (
                            <div className="w-full text-red-500">
                                {Object.values(errors).map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
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
