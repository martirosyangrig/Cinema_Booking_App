"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken && (pathname !== "/login" && pathname !== "/register")) {
            router.push("/login");
        }

        if (
            accessToken &&
            (pathname === "/login" || pathname === "/register")
        ) {
            router.push("/rooms");
        }
    }, [pathname]);

    return <div style={{ height: "100%" }}>{children}</div>;
}
