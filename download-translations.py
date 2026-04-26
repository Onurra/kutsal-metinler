#!/usr/bin/env python3
"""
bolls.life'tan public domain çevirileri BÖLÜM BÖLÜM indirir.

Tek seferde indirme bolls.life sunucusunda IncompleteRead hatasi
veriyordu. Bu sürüm her bölüm için ayri istek atar (~1189 istek
toplamda) ama her biri kücük oldugu için kopmaz.

Süre: ~10-20 dakika tahmini, ama güvenilir.
"""

import json
import os
import time
import urllib.request
import urllib.error
from pathlib import Path

CODES = [
    "WLC", "WLCa", "WLCC",
    "LXX", "LXXE",
    "VULG",
    "TR", "TISCH", "NTGT", "DHNT",
    "KJV", "WEB", "ASV", "YLT", "DRB", "GNV", "BSB",
    "LUT", "ELB", "MB",
    "FRDBY",
    "SYNOD",
    "SVD",
    "DSV",
    "BG",
    "KB",
    "PCB", "PCBS",
    "DNB",
]

# Standart kitap numaralari (Genesis=1, Vahiy=66) ve bolüm sayilari
BOOK_CHAPTERS = {
    1:50, 2:40, 3:27, 4:36, 5:34,        # Tevrat (5 kitap)
    6:24, 7:21, 8:4, 9:31, 10:24,
    11:22, 12:25, 13:29, 14:36, 15:10,
    16:13, 17:10, 18:42, 19:150, 20:31,
    21:12, 22:8, 23:66, 24:52, 25:5,
    26:48, 27:12, 28:14, 29:3, 30:9,
    31:1, 32:4, 33:7, 34:3, 35:3,
    36:3, 37:2, 38:14, 39:4,             # ...Malaki = 39
    40:28, 41:16, 42:24, 43:21,          # Matta-Yuhanna
    44:28, 45:16, 46:16, 47:13, 48:6, 49:6,
    50:4, 51:4, 52:5, 53:3, 54:6, 55:4,
    56:3, 57:1, 58:13, 59:5, 60:5, 61:3,
    62:5, 63:1, 64:1, 65:1, 66:22,
}

# OT-only çeviriler (NT yok bunlarda)
OT_ONLY = {"WLC", "WLCa", "WLCC", "LXX", "LXXE"}
# NT-only çeviriler
NT_ONLY = {"TR", "TISCH", "NTGT", "DHNT"}

URL_TEMPLATE = "https://bolls.life/get-chapter/{code}/{book}/{chapter}/"

def fetch_chapter(code, book, chapter, retries=3):
    url = URL_TEMPLATE.format(code=code, book=book, chapter=chapter)
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
    })
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode('utf-8'))
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None  # bölüm yok
            time.sleep(1)
        except Exception:
            time.sleep(1)
    return None  # 3 deneme de başarısız

def download_translation(code):
    """Bir çeviriyi tüm kitap+bölümleriyle indir."""
    out_file = Path(f"data/bible/{code}.json")
    
    if out_file.exists() and out_file.stat().st_size > 1000:
        print(f"{code}: zaten var, atlandi")
        return True
    
    # Hangi kitaplar bu çeviride var
    if code in OT_ONLY:
        books = range(1, 40)
    elif code in NT_ONLY:
        books = range(40, 67)
    else:
        books = range(1, 67)
    
    result = {}
    total_chapters = sum(BOOK_CHAPTERS[b] for b in books)
    done = 0
    failed_chapters = 0
    
    print(f"{code}: {total_chapters} bolum...", end=" ", flush=True)
    
    for book in books:
        result[str(book)] = {}
        for ch in range(1, BOOK_CHAPTERS[book] + 1):
            verses = fetch_chapter(code, book, ch)
            done += 1
            
            # Her 50 bölümde progress göster
            if done % 50 == 0:
                pct = (done * 100) // total_chapters
                print(f"{pct}%", end=" ", flush=True)
            
            if verses is None:
                failed_chapters += 1
                continue
            
            ch_data = {}
            for v in verses:
                vn = str(v.get("verse", 0))
                text = (v.get("text") or "").replace("<br/>", " ").replace("<br>", " ")
                if vn and text:
                    ch_data[vn] = text
            
            if ch_data:
                result[str(book)][str(ch)] = ch_data
    
    # Bos kitaplari kaldir
    result = {b: ch for b, ch in result.items() if ch}
    
    if not result:
        print("BOS - bolls.life'ta yok")
        return False
    
    out_file.parent.mkdir(parents=True, exist_ok=True)
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, separators=(",", ":"))
    
    size = out_file.stat().st_size
    if failed_chapters:
        print(f"OK ({size//1024} KB, {failed_chapters} bolum atlandi)")
    else:
        print(f"OK ({size//1024} KB)")
    return True

def main():
    out_dir = Path("data/bible")
    out_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"bolls.life'tan {len(CODES)} ceviri indiriliyor (bolum bolum)...")
    print(f"Hedef: {out_dir.absolute()}")
    print(f"Tahmini sure: 10-20 dakika\n")
    
    success = 0
    failed = []
    
    for code in CODES:
        try:
            if download_translation(code):
                success += 1
            else:
                failed.append(code)
        except KeyboardInterrupt:
            print(f"\n\nDURDURULDU. Tekrar calistirinca kalan yerden devam eder.")
            return
        except Exception as e:
            print(f"HATA: {e}")
            failed.append(code)
    
    print()
    print("=" * 50)
    print(f"Basarili: {success}/{len(CODES)} ceviri")
    
    total = sum(f.stat().st_size for f in out_dir.glob("*.json"))
    print(f"Toplam boyut: {total/1024/1024:.1f} MB")
    if failed:
        print(f"\nBasarisiz: {', '.join(failed)}")
    print("=" * 50)

if __name__ == "__main__":
    main()
