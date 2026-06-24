import Link from "next/link";

export default function LinkPage() {
    return (
        <div>
            <a href="/example/image">Go to Image Page</a>
            <Link href="/example/image">Go to Image Page with Link</Link>
        </div>
    );
}