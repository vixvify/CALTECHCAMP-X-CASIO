import Home from './components/home';
import Qualifications from './components/qualificatioins';
import Timeline from './components/timeline';

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-[#101557] pt-15">
      <Home />
      <Qualifications />
      <Timeline />
    </div>
  );
}
