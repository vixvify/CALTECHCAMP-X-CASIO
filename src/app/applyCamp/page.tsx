'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

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
    qi1: string;
    qi2: string;
    qi3: string;
    qi4: string;
    qm1: string;
    qm2: string;
    qm3: string;
    qa1: string;
    qp1: string;
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
    qi1: '',
    qi2: '',
    qi3: '',
    qi4: '',
    qm1: '',
    qm2: '',
    qm3: '',
    qa1: '',
    qp1: '',
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
    qi1,
    qi2,
    qi3,
    qi4,
    qm1,
    qm2,
    qm3,
    qa1,
    qp1,
    username,
    password,
    email,
  } = user;
  const [confirmPass, setConfirmPass] = useState('');
  const [canSend, setCanSend] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const [isFilled, setIsFilled] = useState(false);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isEmail, setIsEmail] = useState(undefined as any);
  const [isSchool, setIsSchool] = useState(undefined as any);
  const checkUrl =
    /^(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]{10,})/;
  const checkClip =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const [isUrl1, setisUrl1] = useState(undefined as any);
  const [isUrl2, setisUrl2] = useState(undefined as any);
  const [isClip, setisClip] = useState(undefined as any);
  const upper = /[A-Z]/;
  const lower = /[a-z]/;
  const num = /[0-9]/;
  const [isCall, setisCall] = useState(undefined as any);
  const [isPass, setIsPass] = useState(undefined as any);
  const [isMatch, setIsMatch] = useState(undefined as any);

  const inputValue = (topic: string) => {
    return (e: any) => setUser({ ...user, [topic]: e.target.value.trim() });
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: 'กำลังดำเนินการ',
    });
    setCanSend(false);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/data/createData`, user);
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
        qi1,
        qi2,
        qi3,
        qi4,
        qm1,
        qm2,
        qm3,
        qa1,
        qp1,
        username: '',
        password: '',
      });
      router.push('/');
    } catch (err: any) {
      if (err.response.data.msg == 'isRegis') {
        Swal.fire({
          icon: 'error',
          title: 'คุณได้สมัครค่ายนี้แล้ว',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'สมัครไม่สำเร็จ โปรดตรวจสอบข้อมูลอีกครั้ง',
        });

        setCanSend(true);
      }
    }
  };

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
      qi1 &&
      qi2 &&
      qi3 &&
      qi4 &&
      qm1 &&
      qm2 &&
      qm3 &&
      qa1 &&
      qp1 &&
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
    qi1,
    qi2,
    qi3,
    qi4,
    qm1,
    qm2,
    qm3,
    qa1,
    qp1,
    username,
    password,
    email,
    confirmPass,
  ]);

  useEffect(() => {
    setIsEmail(email === '' ? undefined : regex.test(email));
    setIsSchool(school === '' ? undefined : !school.includes('โรงเรียน'));
    setisUrl1(url === '' ? undefined : checkUrl.test(url));
    setisUrl2(qa1 === '' ? undefined : checkUrl.test(qa1));
    setisClip(clip === '' ? undefined : checkClip.test(clip));
    setisCall(call === '' ? undefined : num.test(call));
    setIsPass(
      password === ''
        ? undefined
        : upper.test(password) && lower.test(password) && num.test(password),
    );
    setIsMatch(confirmPass === '' ? undefined : confirmPass == password);
  }, [email, school, url, clip, password, call, confirmPass, qa1]);

  useEffect(() => {
    if (
      !isFilled ||
      !isCall ||
      !isEmail ||
      !isSchool ||
      !isPass ||
      !isClip ||
      !isUrl1 ||
      !isUrl2 ||
      !isMatch
    ) {
      setCanSend(false);
    } else if (password !== confirmPass) {
      setCanSend(false);
    } else {
      setCanSend(true);
    }
  }, [
    isFilled,
    isCall,
    isEmail,
    isSchool,
    isPass,
    isClip,
    isUrl1,
    isUrl2,
    isMatch,
  ]);

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center pt-35">
      <h1 className="text-5xl font-bold text-white">สมัครเข้าร่วมค่าย</h1>
      <div className="bg-opacity-0 mt-10 mb-10 rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-10 backdrop-blur-lg backdrop-filter lg:w-[40vw]">
        <form className="flex flex-col gap-5" onSubmit={sendData}>
          <p className="text-3xl font-extrabold text-white">-รายละเอียดทีม-</p>
          <p className="text-xl text-white">ชื่อนวัตกรรม</p>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('team')}
          ></input>
          <div className="">
            <p className="text-xl text-white">โรงเรียน</p>
            <p className="text-white">
              (ไม่ต้องใส่คำว่า โรงเรียน เช่น พระนครศึกษา)
            </p>
          </div>
          <input
            type="text"
            className={`h-10 w-full rounded-md text-white ${
              isSchool === undefined
                ? 'border-2 border-white'
                : isSchool
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('school')}
          ></input>
          {isSchool != undefined && !isSchool && (
            <p className="text-red-500">ไม่ต้องใส่คำว่าโรงเรียน</p>
          )}
          <p className="text-xl text-white">อีเมล (หัวหน้าทีม)</p>
          <input
            type="text"
            className={`h-10 w-full rounded-md text-white ${
              isEmail === undefined
                ? 'border-2 border-white'
                : isEmail
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('email')}
          ></input>
          {isEmail != undefined && !isEmail && (
            <p className="text-red-500">ระบุอีเมลให้ถูกต้อง</p>
          )}
          <p className="text-xl text-white">เบอร์โทร (หัวหน้าทีม)</p>
          <input
            type="text"
            className={`h-10 w-full rounded-md text-white ${
              isCall === undefined
                ? 'border-2 border-white'
                : isCall
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('call')}
          ></input>
          {isCall != undefined && !isCall && (
            <p className="text-red-500">ระบุเบอร์ให้ถูกต้อง</p>
          )}
          <p className="mt-5 text-3xl font-extrabold text-white">
            -รายละเอียดผู้สมัคร-
          </p>
          <div className="">
            <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 1</p>
            <p className="text-white">(ไม่ต้องใส่คำนำหน้า เช่น ก้อง รักสยาม)</p>
          </div>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('name1')}
          ></input>
          <div className="">
            <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 2</p>
            <p className="text-white">(ไม่ต้องใส่คำนำหน้า เช่น ก้อง รักสยาม)</p>
          </div>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('name2')}
          ></input>
          <div className="">
            <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 3</p>
            <p className="text-white">(ไม่ต้องใส่คำนำหน้า เช่น ก้อง รักสยาม)</p>
          </div>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('name3')}
          ></input>
          <div className="">
            <p className="text-xl text-white">ลิงค์ Google Drive</p>
            <p className="text-white">
              (ประกอบด้วย ไฟล์ ปพ.1 หรือ ปพ.7 หรือ บัตรนักเรียน ของสมาชิกทุกคน)
            </p>
            <p className="text-white">
              ตั้งชื่อดังนี้ "ชื่อเอกสาร-ลำดับของสมาชิก" เช่น "ปพ.1-1"
              "บัตรนักเรียน-3"
            </p>
          </div>
          <input
            type="text"
            className={`h-10 w-full rounded-md text-white ${
              isUrl1 === undefined
                ? 'border-2 border-white'
                : isUrl1
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('url')}
          ></input>
          {isUrl1 != undefined && !isUrl1 && (
            <p className="text-red-500">ระบุลิงค์ให้ถูกต้อง</p>
          )}
          <div className="">
            <p className="text-xl text-white">ลิงค์คลิปแนะนำนวัตกรรม</p>
            <p className="text-white">
              ความยาวไม่เกิน 5 นาที เผยแพร่ผ่านช่องทาง Youtube โดยเปิดเป็น
              Unlisted{' '}
            </p>
          </div>
          <input
            type="text"
            className={`h-10 w-full rounded-md text-white ${
              isClip === undefined
                ? 'border-2 border-white'
                : isClip
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('clip')}
          ></input>
          {isClip != undefined && !isClip && (
            <p className="text-red-500">ระบุลิงค์ให้ถูกต้อง</p>
          )}
          <p className="mt-5 text-3xl font-extrabold text-white">
            -คําถามเชิงนวัตกรรม-
          </p>
          <p className="text-xl text-white">อธิบายรายละเอียดนวัตกรรม</p>
          <textarea
            className="h-20 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('qi1')}
          ></textarea>
          <p className="text-xl text-white">นวัตกรรมนี้เกี่ยวกับ SDGs ยังไง</p>
          <textarea
            className="h-20 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('qi2')}
          ></textarea>
          <p className="text-xl text-white">
            นวัตกรรมนี้เกี่ยวกับเครื่องคิดเลขอย่างไร
          </p>
          <textarea
            className="h-20 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('qi3')}
          ></textarea>
          <p className="text-xl text-white">วัตถุประสงค์ของนวัตกรรมนี้</p>
          <textarea
            className="h-20 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('qi4')}
          ></textarea>
          <p className="mt-5 text-3xl font-extrabold text-white">
            -คําถามเชิงวัดทัศนคติ-
          </p>
          <p className="text-xl text-white">
            หากทีมของน้องได้รับการรับเลือกเข้ามาค่าย แต่ทีมของเพื่อนน้องไม่ติด
            น้องจะแก้ปัญหาอย่างไรเพื่อ ไม่ให้เกิดปัญหาขึ้นในอนาคต
          </p>
          <textarea
            className="h-20 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('qm1')}
          ></textarea>
          <p className="text-xl text-white">
            หากทีมของน้องได้เข้าร่วมค่าย
            และได้นําไอเดียนวัตกรรมของน้องมาแข่งกับคนอื่น
            แต่น้องกลับไม่ติดอันดับเลย
            ทีมของน้องจะมีวิธีจัดการอารมณ์ตัวเองอย่างไรบ้าง
          </p>
          <textarea
            className="h-20 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('qm2')}
          ></textarea>
          <p className="text-xl text-white">
            หากนวัตกรรมของน้องสามารถทําให้เกิดขึ้นจริงได้
            น้องจะทําต่อให้เสร็จหรือเลิกทําแล้วทิ้งไอเดียตรงนั้นไปเลย
          </p>
          <textarea
            className="h-20 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('qm3')}
          ></textarea>
          <p className="mt-5 text-3xl font-extrabold text-white">
            -คำถามวิชาการ-
          </p>
          <a href="/qa.pdf" target="blank">
            <div className="">
              <p className="text-xl font-bold text-cyan-400">
                👆 Click เพื่อดูโจทย์
              </p>
              <p className="text-white">
                (ให้น้องทำโจทย์ผ่านทาง Ipad/tablet หรือเขียนลงในกระดาษทั้ง 3 ข้อ
                แล้วส่งเป็นลิงค์ Google Drive)
              </p>
            </div>
          </a>
          <input
            type="text"
            className={`h-10 w-full rounded-md text-white ${
              isUrl2 === undefined
                ? 'border-2 border-white'
                : isUrl2
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('qa1')}
          ></input>
          {isUrl2 != undefined && !isUrl2 && (
            <p className="text-red-500">ระบุลิงค์ให้ถูกต้อง</p>
          )}
          <p className="mt-5 text-3xl font-extrabold text-white">
            -คำถามวัดการวางแผน-
          </p>
          <a href="/q.pdf" target="blank">
            <p className="text-xl font-bold text-cyan-400">
              👆 Click เพื่อดูโจทย์
            </p>
          </a>
          <textarea
            className="h-30 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('qp1')}
          ></textarea>
          <p className="mt-5 text-3xl font-extrabold text-white">
            -สมัครบัญชีผู้ใช้-
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
            className={`h-10 w-full rounded-md text-white ${
              isPass === undefined
                ? 'border-2 border-white'
                : isPass
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('password')}
          ></input>
          {isPass != undefined && !isPass && (
            <p className="text-red-500">ระบุรหัสผ่านให้ถูกต้อง</p>
          )}
          <p className="text-xl text-white">ยืนยันรหัสผ่าน</p>
          <input
            type="password"
            className={`h-10 w-full rounded-md text-white ${
              isMatch === undefined
                ? 'border-2 border-white'
                : isMatch
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={(e: any) => setConfirmPass(e.target.value)}
          ></input>
          {isMatch != undefined && !isMatch && (
            <p className="text-red-500">รหัสผ่านไม่ตรงกัน</p>
          )}
          {!isFilled && (
            <p className="text-xl text-red-500">
              กรุณากรอกข้อมูลให้ครบและถูกต้อง
            </p>
          )}
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
