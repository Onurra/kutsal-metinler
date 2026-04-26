# Kutsal Metinler Arşivi

Kuran-ı Kerim, İncil ve Tevrat'ı çok dilli mealler ve çevirilerle bir arada sunan açık erişimli web arşivi.

## Özellikler

- **3 sekme**: Kuran-ı Kerim · İncil · Tevrat
- **4 dilli arayüz**: Türkçe, English, العربية (RTL), Русский
- **66 kitap** (39 OT + 27 NT) Türkçe YTC çevirisi (offline)
- **20+ public domain çeviri**: KJV, WEB, Vulgata, Septuagint, WLC İbranice, Luther 1912, Sinodik, Smith-Van Dyke, daha fazlası
- **3 Kuran meali**: Elmalılı 1935 (TR), Pickthall 1930 (EN), Yusuf Ali 1934 (EN)
- **Bağımsız çalışır**: Tüm İncil/Tevrat verisi yerel JSON, hiçbir 3rd party CORS proxy yok
- **Hassas içerik yok**: Telifli mealler/çeviriler kullanılmaz

## Proje yapısı

```
proje/
├── index.html              # HTML iskelet
├── styles.css              # Tüm stiller
├── app.js                  # Uygulama mantığı (i18n dahil)
├── download-translations.py # bolls.life'tan PD çevirileri indirir
├── data/
│   ├── tevrat-tr-ytc.js   # Türkçe Tevrat YTC (gömülü, ~2.5 MB)
│   ├── incil-tr-ytc.js    # Türkçe İncil YTC (gömülü, ~1 MB)
│   └── bible/             # download-translations.py ile dolar
│       ├── KJV.json
│       ├── WLC.json
│       ├── ... (29 dosya)
└── README-yayinlama.md    # Yayına çıkış adımları
```

## Çalıştırma

```bash
# 1. Çevirileri indir (tek seferlik, ~10-20 dakika)
python3 download-translations.py

# 2. Yerel sunucu
python3 -m http.server 8000

# 3. Tarayıcıda aç
# http://localhost:8000
```

## Kaynaklar ve Lisanslar

- **Türkçe Tevrat & İncil (YTC)**: © 2023-2025 İsmail Serinken / [eBible.org](https://ebible.org/turytc/) — CC-BY-ND 4.0
- **Bolls.life PD çevirileri**: KJV (1611), WEB, Vulgate, Septuagint, WLC, Luther 1912, vd.
- **Kuran**: alquran.cloud API üzerinden Elmalılı 1935, Pickthall 1930, Yusuf Ali 1934

## Geliştirici

**Onur İlgın** — Bilgisayar Mühendisliği öğrencisi
- GitHub: [github.com/Onurra](https://github.com/Onurra)
- E-posta: onur.ilgin.mail@gmail.com
