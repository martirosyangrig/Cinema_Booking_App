"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import style from "./register.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/constants/baseURL";
import { error } from "console";

export default function Register() {
    const [email, setEmail] = useState<string>();
    const [name, setName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    const router = useRouter();

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const onRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!email || !name || !lastName || !password || !confirmPassword) {
            toast.error("All filds are required");
        }
        if (password !== confirmPassword)
            toast.error("Passwords are not similiar");

        const fullName = `${name} ${lastName}`;
        try {
            await axios.post(`${baseUrl}/signup`, {
                email,
                fullName,
                password,
            });
        } catch (error) {
           console.log(error);
        }

        return router.push("/login");
    };

    return (
        <div className={style.wraper}>
            <div className={style.continer}>
                <h1>
                    {" "}
                    Sign up for a new
                    <br />
                    <span>account.</span>{" "}
                </h1>
                <form>
                    <div className={style.formContiner}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={onEmailChange}
                            required
                        />

                        <label htmlFor="name">First Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={onNameChange}
                            required
                        />

                        <label htmlFor="email">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={onLastNameChange}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={onPasswordChange}
                            required
                        />

                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            id="password"
                            value={confirmPassword}
                            onChange={onConfirmPasswordChange}
                            required
                        />
                    </div>
                    <button onClick={onRegister}>Register →</button>
                </form>
                <div className={style.signinContiner}>
                    <span className={style.singinInfo}>
                        Already have an account?
                    </span>
                    <Link href={"/login"} className={style.signin}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
