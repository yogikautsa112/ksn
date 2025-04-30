import React from "react";

export default function Admin() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <p className="text-gray-600">Selamat datang di panel admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Total Pengguna</h2>
          <p className="text-3xl font-bold">250</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Total Transaksi</h2>
          <p className="text-3xl font-bold">1,234</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pendapatan</h2>
          <p className="text-3xl font-bold">Rp 45.6M</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-b pb-4">
              <p className="font-medium">Transaksi #00{item}</p>
              <p className="text-sm text-gray-600">2 jam yang lalu</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
