"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import Button from "@/app/components/Button";

export default function Home() {
    const router = useRouter();


  return (
    <div className={" min-w-full flex-1 flex items-center justify-center flex-col gap-6"}>

      <Image src={"/icon.png"} alt={"logo"} width={125} height={87} />
      <h1 className={"text-center"}>Welcome to Maël Garnier&apos;s projects</h1>
      <p className={"text-center"}>Login or register to get started</p>
      <div className={"flex items-center gap-2"}>
          <Button isSecondary={true} text={"Register"} onClick={() => router.push("/register")} />
          <Button text={"Login"} onClick={() => router.push("/login")} />
      </div>
    </div>
  );
}
