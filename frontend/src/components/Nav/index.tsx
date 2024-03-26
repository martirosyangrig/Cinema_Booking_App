"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import style from "./nav.module.scss";
import { Button } from "@mui/material";

export default function Navbar() {
    const [option, setOption] = useState("");

    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        if (pathname === "/login") {
            setOption("register");
        } else if (pathname === "/register") {
            setOption("login");
        } else {
            setOption("logout");
        }
    }, [pathname]);

    const handleLogout = () => {
        localStorage.clear();

        router.push("/login");
    };
    return (
        <nav className={style.wraper}>
            <div className={style.continer}>
                <div>
                    <div className={style.greetings}>Welcome</div>
                </div>
                <div>
                    {option === "logout" ? (
                        <Button className={style.button} onClick={handleLogout}>
                            {" "}
                            Logout{" "}
                        </Button>
                    ) : (
                        <Link href={`/${option}`} className={style.button}>
                            {option}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
