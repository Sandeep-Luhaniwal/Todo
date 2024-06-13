import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex gap-6 justify-center items-center">
      <Link href={"/to-do"} className="py-3 px-10 bg-blue-800 rounded-md text-white font-bold text-[22px] border border-blue-800 hover:bg-white duration-300 hover:text-blue-800">TO DO</Link>
      <Link href={"/filter"} className="py-3 px-10 bg-blue-800 rounded-md text-white font-bold text-[22px] border border-blue-800 hover:bg-white duration-300 hover:text-blue-800">FILTER</Link>
   </main>
  );
}
