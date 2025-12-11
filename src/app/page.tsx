"use client";

import Image from "next/image";

import slack from "@/assets/slack.svg";
import teams from "@/assets/teams.svg";
import twist from "@/assets/twist.svg";

import linear from "@/assets/linear.svg";
import notion from "@/assets/notion.svg";
import gmail from "@/assets/gmail.svg";

import { Header } from "@/components/Header";
import screenshot from "@/assets/screenshot.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { WaitlistButton } from "@/components/WaitlistButton";

const items: Array<{
  title: string;
  image: StaticImport;
  comingSoon: boolean;
}> = [
  {
    title: "Slack",
    image: slack,
    comingSoon: false,
  },
  {
    title: "Teams",
    image: teams,
    comingSoon: true,
  },
  {
    title: "Twist",
    image: twist,
    comingSoon: true,
  },
  {
    title: "Linear",
    image: linear,
    comingSoon: true,
  },
  {
    title: "Notion",
    image: notion,
    comingSoon: true,
  },
  {
    title: "Gmail",
    image: gmail,
    comingSoon: true,
  },
];

export default function Home() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center">
      <div className="px-4 py-4 max-w-4xl w-full">
        <Header />

        <div className="w-full pt-16 md:max-w-[80%] select-none">
          <h1 className="font-bold text-5xl text-black text-left pb-1">
            Your AI{" "}
            {items.slice(0, 1).map((item) => (
              <span key={item.title} className="inline items-center">
                <Image
                  src={item.image}
                  alt=""
                  className="inline size-7 mb-2 mr-1"
                />
                {item.title}
              </span>
            ))}{" "}
            Teammate
          </h1>
          <mark className="-py-0.5 rounded-md px-1 bg-sky-100 text-sky-500 font-bold text-5xl text-left">
            With Super Powers
          </mark>

          <h2 className="text-neutral-500 text-lg font-medium pt-4">
            Lumso gives your team instant answers by connecting and synthesizing
            knowledge across all your tools.
          </h2>

          <div className="flex items-center gap-x-2 pt-6">
            <WaitlistButton size={"lg"} />
            <Link href={"https://cal.com/liammonaghan/lumso"} target="_blank">
              <Button size={"lg"} variant={"ghost"}>
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-full lg:w-4xl mx-auto rounded-md mt-14 ghostButton">
          <div className="shadow-lg rounded-lg relative h-full ">
            <Image src={screenshot} alt="" className="z-[-1] rounded-lg" />
            <div className="w-full h-full top-0 left-0 bg-black/0 absolute z-[100000] rounded-lg flex flex-col justify-center items-center"></div>
          </div>
        </div>

        <div className="py-24 w-full flex flex-col">
          <h1 className="font-bold text-5xl text-black text-left pb-1 select-none">
            Connect{" "}
            <mark className="-py-0.5 rounded-md px-1 bg-sky-100 text-sky-500 font-bold text-5xl text-left">
              Everything
            </mark>{" "}
            <span className="text-neutral-500 text-lg font-medium pt-4">
              (soon)
            </span>
          </h1>
          <div className="select-none rounded-[10px] grid md:grid-cols-3 w-full justify-items-center mt-6 gap-[2px] bg-neutral-100 p-[2px]">
            {items.map((item) => (
              <div
                key={item.title}
                className={cn(
                  " w-full flex justify-center p-6 bg-white rounded-[8px]"
                )}
              >
                <Image src={item.image} alt="" className="size-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
