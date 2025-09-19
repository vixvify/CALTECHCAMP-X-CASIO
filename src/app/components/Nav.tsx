'use client';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [open, isOpen] = useState(false);

  return (
    <div>
      <nav className="relative z-999">
        <GiHamburgerMenu
          className="absolute top-10 left-5 z-50 h-5 w-5 lg:hidden"
          style={{ color:'white'}}
          onClick={() => isOpen(!open)}
        />
        <ul
          className={`absolute top-0 left-0 flex transform flex-col items-center gap-10 bg-transparent backdrop-blur-xl pt-15 lg:fixed lg:w-[100vw] lg:flex-row lg:justify-center lg:gap-20 lg:pt-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
          } h-[100vh] w-[35vw] transition-transform duration-500 ease-in-out lg:left-[50%] lg:h-[100px] lg:w-[50%] lg:-translate-x-1/2 lg:transform lg:text-2xl lg:text-white lg:transition-none`}
        >
          <Link href={'/'}>
            <li>
              <Image
                src="/calc.png"
                width={150}
                height={150}
                alt="logo"
                className="h-0 w-0 lg:h-[150px] lg:w-[150px]"
              ></Image>
            </li>
          </Link>
          <li className='text-white'>รายละเอียด</li> 
          <Link href={'/qualifications'}>
          <li className='text-white'>คุณสมบัติ</li>
          </Link>
          <li className='text-white'>Timelines</li>
          <li className='text-white'>สถานที่</li>
          <li className="rounded-2xl bg-white p-3 text-[#101557]">ลงทะเบียน</li>
        </ul>
      </nav>
    </div>
  );
}
