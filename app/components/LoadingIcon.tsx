'use client';

import ICON from "../../public/loader.json";
import {Player} from "@lordicon/react";
import { motion } from "framer-motion";
import {useEffect, useRef} from "react";

export default function LoadingIcon({small = false, dark = false} : {small?: boolean, dark?: boolean}) {

    const playerRef = useRef<Player>(null);

    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, []);

    return (
        <span>
            <Player
                colorize={dark ? "#000000" : "#ffffff"}
                size={small ? 20 : 30}
                ref={playerRef}
                icon={ ICON }
                onComplete={() => playerRef.current?.playFromBeginning()}
            />
        </span>

    )
}