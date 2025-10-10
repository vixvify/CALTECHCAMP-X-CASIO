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
    call1: string;
    call2: string;
    relation: string;
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    name5: string;
    url: string;
    clip: string;
    qi1: string;
    qm1: string;
    qm2: string;
    qa1: string;
    qp1: string;
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
    name5: '',
    url: '',
    clip: '',
    qi1: '',
    qm1: '',
    qm2: '',
    qa1: '',
    qp1: '',
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
    name5,
    url,
    clip,
    qi1,
    qm1,
    qm2,
    qa1,
    qp1,
  } = user;

  const [canSend, setCanSend] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [isFilled, setIsFilled] = useState(false);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const checkFolder =
    /https:\/\/drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/;
  const checkUrl =
    /^(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]{10,})/;
  const checkClip =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const num = /[0-9]/;
  const [isSchool, setIsSchool] = useState(undefined as any);
  const [isEmail, setIsEmail] = useState(undefined as any);
  const [isCall1, setisCall1] = useState(undefined as any);
  const [isCall2, setisCall2] = useState(undefined as any);
  const [isUrl1, setisUrl1] = useState(undefined as any);
  const [isClip, setisClip] = useState(undefined as any);
  const [isUrl2, setisUrl2] = useState(undefined as any);
  const [isUrl3, setisUrl3] = useState(undefined as any);

  const inputValue = (topic: string) => {
    return (e: any) => setUser({ ...user, [topic]: e.target.value.trim() });
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

  const confirmSend = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: 'กรุณายืนยันความถูกต้องของข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'อัพเดตข้อมูล',
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
      await axios.put(`/api/data/editData/${id}`, user);
      Swal.fire({
        title: 'แก้ไขข้อมูลสำเร็จ',
        icon: 'success',
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
        name5: '',
        url: '',
        clip: '',
        qi1: '',
        qm1: '',
        qm2: '',
        qa1: '',
        qp1: '',
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
      school &&
      email &&
      call1 &&
      call2 &&
      relation &&
      name1 &&
      name2 &&
      name3 &&
      name4 &&
      name5 &&
      url &&
      clip &&
      qi1 &&
      qm1 &&
      qm2 &&
      qa1 &&
      qp1
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
    name5,
    url,
    clip,
    qi1,
    qm1,
    qm2,
    qa1,
    qp1,
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
  }, [email, school, url, clip, , call1, call2, qi1, qa1]);

  useEffect(() => {
    if (
      !isFilled ||
      !isCall1 ||
      !isCall2 ||
      !isEmail ||
      !isSchool ||
      !isClip ||
      !isUrl1 ||
      !isUrl2 ||
      !isUrl3
    ) {
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
    isClip,
    isUrl1,
    isUrl2,
    isUrl3,
  ]);

  useEffect(() => {
    if (!(session as any)?.user?.admin) {
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
        <h1 className="text-4xl font-bold text-white lg:text-5xl">
          แก้ไขข้อมูล
        </h1>
        <div className="mt-10 mr-15 mb-4 ml-15 w-[90%] rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-4 backdrop-blur-lg backdrop-filter sm:w-[80%] sm:p-6 md:w-[70%] md:p-8 lg:w-[40vw] lg:p-10">
          <form className="flex flex-col gap-5" onSubmit={confirmSend}>
            <p className="text-3xl font-extrabold text-white">
              -รายละเอียดทีม-
            </p>
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
              className={`h-10 w-full rounded-md text-white ${
                isSchool === undefined
                  ? 'border-2 border-white'
                  : isSchool
                    ? 'border-2 border-white'
                    : 'border-2 border-red-600'
              }`}
              onInput={inputValue('school')}
              value={school}
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
              value={email}
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
              value={call1}
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
              value={call2}
            ></input>
            {isCall2 != undefined && !isCall2 && (
              <p className="text-red-500">ระบุเบอร์ให้ถูกต้อง</p>
            )}
            <p className="text-xl text-white">สถานะ</p>
            <select
              className="h-10 w-full rounded-md border-2 border-white bg-blue-950 text-xl text-white"
              onChange={inputValue('relation')}
              value={relation}
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
              <p className="text-white">
                (ไม่ต้องใส่คำนำหน้า เช่น แม็ก รักสยาม)
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
                (ไม่ต้องใส่คำนำหน้า เช่น แม็ก รักสยาม)
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
                (ไม่ต้องใส่คำนำหน้า เช่น แม็ก รักสยาม)
              </p>
            </div>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('name3')}
              value={name3}
            ></input>
            <div className="">
              <p className="text-xl text-white">
                ชื่อ นามสกุล อาจารย์ที่ปรึกษาท่านที่ 1
              </p>
              <p className="text-white">
                (ไม่ต้องใส่คำนำหน้า เช่น แม็ก รักสยาม)
              </p>
            </div>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('name4')}
              value={name4}
            ></input>
            <div className="">
              <p className="text-xl text-white">
                ชื่อ นามสกุล อาจารย์ที่ปรึกษาท่านที่ 2
              </p>
              <p className="text-white">
                (ไม่ต้องใส่คำนำหน้า เช่น แม็ก รักสยาม)
              </p>
            </div>
            <input
              type="text"
              className="h-10 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('name5')}
              value={name4}
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
              value={url}
            ></input>
            {isUrl1 != undefined && !isUrl1 && (
              <p className="text-red-500">ระบุลิงค์ให้ถูกต้อง</p>
            )}
            <p className="text-xl text-white">ลิงค์คลิปแนะนำนวัตกรรม</p>
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
              value={clip}
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
              value={qi1}
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
              value={qm1}
            ></textarea>
            <p className="text-xl text-white">
              สมมติว่ามีทีมคู่แข่งเข้ามาขอคำแนะนำในสื่งที่คุณถนัดคุณ
              คิดว่าคุณควรให้คำแนะนำเขาอย่างไร
            </p>
            <textarea
              className="h-20 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('qm2')}
              value={qm2}
            ></textarea>
            <p className="mt-5 text-3xl font-extrabold text-white">
              -คำถามวิชาการ-
            </p>
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
              value={qa1}
            ></input>
            {isUrl3 != undefined && !isUrl3 && (
              <p className="text-red-500">ระบุลิงค์ให้ถูกต้อง</p>
            )}
            <p className="mt-5 text-3xl font-extrabold text-white">
              -คำถามวัดการวางแผน-
            </p>
            <textarea
              className="h-50 w-full rounded-md border-2 border-white text-white"
              onInput={inputValue('qp1')}
              value={qp1}
            ></textarea>
            <button
              type="submit"
              className="mt-5 h-15 cursor-pointer rounded-xl border-2 border-white bg-white text-2xl text-black disabled:opacity-50"
              disabled={!canSend}
            >
              อัพเดตข้อมูล
            </button>
          </form>
        </div>
      </div>
    );
  }
}
