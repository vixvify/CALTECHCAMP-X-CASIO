'use client';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const [open, isOpen] = useState(false);
  const { data: session } = useSession();
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [session]);

  const logout = () => {
    Swal.fire({
      title: 'ต้องการออกจากระบบหรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
    })
      .then((result) => {
        if (result.isConfirmed) {
          signOut();
        }
      })
      .then(() => {
        Swal.fire({
          title: 'ออกจากระบบสำเร็จ',
          icon: 'success',
          draggable: true,
        });
      })
      .then(() => {
        router.push('/');
      });
  };

  return (
    <div>
      <nav className="relative z-999">
        <GiHamburgerMenu
          className="absolute top-10 left-5 z-50 h-5 w-5 lg:hidden"
          style={{ color: 'white' }}
          onClick={() => isOpen(!open)}
        />
        <ul
          className={`absolute top-0 left-0 flex transform flex-col items-center gap-10 bg-transparent pt-15 backdrop-blur-xl lg:fixed lg:w-[100vw] lg:flex-row lg:justify-center lg:gap-15 lg:pt-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
          } h-[100vh] w-[35vw] transition-transform duration-500 ease-in-out lg:left-[50%] lg:h-[100px] lg:w-[50%] lg:-translate-x-1/2 lg:transform lg:text-xl lg:text-white lg:transition-none`}
        >
          <Link href={'/'}>
            <li>
              <Image
                src="/calc.png"
                width={150}
                height={150}
                alt="logo"
                className="h-0 w-0 lg:h-[100px] lg:w-[100px]"
              ></Image>
            </li>
          </Link>
          <li className="text-white">รายละเอียด</li>
          <li className="text-white">คุณสมบัติ</li>
          <li className="text-white">กำหนดการ</li>
          <li className="text-white">สถานที่</li>
          <Link href={'/admin'}>
            <li className="text-white">แอดมิน</li>
          </Link>
          {!isLogin && (
            <Link href={'/login'}>
              <li className="cursor-pointer text-white">เข้าสู่ระบบ</li>
            </Link>
          )}
          {isLogin && (
            <li className="cursor-pointer text-white" onClick={logout}>
              ออกจากระบบ
            </li>
          )}
          {!isLogin && (
            <Link href={'/applyCamp'}>
              <li className="rounded-2xl bg-white p-3 text-[#101557]">
                สมัครค่าย
              </li>
            </Link>
          )}
          {isLogin && (
            <Link href={'/applyCamp'}>
              <li className="rounded-2xl bg-white p-3 text-[#101557]">
                ติดตามสถานะการสมัคร
              </li>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
}
