'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

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
  const { data: session } = useSession();
  const [isFilled, setIsFilled] = useState(false);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const inputValue = (topic: string) => {
    if (topic == 'call') {
      return (e: any) => setUser({ ...user, [topic]: String(e.target.value) });
    }
    return (e: any) => setUser({ ...user, [topic]: e.target.value });
  };

  const getData = async () => {
    try {
      const res = await axios.get(`/api/data/singleData/${id}`);
      setUser(res.data.data);
      setIsLoading(false);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
      });
    }
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: 'กำลังดำเนินการ',
      showConfirmButton: false,
      showCloseButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
    setCanSend(false);
    try {
      await axios.put(`api//data/editData/${id}`, user);
      Swal.fire({
        title: 'แก้ไขข้อมูลสำเร็จ',
        icon: 'success',
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
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'แก้ไขข้อมูลไม่สำเร็จ',
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (
      team &&
      call &&
      school &&
      name1 &&
      name2 &&
      name3 &&
      url &&
      clip &&
      username &&
      password &&
      email &&
      confirmPass
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [
    team,
    call,
    name1,
    name2,
    name3,
    url,
    clip,
    username,
    password,
    email,
    confirmPass,
  ]);

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = regex.test(email);
    const checkUrl =
      /^(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]{10,})/;
    const checkClip =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const isUrl = checkUrl.test(url);
    const isClip = checkClip.test(clip);
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const num = /[0-9]/;
    const isCall = num.test(call);
    const hasUpper = upper.test(password);
    const hasLower = lower.test(password);
    const hasNum = num.test(password);
    if (
      !isFilled ||
      !isEmail ||
      !isCall ||
      !hasUpper ||
      !hasLower ||
      !hasNum ||
      !isClip ||
      !isUrl
    ) {
      setCanSend(false);
    } else if (password !== confirmPass) {
      setCanSend(false);
    } else {
      setCanSend(true);
    }
  }, [username, password, confirmPass, email, isFilled, clip, url, call]);

  useEffect(() => {
    if (!(session as any).user.admin) {
      router.push('/');
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <h1 className="text-3xl text-white lg:text-5xl">กำลังโหลดข้อมูล...</h1>;
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center pt-35">
        <h1 className="text-5xl font-bold text-white">แก้ไขข้อมูล</h1>
        <div className="bg-opacity-0 mt-10 mr-5 mb-10 ml-5 rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-10 backdrop-blur-lg backdrop-filter lg:mr-0 lg:ml-0 lg:w-[40vw]">
          <form className="flex flex-col gap-5" onSubmit={sendData}>
            <p className="text-3xl font-extrabold text-white">รายละเอียดทีม</p>
            <p className="text-xl text-white">ชื่อนวัตกรรม</p>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('team')}
              value={team}
            ></input>
            <div className="">
              <p className="text-xl text-white">โรงเรียน</p>
              <p className="text-white">
                (ไม่ต้องใส่คำว่า โรงเรียน เช่น พระนครศึกษา)
              </p>
            </div>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('school')}
              value={school}
            ></input>
            <p className="text-xl text-white">อีเมล (หัวหน้าทีม)</p>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('email')}
              value={email}
            ></input>
            <p className="text-xl text-white">เบอร์โทร (หัวหน้าทีม)</p>
            <input
              type="number"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('call')}
              value={call}
            ></input>
            <p className="mt-5 text-3xl font-extrabold text-white">
              รายละเอียดผู้สมัคร
            </p>
            <div className="">
              <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 1</p>
              <p className="text-white">
                (ไม่ต้องใส่คำนำหน้า เช่น ก้อง รักสยาม)
              </p>
            </div>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('name1')}
              value={name1}
            ></input>
            <div className="">
              <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 2</p>
              <p className="text-white">
                (ไม่ต้องใส่คำนำหน้า เช่น ก้อง รักสยาม)
              </p>
            </div>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('name2')}
              value={name2}
            ></input>
            <div className="">
              <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 3</p>
              <p className="text-white">
                (ไม่ต้องใส่คำนำหน้า เช่น ก้อง รักสยาม)
              </p>
            </div>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('name3')}
              value={name3}
            ></input>
            <div className="">
              <p className="text-xl text-white">ลิงค์ Google Drive</p>
              <p className="text-white">
                (ประกอบด้วย ไฟล์ ปพ.1 หรือ ปพ.7 หรือ บัตรนักเรียน
                ของสมาชิกทุกคน)
              </p>
              <p className="text-white">
                ตั้งชื่อดังนี้ "ชื่อเอกสาร-ลำดับของสมาชิก" เช่น "ปพ.1-1"
                "บัตรนักเรียน-3"
              </p>
            </div>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('url')}
              value={url}
            ></input>
            <div className="">
              <p className="text-xl text-white">ลิงค์คลิปแนะนำนวัตกรรม</p>
              <p className="text-white">
                ความยาวไม่เกิน 5 นาที เผยแพร่ผ่านช่องทาง Youtube โดยเปิดเป็น
                Unlisted
              </p>
            </div>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('clip')}
              value={clip}
            ></input>
            <p className="mt-5 text-3xl font-extrabold text-white">
              สมัครบัญชีผู้ใช้
            </p>
            <p className="text-xl text-white">ชื่อผู้ใช้</p>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('username')}
              value={username}
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
            {!isFilled && (
              <p className="text-xl font-extrabold text-amber-500">
                กรุณากรอกข้อมูลให้ครบและถูกต้อง
              </p>
            )}
            <button
              type="submit"
              className="mt-5 h-15 cursor-pointer rounded-xl border-2 border-white bg-white text-2xl text-black disabled:opacity-50"
              disabled={!canSend}
            >
              แก้ไขข้อมูล
            </button>
          </form>
        </div>
      </div>
    );
  }
}
