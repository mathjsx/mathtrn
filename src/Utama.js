import React, { useState } from 'react';
import Soal1 from './soal1'; // Pastikan Anda memiliki komponen soal1.js di direktori yang sama
import Soal2 from './soal2'; // Pastikan Anda memiliki komponen soal2.js di direktori yang sama
import Soal3 from './soal3'; // Tambahkan komponen soal sesuai kebutuhan
import './Utama.css';
import Soal4 from './soal4'; // Pastikan Anda m>
import Soal5 from './soal5'; // Pastikan Anda m>
import Soal6 from './soal6'; // Tambahkan kompo>
import Soal7 from './soal7'; // Pastikan Anda m>
import Soal8 from './soal8'; // Pastikan Anda m>
import Soal9 from './soal9'; // Tambahkan kompo>
import Soal10 from './soal10'; // Pastikan Anda m>

const narasi = [
  "Ini adalah narasi artikel pertama dengan jumlah kata mencapai lima puluh untuk memenuhi syarat dari artikel.",
  "Ini adalah narasi artikel kedua dengan jumlah kata mencapai lima puluh untuk memenuhi syarat dari artikel.",
  "Ini adalah narasi artikel ketiga dengan jumlah kata mencapai lima puluh untuk memenuhi syarat dari artikel.",
  "Ini adalah narasi artikel keempat dengan jumlah kata mencapai lima puluh untuk memenuhi syarat dari artikel.",
  "Ini adalah narasi artikel kelima dengan jumlah kata mencapai lima puluh untuk memenuhi syarat dari artikel.",
  "Ini adalah narasi artikel keenam dengan jumlah kata mencapai lima puluh untuk memenuhi syarat dari artikel.",
  "Ini adalah narasi artikel ketujuh dengan jumlah kata mencapai lima puluh untuk memenuhi syarat dari artikel.",
  "Ini adalah narasi artikel kedelapan dengan jumlah kata mencapai lima puluh untuk memenuhi syarat dari artikel.",
  "Ini adalah narasi artikel kesembilan dengan jumlah kata mencapai lima puluh untuk memenuhi syarat dari artikel.",
  "Ini adalah narasi artikel kesepuluh dengan jumlah kata mencapai lima puluh untuk memenuhi syarat dari artikel."
];

const judulan = [
  "Judul Artikel 1",
  "Judul Artikel 2",
  "Judul Artikel 3",
  "Akr",
  "Judul Artikel 5",
  "Judul Artikel 6",
  "Judul Artikel 7",
  "Judul Artikel 8",
  "Judul Artikel 9",
  "Judul Artikel 10"
];

const score = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100
];

const Utama = () => {
  const [activeSoal, setActiveSoal] = useState(null);

  const handleShowSoal = (soalNumber) => {
    setActiveSoal(soalNumber);
  };

  const renderSoal = (soalNumber) => {
    switch (soalNumber) {
      case 1:
        return <Soal1 />;
      case 2:
        return <Soal2 />;
      case 3:
        return <Soal3 />;
case 4:
        return <Soal4 />;
      case 5:
        return <Soal5 />;
      case 6:
        return <Soal6 />;
case 7:
        return <Soal7 />;
      case 8:
        return <Soal8 />;
      case 9:
        return <Soal9 />;
case 10:
        return <Soal10 />;
      default:
return null;
    }
  };

  return (
    <div className="utama-container">
      {narasi.map((text, index) => (
        <div key={index} className="card">
          <h3>{judulan[index]}</h3>
          <p>{text}</p>
          <svg width="50" height="50" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="5" fill="none" />
            <circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="5" fill="none" strokeDasharray="282.743" strokeDashoffset={282.743 - (282.743 * score[index] / 100)} />
          </svg>
          <button onClick={() => handleShowSoal(index + 1)}>Soal Baru</button>
          <button onClick={() => alert('Score')}>Score</button>
          {activeSoal === index + 1 && renderSoal(index + 1)}
        </div>
      ))}
    </div>
  );
};

export default Utama;
