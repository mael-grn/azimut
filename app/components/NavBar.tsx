"use client";

import { motion} from "framer-motion";
import {usePathname} from "next/navigation";

export default function NavBar() {

    const pathname = usePathname();

    if (pathname === "/") {
        return null;
    }
    return (
        <div className=" fixed top-0 pt-6 left-0 justify-center right-0 px-4 bg-linear-to-t from-transparent to-background flex items-center">

            <motion.div
                initial={{scale: 0, transformOrigin: "top"}}
                animate={{scale: 1, transformOrigin: "top"}}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-background-variant">
                <img src={"/icon.png"} alt={""} width={20} height={7} />
                <p>Maël Garnier&apos;s projects</p>
            </motion.div>

        </div>
    )
}