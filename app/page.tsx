import Image from "next/image";
import Login from "./(public)/login/page";
import HomePage from "./(public)/home/page";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[2rem] text-black flex justify-center items-center">
      <HomePage/>
      {/* <Login/> */}
     </main>
  );
}
