"use client";

import {useEffect, useState} from "react";
import {User} from "@/app/models/User";
import UserService from "@/app/services/UserService";
import AnimatedIcon, {ICONS} from "@/app/components/AnimatedIcon";
import {AnimatePresence, motion} from "framer-motion";
import {usePathname} from "next/navigation";
import Image from "next/image";

export default function NavBar() {

    const [user, setUser] = useState<User | null>(null);
    const pathname = usePathname();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUser(await UserService.getMyUser());
            } catch (e) {
                console.log(e);
            }
        }
        fetchUser();
    }, [pathname]);
    return (
        <div className=" fixed top-0 pt-6 left-0 right-0 px-4 bg-linear-to-t from-transparent to-background flex items-center">

            <div className="flex-1 justify-start flex">
                <motion.div
                    initial={{scale: 0, transformOrigin: "top left"}}
                    animate={{scale: 1, transformOrigin: "top left"}}
                    className="hidden md:flex items-center gap-2 px-5 py-3 rounded-xl transition-colors">
                    <Image src={"/azimut_icon.png"} alt={"azimut"} width={30} height={30} />
                    <p>Azimut</p>
                </motion.div>
            </div>

            <motion.div
                initial={{scale: 0, transformOrigin: "top"}}
                animate={{scale: 1, transformOrigin: "top"}}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-background-variant">
                <img src={"/mglab_icon.png"} alt={""} width={50} height={30} />
                <p>Maelg&apos;s lab</p>
            </motion.div>
            <div className={"flex-1 flex justify-end"}>
                <AnimatePresence>
                    {
                        user &&
                        <motion.div
                            initial={{scale: 0, transformOrigin: "top right"}}
                            animate={{scale: 1, transformOrigin: "top right"}}
                            className="hidden md:flex items-center gap-2 px-5 py-3 rounded-xl transition-colors">
                            <AnimatedIcon icon={ICONS.account}/>
                            <p>{user.first_name}</p>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>


        </div>
    )
}