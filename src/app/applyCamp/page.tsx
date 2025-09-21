'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function page() {
  interface User {
    team: string;
    school: string;
    email: string;
    call: string;
    name1: string;
    name2: string;
    name3: string;
    url: string;
    clip: string;
    username: string;
    password: string;
  }

  const [user, setUser] = useState<User>({
    team: '',
    school: '',
    email: '',
    call: '',
    name1: '',
    name2: '',
    name3: '',
    url: '',
    clip: '',
    username: '',
    password: '',
  });

  const {
    team,
    school,
    call,
    name1,
    name2,
    name3,
    url,
    clip,
    username,
    password,
    email,
  } = user;
  const [confirmPass, setConfirmPass] = useState('');
  const [canSend, setCanSend] = useState(false);
  const router = useRouter();

  const inputValue = (topic: string) => {
    return (e: any) => setUser({ ...user, [topic]: e.target.value });
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: 'กำลังดำเนินการ',
    });
    setCanSend(false);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/user/createData`, user);
      Swal.fire({
        title: 'สมัครสำเร็จ',
        icon: 'success',
        footer: 'ติดตามข่าวสารเพื่อรับทราบผลการคัดเลือก',
        draggable: true,
      });
      setUser({
        team: '',
        school: '',
        email: '',
        call: '',
        name1: '',
        name2: '',
        name3: '',
        url: '',
        clip: '',
        username: '',
        password: '',
      });
      router.push('/');
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
      !team ||
      !call ||
      !school ||
      !name1 ||
      !name2 ||
      !name3 ||
      !url ||
      !clip ||
      !username ||
      !password ||
      !email ||
      !confirmPass ||
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
      <h1 className="text-5xl font-bold text-white">สมัครเข้าร่วมค่าย</h1>
      <div className="bg-opacity-0 mt-10 mb-10 rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-10 backdrop-blur-lg backdrop-filter lg:w-[40vw]">
        <form className="flex flex-col gap-5" onSubmit={sendData}>
          <p className="text-3xl font-extrabold text-white">รายละเอียดทีม</p>
          <p className="text-xl text-white">ชื่อทีม</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('team')}
          ></input>
          <p className="text-xl text-white">โรงเรียน</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('school')}
          ></input>
          <p className="text-xl text-white">อีเมล (หัวหน้าทีม)</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('email')}
          ></input>
          <p className="text-xl text-white">เบอร์โทร (หัวหน้าทีม)</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('call')}
          ></input>
          <p className="mt-5 text-3xl font-extrabold text-white">
            รายละเอียดผู้สมัคร
          </p>
          <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 1</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('name1')}
          ></input>
          <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 2</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('name2')}
          ></input>
          <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 3</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('name3')}
          ></input>
          <p className="text-xl text-white">ลิงค์ Google Drive</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('url')}
          ></input>
          <p className="text-xl text-white">ลิงค์คลิปแนะนำตัว Youtube</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('clip')}
          ></input>
          <p className="mt-5 text-3xl font-extrabold text-white">
            สมัครบัญชีผู้ใช้
          </p>
          <p className="text-xl text-white">ชื่อผู้ใช้</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
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
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('password')}
          ></input>
          <p className="text-xl text-white">ยืนยันรหัสผ่าน</p>
          <input
            type="password"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={(e: any) => setConfirmPass(e.target.value)}
          ></input>
          <button
            type="submit"
            className="mt-5 h-15 cursor-pointer rounded-xl border-2 border-white bg-white text-2xl text-black disabled:opacity-50"
            disabled={!canSend}
          >
            สมัครเข้าร่วมค่าย
          </button>
        </form>
      </div>
    </div>
  );
}
