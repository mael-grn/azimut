
import AnimatedIcon, {ICONS} from "@/app/components/AnimatedIcon";

export default function Button({text, onClick, isSecondary, type, loading = false}: {text: string, onClick?: () => void, isSecondary?: boolean, type?: "submit" | "button", loading?:boolean}) {
    return (
        <button type={type} disabled={loading} onClick={onClick} className={` flex gap-2 item-center justify-center py-2 cursor-pointer rounded-lg ${isSecondary ? "bg-background-variant" : "bg-foreground text-background"}  ${loading ? "opacity-50 hover:opacity-50" : "hover:opacity-70 "} px-4 transition-all`}>

            {loading ? <div className={"mt-0.5"}>
                <AnimatedIcon icon={ICONS.loader} loop={true} small={true} dark={!isSecondary}/>
            </div> : null}
            {text}
        </button>
    )
}