import Link from "next/link";
import { UserButton} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="w-full h-max flex justify-between items-center mb-16">
          <Link href='/' className="font-semibold font-italic">BeElevate</Link>
          <UserButton/>
    </div>
  )
}
