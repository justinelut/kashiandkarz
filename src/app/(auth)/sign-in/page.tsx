import React from "react";
import Login from "./sign-in";
import { isAuthenticated } from "@/lib/appwrite";
import { redirect } from "next/navigation";
export default async function page() {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    redirect("/");
  }
  return (
    <div>
      <Login />
    </div>
  );
}
