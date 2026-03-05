"use client";

import Button from "@/app/components/Button";
import SessionService from "@/app/services/SessionService";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {User} from "@/app/models/User";
import UserService from "@/app/services/UserService";
import AnimatedIcon, {ICONS} from "@/app/components/AnimatedIcon";

export default function UserPage() {
    const {UserId} = useParams();
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUser(await UserService.getMyUser());
            } catch (e) {
                console.error(e);
            }
        }
        fetchUser();
    }, [])

    const handleLogout = async () => {
        setLogoutLoading(true);
        await SessionService.deleteSession();
        router.push("/login");
        setLogoutLoading(false);
    }

    if (!user) {
        return <div className={"flex items-center justify-center flex-1"}>
            <AnimatedIcon icon={ICONS.loader} loop={true}/>
        </div>
    }

    return (
        <div className={"flex flex-col flex-1 md:justify-center min-w-full items-center gap-10"}>
            <h1>Hello, {user?.first_name}</h1>
            <div className={"flex flex-col justify-center items-center p-4 bg-background-variant gap-4 rounded-xl"}>
                <AnimatedIcon icon={ICONS.info}/>
                <p>The personal information editing functionalities will be implemented soon.</p>
            </div>
            <Button text={"logout"} isSecondary={true} onClick={handleLogout} loading={logoutLoading}/>
        </div>
    );
}