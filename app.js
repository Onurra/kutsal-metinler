/* ========== ÇOK DİLLİ ARAYÜZ (i18n) ========== */
const LANGS = [
  {code:"tr",name:"Türkçe",dir:"ltr",flag:"🇹🇷"},
  {code:"en",name:"English",dir:"ltr",flag:"🇬🇧"},
  {code:"ar",name:"العربية",dir:"rtl",flag:"🇸🇦"},
  {code:"ru",name:"Русский",dir:"ltr",flag:"🇷🇺"},
];

const I18N = {
  tr: {
    title:"Kutsal Metinler Arşivi",
    subtitle:"Kuran · İncil · Tevrat — çok dilli mealler ve çeviriler",
    tab_kuran:"Kuran-ı Kerim", tab_incil:"İncil", tab_tevrat:"Tevrat",
    search:"Ara…", loading:"Yükleniyor…",
    show_arabic:"Arapça göster",
    prev_chapter:"← Önceki bölüm", next_chapter:"Sonraki bölüm →",
    prev_surah:"← Önceki sure", next_surah:"Sonraki sure →",
    select_book:"Aşağıdan bir kitap seçin",
    error_load:"Yüklenemedi",
    surah:"Sure", chapter:"Bölüm", verse:"Ayet",
    chapter_count:"bölüm",
    hide:"Gizle", show_list:"Liste",
    bismillah:"Bismillah",
    about:"Hakkında", language:"Dil",
    revealed_in:"İndirildiği yer", verses:"Ayet",
    mecca:"Mekke", medina:"Medine",
    ot_label:"Eski Ahit — Tevrat",
    nt_label:"Yeni Ahit — İncil",
    books:"Kitaplar",
    error_book_not_found:"Bu kitap gömülü veride yok",
    error_chapter_not_found:"Bu bölüm bulunamadı",
    error_translation_not_found:"Bu çeviride bu bölüm bulunamadı.",
  },
  en: {
    title:"Sacred Texts Archive",
    subtitle:"Quran · New Testament · Old Testament — multilingual translations",
    tab_kuran:"The Holy Quran", tab_incil:"New Testament", tab_tevrat:"Old Testament",
    search:"Search…", loading:"Loading…",
    show_arabic:"Show Arabic",
    prev_chapter:"← Previous chapter", next_chapter:"Next chapter →",
    prev_surah:"← Previous surah", next_surah:"Next surah →",
    select_book:"Select a book below",
    error_load:"Failed to load",
    surah:"Surah", chapter:"Chapter", verse:"Verse",
    chapter_count:"chapters",
    hide:"Hide", show_list:"List",
    bismillah:"Bismillah",
    about:"About", language:"Language",
    revealed_in:"Revealed in", verses:"Verses",
    mecca:"Mecca", medina:"Medina",
    ot_label:"Old Testament",
    nt_label:"New Testament",
    books:"Books",
    error_book_not_found:"This book is not in embedded data",
    error_chapter_not_found:"Chapter not found",
    error_translation_not_found:"This chapter is not available in this translation.",
  },
  ar: {
    title:"أرشيف النصوص المقدسة",
    subtitle:"القرآن · العهد الجديد · العهد القديم — ترجمات متعددة اللغات",
    tab_kuran:"القرآن الكريم", tab_incil:"العهد الجديد", tab_tevrat:"العهد القديم",
    search:"بحث…", loading:"جاري التحميل…",
    show_arabic:"عرض العربية",
    prev_chapter:"← الفصل السابق", next_chapter:"الفصل التالي →",
    prev_surah:"← السورة السابقة", next_surah:"السورة التالية →",
    select_book:"اختر كتابًا من القائمة",
    error_load:"فشل التحميل",
    surah:"سورة", chapter:"فصل", verse:"آية",
    chapter_count:"فصول",
    hide:"إخفاء", show_list:"قائمة",
    bismillah:"بسملة",
    about:"حول", language:"اللغة",
    revealed_in:"نزلت في", verses:"آيات",
    mecca:"مكة", medina:"المدينة",
    ot_label:"العهد القديم",
    nt_label:"العهد الجديد",
    books:"الكتب",
    error_book_not_found:"هذا الكتاب غير موجود في البيانات",
    error_chapter_not_found:"لم يتم العثور على الفصل",
    error_translation_not_found:"هذا الفصل غير متوفر في هذه الترجمة.",
  },
  ru: {
    title:"Архив Священных Текстов",
    subtitle:"Коран · Новый Завет · Ветхий Завет — многоязычные переводы",
    tab_kuran:"Священный Коран", tab_incil:"Новый Завет", tab_tevrat:"Ветхий Завет",
    search:"Поиск…", loading:"Загрузка…",
    show_arabic:"Показать арабский",
    prev_chapter:"← Предыдущая глава", next_chapter:"Следующая глава →",
    prev_surah:"← Предыдущая сура", next_surah:"Следующая сура →",
    select_book:"Выберите книгу ниже",
    error_load:"Не удалось загрузить",
    surah:"Сура", chapter:"Глава", verse:"Аят",
    chapter_count:"глав",
    hide:"Скрыть", show_list:"Список",
    bismillah:"Бисмиллах",
    about:"О сайте", language:"Язык",
    revealed_in:"Место откровения", verses:"Аяты",
    mecca:"Мекка", medina:"Медина",
    ot_label:"Ветхий Завет",
    nt_label:"Новый Завет",
    books:"Книги",
    error_book_not_found:"Эта книга не во встроенных данных",
    error_chapter_not_found:"Глава не найдена",
    error_translation_not_found:"Эта глава недоступна в данном переводе.",
  },
};

function getLang(){return localStorage.getItem("lang")||"tr";}
function setLang(code){
  localStorage.setItem("lang",code);
  const lang=LANGS.find(l=>l.code===code)||LANGS[0];
  document.documentElement.lang=code;
  document.documentElement.dir=lang.dir;
  applyI18n();
  if(typeof renderSB==="function") renderSB();
  if(typeof renderCtrl==="function") renderCtrl();
  if(typeof loadContent==="function") loadContent();
}
function t(key){
  const lang=getLang();
  return (I18N[lang]&&I18N[lang][key])||I18N.tr[key]||key;
}
function applyI18n(){
  const set=(id,key)=>{const e=document.getElementById(id);if(e)e.textContent=t(key);};
  set("hdr-title","title");
  set("hdr-sub","subtitle");
  const tk=document.getElementById("tab-kuran"); if(tk) tk.innerHTML="☽ "+t("tab_kuran");
  const ti=document.getElementById("tab-incil"); if(ti) ti.innerHTML="✝ "+t("tab_incil");
  const tt=document.getElementById("tab-tevrat"); if(tt) tt.innerHTML="✡ "+t("tab_tevrat");
  const sb=document.getElementById("sb-search"); if(sb) sb.placeholder=t("search");
  const ab=document.getElementById("about-btn"); if(ab) ab.textContent=t("about");
}

/* 114 sure ismi 4 dilde */
const SURAH_NAMES = {
  tr: ["Fatiha","Bakara","Ali İmran","Nisa","Maide","En'am","A'raf","Enfal","Tevbe","Yunus",
    "Hud","Yusuf","Ra'd","İbrahim","Hicr","Nahl","İsra","Kehf","Meryem","Taha",
    "Enbiya","Hac","Müminun","Nur","Furkan","Şuara","Neml","Kasas","Ankebut","Rum",
    "Lokman","Secde","Ahzab","Sebe","Fatır","Yasin","Saffat","Sad","Zümer","Mümin",
    "Fussilet","Şura","Zuhruf","Duhan","Casiye","Ahkaf","Muhammed","Fetih","Hucurat","Kaf",
    "Zariyat","Tur","Necm","Kamer","Rahman","Vakıa","Hadid","Mücadele","Haşr","Mümtehine",
    "Saf","Cuma","Münafikun","Teğabun","Talak","Tahrim","Mülk","Kalem","Hakka","Mearic",
    "Nuh","Cin","Müzzemmil","Müddessir","Kıyamet","İnsan","Mürselat","Nebe","Naziat","Abese",
    "Tekvir","İnfitar","Mutaffifin","İnşikak","Buruc","Tarık","A'la","Gaşiye","Fecr","Beled",
    "Şems","Leyl","Duha","İnşirah","Tin","Alak","Kadir","Beyyine","Zilzal","Adiyat",
    "Karia","Tekasür","Asr","Hümeze","Fil","Kureyş","Maun","Kevser","Kafirun","Nasr",
    "Mesed","İhlas","Felak","Nas"],
  en: ["Al-Fatihah","Al-Baqarah","Aal-i-Imran","An-Nisa","Al-Ma'idah","Al-An'am","Al-A'raf","Al-Anfal","At-Tawbah","Yunus",
    "Hud","Yusuf","Ar-Ra'd","Ibrahim","Al-Hijr","An-Nahl","Al-Isra","Al-Kahf","Maryam","Ta-Ha",
    "Al-Anbiya","Al-Hajj","Al-Mu'minun","An-Nur","Al-Furqan","Ash-Shu'ara","An-Naml","Al-Qasas","Al-Ankabut","Ar-Rum",
    "Luqman","As-Sajdah","Al-Ahzab","Saba","Fatir","Ya-Sin","As-Saffat","Sad","Az-Zumar","Ghafir",
    "Fussilat","Ash-Shura","Az-Zukhruf","Ad-Dukhan","Al-Jathiyah","Al-Ahqaf","Muhammad","Al-Fath","Al-Hujurat","Qaf",
    "Adh-Dhariyat","At-Tur","An-Najm","Al-Qamar","Ar-Rahman","Al-Waqi'ah","Al-Hadid","Al-Mujadilah","Al-Hashr","Al-Mumtahanah",
    "As-Saff","Al-Jumu'ah","Al-Munafiqun","At-Taghabun","At-Talaq","At-Tahrim","Al-Mulk","Al-Qalam","Al-Haqqah","Al-Ma'arij",
    "Nuh","Al-Jinn","Al-Muzzammil","Al-Muddaththir","Al-Qiyamah","Al-Insan","Al-Mursalat","An-Naba","An-Nazi'at","Abasa",
    "At-Takwir","Al-Infitar","Al-Mutaffifin","Al-Inshiqaq","Al-Buruj","At-Tariq","Al-A'la","Al-Ghashiyah","Al-Fajr","Al-Balad",
    "Ash-Shams","Al-Layl","Ad-Duha","Ash-Sharh","At-Tin","Al-'Alaq","Al-Qadr","Al-Bayyinah","Az-Zalzalah","Al-'Adiyat",
    "Al-Qari'ah","At-Takathur","Al-'Asr","Al-Humazah","Al-Fil","Quraysh","Al-Ma'un","Al-Kawthar","Al-Kafirun","An-Nasr",
    "Al-Masad","Al-Ikhlas","Al-Falaq","An-Nas"],
  ar: ["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس",
    "هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه",
    "الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم",
    "لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر",
    "فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق",
    "الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة",
    "الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج",
    "نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس",
    "التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد",
    "الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات",
    "القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر",
    "المسد","الإخلاص","الفلق","الناس"],
  ru: ["Аль-Фатиха","Аль-Бакара","Аль-Имран","Ан-Ниса","Аль-Маида","Аль-Анам","Аль-Араф","Аль-Анфаль","Ат-Тауба","Юнус",
    "Худ","Юсуф","Ар-Раад","Ибрахим","Аль-Хиджр","Ан-Нахль","Аль-Исра","Аль-Кахф","Марьям","Та-Ха",
    "Аль-Анбия","Аль-Хадж","Аль-Муминун","Ан-Нур","Аль-Фуркан","Аш-Шуара","Ан-Намль","Аль-Касас","Аль-Анкабут","Ар-Рум",
    "Лукман","Ас-Саджда","Аль-Ахзаб","Саба","Фатыр","Йа Син","Ас-Саффат","Сад","Аз-Зумар","Гафир",
    "Фуссилят","Аш-Шура","Аз-Зухруф","Ад-Духан","Аль-Джасия","Аль-Ахкаф","Мухаммад","Аль-Фатх","Аль-Худжурат","Каф",
    "Аз-Зарият","Ат-Тур","Ан-Наджм","Аль-Камар","Ар-Рахман","Аль-Вакиа","Аль-Хадид","Аль-Муджадила","Аль-Хашр","Аль-Мумтахана",
    "Ас-Сафф","Аль-Джумуа","Аль-Мунафикун","Ат-Тагабун","Ат-Талак","Ат-Тахрим","Аль-Мульк","Аль-Калам","Аль-Хакка","Аль-Мааридж",
    "Нух","Аль-Джинн","Аль-Муззаммиль","Аль-Муддассир","Аль-Кияма","Аль-Инсан","Аль-Мурсалят","Ан-Наба","Ан-Назиат","Абаса",
    "Ат-Таквир","Аль-Инфитар","Аль-Мутаффифин","Аль-Иншикак","Аль-Бурудж","Ат-Тарик","Аль-Аля","Аль-Гашия","Аль-Фаджр","Аль-Балад",
    "Аш-Шамс","Аль-Лайль","Ад-Духа","Аш-Шарх","Ат-Тин","Аль-Аляк","Аль-Кадр","Аль-Баййина","Аз-Зальзаля","Аль-Адият",
    "Аль-Кариа","Ат-Такасур","Аль-Аср","Аль-Хумаза","Аль-Филь","Курайш","Аль-Маун","Аль-Каусар","Аль-Кафирун","Ан-Наср",
    "Аль-Масад","Аль-Ихлас","Аль-Фаляк","Ан-Нас"]
};

/* Geriye uyumluluk için eski isim */
const SURAH_TR = SURAH_NAMES.tr;

/* Sure adı ve "X Suresi" alt yazısı UI diline göre */
function surahDisplayName(s){
  const lang = getLang();
  const list = SURAH_NAMES[lang] || SURAH_NAMES.tr;
  return list[s.number-1] || s.englishName;
}
function surahDisplaySub(s){
  const lang = getLang();
  const list = SURAH_NAMES[lang] || SURAH_NAMES.tr;
  const name = list[s.number-1] || s.englishName;
  const suffix = {tr:" Suresi", en:" Surah", ar:" سورة", ru:" Сура"}[lang] || "";
  return name + suffix;
}
function isTurkish(){return getLang()==="tr";}

const QTRANS=[
  {g:"Türkçe Meal",items:[
    {id:"tr.yazir",l:"Elmalılı Hamdi Yazır (1935)"},
  ]},
  {g:"İngilizce",items:[
    {id:"en.pickthall",l:"Pickthall (1930)"},
    {id:"en.yusufali",l:"Yusuf Ali (1934)"},
    {id:"en.transliteration",l:"Transliteration (Latin)"},
  ]},
];


/* Standart kitap numaraları (1-66) */
const BOOK_NUM={
  "genesis":1,"exodus":2,"leviticus":3,"numbers":4,"deuteronomy":5,
  "joshua":6,"judges":7,"ruth":8,"1 samuel":9,"2 samuel":10,
  "1 kings":11,"2 kings":12,"1 chronicles":13,"2 chronicles":14,
  "ezra":15,"nehemiah":16,"esther":17,"job":18,
  "psalms":19,"proverbs":20,"ecclesiastes":21,"song of solomon":22,
  "isaiah":23,"jeremiah":24,"lamentations":25,"ezekiel":26,"daniel":27,
  "hosea":28,"joel":29,"amos":30,"obadiah":31,"jonah":32,"micah":33,
  "nahum":34,"habakkuk":35,"zephaniah":36,"haggai":37,"zechariah":38,"malachi":39,
  "matthew":40,"mark":41,"luke":42,"john":43,"acts":44,
  "romans":45,"1 corinthians":46,"2 corinthians":47,"galatians":48,
  "ephesians":49,"philippians":50,"colossians":51,
  "1 thessalonians":52,"2 thessalonians":53,"1 timothy":54,"2 timothy":55,
  "titus":56,"philemon":57,"hebrews":58,"james":59,"1 peter":60,"2 peter":61,
  "1 john":62,"2 john":63,"3 john":64,"jude":65,"revelation":66
};

/* TEVRAT için Eski Ahit çevirileri — sadece Public Domain ve açık lisanslı */
const TEVRAT_TRANS=[
  {id:"tr-ytc",l:"Türkçe — Yorumsuz Çeviri (YTC)",local:true,attribution:"İsmail Serinken / eBible.org · CC-BY-ND 4.0"},
  {id:"he",l:"İbranice — Westminster Leningrad",bolls:["WLC","WLCa","WLCC"]},
  {id:"el-lxx",l:"Yunanca — Septuagint (LXX)",bolls:["LXX"]},
  {id:"en-lxxe",l:"İngilizce — Brenton Septuagint (1851)",bolls:["LXXE"]},
  {id:"la",l:"Latince — Vulgata",bolls:["VULG"]},
  {id:"kjv",l:"İngilizce — King James (1611)",bolls:["KJV"]},
  {id:"web",l:"İngilizce — World English Bible",bolls:["WEB"]},
  {id:"asv",l:"İngilizce — American Standard (1901)",bolls:["ASV"]},
  {id:"ylt",l:"İngilizce — Young's Literal (1898)",bolls:["YLT"]},
  {id:"drb",l:"İngilizce — Douay-Rheims",bolls:["DRB"]},
  {id:"gnv",l:"İngilizce — Geneva Bible (1599)",bolls:["GNV"]},
  {id:"bsb",l:"İngilizce — Berean Standard (CC0)",bolls:["BSB"]},
  {id:"de",l:"Almanca — Luther 1912",bolls:["LUT","ELB","MB"]},
  {id:"fr",l:"Fransızca — Darby (1890)",bolls:["FRDBY"]},
  {id:"ru",l:"Rusça — Sinodik (1876)",bolls:["SYNOD"]},
  {id:"ar",l:"Arapça — Smith-Van Dyke (1865)",bolls:["SVD"]},
  {id:"nl",l:"Hollandaca — Statenvertaling (1619)",bolls:["DSV"]},
  {id:"pl",l:"Lehçe — Biblia gdańska (1881)",bolls:["BG"]},
  {id:"hu",l:"Macarca — Karoli (1908)",bolls:["KB"]},
  {id:"zh",l:"Çince — Peking Committee (1899)",bolls:["PCB","PCBS"]},
  {id:"no",l:"Norveççe — DNB (1930)",bolls:["DNB"]},
];

/* İNCİL için Yeni Ahit çevirileri — sadece Public Domain ve açık lisanslı */
const INCIL_TRANS=[
  {id:"tr-ytc",l:"Türkçe — Yorumsuz Çeviri (YTC)",local:true,attribution:"İsmail Serinken / eBible.org · CC-BY-ND 4.0"},
  {id:"el-tr",l:"Yunanca — Textus Receptus (1624)",bolls:["TR"]},
  {id:"el-tisch",l:"Yunanca — Tischendorf (1869)",bolls:["TISCH","NTGT"]},
  {id:"he-dhnt",l:"İbranice — Delitzsch NT (1877)",bolls:["DHNT"]},
  {id:"la",l:"Latince — Vulgata",bolls:["VULG"]},
  {id:"kjv",l:"İngilizce — King James (1611)",bolls:["KJV"]},
  {id:"web",l:"İngilizce — World English Bible",bolls:["WEB"]},
  {id:"asv",l:"İngilizce — American Standard (1901)",bolls:["ASV"]},
  {id:"ylt",l:"İngilizce — Young's Literal (1898)",bolls:["YLT"]},
  {id:"drb",l:"İngilizce — Douay-Rheims",bolls:["DRB"]},
  {id:"gnv",l:"İngilizce — Geneva Bible (1599)",bolls:["GNV"]},
  {id:"bsb",l:"İngilizce — Berean Standard (CC0)",bolls:["BSB"]},
  {id:"de",l:"Almanca — Luther 1912",bolls:["LUT","ELB","MB"]},
  {id:"fr",l:"Fransızca — Darby (1890)",bolls:["FRDBY"]},
  {id:"ru",l:"Rusça — Sinodik (1876)",bolls:["SYNOD"]},
  {id:"ar",l:"Arapça — Smith-Van Dyke (1865)",bolls:["SVD"]},
  {id:"nl",l:"Hollandaca — Statenvertaling (1619)",bolls:["DSV"]},
  {id:"pl",l:"Lehçe — Biblia gdańska (1881)",bolls:["BG"]},
  {id:"hu",l:"Macarca — Karoli (1908)",bolls:["KB"]},
  {id:"zh",l:"Çince — Peking Committee (1899)",bolls:["PCB","PCBS"]},
  {id:"no",l:"Norveççe — DNB (1930)",bolls:["DNB"]},
];

function currentTransList(){return S.tab==="tevrat"?TEVRAT_TRANS:INCIL_TRANS;}

/* Cache: çeviri kodu → tüm kitap (compact JSON) */
const TRANS_CACHE={};
/* In-flight: aynı çeviri için tekrar fetch'lemeyi engeller */
const TRANS_LOADING={};

async function loadTranslation(code){
  if(TRANS_CACHE[code]) return TRANS_CACHE[code];
  if(TRANS_LOADING[code]) return TRANS_LOADING[code];
  
  const promise = (async ()=>{
    const r = await fetch(`data/bible/${code}.json`);
    if(!r.ok) throw new Error(`${code} yüklenemedi (${r.status})`);
    const data = await r.json();
    TRANS_CACHE[code] = data;
    return data;
  })();
  TRANS_LOADING[code] = promise;
  try {
    return await promise;
  } finally {
    delete TRANS_LOADING[code];
  }
}

async function fetchVerses(bookId, chapter, btransId){
  const num=BOOK_NUM[bookId];
  if(!num) throw new Error("Kitap kodu yok");
  const trans=currentTransList().find(t=>t.id===btransId);
  if(!trans) throw new Error("Çeviri yok");

  /* Gömülü Türkçe veri (window.* objeleri) — internet gerektirmez */
  if(trans.local){
    let dataset;
    if(btransId==="tr-ytc"){
      dataset = S.tab==="tevrat" ? (window.TEVRAT_TR_YTC_DATA||{}) : (window.INCIL_TR_YTC_DATA||{});
    } else {
      dataset = {};
    }
    const book=dataset[bookId];
    if(!book) throw new Error(t("error_book_not_found"));
    const ch=book[chapter-1];
    if(!ch||!ch.length) throw new Error(t("error_chapter_not_found"));
    return ch.map((text,i)=>({verse:i+1,text})).filter(v=>v.text);
  }

  /* Lokal data/bible/{CODE}.json'dan oku — CORS proxy yok, dış bağımlılık yok */
  let lastError = null;
  for(const code of trans.bolls){
    try{
      const data = await loadTranslation(code);
      const book = data[String(num)];
      if(!book) continue;
      const ch = book[String(chapter)];
      if(!ch) continue;
      const verses = Object.entries(ch)
        .map(([vn, text])=>({
          verse: parseInt(vn,10),
          text: (text||"")
            .replace(/<[^>]+>/g,"")
            .replace(/([A-Za-zÇçĞğİıÖöŞşÜüâêîôû])\d+/g,"$1")
            .replace(/\[\d+\]/g,"")
            .replace(/\s+/g," ").trim()
        }))
        .filter(v=>v.text)
        .sort((a,b)=>a.verse-b.verse);
      if(verses.length) return verses;
    }catch(e){
      lastError = e;
    }
  }
  throw new Error(lastError ? lastError.message : t("error_translation_not_found"));
}


const TEVRAT=[
  {id:"genesis",      names:{tr:"Yaratılış",      en:"Genesis",         ar:"التكوين",      ru:"Бытие"},          ch:50},
  {id:"exodus",       names:{tr:"Mısır'dan Çıkış",en:"Exodus",          ar:"الخروج",       ru:"Исход"},          ch:40},
  {id:"leviticus",    names:{tr:"Levililer",      en:"Leviticus",       ar:"اللاويين",     ru:"Левит"},          ch:27},
  {id:"numbers",      names:{tr:"Çölde Sayım",    en:"Numbers",         ar:"العدد",        ru:"Числа"},          ch:36},
  {id:"deuteronomy",  names:{tr:"Yasa'nın Tekrarı",en:"Deuteronomy",    ar:"التثنية",      ru:"Второзаконие"},   ch:34},
  {id:"joshua",       names:{tr:"Yeşu",           en:"Joshua",          ar:"يشوع",         ru:"Иисус Навин"},    ch:24},
  {id:"judges",       names:{tr:"Hâkimler",       en:"Judges",          ar:"القضاة",       ru:"Судьи"},          ch:21},
  {id:"ruth",         names:{tr:"Rut",            en:"Ruth",            ar:"راعوث",        ru:"Руфь"},           ch:4},
  {id:"1 samuel",     names:{tr:"1. Samuel",      en:"1 Samuel",        ar:"صموئيل الأول", ru:"1 Царств"},       ch:31},
  {id:"2 samuel",     names:{tr:"2. Samuel",      en:"2 Samuel",        ar:"صموئيل الثاني",ru:"2 Царств"},       ch:24},
  {id:"1 kings",      names:{tr:"1. Krallar",     en:"1 Kings",         ar:"الملوك الأول", ru:"3 Царств"},       ch:22},
  {id:"2 kings",      names:{tr:"2. Krallar",     en:"2 Kings",         ar:"الملوك الثاني",ru:"4 Царств"},       ch:25},
  {id:"1 chronicles", names:{tr:"1. Tarihler",    en:"1 Chronicles",    ar:"أخبار الأيام الأول",ru:"1 Паралипоменон"},ch:29},
  {id:"2 chronicles", names:{tr:"2. Tarihler",    en:"2 Chronicles",    ar:"أخبار الأيام الثاني",ru:"2 Паралипоменон"},ch:36},
  {id:"ezra",         names:{tr:"Ezra",           en:"Ezra",            ar:"عزرا",         ru:"Ездра"},          ch:10},
  {id:"nehemiah",     names:{tr:"Nehemya",        en:"Nehemiah",        ar:"نحميا",        ru:"Неемия"},         ch:13},
  {id:"esther",       names:{tr:"Ester",          en:"Esther",          ar:"إستير",        ru:"Есфирь"},         ch:10},
  {id:"job",          names:{tr:"Eyüp",           en:"Job",             ar:"أيوب",         ru:"Иов"},            ch:42},
  {id:"psalms",       names:{tr:"Mezmurlar",      en:"Psalms",          ar:"المزامير",     ru:"Псалтирь"},       ch:150},
  {id:"proverbs",     names:{tr:"Özdeyişler",     en:"Proverbs",        ar:"الأمثال",      ru:"Притчи"},         ch:31},
  {id:"ecclesiastes", names:{tr:"Vaiz",           en:"Ecclesiastes",    ar:"الجامعة",      ru:"Екклесиаст"},     ch:12},
  {id:"song of solomon",names:{tr:"Ezgiler Ezgisi",en:"Song of Solomon",ar:"نشيد الأنشاد", ru:"Песнь Песней"},   ch:8},
  {id:"isaiah",       names:{tr:"Yeşaya",         en:"Isaiah",          ar:"إشعياء",       ru:"Исаия"},          ch:66},
  {id:"jeremiah",     names:{tr:"Yeremya",        en:"Jeremiah",        ar:"إرميا",        ru:"Иеремия"},        ch:52},
  {id:"lamentations", names:{tr:"Ağıtlar",        en:"Lamentations",    ar:"مراثي إرميا",  ru:"Плач Иеремии"},   ch:5},
  {id:"ezekiel",      names:{tr:"Hezekiel",       en:"Ezekiel",         ar:"حزقيال",       ru:"Иезекииль"},      ch:48},
  {id:"daniel",       names:{tr:"Daniel",         en:"Daniel",          ar:"دانيال",       ru:"Даниил"},         ch:12},
  {id:"hosea",        names:{tr:"Hoşea",          en:"Hosea",           ar:"هوشع",         ru:"Осия"},           ch:14},
  {id:"joel",         names:{tr:"Yoel",           en:"Joel",            ar:"يوئيل",        ru:"Иоиль"},          ch:3},
  {id:"amos",         names:{tr:"Amos",           en:"Amos",            ar:"عاموس",        ru:"Амос"},           ch:9},
  {id:"obadiah",      names:{tr:"Ovadya",         en:"Obadiah",         ar:"عوبديا",       ru:"Авдий"},          ch:1},
  {id:"jonah",        names:{tr:"Yunus",          en:"Jonah",           ar:"يونان",        ru:"Иона"},           ch:4},
  {id:"micah",        names:{tr:"Mika",           en:"Micah",           ar:"ميخا",         ru:"Михей"},          ch:7},
  {id:"nahum",        names:{tr:"Nahum",          en:"Nahum",           ar:"ناحوم",        ru:"Наум"},           ch:3},
  {id:"habakkuk",     names:{tr:"Habakkuk",       en:"Habakkuk",        ar:"حبقوق",        ru:"Аввакум"},        ch:3},
  {id:"zephaniah",    names:{tr:"Sefanya",        en:"Zephaniah",       ar:"صفنيا",        ru:"Софония"},        ch:3},
  {id:"haggai",       names:{tr:"Hagay",          en:"Haggai",          ar:"حجي",          ru:"Аггей"},          ch:2},
  {id:"zechariah",    names:{tr:"Zekeriya",       en:"Zechariah",       ar:"زكريا",        ru:"Захария"},        ch:14},
  {id:"malachi",      names:{tr:"Malaki",         en:"Malachi",         ar:"ملاخي",        ru:"Малахия"},        ch:4},
];

const INCIL=[
  {id:"matthew",      names:{tr:"Matta",          en:"Matthew",         ar:"متى",          ru:"Матфея"},         ch:28},
  {id:"mark",         names:{tr:"Markos",         en:"Mark",            ar:"مرقس",         ru:"Марка"},          ch:16},
  {id:"luke",         names:{tr:"Luka",           en:"Luke",            ar:"لوقا",         ru:"Луки"},           ch:24},
  {id:"john",         names:{tr:"Yuhanna",        en:"John",            ar:"يوحنا",        ru:"Иоанна"},         ch:21},
  {id:"acts",         names:{tr:"Elçilerin İşleri",en:"Acts",           ar:"أعمال الرسل",  ru:"Деяния"},         ch:28},
  {id:"romans",       names:{tr:"Romalılar",      en:"Romans",          ar:"رومية",        ru:"Римлянам"},       ch:16},
  {id:"1 corinthians",names:{tr:"1. Korintliler", en:"1 Corinthians",   ar:"كورنثوس الأولى",ru:"1 Коринфянам"},  ch:16},
  {id:"2 corinthians",names:{tr:"2. Korintliler", en:"2 Corinthians",   ar:"كورنثوس الثانية",ru:"2 Коринфянам"}, ch:13},
  {id:"galatians",    names:{tr:"Galatyalılar",   en:"Galatians",       ar:"غلاطية",       ru:"Галатам"},        ch:6},
  {id:"ephesians",    names:{tr:"Efesliler",      en:"Ephesians",       ar:"أفسس",         ru:"Ефесянам"},       ch:6},
  {id:"philippians",  names:{tr:"Filipililer",    en:"Philippians",     ar:"فيلبي",        ru:"Филиппийцам"},    ch:4},
  {id:"colossians",   names:{tr:"Koloseliler",    en:"Colossians",      ar:"كولوسي",       ru:"Колоссянам"},     ch:4},
  {id:"1 thessalonians",names:{tr:"1. Selanikliler",en:"1 Thessalonians",ar:"تسالونيكي الأولى",ru:"1 Фессалоникийцам"},ch:5},
  {id:"2 thessalonians",names:{tr:"2. Selanikliler",en:"2 Thessalonians",ar:"تسالونيكي الثانية",ru:"2 Фессалоникийцам"},ch:3},
  {id:"1 timothy",    names:{tr:"1. Timoteos",    en:"1 Timothy",       ar:"تيموثاوس الأولى",ru:"1 Тимофею"},    ch:6},
  {id:"2 timothy",    names:{tr:"2. Timoteos",    en:"2 Timothy",       ar:"تيموثاوس الثانية",ru:"2 Тимофею"},   ch:4},
  {id:"titus",        names:{tr:"Titus",          en:"Titus",           ar:"تيطس",         ru:"Титу"},           ch:3},
  {id:"philemon",     names:{tr:"Filimon",        en:"Philemon",        ar:"فليمون",       ru:"Филимону"},       ch:1},
  {id:"hebrews",      names:{tr:"İbraniler",      en:"Hebrews",         ar:"العبرانيين",   ru:"Евреям"},         ch:13},
  {id:"james",        names:{tr:"Yakup",          en:"James",           ar:"يعقوب",        ru:"Иакова"},         ch:5},
  {id:"1 peter",      names:{tr:"1. Petrus",      en:"1 Peter",         ar:"بطرس الأولى",  ru:"1 Петра"},        ch:5},
  {id:"2 peter",      names:{tr:"2. Petrus",      en:"2 Peter",         ar:"بطرس الثانية", ru:"2 Петра"},        ch:3},
  {id:"1 john",       names:{tr:"1. Yuhanna",     en:"1 John",          ar:"يوحنا الأولى", ru:"1 Иоанна"},       ch:5},
  {id:"2 john",       names:{tr:"2. Yuhanna",     en:"2 John",          ar:"يوحنا الثانية",ru:"2 Иоанна"},       ch:1},
  {id:"3 john",       names:{tr:"3. Yuhanna",     en:"3 John",          ar:"يوحنا الثالثة",ru:"3 Иоанна"},       ch:1},
  {id:"jude",         names:{tr:"Yahuda",         en:"Jude",            ar:"يهوذا",        ru:"Иуды"},           ch:1},
  {id:"revelation",   names:{tr:"Vahiy",          en:"Revelation",      ar:"الرؤيا",       ru:"Откровение"},     ch:22},
];

/* Aktif dile göre kitap adı döndüren yardımcı */
function bookName(b){
  const lang=getLang();
  if(b.names) return b.names[lang]||b.names.tr||b.id;
  return b.tr||b.id; /* eski format desteği */
}


let S={tab:"kuran",surahs:[],sel:1,qtrans:"tr.yazir",arabic:true,book:null,chapter:1,btrans:"tr-ytc",sbOpen:true,q:""};

function switchTab(t){
  S.tab=t;S.q="";S.book=null;S.chapter=1;
  /* Sekme değişince uygun varsayılan çeviriye geç */
  const list=t==="tevrat"?TEVRAT_TRANS:(t==="incil"?INCIL_TRANS:null);
  if(list&&!list.find(b=>b.id===S.btrans)){
    S.btrans=list[0].id;
  }
  document.getElementById("sb-search").value="";
  ["kuran","incil","tevrat"].forEach(k=>{
    const b=document.getElementById("tab-"+k);
    b.className="tab-btn"+(t===k?" "+{kuran:"ak",incil:"ai",tevrat:"at"}[k]:"");
  });
  renderSB();renderCtrl();loadContent();
}

function filterList(){S.q=document.getElementById("sb-search").value;renderSB();}
function ac(t){return t==="kuran"?"k":t==="incil"?"i":"t";}

function renderSB(){
  const el=document.getElementById("sb-list");
  const q=S.q.toLowerCase();
  const a=ac(S.tab);
  if(S.tab==="kuran"){
    const items=S.surahs.filter(s=>{
      if(!q) return true;
      if(s.englishName.toLowerCase().includes(q)) return true;
      if(s.name.includes(q)) return true;
      if(String(s.number).includes(q)) return true;
      const idx=s.number-1;
      return Object.values(SURAH_NAMES).some(arr=>(arr[idx]||"").toLowerCase().includes(q));
    });
    el.innerHTML=items.map(s=>{
      const sel=S.sel===s.number;
      return `<div class="sb-item ${sel?"sel-k":""}" onclick="selSurah(${s.number})">
        <div class="sb-num ${sel?"sn-k":"sn-neutral"}">${s.number}</div>
        <div><div class="sb-name">${surahDisplayName(s)}</div><div class="sb-meta">${s.name} · ${s.numberOfAyahs} ${t("verses").toLowerCase()}</div></div>
      </div>`;
    }).join("");
  } else {
    const books=S.tab==="tevrat"?TEVRAT:INCIL;
    const items=books.filter(b=>{
      if(!q)return true;
      if(b.names) return Object.values(b.names).some(n=>n.toLowerCase().includes(q));
      return (b.tr||"").toLowerCase().includes(q);
    });
    el.innerHTML=items.map((b,i)=>{
      const sel=S.book&&S.book.id===b.id;
      const chips=sel?Array.from({length:b.ch},(_,j)=>j+1).map(n=>`<button class="ch-btn ${S.chapter===n?"c"+a:""}" onclick="selCh(${n})">${n}</button>`).join(""):"";
      return `<div class="sb-item ${sel?"sel-"+a:""}" onclick="selBook('${b.id}')">
        <div class="sb-num ${sel?"sn-"+a:"sn-neutral"}">${i+1}</div>
        <div><div class="sb-name">${bookName(b)}</div><div class="sb-meta">${b.ch} ${t("chapter_count")}</div></div>
      </div>${sel?`<div class="ch-grid">${chips}</div>`:""}`;
    }).join("");
  }
}

function renderCtrl(){
  const c=document.getElementById("ctrl-bar");
  const arrow=S.sbOpen?"◀":"▶";
  const sb=`<button class="ctrl-btn" onclick="toggleSB()">${arrow} ${S.sbOpen?t("hide"):t("show_list")}</button>`;
  if(S.tab==="kuran"){
    const opts=QTRANS.map(g=>`<optgroup label="${g.g}">${g.items.map(t=>`<option value="${t.id}" ${S.qtrans===t.id?"selected":""}>${t.l}</option>`).join("")}</optgroup>`).join("");
    c.innerHTML=`${sb}<select class="ctrl-sel" onchange="S.qtrans=this.value;renderSB();loadContent()">${opts}</select><label class="ctrl-lbl"><input type="checkbox" ${S.arabic?"checked":""} onchange="S.arabic=this.checked;loadContent()"> ${t("show_arabic")}</label>`;
  } else {
    const list=currentTransList();
    const opts=list.map(t=>`<option value="${t.id}" ${S.btrans===t.id?"selected":""}>${t.l}</option>`).join("");
    c.innerHTML=`${sb}<select class="ctrl-sel" onchange="S.btrans=this.value;loadContent()">${opts}</select>`;
  }
}

function toggleSB(){
  S.sbOpen=!S.sbOpen;
  document.getElementById("sidebar").className="sidebar"+(S.sbOpen?"":" closed");
  renderCtrl();
}

function selSurah(n){S.sel=n;renderSB();loadContent();}
function selBook(id){
  const books=S.tab==="tevrat"?TEVRAT:INCIL;
  if(S.book&&S.book.id===id){S.book=null;}
  else{S.book=books.find(b=>b.id===id);S.chapter=1;loadContent();}
  renderSB();
}
function selCh(n){S.chapter=n;renderSB();loadContent();}

async function loadContent(){
  const m=document.getElementById("main");
  m.innerHTML=`<div class="loading">${t("loading")}</div>`;
  if(S.tab==="kuran"){
    try{
      const surah=S.surahs.find(s=>s.number===S.sel)||{};
      const [ar,tr]=await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${S.sel}/ar.alafasy`).then(r=>r.json()),
        fetch(`https://api.alquran.cloud/v1/surah/${S.sel}/${S.qtrans}`).then(r=>r.json()),
      ]);
      const ayahs=ar.data.ayahs||[];
      const trans=tr.data.ayahs||[];
      const rev=surah.revelationType==="Meccan"?t("mecca"):t("medina");
      const tLabel=QTRANS.flatMap(g=>g.items).find(t=>t.id===S.qtrans);
      const dispName=surahDisplayName(surah);
      const dispSub=isTurkish()?surah.englishNameTranslation:surah.name;
      let html=`<div class="reader"><div class="surah-hero">
        <div class="hero-ornament">✦ ✦ ✦</div>
        <div class="hero-arabic">${surah.name||""}</div>
        <div class="hero-roman">${dispName}</div>
        <div class="hero-meta">${dispSub||""} &nbsp;·&nbsp; ${surah.numberOfAyahs||""} ${t("verses").toLowerCase()} &nbsp;·&nbsp; ${rev}</div>
        ${S.sel!==9?`<div class="bismillah-wrap"><div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div></div>`:""}
      </div>`;
      ayahs.forEach((a,i)=>{
        const t=trans[i];
        html+=`<div class="verse">
          <div class="v-num-wrap">
            <div class="v-num vn-k">${a.numberInSurah}</div>
            <div class="v-line"></div>
          </div>
          <div class="v-body">
            ${S.arabic?`<div class="v-arabic">${a.text}</div>`:""}
            ${t&&t.text?`${S.arabic?`<div class="v-divider"></div>`:""}
            <span class="trans-tag">${tLabel?tLabel.l:""}</span>
            <div class="v-trans">${t.text}</div>`:""}
          </div>
        </div>`;
      });
      const prev=S.sel>1?`<button onclick="selSurah(${S.sel-1})">${t("prev_surah")}</button>`:"";
      const next=S.sel<114?`<button onclick="selSurah(${S.sel+1})">${t("next_surah")}</button>`:"";
      html+=`<div class="nav-row">${prev}<span></span>${next}</div></div>`;
      m.innerHTML=html;
    }catch(e){m.innerHTML=`<div class="loading">${t("error_load")}.</div>`;}
    return;
  }
  if(!S.book){
    const books=S.tab==="tevrat"?TEVRAT:INCIL;
    const a=ac(S.tab);
    const icon=S.tab==="tevrat"?"✡":"✝";
    const label=S.tab==="tevrat"?t("ot_label"):t("nt_label");
    let html=`<div class="splash"><div class="surah-hero">
      <div class="hero-ornament">${icon}</div>
      <div class="hero-roman" style="font-size:20px;color:${S.tab==="tevrat"?"var(--forest)":"var(--navy)"}">${label}</div>
      <div class="hero-meta">${t("select_book")}</div>
    </div>
    <div class="splash-divider"><span class="splash-label">${t("books")}</span></div>
    <div class="book-grid">`;
    books.forEach((b,i)=>{
      html+=`<div class="book-card bc-${a}" onclick="selBook('${b.id}')">
        <div class="bc-num bcn-${a}">${i+1}</div>
        <div class="bc-title">${bookName(b)}</div>
        <div class="bc-ch">${b.ch} ${t("chapter_count")}</div>
      </div>`;
    });
    html+=`</div></div>`;
    m.innerHTML=html;return;
  }
  m.innerHTML=`<div class="loading">${t("loading")}</div>`;
  try{
    const verses=await fetchVerses(S.book.id, S.chapter, S.btrans);
    const a=ac(S.tab);
    const pre=S.tab==="tevrat"?"Tevrat":"İncil";
    const btl=currentTransList().find(t=>t.id===S.btrans);
    if(!verses||!verses.length){m.innerHTML=`<div class="loading">${t("error_translation_not_found")}</div>`;return;}
    let html=`<div class="reader"><div class="book-hero">
      <div class="book-hero-pre bpre-${a}">${pre}</div>
      <div class="book-hero-title bt-${a}">${bookName(S.book)}</div>
      <div class="hero-meta">${S.chapter}. ${t("chapter")}${btl?" · "+btl.l:""}</div>
    </div>`;
    verses.forEach(v=>{
      html+=`<div class="verse">
        <div class="v-num-wrap">
          <div class="v-num vn-${a}">${v.verse}</div>
          <div class="v-line"></div>
        </div>
        <div class="v-body"><div class="v-plain">${(v.text||"").trim()}</div></div>
      </div>`;
    });
    const prev=S.chapter>1?`<button onclick="selCh(${S.chapter-1})">${t("prev_chapter")}</button>`:"";
    const next=S.chapter<S.book.ch?`<button onclick="selCh(${S.chapter+1})">${t("next_chapter")}</button>`:"";
    html+=`<div class="nav-row">${prev}<span></span>${next}</div>`;
    if(btl&&btl.attribution){
      html+=`<div style="text-align:center;font-size:11px;color:#9A845A;font-style:italic;margin-top:14px;padding-top:10px;border-top:1px dashed rgba(184,147,58,.2)">Türkçe metin: ${btl.attribution}</div>`;
    }
    html+=`</div>`;
    m.innerHTML=html;
  }catch(e){
    m.innerHTML=`<div class="loading" style="color:#c0392b">
      ${t("error_load")}: ${e.message}
    </div>`;
  }
}

async function init(){
  try{const d=await fetch("https://api.alquran.cloud/v1/surah").then(r=>r.json());S.surahs=d.data||[];}
  catch(e){S.surahs=[];}
  /* Dil ayarını uygula (localStorage'dan veya varsayılan tr) */
  const lang=LANGS.find(l=>l.code===getLang())||LANGS[0];
  document.documentElement.lang=lang.code;
  document.documentElement.dir=lang.dir;
  applyI18n();
  renderSB();renderCtrl();loadContent();
}
init();
