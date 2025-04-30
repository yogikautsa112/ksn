import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Image
          src="/logo.png"
          alt="Parking Lot"
          width={384}
          height={192}
          className="mb-8"
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to the Parking Lot!
          </h1>
          <p className="text-lg mb-8">
            Please scan your parking ticket to enter.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Scan Ticket
          </button>
        </div>
      </div>
    </>
  );
}
