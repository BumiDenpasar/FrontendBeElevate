
export default function ElevateButton(props:any) {
  return (
    <button
    className="bg-main rounded-t-full hover:text-xl max-w-2xl transition-all duration-200 px-5 py-4 fixed bottom-0 right-0 left-0 m-auto w-full text-center font-semibold"
    type="submit"
  >
    {props.value}
  </button>
  )
}
