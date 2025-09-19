import Link from "next/link";
import { WaitlistButton } from "./WaitlistButton";
import { Button } from "./ui/button";

export function Header() {
  return (
    <div className="w-full flex justify-between items-center h-fit  ">
      <Link href={"/"} className="flex items-center gap-x-3">
        <div className="size-8 bg-orange-500 rounded-lg" />
        {/* <h3 className="text-2xl font-bold text-black">Charlie</h3> */}
      </Link>
      <div className="flex items-center gap-x-6">
        <Link href={"/"} className="text-neutral-500 text-sm font-medium">Learn More</Link>
        {/* <Button variant={"ghost"}>Learn More</Button> */}
        <WaitlistButton />
      </div>
    </div>
  );
}
