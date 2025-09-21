'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function page() {
  interface User {
    username: string;
    password: string;
    email: string;
  }

  const [user, setUser] = useState<User>({
    username: '',
    password: '',
    email: '',
  });

  const { username, password, email } = user;
  const [confirmPass, setConfirmPass] = useState('');
  const [canSend, setCanSend] = useState(false);
  const router = useRouter();

  const inputValue = (topic: string) => {
    return (e: any) => setUser({ ...user, [topic]: e.target.value });
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: 'กำลังสร้างบัญชี',
    });
    setCanSend(false);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/user/createData`, user);
      Swal.fire({
        title: 'สร้างบัญชีสำเร็จ',
        icon: 'success',
        draggable: true,
      });
      setUser({ username: '', password: '', email: '' });
      router.push('/login');
    } catch (err) {
      console.log(err);
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
    if (
      !username ||
      !password ||
      !confirmPass ||
      !email ||
      !isEmail ||
      !hasUpper ||
      !hasLower ||
      !hasNum
    ) {
      setCanSend(false);
    } else if (password !== confirmPass) {
      setCanSend(false);
    } else {
      setCanSend(true);
    }
  }, [username, password, confirmPass, email]);

  return (
    <div className="flex flex-col items-center justify-center pt-35">
      <h1 className="text-5xl font-bold text-white">สมัครบัญชี</h1>
      <div className="bg-opacity-0 mt-10 rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-10 backdrop-blur-lg backdrop-filter">
        <form className="flex flex-col gap-5" onSubmit={sendData}>
          <p className="text-xl text-white">ชื่อผู้ใช้</p>
          <input
            type="text"
            className="h-10 w-100 rounded-md border-2 border-white text-white"
            onInput={inputValue('username')}
          ></input>
          <div className="">
            <p className="text-xl text-white">รหัสผ่าน</p>
            <p className="text-white">
              (ประกอบด้วย ตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลข อย่างน้อย 1 ตัว)
            </p>
          </div>
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
          <p className="text-xl text-white">อีเมล</p>
          <input
            type="text"
            className="h-10 w-100 rounded-md border-2 border-white text-white"
            onInput={inputValue('email')}
          ></input>
          <button
            type="submit"
            className="mt-5 h-15 cursor-pointer rounded-xl border-2 border-white bg-white text-2xl text-black disabled:opacity-50"
            disabled={!canSend}
          >
            สมัครบัญชี
          </button>
        </form>
      </div>
    </div>
  );
}
