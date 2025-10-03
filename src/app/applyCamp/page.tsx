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
    call1: string;
    call2: string;
    relation: string;
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    url: string;
    clip: string;
    qi1: string;
    qm1: string;
    qm2: string;
    qa1: string;
    qp1: string;
    username: string;
    password: string;
    stats: string;
  }

  const [user, setUser] = useState<User>({
    team: '',
    school: '',
    email: '',
    call1: '',
    call2: '',
    relation: '',
    name1: '',
    name2: '',
    name3: '',
    name4: '',
    url: '',
    clip: '',
    qi1: '',
    qm1: '',
    qm2: '',
    qa1: '',
    qp1: '',
    username: '',
    password: '',
    stats: '',
  });

  const {
    team,
    school,
    email,
    call1,
    call2,
    relation,
    name1,
    name2,
    name3,
    name4,
    url,
    clip,
    qi1,
    qm1,
    qm2,
    qa1,
    qp1,
    username,
    password,
    stats,
  } = user;
  const [confirmPass, setConfirmPass] = useState('');
  const [canSend, setCanSend] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const [isFilled, setIsFilled] = useState(false);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const checkFolder =
    /https:\/\/drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/;
  const checkUrl =
    /^(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]{10,})/;
  const checkClip =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const upper = /[A-Z]/;
  const lower = /[a-z]/;
  const num = /[0-9]/;
  const [isSchool, setIsSchool] = useState(undefined as any);
  const [isEmail, setIsEmail] = useState(undefined as any);
  const [isCall1, setisCall1] = useState(undefined as any);
  const [isCall2, setisCall2] = useState(undefined as any);
  const [isUrl1, setisUrl1] = useState(undefined as any);
  const [isClip, setisClip] = useState(undefined as any);
  const [isUrl2, setisUrl2] = useState(undefined as any);
  const [isUrl3, setisUrl3] = useState(undefined as any);
  const [isPass, setIsPass] = useState(undefined as any);
  const [isMatch, setIsMatch] = useState(undefined as any);

  const inputValue = (topic: string) => {
    return (e: any) => setUser({ ...user, [topic]: e.target.value.trim() });
  };

  const confirmSend = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: 'กรุณายืนยันความถูกต้องของข้อมูล',
      text: 'เมื่อทำการสมัครแล้วจะไม่สามารถแก้ไขข้อมูลได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'สมัครค่าย',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        sendData();
      }
    });
  };

  const sendData = async () => {
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
      await axios.post(`/api/data/createData`, user);
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
        call1: '',
        call2: '',
        relation: '',
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        url: '',
        clip: '',
        qi1: '',
        qm1: '',
        qm2: '',
        qa1: '',
        qp1: '',
        username: '',
        password: '',
        stats: '',
      });
      router.push('/');
    } catch (err: any) {
      if (err.response.data.msg == 'isRegis') {
        Swal.fire({
          icon: 'error',
          title: 'คุณได้สมัครค่ายนี้แล้ว',
        });
      } else if (err.response.data.msg == 'isAlredyName') {
        Swal.fire({
          icon: 'error',
          title: 'ชื่อผู้ใช้ซ้ำ กรุณาลองใหม่',
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
      school &&
      email &&
      call1 &&
      call2 &&
      relation &&
      name1 &&
      name2 &&
      name3 &&
      name4 &&
      url &&
      clip &&
      qi1 &&
      qm1 &&
      qm2 &&
      qa1 &&
      qp1 &&
      username &&
      password &&
      confirmPass
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [
    team,
    school,
    email,
    call1,
    call2,
    relation,
    name1,
    name2,
    name3,
    name4,
    url,
    clip,
    qi1,
    qm1,
    qm2,
    qa1,
    qp1,
    username,
    password,
    confirmPass,
  ]);

  useEffect(() => {
    setIsSchool(school === '' ? undefined : !school.includes('โรงเรียน'));
    setIsEmail(email === '' ? undefined : regex.test(email));
    setisCall1(call1 === '' ? undefined : num.test(call1));
    setisCall2(call2 === '' ? undefined : num.test(call2));
    setisUrl1(url === '' ? undefined : checkFolder.test(url));
    setisClip(clip === '' ? undefined : checkClip.test(clip));
    setisUrl2(qi1 === '' ? undefined : checkUrl.test(qi1));
    setisUrl3(qa1 === '' ? undefined : checkUrl.test(qa1));
    setIsPass(
      password === ''
        ? undefined
        : upper.test(password) && lower.test(password) && num.test(password),
    );
    setIsMatch(confirmPass === '' ? undefined : confirmPass == password);
  }, [email, school, url, clip, password, call1, call2, qi1, confirmPass, qa1]);

  useEffect(() => {
    if (
      !isFilled ||
      !isCall1 ||
      !isCall2 ||
      !isEmail ||
      !isSchool ||
      !isPass ||
      !isClip ||
      !isUrl1 ||
      !isUrl2 ||
      !isUrl3 ||
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
    isCall1,
    isCall2,
    isEmail,
    isSchool,
    isPass,
    isClip,
    isUrl1,
    isUrl2,
    isUrl3,
    isMatch,
  ]);

  // useEffect(() => {
  //   if (session) {
  //     router.push('/');
  //   }
  // }, [session]);

  // useEffect(() => {
  //   router.push('/');
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-35">
      <h1 className="text-4xl font-bold text-white lg:text-5xl">
        สมัครเข้าร่วมค่าย
      </h1>
      <div className="mt-10 mr-15 mb-4 ml-15 w-[90%] rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-4 backdrop-blur-lg backdrop-filter sm:w-[80%] sm:p-6 md:w-[70%] md:p-8 lg:w-[40vw] lg:p-10">
        <form className="flex flex-col gap-5" onSubmit={confirmSend}>
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
          <p className="text-xl text-white">เบอร์ติดต่อ (หัวหน้าทีม)</p>
          <input
            type="text"
            className={`h-10 w-full rounded-md text-white ${
              isCall1 === undefined
                ? 'border-2 border-white'
                : isCall1
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('call1')}
          ></input>
          {isCall1 != undefined && !isCall1 && (
            <p className="text-red-500">ระบุเบอร์ให้ถูกต้อง</p>
          )}
          <p className="text-xl text-white">เบอร์ติดต่อฉุกเฉิน</p>
          <input
            type="text"
            className={`h-10 w-full rounded-md text-white ${
              isCall2 === undefined
                ? 'border-2 border-white'
                : isCall2
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('call2')}
          ></input>
          {isCall2 != undefined && !isCall2 && (
            <p className="text-red-500">ระบุเบอร์ให้ถูกต้อง</p>
          )}
          <p className="text-xl text-white">สถานะ</p>
          <select
            className="h-10 w-full rounded-md border-2 border-white bg-blue-950 text-xl text-white"
            onChange={inputValue('relation')}
          >
            <option value="">-- เลือกสถานะ --</option>
            <option value="บิดา">บิดา</option>
            <option value="มารดา">มารดา</option>
            <option value="คู่สมรส">คู่สมรส</option>
            <option value="บุตร">บุตร</option>
            <option value="พี่น้อง">พี่น้อง</option>
            <option value="ญาติ">ญาติ</option>
            <option value="เพื่อน">เพื่อน</option>
            <option value="เพื่อนร่วมงาน">เพื่อนร่วมงาน</option>
            <option value="อื่น ๆ">อื่น ๆ</option>
          </select>
          <p className="mt-5 text-3xl font-extrabold text-white">
            -รายละเอียดผู้สมัคร-
          </p>
          <div className="">
            <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 1</p>
            <p className="text-white">(ไม่ต้องใส่คำนำหน้า เช่น แม็ก รักสยาม)</p>
          </div>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('name1')}
          ></input>
          <div className="">
            <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 2</p>
            <p className="text-white">(ไม่ต้องใส่คำนำหน้า เช่น แม็ก รักสยาม)</p>
          </div>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('name2')}
          ></input>
          <div className="">
            <p className="text-xl text-white">ชื่อ นามสกุล ผู้สมัครคนที่ 3</p>
            <p className="text-white">(ไม่ต้องใส่คำนำหน้า เช่น แม็ก รักสยาม)</p>
          </div>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('name3')}
          ></input>
          <div className="">
            <p className="text-xl text-white">ชื่อ นามสกุล อาจารย์ที่ปรึกษา</p>
            <p className="text-white">(ไม่ต้องใส่คำนำหน้า เช่น แม็ก รักสยาม)</p>
          </div>
          <input
            type="text"
            className="h-10 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('name4')}
          ></input>
          <div className="">
            <p className="text-xl text-white">ลิงค์ Google Drive</p>
            <p className="text-white">
              (โฟลเดอร์ Google Drive ประกอบด้วย ไฟล์ ปพ.1 หรือ ปพ.7 หรือ
              บัตรนักเรียน ของสมาชิกทุกคน)
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
            <a href="clipdetail.pdf" target="blank">
              <div className="">
                <p className="text-md font-bold text-cyan-400">
                  👆 Click เพื่อดูรายละเอียดของคลิปวิดิโอ
                </p>
                <p className="text-white">
                  (ความยาวไม่เกิน 5 นาที เผยแพร่ผ่านช่องทาง Youtube โดยเปิดเป็น
                  Unlisted)
                </p>
              </div>
            </a>
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
            -คําถามประเมินนวัตกรรม ความรู้ และทัศนคติ-
          </p>
          <div className="">
            <p className="text-xl text-white">อธิบายรายละเอียดนวัตกรรม</p>
            <p className="text-white">
              (ให้น้องกรอกข้อมูลลงในไฟล์ Word ที่จัดเตรียมไว้ให้
              แล้วส่งเป็นลิงค์ Google Drive)
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="/qa.pdf" target="blank">
              <div className="">
                <p className="text-md font-bold text-cyan-400">
                  👆 Click เพื่อดาวน์โหลดไฟล์ Word
                </p>
              </div>
            </a>
            <a href="/qa.pdf" target="blank">
              <p className="text-md font-bold text-cyan-400">
                👆 Click เพื่อดูตัวอย่างไฟล์
              </p>
            </a>
          </div>
          <input
            type="text"
            className={`h-10 w-full rounded-md text-white ${
              isUrl2 === undefined
                ? 'border-2 border-white'
                : isUrl2
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('qi1')}
          ></input>
          {isUrl2 != undefined && !isUrl2 && (
            <p className="text-red-500">ระบุลิงค์ให้ถูกต้อง</p>
          )}
          <p className="text-xl text-white">
            หากนวัตกรรมของน้องสามารถทําให้เกิดขึ้นจริงได้
            น้องจะทําต่อให้เสร็จหรือเลิกทําแล้วทิ้งไอเดียตรงนั้นไปเลย
          </p>
          <textarea
            className="h-20 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('qm1')}
          ></textarea>
          <p className="text-xl text-white">
            สมมติว่ามีทีมคู่แข่งเข้ามาขอคำแนะนำในสื่งที่คุณถนัดคุณ
            คิดว่าคุณควรให้คำแนะนำเขาอย่างไร
          </p>
          <textarea
            className="h-20 w-full rounded-md border-2 border-white text-white"
            onInput={inputValue('qm2')}
          ></textarea>
          <p className="mt-5 text-3xl font-extrabold text-white">
            -คำถามวิชาการ-
          </p>
          <a href="/qa.pdf" target="blank">
            <div className="">
              <p className="text-md font-bold text-cyan-400">
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
              isUrl3 === undefined
                ? 'border-2 border-white'
                : isUrl3
                  ? 'border-2 border-white'
                  : 'border-2 border-red-600'
            }`}
            onInput={inputValue('qa1')}
          ></input>
          {isUrl3 != undefined && !isUrl3 && (
            <p className="text-red-500">ระบุลิงค์ให้ถูกต้อง</p>
          )}
          <p className="mt-5 text-3xl font-extrabold text-white">
            -คำถามวัดการวางแผน-
          </p>
          <a href="/q.pdf" target="blank">
            <p className="text-md font-bold text-cyan-400">
              👆 Click เพื่อดูโจทย์
            </p>
          </a>
          <textarea
            className="h-50 w-full rounded-md border-2 border-white text-white"
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
