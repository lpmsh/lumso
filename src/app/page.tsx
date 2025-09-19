import Image from "next/image";
import background from "@/assets/background.png";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div>
      <div className="min-h-dvh bg-white mx-auto w-full flex flex-col items-center pt-2">
        <Header />
        <h1 className="font-bold text-5xl text-black">Your AI Slack Teammate</h1>
      </div>
    </div>
  );
}
