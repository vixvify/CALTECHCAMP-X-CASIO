"use client";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [open, isOpen] = useState(false);

  return (
    <div>
      <nav className="relative">
        <GiHamburgerMenu
          className="lg:hidden absolute top-10 left-5 z-50 w-5 h-5"
          style={{ color: open ? "black" : "white" }}
          onClick={() => isOpen(!open)}
        />
        <ul
          className={`flex flex-col lg:flex-row gap-10 lg:gap-0 lg:fixed absolute pt-15 lg:pt-0 lg:justify-around lg:bg-transparent bg-white items-center top-0 left-0 transform ${
            open ? "translate-x-0" : "-translate-x-full"
          } lg:left-[50%] lg:transform lg:-translate-x-1/2 lg:w-[50%] w-[35vw] lg:h-[150px] h-[100vh] lg:text-white lg:text-2xl transition-transform duration-500 ease-in-out lg:transition-none`}
        >
          <Link href={"/"}>
            <li>
              <Image
                src="/calc.png"
                width={150}
                height={150}
                alt="logo"
                className="lg:w-[150px] lg:h-[150px] w-0 h-0"
              ></Image>
            </li>
          </Link>
          <li>รายละเอียด</li>
          <Link href={"/qualifications"}>
            <li>คุณสมบัติ</li>
          </Link>
          <li>Timelines</li>
          <li>สถานที่</li>
          <li className="text-[#101557] bg-white p-3 rounded-2xl">ลงทะเบียน</li>
        </ul>
      </nav>
    </div>
  );
}
