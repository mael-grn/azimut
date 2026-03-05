'use client';

import {Suspense, useEffect, useState} from "react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {FieldsUtil} from "@/app/utils/FieldsUtil";
import SessionService from "@/app/services/SessionService";
import UserService from "@/app/services/UserService";
import {InsertableUser} from "@/app/models/User";
import {AnimatePresence, motion} from "framer-motion";
import AnimatedIcon, {ICONS} from "@/app/components/AnimatedIcon";

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        UserService.getMyUser().then((user) => {
            if (user){
                if (searchParams.get("redirect")) {
                    router.push(searchParams.get("redirect")!);
                } else {
                    router.push(`/users/${user.id}`);
                }
            } else {
                setLoading(false)
            }
        }).catch(() => {
            setLoading(false)
        })
    }, [router]);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const newUser : InsertableUser = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password
        }
        const check = FieldsUtil.checkUser(newUser)
        if (!check.valid) {
            setError(check.errors[0]);
            return;
        }

        setLoading(true);
        try {
            await UserService.insertUser(newUser);
            await SessionService.createSession(newUser.email, newUser.password);
            const user = await UserService.getMyUser();
            if (searchParams.get("redirect")) {
                router.push(searchParams.get("redirect")!);
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
        <div className={"flex flex-col flex-1 justify-center min-w-full items-center gap-10"}>
            <h1 className={"text-center leading-loose"}>Register</h1>
            <form
                className={"flex flex-col gap-4 items-center"}
                onSubmit={e => handleRegister(e)}>
                <Input placeholder={"first name"} value={firstName} onChange={setFirstName} type={"text"}/>
                <Input placeholder={"last name"} value={lastName} onChange={setLastName} type={"text"}/>
                <Input placeholder={"email"} value={email} onChange={setEmail} type={"text"}/>
                <Input placeholder={"password"} value={password} onChange={setPassword} type={"password"}/>
                <div className={"flex items-center gap-4 pt-2 flex-col justify-center"}>
                    <AnimatePresence>
                        {
                            error &&
                            <motion.div
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                className={"text-foreground px-3 py-1 rounded-lg bg-red-800 flex items-center gap-2"}>
                                <AnimatedIcon icon={ICONS.warning} small={true} />
                                {error}
                            </motion.div>
                        }
                    </AnimatePresence>
                    <Button loading={loading} text={"Register"} type={"submit"}/>
                    <Link href={"/login"} className={"underline opacity-70 hover:opacity-90"}>Already have an account?</Link>
                </div>
            </form>
        </div>
    )
}

export default function Register() {
    return (
        <Suspense fallback={
            <div className={"flex items-center justify-center flex-1"}>
                <AnimatedIcon icon={ICONS.loader} loop={true}/>
            </div>}>
            <RegisterForm/>
        </Suspense>
    )
}