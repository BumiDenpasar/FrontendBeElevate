import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function page() {
  return (
    <div className="flex items-center justify-center bg-black h-screen w-screen">
      <SignIn path="/login" />;
    </div>
  )
}