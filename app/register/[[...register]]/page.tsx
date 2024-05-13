import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page",
};

export default function page() {
  return (
    <div className="flex items-center justify-center bg-black h-screen w-screen">
      <SignUp path="/register" />;
    </div>
  )
}