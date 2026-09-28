import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import styles from './tentang.module.css'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Kenali dedikasi kami dalam merangkai bunga segar terbaik dengan perangkai profesional bersertifikat.',
}

export default function TentangPage() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.badge}>
          <span aria-hidden="true">🌱</span> Cerita &amp; Filosofi Kami
        </div>
        <h1 className={styles.title}>
          Menghadirkan Kebahagiaan Lewat{' '}
          <span className={styles.gradientText}>Setiap Kuntum Bunga</span>
        </h1>
        <p className={styles.lead}>
          Florist bermula dari kecintaan mendalam pada keindahan alami bunga dan keinginan membantu
          setiap orang menyampaikan perasaan terdalam mereka secara tulus dan berkesan.
        </p>
      </header>

      {/* Story Section */}
      <section className={styles.storySection} aria-labelledby="story-title">
        <div className={styles.storyContent}>
          <h2 id="story-title">Awal Perjalanan Florist</h2>
          <p>
            Didirikan dengan visi sederhana: menghubungkan kebun bunga lokal terbaik di Indonesia
            langsung ke ruang tamu dan momen spesial Anda. Kami percaya bunga bukan sekadar hadiah
            seremonial, melainkan bahasa cinta, apresiasi, dan penghiburan yang tak ternilai.
          </p>
          <p>
            Hingga kini, kami telah mengirimkan lebih dari 15.000 rangkaian bunga ke berbagai
            penjuru kota, dipercaya oleh keluarga, pasangan, hingga perusahaan terkemuka untuk
            perayaan penting mereka.
          </p>
        </div>
        <div className={styles.storyImageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1558350315-8aa00e8e4550?auto=format&fit=crop&w=800&q=80"
            alt="Perangkai bunga Florist merangkai buket segar di workshop"
            className={styles.storyImage}
            loading="lazy"
          />
        </div>
      </section>

      {/* 3 Pillars */}
      <section className={styles.pillarsSection} aria-labelledby="pillars-title">
        <div className={styles.sectionHeader}>
          <h2 id="pillars-title" className={styles.sectionTitle}>
            Tiga Nilai Utama Kami
          </h2>
          <p className={styles.sectionDesc}>
            Prinsip yang kami pegang teguh di setiap tangkai yang dirangkai
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          <article className={styles.pillarCard}>
            <div className={styles.pillarIcon} aria-hidden="true">
              🌹
            </div>
            <h3 className={styles.pillarTitle}>Kesegaran Tanpa Kompromi</h3>
            <p className={styles.pillarDesc}>
              Bunga dipanen tiap pagi hari dan disimpan dalam ruang pendingin suhu terkontrol agar
              tiba dalam kondisi paling prima dan tahan lama.
            </p>
          </article>

          <article className={styles.pillarCard}>
            <div className={styles.pillarIcon} aria-hidden="true">
              ✨
            </div>
            <h3 className={styles.pillarTitle}>Keahlian Tangan Berseni</h3>
            <p className={styles.pillarDesc}>
              Setiap buket dirangkai secara manual oleh Master Florist kami dengan komposisi warna,
              proporsi bentuk, dan harmonisasi bunga yang matang.
            </p>
          </article>

          <article className={styles.pillarCard}>
            <div className={styles.pillarIcon} aria-hidden="true">
              🚚
            </div>
            <h3 className={styles.pillarTitle}>Ketepatan Pengiriman</h3>
            <p className={styles.pillarDesc}>
              Kami memahami momen kejutan tak boleh terlambat semenit pun. Sistem logistik kami
              dirancang untuk pengiriman same-day tepat waktu.
            </p>
          </article>
        </div>
      </section>

      {/* CTA Box */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ingin Rangkaian Bunga Khusus?</h2>
        <p className={styles.ctaText}>
          Konsultasikan ide buket impian Anda bersama tim florist kami hari ini.
        </p>
        <Link href="/koleksi" className={styles.ctaButton}>
          <span>Lihat Katalog Bunga →</span>
        </Link>
      </section>
    </div>
  )
}
