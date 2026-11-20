import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGS = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "Русский" },
] as const;
export type Lang = (typeof LANGS)[number]["code"];

const en = {
  inventory: "Inventory",
  contact: "Contact",
  eyebrow: "Year-End Clearance Event",
  heroTitle: "Drive Extraordinary.",
  heroSub: "Hand-selected luxury vehicles at prices you won't see again.",
  viewInventory: "View Inventory",
  whyEyebrow: "Why prices are lower",
  whyTitle: "Out with the old, in with the new year.",
  why1: "As the year comes to a close, we are clearing our showroom to make room for a fresh line-up of vehicles arriving for the New Year. That means the cars in our current stock must go — and we would rather pass the savings to you than hold them over.",
  why2: "Every vehicle below is priced lower than usual, with the same careful inspection and quality we're known for. Once a car is sold, it's gone, so if something catches your eye, message us on Telegram today.",
  collection: "The Collection",
  featured: "Featured Inventory",
  loading: "Loading cars…",
  empty: "New arrivals coming soon. Message us on Telegram for current availability.",
  youSave: "You save",
  colours: "Colours",
  inStock: "in stock",
  soldOut: "Sold out",
  enquire: "Enquire on Telegram",
  chat: "Chat on Telegram",
  photo: "Photo",
  chooseLang: "Choose your language",
  msgHello: "Hello Best Motors Bay, I'm interested in this car:",
  msgPrice: "Price",
  msgWas: "was",
  msgAvailable: "Is it still available?",
};
type Dict = typeof en;

const DICTS: Record<Lang, Dict> = {
  en,
  fr: {
    inventory: "Inventaire", contact: "Contact", eyebrow: "Liquidation de fin d'année", heroTitle: "Conduisez l'extraordinaire.",
    heroSub: "Des véhicules de luxe sélectionnés à des prix que vous ne reverrez plus.", viewInventory: "Voir l'inventaire",
    whyEyebrow: "Pourquoi les prix sont plus bas", whyTitle: "Place au neuf pour la nouvelle année.",
    why1: "À l'approche de la fin d'année, nous vidons notre salle d'exposition pour accueillir une nouvelle gamme de véhicules pour le Nouvel An. Les voitures de notre stock actuel doivent partir — et nous préférons vous faire profiter des économies plutôt que de les garder.",
    why2: "Chaque véhicule ci-dessous est proposé à un prix inférieur à l'habitude, avec la même inspection minutieuse et la même qualité. Une fois vendue, la voiture n'est plus disponible : si l'une d'elles vous plaît, écrivez-nous sur Telegram dès aujourd'hui.",
    collection: "La Collection", featured: "Véhicules en vedette", loading: "Chargement des voitures…",
    empty: "Nouveaux arrivages bientôt. Écrivez-nous sur Telegram pour connaître les disponibilités.", youSave: "Vous économisez",
    colours: "Couleurs", inStock: "en stock", soldOut: "Épuisé", enquire: "Demander sur Telegram", chat: "Discuter sur Telegram",
    photo: "Photo", chooseLang: "Choisissez votre langue", msgHello: "Bonjour Best Motors Bay, cette voiture m'intéresse :",
    msgPrice: "Prix", msgWas: "au lieu de", msgAvailable: "Est-elle toujours disponible ?",
  },
  es: {
    inventory: "Inventario", contact: "Contacto", eyebrow: "Liquidación de fin de año", heroTitle: "Conduce lo extraordinario.",
    heroSub: "Vehículos de lujo seleccionados a precios que no volverás a ver.", viewInventory: "Ver inventario",
    whyEyebrow: "Por qué los precios son más bajos", whyTitle: "Fuera lo viejo, llega el año nuevo.",
    why1: "Al cerrar el año, estamos vaciando nuestra sala de exposición para dar paso a una nueva línea de vehículos para el Año Nuevo. Los coches de nuestro inventario actual deben salir, y preferimos trasladarte el ahorro a ti.",
    why2: "Cada vehículo tiene un precio más bajo de lo habitual, con la misma inspección cuidadosa y calidad de siempre. Cuando un coche se vende, desaparece; si alguno te gusta, escríbenos hoy por Telegram.",
    collection: "La Colección", featured: "Inventario destacado", loading: "Cargando coches…",
    empty: "Pronto llegarán novedades. Escríbenos por Telegram para conocer la disponibilidad.", youSave: "Ahorras",
    colours: "Colores", inStock: "en stock", soldOut: "Agotado", enquire: "Consultar por Telegram", chat: "Chatear por Telegram",
    photo: "Foto", chooseLang: "Elige tu idioma", msgHello: "Hola Best Motors Bay, me interesa este coche:",
    msgPrice: "Precio", msgWas: "antes", msgAvailable: "¿Sigue disponible?",
  },
  pt: {
    inventory: "Estoque", contact: "Contato", eyebrow: "Liquidação de fim de ano", heroTitle: "Dirija o extraordinário.",
    heroSub: "Veículos de luxo selecionados a preços que você não verá novamente.", viewInventory: "Ver estoque",
    whyEyebrow: "Por que os preços estão mais baixos", whyTitle: "Sai o antigo, chega o ano novo.",
    why1: "Com o fim do ano, estamos esvaziando nosso showroom para receber uma nova linha de veículos para o Ano Novo. Os carros do estoque atual precisam sair — e preferimos repassar a economia para você.",
    why2: "Cada veículo abaixo está com preço menor que o normal, com a mesma inspeção cuidadosa e qualidade de sempre. Depois de vendido, o carro não volta; se gostar de algum, fale conosco no Telegram hoje.",
    collection: "A Coleção", featured: "Destaques do estoque", loading: "Carregando carros…",
    empty: "Novidades em breve. Fale conosco no Telegram para saber a disponibilidade.", youSave: "Você economiza",
    colours: "Cores", inStock: "em estoque", soldOut: "Esgotado", enquire: "Consultar no Telegram", chat: "Conversar no Telegram",
    photo: "Foto", chooseLang: "Escolha seu idioma", msgHello: "Olá Best Motors Bay, tenho interesse neste carro:",
    msgPrice: "Preço", msgWas: "antes", msgAvailable: "Ainda está disponível?",
  },
  de: {
    inventory: "Bestand", contact: "Kontakt", eyebrow: "Jahresend-Räumungsverkauf", heroTitle: "Fahren Sie das Außergewöhnliche.",
    heroSub: "Handverlesene Luxusfahrzeuge zu Preisen, die es so nicht wieder gibt.", viewInventory: "Bestand ansehen",
    whyEyebrow: "Warum die Preise niedriger sind", whyTitle: "Raus mit dem Alten, rein ins neue Jahr.",
    why1: "Zum Jahresende räumen wir unseren Showroom, um Platz für neue Fahrzeuge zum neuen Jahr zu schaffen. Die Autos aus unserem aktuellen Bestand müssen weg – und wir geben die Ersparnis lieber an Sie weiter.",
    why2: "Jedes Fahrzeug ist günstiger als üblich, mit derselben sorgfältigen Prüfung und Qualität. Ist ein Auto verkauft, ist es weg – schreiben Sie uns noch heute auf Telegram.",
    collection: "Die Kollektion", featured: "Ausgewählte Fahrzeuge", loading: "Fahrzeuge werden geladen…",
    empty: "Bald neue Fahrzeuge. Schreiben Sie uns auf Telegram für die aktuelle Verfügbarkeit.", youSave: "Sie sparen",
    colours: "Farben", inStock: "auf Lager", soldOut: "Ausverkauft", enquire: "Anfrage per Telegram", chat: "Chat auf Telegram",
    photo: "Foto", chooseLang: "Wählen Sie Ihre Sprache", msgHello: "Hallo Best Motors Bay, ich interessiere mich für dieses Auto:",
    msgPrice: "Preis", msgWas: "statt", msgAvailable: "Ist es noch verfügbar?",
  },
  ar: {
    inventory: "المخزون", contact: "تواصل", eyebrow: "تخفيضات نهاية العام", heroTitle: "قُد الاستثنائي.",
    heroSub: "سيارات فاخرة مختارة بعناية بأسعار لن تتكرر.", viewInventory: "عرض المخزون",
    whyEyebrow: "لماذا الأسعار أقل", whyTitle: "وداعًا للقديم، أهلًا بالعام الجديد.",
    why1: "مع اقتراب نهاية العام، نُخلي صالة العرض لاستقبال تشكيلة جديدة من السيارات للعام الجديد. لذلك يجب بيع سيارات مخزوننا الحالي، ونفضّل أن نمنحك التوفير بدلًا من الاحتفاظ بها.",
    why2: "كل سيارة أدناه بسعر أقل من المعتاد، مع نفس الفحص الدقيق والجودة المعروفة عنا. بمجرد بيع السيارة تنتهي، فإن أعجبتك سيارة راسلنا على تيليجرام اليوم.",
    collection: "المجموعة", featured: "سيارات مميزة", loading: "جارٍ تحميل السيارات…",
    empty: "وصول سيارات جديدة قريبًا. راسلنا على تيليجرام لمعرفة المتوفر.", youSave: "توفّر",
    colours: "الألوان", inStock: "متوفرة", soldOut: "نفدت", enquire: "استفسر عبر تيليجرام", chat: "دردش على تيليجرام",
    photo: "صورة", chooseLang: "اختر لغتك", msgHello: "مرحبًا Best Motors Bay، أنا مهتم بهذه السيارة:",
    msgPrice: "السعر", msgWas: "بدلًا من", msgAvailable: "هل ما زالت متوفرة؟",
  },
  zh: {
    inventory: "库存", contact: "联系我们", eyebrow: "年终清仓活动", heroTitle: "驾驭非凡。",
    heroSub: "精选豪华座驾，价格空前优惠。", viewInventory: "查看库存",
    whyEyebrow: "为什么价格更低", whyTitle: "辞旧迎新，迎接新年。",
    why1: "年末将至，我们正在清空展厅，为新年到来的全新车型腾出空间。现有库存车辆必须售出——我们宁愿把优惠让给您。",
    why2: "以下每辆车的价格都低于平时，并保持一贯严格的检测与品质。车辆售出即止，如有心仪车型，请今天就在 Telegram 上联系我们。",
    collection: "精选系列", featured: "精选库存", loading: "正在加载车辆…",
    empty: "新车即将到店。请通过 Telegram 咨询现有车辆。", youSave: "节省",
    colours: "颜色", inStock: "辆有货", soldOut: "已售罄", enquire: "通过 Telegram 咨询", chat: "Telegram 聊天",
    photo: "照片", chooseLang: "请选择您的语言", msgHello: "您好 Best Motors Bay，我对这辆车感兴趣：",
    msgPrice: "价格", msgWas: "原价", msgAvailable: "请问还有货吗？",
  },
  ru: {
    inventory: "Автомобили", contact: "Контакты", eyebrow: "Распродажа в конце года", heroTitle: "Управляйте исключительным.",
    heroSub: "Отобранные люксовые автомобили по ценам, которых больше не будет.", viewInventory: "Смотреть автомобили",
    whyEyebrow: "Почему цены ниже", whyTitle: "Старое уходит — новый год приходит.",
    why1: "В конце года мы освобождаем шоурум для новой линейки автомобилей к Новому году. Машины из текущего наличия должны уйти — и мы предпочитаем передать экономию вам.",
    why2: "Каждый автомобиль ниже стоит дешевле обычного, с той же тщательной проверкой и качеством. Проданный автомобиль уже не вернуть — если что-то понравилось, напишите нам в Telegram сегодня.",
    collection: "Коллекция", featured: "Избранные автомобили", loading: "Загрузка автомобилей…",
    empty: "Скоро новые поступления. Напишите нам в Telegram, чтобы узнать о наличии.", youSave: "Экономия",
    colours: "Цвета", inStock: "в наличии", soldOut: "Продано", enquire: "Спросить в Telegram", chat: "Чат в Telegram",
    photo: "Фото", chooseLang: "Выберите язык", msgHello: "Здравствуйте, Best Motors Bay! Меня интересует этот автомобиль:",
    msgPrice: "Цена", msgWas: "было", msgAvailable: "Он ещё доступен?",
  },
};

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void; chosen: boolean };
const I18n = createContext<Ctx>({ lang: "en", t: en, setLang: () => {}, chosen: true });
const KEY = "bmb-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setL] = useState<Lang>("en");
  const [chosen, setChosen] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Lang | null;
    if (saved && saved in DICTS) setL(saved);
    else setChosen(false);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = (l: Lang) => {
    localStorage.setItem(KEY, l);
    setL(l);
    setChosen(true);
  };
  return <I18n.Provider value={{ lang, t: DICTS[lang], setLang, chosen }}>{children}</I18n.Provider>;
}

export const useI18n = () => useContext(I18n);

export function LanguagePrompt() {
  const { chosen, setLang, t } = useI18n();
  if (chosen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md border border-border bg-card p-8 shadow-2xl">
        <h2 className="text-center font-display text-2xl text-primary">{t.chooseLang}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {LANGS.map((l) => (
            <button key={l.code} onClick={() => setLang(l.code)} className="border border-border px-4 py-3 text-sm text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground">
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LanguageSelect() {
  const { lang, setLang } = useI18n();
  return (
    <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value as Lang)}
      className="border border-border bg-background px-2 py-2 text-xs uppercase tracking-widest text-foreground outline-none focus:border-primary">
      {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
    </select>
  );
}
