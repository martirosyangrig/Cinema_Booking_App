"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import style from "./login.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "@/constants/baseURL";
import { IUserLoginData } from "./types";

export default function Login() {
    const [email, setEmail] = useState<string>();
    const [password, setpassword] = useState<string>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setpassword(e.target.value);
    };

    const togglePasswordVisibility = (
        e: React.FormEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const sigin = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (!email || !password) toast.error("Both fields are required");

            const { data }: { data: IUserLoginData } = await axios.post(
                `${baseUrl}/login`,
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("userData", JSON.stringify(data.userData));

        } catch (error) {
            console.log(error);
            return toast.error("Unable to Login")
        }

        return router.push("/rooms")
    };

    return (
        <div className={style.wraper}>
            <div className={style.continer}>
                <h1>Sign in to your account.</h1>
                <form>
                    <div className={style.emailContiner}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={onEmailChange}
                            required
                        />
                    </div>
                    <div className={style.emailContiner}>
                        <label htmlFor="password">Password</label>
                        <div className={style.passContiner}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={onPasswordChange}
                                required
                            />
                            <button onClick={togglePasswordVisibility}>
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <button onClick={sigin}>Sign In →</button>
                </form>
                <div>
                    <span className={style.singupInfo}>
                        Don't have an account?
                    </span>
                    <Link href={"/register"} className={style.signup}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
