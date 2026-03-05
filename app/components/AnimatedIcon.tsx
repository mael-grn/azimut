'use client';

import LOADER_ICON from "../../public/loader.json";
import WARNING_ICON from "../../public/warning.json";
import ACCOUNT_ICON from "../../public/account.json";
import INFO_ICON from "../../public/info.json";
import {Player} from "@lordicon/react";
import {useEffect, useRef} from "react";

type LordiconData = Record<string, unknown>;
export const ICONS: Record<string, LordiconData> = {
    loader: LOADER_ICON,
    warning: WARNING_ICON,
    account: ACCOUNT_ICON,
    info: INFO_ICON
};

export default function AnimatedIcon({
                                         small = false,
                                         dark = false,
                                         icon,
                                         loop = false
                                     }: {
    small?: boolean,
    dark?: boolean,
    icon: LordiconData,
    loop?: boolean
}) {
    const playerRef = useRef<Player>(null);
    const size = small ? 20 : 30;

    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, []);

    return (
        <div
            style={{
                width: size,
                height: size,
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Player
                colorize={dark ? "#000000" : "#ffffff"}
                size={size}
                ref={playerRef}
                icon={icon}
                onComplete={() => loop && playerRef.current?.playFromBeginning()}
            />
        </div>
    );
}