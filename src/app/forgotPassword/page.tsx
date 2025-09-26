'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function page() {
  interface User {
    email: string;
    password: string;
  }
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const { email, password } = user;
  const [confirmPass, setConfirmPass] = useState('');
  const [canSend, setCanSend] = useState(false);
  const router = useRouter();

  const inputValue = (topic: string) => {
    return (e: any) => setUser({ ...user, [topic]: e.target.value });
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    Swal.fire('กำลังรีเซ็ตรหัสผ่าน');
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API}/data/resetPassword`,
        user,
      );
      Swal.fire({
        title: 'รีเซ็ตรหัสผ่านสำเร็จ',
        icon: 'success',
        draggable: true,
      });
      router.push('/login');
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'ไม่พบอีเมล',
      });
    }
  };

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = regex.test(email);
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const num = /[0-9]/;
    const hasUpper = upper.test(password);
    const hasLower = lower.test(password);
    const hasNum = num.test(password);
    if (!isEmail || !hasUpper || !hasLower || !hasNum) {
      setCanSend(false);
    } else if (password !== confirmPass) {
      setCanSend(false);
    } else {
      setCanSend(true);
    }
  }, [email, password, confirmPass]);

  return (
    <div className="flex flex-col items-center justify-center pt-35">
      <h1 className="text-5xl font-bold text-white">ลืมรหัสผ่าน</h1>
      <div className="mb-4 mr-15 ml-15 mt-10 bg-opacity-0 rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-4 backdrop-blur-lg backdrop-filter">
        <form className="flex flex-col gap-5" onSubmit={sendData}>
          <p className="text-xl text-white">อีเมลของคุณ</p>
          <input
            type="text"
            className="h-10 w-100 rounded-md border-2 border-white text-white"
            onInput={inputValue('email')}
          ></input>
          <p className="text-xl text-white">รหัสผ่าน</p>
          <input
            type="password"
            className="h-10 w-100 rounded-md border-2 border-white text-white"
            onInput={inputValue('password')}
          ></input>
          <p className="text-xl text-white">ยืนยันรหัสผ่าน</p>
          <input
            type="password"
            className="h-10 w-100 rounded-md border-2 border-white text-white"
            onInput={(e: any) => setConfirmPass(e.target.value)}
          ></input>
          <button
            type="submit"
            className="mt-5 h-15 cursor-pointer rounded-xl border-2 border-white bg-white text-2xl text-black disabled:opacity-50"
            disabled={!canSend}
          >
            รีเซ็ตรหัสผ่าน
          </button>
        </form>
      </div>
    </div>
  );
}
