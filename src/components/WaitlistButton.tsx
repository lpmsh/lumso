import Link from "next/link";
import { Button } from "./ui/button";
import { ComponentProps } from "react";

export function WaitlistButton({ text, size }: { text?: string, size?: ComponentProps<typeof Button>["size"] }) {
  return (
    <Link href={"https://tally.so/r/3XXWrO"} target="_blank">
      <Button size={size}>{text || "Join Waitlist"}</Button>
    </Link>
  );
}
