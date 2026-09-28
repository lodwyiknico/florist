'use client'

import React, { useState } from 'react'
import { phoneSchema, stripHTML } from '@security/validators'
import styles from './kontak.module.css'

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occasion: 'Ulang Tahun / Anniversary',
    budget: 'Rp 350.000 - Rp 500.000',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    const cleanName = stripHTML(formData.name).trim()
    if (!cleanName) {
      newErrors.name = 'Nama pemesan wajib diisi'
    }

    const phoneValidation = phoneSchema.safeParse(formData.phone)
    if (!phoneValidation.success) {
      newErrors.phone = 'Nomor WhatsApp tidak valid (contoh: 081234567890)'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSuccess(false)
      return
    }

    setErrors({})
    setIsSuccess(true)

    const cleanNotes = stripHTML(formData.notes).trim()
    const cleanPhone = phoneValidation.data

    const text = `Halo Florist, saya ingin konsultasi pesanan rangkaian bunga:%0A%0A• Nama: ${encodeURIComponent(cleanName)}%0A• No. WA: ${cleanPhone}%0A• Keperluan Acara: ${encodeURIComponent(formData.occasion)}%0A• Estimasi Budget: ${encodeURIComponent(formData.budget)}%0A• Catatan Rangkaian: ${encodeURIComponent(cleanNotes || '-')}%0A%0AMohon bantuan rekomendasinya ya!`

    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>
          <span aria-hidden="true">💌</span> Layanan Konsultasi &amp; Pemesanan
        </div>
        <h1 className={styles.title}>Hubungi Florist</h1>
        <p className={styles.subtitle}>
          Ada kebutuhan rangkaian khusus untuk pernikahan, wisuda, atau hari istimewa? Tim perangkai
          kami siap mewujudkan karangan bunga impian Anda.
        </p>
      </header>

      <div className={styles.mainGrid}>
        {/* Form */}
        <section className={styles.formCard} aria-labelledby="form-heading">
          <h2 id="form-heading" className={styles.formTitle}>
            Formulir Pesanan Kustom
          </h2>
          <p className={styles.formDesc}>
            Isi detail rangkaian yang Anda butuhkan, kami akan terhubung via WhatsApp dalam hitungan
            menit.
          </p>

          {isSuccess && (
            <div className={styles.successBanner} role="alert">
              ✅ Pesanan berhasil disiapkan! Jendela WhatsApp telah terbuka untuk melanjutkan
              konsultasi bersama Florist.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="input-name" className={styles.label}>
                Nama Lengkap *
              </label>
              <input
                id="input-name"
                type="text"
                className={styles.input}
                placeholder="Contoh: Jessica Raharja"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="input-phone" className={styles.label}>
                Nomor WhatsApp Aktif *
              </label>
              <input
                id="input-phone"
                type="tel"
                className={styles.input}
                placeholder="Contoh: 081234567890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="select-occasion" className={styles.label}>
                Jenis Acara / Keperluan
              </label>
              <select
                id="select-occasion"
                className={styles.select}
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              >
                <option value="Ulang Tahun / Anniversary">Ulang Tahun / Anniversary</option>
                <option value="Wisuda / Kelulusan">Wisuda / Kelulusan</option>
                <option value="Pernikahan / Wedding">Pernikahan / Wedding</option>
                <option value="Grand Opening Toko / Bisnis">Grand Opening Toko / Bisnis</option>
                <option value="Bunga Meja & Dekorasi Ruang">Bunga Meja &amp; Dekorasi Ruang</option>
                <option value="Dukacita / Condolences">Dukacita / Condolences</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="select-budget" className={styles.label}>
                Rentang Budget
              </label>
              <select
                id="select-budget"
                className={styles.select}
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="Di bawah Rp 300.000">Di bawah Rp 300.000</option>
                <option value="Rp 350.000 - Rp 500.000">Rp 350.000 - Rp 500.000</option>
                <option value="Rp 500.000 - Rp 1.000.000">Rp 500.000 - Rp 1.000.000</option>
                <option value="Di atas Rp 1.000.000">Di atas Rp 1.000.000</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="textarea-notes" className={styles.label}>
                Catatan Rangkaian &amp; Preferensi Bunga
              </label>
              <textarea
                id="textarea-notes"
                className={styles.textarea}
                placeholder="Misal: Suka warna pastel peach, minta tambahan kartu ucapan: 'Happy Birthday Sayang', mohon tiba jam 14:00."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button id="submit-inquiry-button" type="submit" className={styles.submitBtn}>
              <span>💬 Kirim Konsultasi via WhatsApp</span>
            </button>
          </form>
        </section>

        {/* Sidebar Info */}
        <aside className={styles.infoSidebar} aria-label="Informasi Toko">
          <div className={styles.waQuickCard}>
            <h3>Butuh Respon Cepat?</h3>
            <p>
              CS Florist standby setiap hari untuk konsultasi langsung dan pengiriman kilat 2 jam
              tiba.
            </p>
            <a
              id="wa-direct-link"
              href="https://wa.me/6281234567890?text=Halo%20Florist,%20saya%20mau%20order%20bunga%20sekarang"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waDirectBtn}
            >
              Chat WhatsApp Langsung →
            </a>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon} aria-hidden="true">
              📍
            </div>
            <h3>Lokasi Workshop</h3>
            <p>Jl. Bunga Melati No. 88, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12150</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon} aria-hidden="true">
              ⏰
            </div>
            <h3>Jam Operasional</h3>
            <p>Senin &ndash; Minggu: 08:00 &ndash; 21:00 WIB (Buka Setiap Hari)</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon} aria-hidden="true">
              🚚
            </div>
            <h3>Area Pengiriman</h3>
            <p>
              Melayani pengiriman seluruh wilayah Jabodetabek dengan armada khusus berpendingin.
            </p>
          </div>
        </aside>
      </div>

      {/* FAQ */}
      <section className={styles.faqSection} aria-labelledby="faq-heading">
        <h2 id="faq-heading">Pertanyaan Umum (FAQ)</h2>
        <div className={styles.faqList}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Berapa lama estimasi pengiriman bunga?</h3>
            <p className={styles.faqAnswer}>
              Untuk area Jakarta, pesanan same-day dapat tiba dalam 2&ndash;4 jam setelah konfirmasi
              pembayaran. Untuk luar Jakarta, pengiriman menyesuaikan jarak dan waktu pemesanan.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Apakah sudah termasuk kartu ucapan dan pita?</h3>
            <p className={styles.faqAnswer}>
              Ya, seluruh rangkaian bunga di Florist sudah termasuk kartu ucapan kustom dengan pesan
              pribadi Anda serta pita satin premium gratis.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Bagaimana jika bunga layu saat diterima?</h3>
            <p className={styles.faqAnswer}>
              Kami memberikan Garansi 100% Bunga Segar. Cukup kirimkan foto buket saat tiba melalui
              WhatsApp, dan kami akan mengirimkan rangkaian baru tanpa biaya tambahan.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
