"use client";

import Image from "next/image";
import slack from "@/assets/slack.svg";
import teams from "@/assets/teams.svg";
import twist from "@/assets/twist.svg";
import { Header } from "@/components/Header";
import { motion } from "motion/react";
import screenshot from "@/assets/screenshot.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useState } from "react";

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
];

export default function Home() {
  const [videoActive, setVideoActive] = useState<boolean>(false);

  return (
    <div className="w-full min-h-dvh flex flex-col items-center">
      <div className="px-4 py-4 max-w-4xl w-full">
        <Header />

        <div className="w-full pt-16 md:max-w-[80%] select-none">
          <h1 className="font-bold text-5xl text-black text-left pb-1">
            Your AI{" "}
            {items.slice(0, 1).map((item) => (
              <span className="inline items-center">
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
          <mark className="-py-0.5 rounded-md px-1 bg-orange-100 text-orange-500 font-bold text-5xl text-left">
            With Super Powers
          </mark>

          <h2 className="text-neutral-500 text-lg font-medium pt-4">
            Answers questions automatically and soon, from all your team's
            tools, not just Slack.
          </h2>
        </div>
        {/* <Image src={background} alt="" className="rounded-lg w-full mt-14" /> */}

        <div className="max-w-full lg:w-4xl mx-auto rounded-md mt-14 ghostButton">
          {!videoActive && <Image src={screenshot} alt="" onClick={() => setVideoActive(true)} className="shadow-lg" />}
          {videoActive && <iframe
            color="white"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=UfOILpCabGitfXsb"
            title="YouTube video player"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-lg w-full aspect-video "
          ></iframe>}
        </div>

        <div className="pt-16">
          <div className="flex items-center justify-evenly">
            {items.map((item) => (
              <Image
                src={item.image}
                alt=""
                className="inline size-10 mb-2 mr-1"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
