import Link from "next/link";
import { Button } from "./ui/button";

export function WaitlistButton({ text }: { text?: string }) {
  return (
    <Link href={"https://tally.so/r/3lEyyV"} target="_blank">
      <Button variant={"main"}>{text || "Join Waitlist"}</Button>
    </Link>
  );
}
