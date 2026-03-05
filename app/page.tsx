"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import Button from "@/app/components/Button";

export default function Home() {
    const router = useRouter();
  return (
    <div className={" min-w-full flex-1 flex items-center justify-center flex-col gap-6"}>

        <div className={"absolute top-6 left-4 right-4 flex items-center justify-center"}>
            <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-background-variant">
                <img src={"/mglab_icon.png"} alt={""} width={50} height={30} />
                <p>Maelg&apos;s lab</p>
            </div>

        </div>

      <Image src={"/azimut_icon.png"} alt={"logo"} width={200} height={200} />
      <h1>Welcome to Azimut</h1>
      <p>The opening path to all Maël Garnier&apos;s projects</p>
      <div className={"flex items-center gap-2"}>
          <Button isSecondary={true} text={"Register"} onClick={() => router.push("/register")} />
          <Button text={"Login"} onClick={() => router.push("/login")} />
      </div>
    </div>
  );
}
