import Link from "next/link";

export function Header() {
  return (
    <div className="w-full flex justify-between items-center h-fit  p-4 max-w-4xl">
      <Link href={"/"} className="flex items-center gap-x-3">
        <div className="size-8 bg-orange-500 rounded-lg" />
        <h3 className="text-2xl font-bold text-black">Charlie</h3>
      </Link>
      {/*<WaitlistButton />*/}
    </div>
  );
}
