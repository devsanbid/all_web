import Image from "next/image";
import img2 from "@/app/assets/img2.jpg"; // path to assets file

export default function ImagePage() {
    return (
        <div>
            <img src="https://images.unsplash.com/photo-1773332611514-238856b76198?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            </img>
            <Image
                src="https://images.unsplash.com/photo-1773332611514-238856b76198?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Example Image"
                width={100}
                height={100}
            ></Image>


            <img src="/img1.jpg"></img>
            <Image src="/img1.jpg" 
                alt="Example Image 1" 
                width={100} 
                height={100}>
            </Image>


            <Image src={img2}
                alt="Example Image 2"
                width={100}
                height={100}>
            </Image>
        </div>
    );
}