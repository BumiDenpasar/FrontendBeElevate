import Link from "next/link";

export default function Elevate(props:any) {
  return (
    <Link
            className="bg-main rounded-t-full max-w-2xl hover:text-xl transition-all duration-200 px-5 py-4 fixed bottom-0 right-0 left-0 m-auto w-full text-center font-semibold"
            href={props.href}
          >
            {props.value}
    </Link>
  )
}
