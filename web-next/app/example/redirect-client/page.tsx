"use client"; // client component
// any time you use hook/states use client
import { useRouter } from "next/navigation"; // hook

export default function RedirectClient() {
    const router = useRouter();

    const changeUrl = () => {
        router.push("/example/link"); // functional redirect
    }
    return (
        <div>
            <button onClick={changeUrl}>Go to Link Page</button>
        </div>
    );
}
