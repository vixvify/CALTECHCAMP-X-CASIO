'use client';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function page() {
  interface User {
    username: string;
    password: string;
  }
  const [user, setUser] = useState<User>({ username: '', password: '' });

  const { username, password } = user;

  const inputValue = (topic: string) => {
    return (e: any) => setUser({ ...user, [topic]: e.target.value });
  };

  const [canSend, setCanSend] = useState(false);
  const router = useRouter();

  const sendData = async (e: any) => {
    e.preventDefault();
    Swal.fire('กำลังเข้าสู่ระบบ');
    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (res && res.ok && !res.error) {
        Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ',
          icon: 'success',
          draggable: true,
        });
        router.push('/');
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!username || !password) {
      setCanSend(false);
    } else {
      setCanSend(true);
    }
  }, [username, password]);

  return (
    <div className="flex flex-col items-center justify-center pt-35">
      <h1 className="text-5xl font-bold text-white">เข้าสู่ระบบ</h1>
      <div className="bg-opacity-0 mt-10 rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-10 backdrop-blur-lg backdrop-filter">
        <form className="flex flex-col gap-5" onSubmit={sendData}>
          <p className="text-xl text-white">ชื่อผู้ใช้</p>
          <input
            type="text"
            className="h-10 w-100 rounded-md border-2 border-white text-white"
            onInput={inputValue('username')}
          ></input>
          <p className="text-xl text-white">รหัสผ่าน</p>
          <input
            type="password"
            className="h-10 w-100 rounded-md border-2 border-white text-white"
            onInput={inputValue('password')}
          ></input>
          <button
            type="submit"
            className="mt-5 h-15 cursor-pointer rounded-xl border-2 border-white bg-white text-2xl text-black disabled:opacity-50"
            disabled={!canSend}
          >
            เข้าสู่ระบบ
          </button>
          <button
            type="button"
            className="mt-2 flex h-15 cursor-pointer items-center justify-center gap-4 rounded-xl border-2 border-white text-xl text-white"
          >
            <FcGoogle /> เข้าสู่ระบบด้วย Google
          </button>
          <div className="flex items-center justify-center gap-5">
            <p className="text-white">ลืมรหัสผ่าน</p>
            <Link href={'/register'}>
              <p className="text-sky-300">สร้างบัญชี</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
