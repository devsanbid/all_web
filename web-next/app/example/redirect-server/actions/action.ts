'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function redirectToLink() {
    // logic (db updates/login/register)
    // client vs server redirect
    // server redirect: revalidate the path 
    // can check authentication, session, cookies
    // client redirect: no revalidation, just redirect
    revalidatePath("/example/link"); // revalidate the path before redirecting
    redirect("/example/link"); // server-side redirect
}