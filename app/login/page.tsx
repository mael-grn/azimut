'use client';

import {Suspense, useEffect, useState} from "react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {FieldsUtil} from "@/app/utils/FieldsUtil";
import SessionService from "@/app/services/SessionService";
import UserService from "@/app/services/UserService";
import {AnimatePresence, motion} from "framer-motion";
import AnimatedIcon, {ICONS} from "@/app/components/AnimatedIcon";
import {useSearchParams} from 'next/navigation';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        UserService.getMyUser().then((user) => {
            if (user) {
                const redirectUrl = searchParams.get("redirect");
                if (redirectUrl) {
                    if (redirectUrl.startsWith('http')) {
                        window.location.href = redirectUrl;
                    } else {
                        router.push(redirectUrl);
                    }
                } else {
                    router.push(`/users/${user.id}`);
                }
            } else {
                setLoading(false)
            }
        }).catch(() => {
            setLoading(false)
        })
    }, [router, searchParams]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!FieldsUtil.isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!FieldsUtil.isNonEmptyString(password)) {
            setError("Please enter your password.");
            return;
        }
        setLoading(true);
        try {
            await SessionService.createSession(email, password);
            const user = await UserService.getMyUser();
            const redirectUrl = searchParams.get("redirect");
            if (redirectUrl) {
                if (redirectUrl.startsWith('http')) {
                    window.location.href = redirectUrl;
                } else {
                    router.push(redirectUrl);
                }
            } else {
                router.push(`/users/${user.id}`);
            }
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={"flex flex-col flex-1 justify-center min-w-full items-center gap-6"}>
            <h1 className={"text-center leading-loose"}>Login</h1>
            <form
                className={"flex flex-col gap-4 items-center"}
                onSubmit={e => handleLogin(e)}>
                <Input placeholder={"email"} value={email} onChange={setEmail} type={"text"}/>
                <Input placeholder={"password"} value={password} onChange={setPassword} type={"password"}/>
                <div className={"flex items-center gap-4 pt-2 flex-col justify-center"}>
                    <AnimatePresence>
                        {
                            error &&
                            <motion.div
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                className={"text-foreground px-3 py-1 rounded-lg bg-red-500 flex items-center gap-2"}>
                                <AnimatedIcon icon={ICONS.warning} small={true}/>
                                {error}
                            </motion.div>
                        }
                    </AnimatePresence>
                    <Button loading={loading} text={"Login"} type={"submit"}/>
                    <Link href={"/register"} className={"underline opacity-70 hover:opacity-90"}>No account yet?</Link>

                </div>
            </form>
        </div>
    )
}

export default function Login() {
    return (
        <Suspense fallback={
            <div className={"flex items-center justify-center flex-1"}>
                <AnimatedIcon icon={ICONS.loader} loop={true}/>
            </div>}>
            <LoginForm/>
        </Suspense>
    )
}