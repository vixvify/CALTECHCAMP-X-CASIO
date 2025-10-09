import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center border-t border-gray-200 bg-white py-6 text-center">
      <p>ผู้สนับสนุนหลักอย่างเป็นทางการ</p>
      <Image src={'/sponsor.png'} width={300} height={50} alt="logo"></Image>
      <p className="text-sm text-gray-600">© 2025 Calctech Camp X Casio</p>
      <p className="text-sm text-gray-600">
        ติดต่อ:{' '}
        <a href="tel:0948188465" className="text-blue-600 hover:underline">
          094-818-8465
        </a>
      </p>
      <p className="text-sm text-gray-600">
        Facebook:{' '}
        <a
          href="https://web.facebook.com/profile.php?id=61580272472759"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Calctech Camp x CASIO
        </a>
      </p>
      <p className="text-sm text-gray-600">
        Instagram:{' '}
        <a
          href="https://instagram.com/calctechcamp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          @calctechcamp
        </a>
      </p>
    </footer>
  );
}
