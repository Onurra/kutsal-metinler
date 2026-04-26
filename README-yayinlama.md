# Yayına Çıkma Talimatları

## 1. Çevirileri indir (TEK SEFERE MAHSUS)

Terminal aç, proje klasöründe şu komutu çalıştır:

```bash
python3 download-translations.py
```

Bu komut:
- bolls.life'tan ~29 public domain çeviriyi indirir
- `data/bible/` klasörüne kaydeder
- 2-5 dakika sürer (internet hızına bağlı)
- Toplam ~50-80 MB yer kaplar

İndirme sonunda `data/bible/` klasörü şöyle görünmeli:
```
data/bible/
├── KJV.json
├── WEB.json
├── ASV.json
├── YLT.json
├── ... (29 dosya toplam)
```

## 2. Yerel olarak test et

```bash
# Python ile basit sunucu
python3 -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000` aç. Çeviriler artık **dış proxy olmadan** çalışmalı — F12 Network sekmesinde `data/bible/*.json` görüyorsan başarılı.

## 3. Yayına çıkış (deploy)

Önerilen: **Cloudflare Pages** (ücretsiz, hızlı, kolay)

### Cloudflare Pages adımları:
1. https://dash.cloudflare.com hesabı aç
2. Pages → Create a project → Direct upload
3. Tüm `proje/` klasörünü ZIP olarak yükle
4. Deploy butonuna bas — 1 dakikada online

Alternatif:
- **Netlify**: drag-drop, https://app.netlify.com/drop
- **GitHub Pages**: repo'ya push et, Settings'ten Pages aç
- **Vercel**: https://vercel.com (GitHub repo ile)

## 4. Domain bağla (opsiyonel)

`kutsalmetinler.com` gibi bir alan adı al (~$10/yıl):
- **Namecheap, Cloudflare Registrar** önerilir

Cloudflare Pages'in "Custom domains" sekmesinden domain'i ekle, DNS'i otomatik yapılandırır.

## Lisans bilgileri

Bu site şu açık lisanslı/public domain kaynakları kullanır:

- **Türkçe (YTC)**: © 2023-2025 İsmail Serinken / eBible.org — CC-BY-ND 4.0
- **Diğer çeviriler**: bolls.life üzerinden indirilmiş PD metinleri (KJV 1611, Vulgate, LXX, Westminster Leningrad Codex, vs.)
- **Kuran çevirileri**: alquran.cloud API üzerinden Elmalılı 1935, Pickthall 1930, Yusuf Ali 1934 (hepsi PD)

Yayına çıkarken site footer'ında bu kaynaklara atıf vermen gerekir (YTC için CC-BY-ND zorunlu, diğerleri için iyi pratiği gerektirir).

## Sorun giderme

**`data/bible/X.json` 404 hatası** — `download-translations.py` scriptini çalıştırmayı unutmuşsundur, çalıştır.

**İndirme hatası** — bolls.life geçici çevrimdışı olabilir, birkaç dakika bekle tekrar dene. Script zaten indirilenleri atlar.

**Kuran çalışmıyor** — api.alquran.cloud çevrimdışıysa, Türkçe Elmalılı için ayrı bir lokal data hazırlamak gerekebilir; gelecek iyileştirme.
