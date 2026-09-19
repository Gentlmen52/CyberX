'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Sun,
  Moon,
  Search,
  Plus,
  Trash2,
  Edit2,
  X,
  CheckCircle,
  ShieldCheck,
  Gamepad2,
  User,
  Lock,
  LogOut,
  Send,
  Zap,
  SlidersHorizontal,
  CreditCard,
  PlusCircle,
  Eye,
  EyeOff,
  Phone,
  Clock,
  Gift,
  Flame,
  Percent,
  Tag,
  PackageCheck,
  Store,
  Mail,
  KeyRound,
  ArrowRight,
  Menu
} from 'lucide-react';

const MOCK_USERS_API = "https://6aa93829d442cb69d498d71.mockapi.io/ForDemoDay";
const MOCK_CARDS_API = "https://6aa93829d442cb69d498d71.mockapi.io/cards";

const TELEGRAM_BOT_TOKEN = "8987756369:AAFLnDGb580xbuBtQI0n1MEsetfQZoEmRhg";
const TELEGRAM_CHAT_ID = "6570254550";

const USD_RATE = 12800;

const TRANSLATIONS = {
  uz: {
    store: "Do'kon",
    categories: "Toifalar",
    deals: "Aksiyalar",
    orders: "Buyurtmalar",
    searchPlaceholder: "O'yin yoki xizmatni qidirish...",
    heroSubtitle: "Geymerlar Market",
    heroTitle1: "Brawl Stars, CS2, Clash Royale va ",
    heroTitle2: "Raqamli Xizmatlar",
    allCategories: "Barchasi",
    price: "Narxi",
    select: "Tanlash",
    limitedOffers: "Cheklangan Takliflar",
    specialDealsTitle: "24 Soatlik Maxsus Aksiyalar",
    specialDealsSub: "Shoshiling, aksiya vaqti tugashidan oldin xarid qiling!",
    discountOffer: "24 SOAT ICHIDA -20%",
    bonusOffer: "+5% BONUS TOVAR",
    buyInDiscount: "Aksiyada Xarid Qilish (-20%)",
    buyInBonus: "+5% Bonus Bilan Olish",
    bonusDetail: "100 dona xarid qilsangiz +5 dona tekinga qo'shiladi!",
    ordersTitle: "Telegram Botga Yuborilgan Buyurtmalar",
    ordersSub: "Sotuvchi va Xaridorlar bilan oxirgi xaridlar tarixi",
    customer: "Mijoz",
    seller: "Sotuvchi",
    date: "Sana",
    totalAmount: "Jami summasi",
    cart: "Savat",
    emptyCart: "Savatingiz bo'sh",
    contactInfo: "Aloqa Ma'lumotlaringiz",
    yourName: "Ismingiz:",
    yourPhone: "Telefon Raqamingiz:",
    namePlaceholder: "masalan: Bexruz",
    sendOrder: "Buyurtmani Yuborish",
    adminPanel: "Admin Panel",
    addCard: "Yangi Card Qo'shish",
    editCard: "Cardni Tahrirlash",
    login: "Kirish",
    loginTitle: "Tizimga Kirish",
    registerTitle: "Ro'yxatdan O'tish",
    welcomeAdmin: "Xush kelibsiz Admin Bexruz!",
    welcomeUser: "Xush kelibsiz",
    orderSuccess: "Buyurtma Telegram botga muvaffaqiyatli yuborildi!",
    cardAdded: "Yangi Card saqlandi!",
    cardEdited: "Card muvaffaqiyatli tahrirlandi!",
    cardDeleted: "Kartochka o'chirildi!",
    gemQuantityLabel: "Qancha Gem / Robux / Valyuta kerak?",
    totalPriceLabel: "JAMI NARXI:",
    usdValLabel: "USD VALYUTASIDA:",
    addToCartBtn: "Savatga Qo'shish",
    cancel: "Bekor Qilish",
    save: "Saqlash",
    saving: "Saqlanmoqda...",
    theme: "Mavzu (Dark/Light)",
    navigation: "Navigatsiya"
  },
  ru: {
    store: "Магазин",
    categories: "Категории",
    deals: "Aкции",
    orders: "Заказы",
    searchPlaceholder: "Поиск игр и услуг...",
    heroSubtitle: "Геймерский Маркет",
    heroTitle1: "Brawl Stars, CS2, Clash Royale и ",
    heroTitle2: "Цифровые Услуги",
    allCategories: "Все",
    price: "Цена",
    select: "Выбрать",
    limitedOffers: "Ограниченные Предложения",
    specialDealsTitle: "Специальные Акции на 24 Часа",
    specialDealsSub: "Спешите купить до окончания акции!",
    discountOffer: "В ТЕЧЕНИЕ 24 ЧАСОВ -20%",
    bonusOffer: "+5% БОНУС К ТОВАРУ",
    buyInDiscount: "Купить по Акции (-20%)",
    buyInBonus: "Получить с Бонусом +5%",
    bonusDetail: "При покупке 100 штук +5 штук бесплатно!",
    ordersTitle: "Заказы, Отправленные в Telegram Бот",
    ordersSub: "История последних покупок с продавцами и покупателями",
    customer: "Клиент",
    seller: "Продавец",
    date: "Дата",
    totalAmount: "Итоговая сумма",
    cart: "Корзина",
    emptyCart: "Ваша корзина пуста",
    contactInfo: "Ваши Контактные Данные",
    yourName: "Ваше Имя:",
    yourPhone: "Ваш Номер Телефона:",
    namePlaceholder: "например: Бехруз",
    sendOrder: "Отправить Заказ",
    adminPanel: "Админ Панель",
    addCard: "Добавить Карточку",
    editCard: "Редактировать Карточку",
    login: "Вход",
    loginTitle: "Вход в Систему",
    registerTitle: "Регистрация",
    welcomeAdmin: "Добро пожаловать, Админ Бехруз!",
    welcomeUser: "Добро пожаловать",
    orderSuccess: "Заказ успешно отправлен в Telegram бот!",
    cardAdded: "Новая карточка сохранена!",
    cardEdited: "Карточка успешно отредактирована!",
    cardDeleted: "Карточка удалена!",
    gemQuantityLabel: "Сколько Gem / Robux / Валюты нужно?",
    totalPriceLabel: "ИТОГОВАЯ ЦЕНА:",
    usdValLabel: "В ВАЛЮТЕ USD:",
    addToCartBtn: "Добавить в Корзину",
    cancel: "Отмена",
    save: "Сохранить",
    saving: "Сохранение...",
    theme: "Тема (Темная/Светлая)",
    navigation: "Навигация"
  }
};

const RANDOM_SELLERS = ["GentlmeN Store", "CyberX Official", "Bexruz Digital", "Samina Games", "ProSeller UZ"];
const RANDOM_NAMES = ["Bexruz", "Muhiddin", "Sardor", "Jasur", "Diyorbek"];
const RANDOM_PHONES = ["+998 90 123 45 67", "+998 93 987 65 43", "+998 97 455 11 22", "+998 91 333 88 99"];

const DEFAULT_PRODUCTS = [
  {
    id: "def-1",
    Name: "Brawl Stars Gems",
    about: "Rasmiy Supercell ID orqali xavfsiz Brawl Stars qimmatbaho toshlarini olish.",
    value: "300",
    category: "Game Currency",
    img: "https://i.ytimg.com/vi/F7sZrHxgw8o/sddefault.jpg",
    isGemType: true
  },
  {
    id: "def-cr-1",
    Name: "Clash Royale Gems",
    about: "Clash Royale o'yini uchun rasmiy Supercell ID orqali tezkor Gems va Chest to'plamlari.",
    value: "350",
    category: "Game Currency",
    img: "https://skycoach.gg/storage/uploads/products/clash-royale-gems1752827282_picture_item_small.png",
    isGemType: true
  },
  {
    id: "def-cr-2",
    Name: "Clash Royale Pass Royale",
    about: "Clash Royale joriy mavsumi uchun olmos (Diamond) va oltin (Gold) Pass Royale obunasi.",
    value: "145000",
    category: "Digital Services",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLAQBTJlfTefPhOO2FZWC_1ZVq2i5dA5ctOsLTPcZEg&s=10",
    isGemType: false
  },
  {
    id: "def-pubg",
    Name: "PUBG Mobile UC",
    about: "PUBG Mobile uchun Player ID orqali tezkor va xavfsiz Unknown Cash (UC) to'ldirish.",
    value: "160",
    category: "Game Currency",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl35W-fF94BkJ-7dp92knylcGvmkbmhbjJNAnkleCqH3veSnribV-vrp8&s=10",
    isGemType: true
  },
  {
    id: "def-val",
    Name: "Valorant Points (VP)",
    about: "Riot Games Valorant o'yini uchun rasmiy VP kodlari va battle pass hisoblari.",
    value: "110000",
    category: "Game Currency",
    img: "https://static.wixstatic.com/media/75a354_9d847b8c81d04dfda8a63bce868d6b34~mv2.jpg/v1/fill/w_1600,h_900,al_c/75a354_9d847b8c81d04dfda8a63bce868d6b34~mv2.jpg https://cdn1.epicgames.com/offer/cbd5b0AD9E884242B101D0B708577F17/EGS_VALORANT_RiotGames_S1_2560x1440-1e24749f992f-b44c845b4",
    isGemType: false
  },
  {
    id: "def-2",
    Name: "CS2 Prime Status",
    about: "Counter-Strike 2 o'yini uchun rasmiy Prime Status va haftalik skin sovg'alari.",
    value: "180000",
    category: "Accounts",
    img: "https://images.g2a.com/470x276/1x1x0/counter-strike-global-offensive-prime-status-upgrade-steam-gift-global-i10000016291010/3fd153129c424adab385a9fc",
    isGemType: false
  },
  {
    id: "def-3",
    Name: "Minecraft Java & Bedrock Edition",
    about: "Litsenzialangan rasmiy Minecraft o'yini kaliti va to'liq kirish huquqi.",
    value: "180000",
    category: "Game Keys",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLGhTGfbLmOJzwYuqCVGTZKjna_IzJ_WQuFSkhEwP0A&s=10",
    isGemType: false
  },
  {
    id: "def-4",
    Name: "Roblox Robux",
    about: "Roblox o'yini uchun tezkor va arzon Robux to'ldirish xizmati.",
    value: "120",
    category: "Game Currency",
    img: "https://store-images.s-microsoft.com/image/apps.61456.64165482222602965.498fd674-a4bb-4f4c-a928-73fa2e98f25f.92841ccf-fdcf-493b-82d6-5ae1c51f03ab?q=90&w=480&h=270",
    isGemType: true
  },
  {
    id: "def-5",
    Name: "Steam Wallet Gift Card",
    about: "Steam hisobingizni AQSh dollari valyutasida xavfsiz to'ldiring.",
    value: "135000",
    category: "Digital Services",
    img: "https://cdn.dlcompare.com/others_jpg/upload/news/image/en-new-valve-guidelines-suggest-0fbf22a7-image-0fbf228a.jpg.webp",
    isGemType: false
  },
  {
    id: "def-6",
    Name: "Discord Nitro Full Boost",
    about: "2x Server Boost va HD strimlar uchun 1 yillik rasmiy Discord Nitro obunasi.",
    value: "220000",
    category: "Digital Services",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhmPb8CUD3KLdz-QYaPFq7SKgCPOJjDaCBTuoTAtJnWp3VSLhtPUXbatha&s=10",
    isGemType: false
  }
];

export default function Page() {
  const [lang, setLang] = useState('uz');
  const t = TRANSLATIONS[lang];

  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('store');
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [customerNameInput, setCustomerNameInput] = useState('');
  const [customerPhoneInput, setCustomerPhoneInput] = useState('+998 ');

  const [ordersHistory, setOrdersHistory] = useState([]);
  
  const [randomDiscountProduct, setRandomDiscountProduct] = useState(DEFAULT_PRODUCTS[0]);
  const [randomBonusProduct, setRandomBonusProduct] = useState(DEFAULT_PRODUCTS[1]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [emailInput, setEmailInput] = useState('');
  const [playerIdInput, setPlayerIdInput] = useState('');
  const [playerNickInput, setPlayerNickInput] = useState('');
  const [quantityInput, setQuantityInput] = useState(170);

  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [isAdminCardModalOpen, setIsAdminCardModalOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);
  const [cardName, setCardName] = useState('');
  const [cardAbout, setCardAbout] = useState('');
  const [cardImg, setCardImg] = useState('');
  const [cardValue, setCardValue] = useState('');
  const [submittingCard, setSubmittingCard] = useState(false);

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0B0F17';
      document.body.style.color = '#F3F4F6';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F3F4F6';
      document.body.style.color = '#111827';
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const generateRandomOrders = (availableProducts) => {
    const orderCount = Math.floor(Math.random() * 2) + 2;
    const generated = [];

    for (let i = 0; i < orderCount; i++) {
      const prod = availableProducts[Math.floor(Math.random() * availableProducts.length)];
      const seller = RANDOM_SELLERS[Math.floor(Math.random() * RANDOM_SELLERS.length)];
      const buyer = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
      const phone = RANDOM_PHONES[Math.floor(Math.random() * RANDOM_PHONES.length)];
      
      const qty = prod.isGemType || prod.category === 'Game Currency' ? Math.floor(Math.random() * 300) + 50 : 1;
      const unitVal = Number(prod.value || prod.price || 50000);
      const itemPrice = (prod.isGemType || prod.category === 'Game Currency') ? unitVal * qty : unitVal;

      generated.push({
        id: `ord-${100 + i}`,
        customerName: buyer,
        sellerName: seller,
        phone: phone,
        date: `19.09.2026, ${12 + i}:${10 + i * 15}`,
        totalSom: itemPrice,
        items: [
          {
            title: prod.Name || prod.title,
            quantity: qty,
            priceSom: itemPrice,
            playerId: `#${Math.floor(100000 + Math.random() * 900000)}`,
            playerNick: `${buyer}_Gamer`,
            image: prod.img || prod.image
          }
        ]
      });
    }

    setOrdersHistory(generated);
  };

  const fetchCards = async () => {
    try {
      const res = await fetch(MOCK_CARDS_API);
      if (res.ok) {
        const apiData = await res.json();
        if (Array.isArray(apiData) && apiData.length > 0) {
          const merged = [...DEFAULT_PRODUCTS, ...apiData];
          setProducts(merged);
          pickRandomDeals(merged);
          generateRandomOrders(merged);
        } else {
          pickRandomDeals(DEFAULT_PRODUCTS);
          generateRandomOrders(DEFAULT_PRODUCTS);
        }
      } else {
        pickRandomDeals(DEFAULT_PRODUCTS);
        generateRandomOrders(DEFAULT_PRODUCTS);
      }
    } catch (err) {
      pickRandomDeals(DEFAULT_PRODUCTS);
      generateRandomOrders(DEFAULT_PRODUCTS);
    }
  };

  const pickRandomDeals = (itemsList) => {
    if (!itemsList || itemsList.length === 0) return;
    const shuffled = [...itemsList].sort(() => 0.5 - Math.random());
    setRandomDiscountProduct(shuffled[0] || DEFAULT_PRODUCTS[0]);
    setRandomBonusProduct(shuffled[1] || DEFAULT_PRODUCTS[1]);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleOpenAddModal = () => {
    setEditingCardId(null);
    setCardName('');
    setCardAbout('');
    setCardImg('');
    setCardValue('');
    setIsAdminCardModalOpen(true);
  };

  const handleOpenEditModal = (card) => {
    setEditingCardId(card.id);
    setCardName(card.Name || card.title || '');
    setCardAbout(card.about || card.description || '');
    setCardImg(card.img || card.image || '');
    setCardValue(card.value || card.price || '');
    setIsAdminCardModalOpen(true);
  };

  const handleSaveCardSubmit = async (e) => {
    e.preventDefault();
    if (!cardName || !cardAbout || !cardValue) {
      alert(lang === 'uz' ? "Iltimos, barcha maydonlarni to'ldiring!" : "Пожалуйста, заполните все поля!");
      return;
    }

    setSubmittingCard(true);
    const cardPayload = {
      Name: cardName,
      about: cardAbout,
      img: cardImg || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
      value: cardValue.toString()
    };

    try {
      if (editingCardId) {
        if (!editingCardId.toString().startsWith('def-')) {
          await fetch(`${MOCK_CARDS_API}/${editingCardId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardPayload)
          });
        }
        setProducts(products.map(p => p.id === editingCardId ? { ...p, ...cardPayload } : p));
        showToast(t.cardEdited);
      } else {
        const res = await fetch(MOCK_CARDS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cardPayload)
        });

        if (res.ok) {
          const created = await res.json();
          setProducts([created, ...products]);
        } else {
          setProducts([{ id: Date.now().toString(), ...cardPayload }, ...products]);
        }
        showToast(t.cardAdded);
      }
    } catch (err) {
      if (editingCardId) {
        setProducts(products.map(p => p.id === editingCardId ? { ...p, ...cardPayload } : p));
      } else {
        setProducts([{ id: Date.now().toString(), ...cardPayload }, ...products]);
      }
      showToast(t.cardAdded);
    } finally {
      setSubmittingCard(false);
      setIsAdminCardModalOpen(false);
    }
  };

  const handleDeleteCard = async (id) => {
    if (!confirm(lang === 'uz' ? "Haqiqatdan ham ushbu kartochkani o'chirmoqchimisiz?" : "Вы действительно хотите удалить эту карточку?")) return;

    try {
      if (!id.toString().startsWith('def-')) {
        await fetch(`${MOCK_CARDS_API}/${id}`, { method: 'DELETE' });
      }
      setProducts(products.filter(p => p.id !== id));
      showToast(t.cardDeleted);
    } catch (err) {
      setProducts(products.filter(p => p.id !== id));
      showToast(t.cardDeleted);
    }
  };

  const filteredProducts = products.filter(p => {
    const name = p.Name || p.title || '';
    const about = p.about || p.description || '';
    const cat = p.category || 'All';

    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          about.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || cat === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSelectProduct = (product, discountPercent = 0, bonusPercent = 0) => {
    setSelectedProduct({ ...product, discountPercent, bonusPercent });
    setEmailInput('');
    setPlayerIdInput('');
    setPlayerNickInput('');
    setQuantityInput(product.category === 'Game Currency' || product.isGemType ? 100 : 1);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    let unitPrice = Number(selectedProduct.value || selectedProduct.price || 50000);
    let qty = Math.max(1, Number(quantityInput) || 1);

    if (selectedProduct.discountPercent) {
      unitPrice = unitPrice * (1 - selectedProduct.discountPercent / 100);
    }

    if (selectedProduct.bonusPercent && (selectedProduct.category === 'Game Currency' || selectedProduct.isGemType)) {
      qty = Math.round(qty * (1 + selectedProduct.bonusPercent / 100));
    }

    const totalPriceSom = (selectedProduct.category === 'Game Currency' || selectedProduct.isGemType) ? unitPrice * Number(quantityInput || 1) : unitPrice;
    const totalPriceUsd = (totalPriceSom / USD_RATE).toFixed(2);

    const newItem = {
      cartItemId: Date.now(),
      id: selectedProduct.id,
      title: selectedProduct.Name || selectedProduct.title || 'Mahsulot',
      priceSom: totalPriceSom,
      priceUsd: totalPriceUsd,
      quantity: qty,
      image: selectedProduct.img || selectedProduct.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      email: emailInput || 'Kiritilmadi',
      playerId: playerIdInput || 'Kiritilmadi',
      playerNick: playerNickInput || 'Kiritilmadi'
    };

    setCart([...cart, newItem]);
    setSelectedProduct(null);
    showToast(lang === 'uz' ? "Mahsulot savatga qo'shildi!" : "Товар добавлен в корзину!");
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
  };

  const cartTotalSom = cart.reduce((sum, item) => sum + item.priceSom, 0);
  const cartTotalUsd = (cartTotalSom / USD_RATE).toFixed(2);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    if (!customerNameInput.trim()) {
      alert(lang === 'uz' ? "Iltimos, ismingizni kiriting!" : "Пожалуйста, введите ваше имя!");
      return;
    }

    if (!customerPhoneInput.trim() || customerPhoneInput.trim().length < 9) {
      alert(lang === 'uz' ? "Iltimos, telefon raqamingizni to'liq kiriting (+998...)!" : "Пожалуйста, введите полный номер телефона (+998...)!");
      return;
    }

    const orderTimeStr = new Date().toLocaleString('uz-UZ');

    let message = `🛒 <b>YANGI BUYURTMA (CYBERX STORE)</b>\n\n`;
    message += `👤 <b>Mijoz Ismi:</b> ${customerNameInput}\n`;
    message += `📞 <b>Tel:</b> <code>${customerPhoneInput}</code>\n`;
    message += `🔑 <b>Login Akkaunt:</b> ${user ? user.userName : 'Mehmon'}\n`;
    message += `📅 <b>Sana:</b> ${orderTimeStr}\n\n`;
    message += `📦 <b>MAHSULOTLAR:</b>\n`;

    cart.forEach((item, index) => {
      message += `\n${index + 1}. <b>${item.title}</b>\n`;
      if (item.email !== 'Kiritilmadi') message += `   • 📧 Email / Login: <code>${item.email}</code>\n`;
      if (item.playerId !== 'Kiritilmadi') message += `   • 🆔 Player ID: <code>${item.playerId}</code>\n`;
      if (item.playerNick !== 'Kiritilmadi') message += `   • 🏷️ Player Nick: <code>${item.playerNick}</code>\n`;
      message += `   • 💎 Miqdori: ${item.quantity} (Gem/Dona)\n`;
      message += `   • 💰 Narxi: ${item.priceSom.toLocaleString()} SO'M (~$${item.priceUsd} USD)\n`;
    });

    message += `\n💵 <b>JAMI TO'LOV:</b> ${cartTotalSom.toLocaleString()} SO'M ($${cartTotalUsd} USD)\n`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (response.ok) {
        setCart([]);
        setIsCartOpen(false);
        setCustomerNameInput('');
        setCustomerPhoneInput('+998 ');
        showToast(t.orderSuccess);
      } else {
        alert("Telegram botga yuborishda xatolik!");
      }
    } catch (err) {
      alert("Xatolik ro'y berdi!");
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!usernameInput || !passwordInput) {
      setAuthError(lang === 'uz' ? "Barcha maydonlarni to'ldiring!" : "Заполните все поля!");
      return;
    }

    if (usernameInput === 'bexruz' && passwordInput === '1234') {
      setUser({ userName: 'bexruz', isAdmin: true });
      setAuthModal(false);
      showToast(t.welcomeAdmin);
      return;
    }

    if (authMode === 'register') {
      try {
        const res = await fetch(MOCK_USERS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usersName: usernameInput,
            parol: passwordInput
          })
        });

        if (res.ok) {
          const createdUser = await res.json();
          setUser({ userName: createdUser.usersName, isAdmin: false });
          setAuthModal(false);
          showToast(lang === 'uz' ? "Muvaffaqiyatli ro'yxatdan o'tdingiz!" : "Вы успешно зарегистрировались!");
        } else {
          setAuthError("API ga saqlashda xatolik!");
        }
      } catch (err) {
        setAuthError("Server bilan bog'lanishda xatolik!");
      }
    } else {
      try {
        const res = await fetch(MOCK_USERS_API);
        const data = await res.json();
        const foundUser = Array.isArray(data) && data.find(u => u.usersName === usernameInput && u.parol === passwordInput);

        if (foundUser) {
          setUser({ userName: foundUser.usersName, isAdmin: false });
          setAuthModal(false);
          showToast(`${t.welcomeUser}, ${foundUser.usersName}!`);
        } else {
          setAuthError(lang === 'uz' ? "Login yoki parol noto'g'ri!" : "Неверный логин или пароль!");
        }
      } catch (err) {
        setAuthError("Tizimga kirishda xatolik.");
      }
    }
  };

  const selectCategoryFromCard = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveTab('store');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans tracking-wide ${darkMode ? 'bg-[#0B0F17] text-gray-100' : 'bg-gray-100 text-gray-900'}`}>

      {toastMessage && (
        <div className="fixed bottom-6 right-4 md:right-6 z-50 bg-emerald-500 text-black px-4 py-2.5 md:px-5 md:py-3 rounded-2xl shadow-2xl font-black text-xs md:text-sm flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5" />
          {toastMessage}
        </div>
      )}

      {/* HEADER / NAVBAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${darkMode ? 'bg-[#0B0F17]/90 border-gray-800' : 'bg-white/90 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-2">
          
          {/* LOGO */}
          <div className="flex items-center gap-2 md:gap-2.5 cursor-pointer" onClick={() => setActiveTab('store')}>
            <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src="/logo.svg" alt="CyberX Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-lg md:text-2xl font-black tracking-wider bg-gradient-to-r from-emerald-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                CYBERX
              </span>
              <span className="text-[8px] md:text-[10px] block text-gray-400 font-bold tracking-widest uppercase">Digital Store</span>
            </div>
          </div>

          {/* DESKTOP NAV MENU */}
          <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-2xl border ${darkMode ? 'bg-gray-900/60 border-gray-800' : 'bg-gray-200 border-gray-300'}`}>
            {[
              { id: 'store', label: t.store, icon: Gamepad2 },
              { id: 'categories', label: t.categories, icon: SlidersHorizontal },
              { id: 'deals', label: t.deals, icon: Flame },
              { id: 'orders', label: t.orders, icon: PackageCheck },
            ].map(tab => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase transition-all duration-300 hover:scale-105 ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-black shadow-md' 
                      : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}

            <a
              href="https://karen-ai-ten.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase text-orange-500 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              Help by Karen
            </a>
          </nav>

          {/* RIGHT ACTIONS (UZ/RU, CART, REGISTER, BURGER) */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* UZ / RU SWITCHER */}
            <div 
              onClick={() => setLang(lang === 'uz' ? 'ru' : 'uz')}
              className="relative w-16 md:w-24 h-8 md:h-11 p-0.5 md:p-1 rounded-2xl bg-gradient-to-r from-fuchsia-300/40 via-purple-300/30 to-fuchsia-300/40 border-2 border-fuchsia-300 cursor-pointer shadow-lg hover:border-purple-400 transition-all duration-300 flex items-center justify-between select-none"
              title="Tilni o'zgartirish / Сменить язык"
            >
              <div 
                className={`absolute top-0.5 bottom-0.5 md:top-1 md:bottom-1 w-7 md:w-10 rounded-xl bg-gradient-to-r from-emerald-500 to-orange-500 shadow-md transition-all duration-300 ease-in-out ${
                  lang === 'uz' ? 'left-0.5 md:left-1' : 'left-[33px] md:left-[48px]'
                }`}
              />

              <span className={`relative z-10 w-7 md:w-10 text-center text-[9px] md:text-xs font-black tracking-wider transition-colors duration-300 ${lang === 'uz' ? 'text-black' : 'text-gray-300'}`}>
                UZ
              </span>
              <span className={`relative z-10 w-7 md:w-10 text-center text-[9px] md:text-xs font-black tracking-wider transition-colors duration-300 ${lang === 'ru' ? 'text-black' : 'text-gray-300'}`}>
                RU
              </span>
            </div>

            {/* DESKTOP DARK MODE BUTTON */}
            <button
              onClick={toggleDarkMode}
              className={`hidden md:flex p-2.5 rounded-xl border hover:scale-105 shadow-md items-center justify-center transition-all ${darkMode ? 'bg-gray-900 border-gray-800 text-amber-400' : 'bg-gray-200 border-gray-300 text-indigo-600'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CART BUTTON */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 md:p-2.5 rounded-xl border hover:scale-105 shadow-md transition-all ${darkMode ? 'bg-gray-900 border-gray-800 text-emerald-400' : 'bg-gray-200 border-gray-300 text-emerald-600'}`}
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-black font-extrabold text-[9px] md:text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0B0F17]">
                  {cart.length}
                </span>
              )}
            </button>

            {/* USER LOGIN / REGISTER */}
            {user ? (
              <div className="flex items-center gap-1.5">
                {user.isAdmin && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`hidden md:block px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      activeTab === 'admin'
                        ? 'bg-orange-500 text-black border-orange-400'
                        : 'bg-orange-500/10 text-orange-500 border-orange-500/30'
                    }`}
                  >
                    {t.adminPanel}
                  </button>
                )}
                <div className={`flex items-center gap-1.5 border px-2 py-1 md:px-3 md:py-1.5 rounded-xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-200 border-gray-300'}`}>
                  <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
                  <span className="text-[10px] md:text-xs font-extrabold uppercase truncate max-w-[50px] md:max-w-none">{user.userName}</span>
                  <button onClick={() => setUser(null)} className="text-gray-400 hover:text-red-500 ml-0.5">
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setAuthModal(true); }}
                className="flex items-center gap-1 px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-black text-[10px] md:text-xs uppercase hover:opacity-90 shadow-lg shadow-emerald-500/20 transition-transform active:scale-95"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t.login}</span>
              </button>
            )}

            {/* TELEFONDA BURGER MENU TUGMASI */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border active:scale-95 transition-all ${
                darkMode ? 'bg-gray-900 border-gray-800 text-emerald-400' : 'bg-gray-200 border-gray-300 text-emerald-600'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* TELEFONDA BURGER MENU SLIDE-IN MODAL/PANEL */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div className={`w-4/5 max-w-sm h-full p-6 border-l shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 ${
            darkMode ? 'bg-[#0B0F17] border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-6">
                <div className="flex items-center gap-2">
                  <img src="/logo.svg" className="w-8 h-8" />
                  <span className="font-black text-lg text-emerald-500">CYBERX</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* NAVİGATSİYA BO'LIMLARI */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-black uppercase text-gray-500 block mb-2">{t.navigation}</span>
                {[
                  { id: 'store', label: t.store, icon: Gamepad2 },
                  { id: 'categories', label: t.categories, icon: SlidersHorizontal },
                  { id: 'deals', label: t.deals, icon: Flame },
                  { id: 'orders', label: t.orders, icon: PackageCheck },
                ].map(tab => {
                  const IconComp = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-black shadow-lg shadow-emerald-500/20'
                          : darkMode ? 'bg-gray-900/60 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}

                {user && user.isAdmin && (
                  <button
                    onClick={() => { setActiveTab('admin'); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase bg-orange-500/10 text-orange-500 border border-orange-500/30"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    {t.adminPanel}
                  </button>
                )}

                <a
                  href="https://karen-ai-ten.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase text-orange-500 bg-orange-500/10 border border-orange-500/30"
                >
                  <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                  Help by Karen
                </a>
              </div>

              {/* DARK MODE SWITCHER IN BURGER MENU */}
              <div className="pt-4 border-t border-gray-800">
                <span className="text-[10px] font-black uppercase text-gray-500 block mb-3">{t.theme}</span>
                <button
                  onClick={toggleDarkMode}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-black border ${
                    darkMode ? 'bg-gray-900 border-gray-800 text-amber-400' : 'bg-gray-100 border-gray-300 text-indigo-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{darkMode ? "Dark Mode (Tungi)" : "Light Mode (Kunduzgi)"}</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 text-center text-[10px] text-gray-500 font-bold">
              © 2026 CYBERX Digital Store
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      {activeTab === 'store' && (
        <section className="relative overflow-hidden py-6 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className={`border rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="max-w-2xl relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 md:mb-4">
                <Zap className="w-3.5 h-3.5" /> {t.heroSubtitle}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-3 md:mb-4">
                {t.heroTitle1}<span className="bg-gradient-to-r from-emerald-500 to-orange-500 bg-clip-text text-transparent">{t.heroTitle2}</span>
              </h1>

              <div className="relative max-w-lg mt-4 md:mt-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 md:pl-12 pr-4 py-3 text-xs md:text-sm border rounded-2xl placeholder-gray-400 focus:outline-none focus:border-emerald-500 shadow-inner ${darkMode ? 'bg-[#0B0F17] border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        {activeTab === 'store' && (
          <div>
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 md:mb-8 no-scrollbar">
              {['All', 'Game Currency', 'Game Keys', 'Accounts', 'Digital Services'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-extrabold text-[11px] md:text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
                      : darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  {cat === 'All' ? t.allCategories : cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className={`group border rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200'}`}
                >
                  <div>
                    <div className="relative h-40 md:h-48 overflow-hidden bg-gray-950">
                      <img
                        src={product.img || product.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80"}
                        alt={product.Name || product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.category && (
                        <span className="absolute bottom-3 left-3 bg-orange-500 text-black font-black text-[9px] md:text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                          {product.category}
                        </span>
                      )}
                    </div>

                    <div className="p-4 md:p-5">
                      <h3 className="text-lg md:text-xl font-black group-hover:text-emerald-500 transition-colors mb-1.5">
                        {product.Name || product.title}
                      </h3>
                      <p className="text-gray-400 text-xs font-medium line-clamp-2 mb-3 leading-relaxed">
                        {product.about || product.description || "Rasmiy kafolatlangan raqamli mahsulot."}
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 md:p-5 pt-0 flex items-center justify-between border-t mt-auto ${darkMode ? 'border-gray-800/50' : 'border-gray-100'}`}>
                    <div>
                      <span className="text-[9px] md:text-[10px] text-gray-500 block font-bold uppercase tracking-wider">{t.price}</span>
                      <span className="text-base md:text-lg font-black text-emerald-500">
                        {Number(product.value || product.price || 50000).toLocaleString()} SO'M
                      </span>
                    </div>
                    <button
                      onClick={() => handleSelectProduct(product)}
                      className="px-3.5 py-2 md:px-4 md:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
                    >
                      <Plus className="w-4 h-4" /> {t.select}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOIFALAR BO'LIMI */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
              <SlidersHorizontal className="w-6 h-6 text-emerald-500" /> {t.categories}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: 'Game Currency', label: 'Game Currency', count: 'Brawl Stars, Clash Royale, PUBG', icon: Zap },
                { name: 'Game Keys', label: 'Game Keys', count: 'Steam, Minecraft, CS2', icon: Gamepad2 },
                { name: 'Accounts', label: 'Accounts', count: 'CS2 Prime, Valorant', icon: User },
                { name: 'Digital Services', label: 'Digital Services', count: 'Discord Nitro, Telegram Pass', icon: CreditCard },
              ].map((cat, idx) => {
                const IconComp = cat.icon;
                return (
                  <div 
                    key={idx} 
                    onClick={() => selectCategoryFromCard(cat.name)}
                    className={`group border rounded-3xl p-5 md:p-6 shadow-md cursor-pointer transition-all duration-300 hover:border-emerald-500 hover:-translate-y-1 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <IconComp className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <h3 className="text-base md:text-lg font-black mb-1 group-hover:text-emerald-400 transition-colors">{cat.label}</h3>
                    <p className="text-xs text-gray-400 font-semibold">{cat.count}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AKSIYALAR BO'LIMI */}
        {activeTab === 'deals' && (
          <div className="space-y-6 md:space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-500/10 text-orange-500 font-black text-[10px] md:text-xs uppercase tracking-widest border border-orange-500/30">
                <Flame className="w-4 h-4" /> {t.limitedOffers}
              </span>
              <h2 className="text-2xl md:text-3xl font-black mt-2 tracking-tight">{t.specialDealsTitle}</h2>
              <p className="text-gray-400 text-xs font-semibold mt-1">{t.specialDealsSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className={`border rounded-3xl p-5 md:p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-950 border-orange-500/30' : 'bg-white border-orange-200'}`}>
                <div className="absolute top-4 right-4 bg-red-500 text-white text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Clock className="w-3.5 h-3.5" /> {t.discountOffer}
                </div>

                <div className="flex gap-4 items-center mb-4 mt-6 md:mt-0">
                  <img src={randomDiscountProduct.img || randomDiscountProduct.image} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-gray-800" />
                  <div>
                    <h3 className="text-xl md:text-2xl font-black">{randomDiscountProduct.Name || randomDiscountProduct.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{randomDiscountProduct.about || randomDiscountProduct.description}</p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="text-lg md:text-xl font-black text-emerald-500">
                        {(Number(randomDiscountProduct.value || 50000) * 0.8).toLocaleString()} SO'M
                      </span>
                      <span className="text-xs text-gray-500 line-through font-semibold">
                        {Number(randomDiscountProduct.value || 50000).toLocaleString()} SO'M
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectProduct(randomDiscountProduct, 20, 0)}
                  className="w-full py-3 md:py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-transform"
                >
                  <Percent className="w-4 h-4" /> {t.buyInDiscount}
                </button>
              </div>

              <div className={`border rounded-3xl p-5 md:p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-950 border-emerald-500/30' : 'bg-white border-emerald-200'}`}>
                <div className="absolute top-4 right-4 bg-emerald-500 text-black text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Gift className="w-3.5 h-3.5" /> {t.bonusOffer}
                </div>

                <div className="flex gap-4 items-center mb-4 mt-6 md:mt-0">
                  <img src={randomBonusProduct.img || randomBonusProduct.image} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-gray-800" />
                  <div>
                    <h3 className="text-xl md:text-2xl font-black">{randomBonusProduct.Name || randomBonusProduct.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{randomBonusProduct.about || randomBonusProduct.description}</p>
                    <p className="text-xs text-emerald-400 font-extrabold mt-2 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> {t.bonusDetail}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectProduct(randomBonusProduct, 0, 5)}
                  className="w-full py-3 md:py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-transform"
                >
                  <Gift className="w-4 h-4" /> {t.buyInBonus}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BUYURTMALAR BO'LIMI */}
        {activeTab === 'orders' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-emerald-500 mx-auto mb-2" />
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t.ordersTitle}</h2>
              <p className="text-gray-400 text-xs font-semibold mt-1">{t.ordersSub}</p>
            </div>

            <div className="space-y-4">
              {ordersHistory.map((ord) => (
                <div key={ord.id} className={`border rounded-3xl p-5 md:p-6 shadow-xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-2 mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-extrabold uppercase">{t.customer}: <b className="text-emerald-400">{ord.customerName}</b> ({ord.phone})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-extrabold text-gray-400 uppercase">{t.seller}: <b className="text-orange-400">{ord.sellerName}</b></span>
                      </div>
                      <span className="text-[10px] text-gray-500 block font-semibold">{t.date}: {ord.date}</span>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">{t.totalAmount}:</span>
                      <span className="text-base md:text-lg font-black text-emerald-500">{ord.totalSom.toLocaleString()} SO'M</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className={`p-3 rounded-2xl flex items-center gap-3 border ${darkMode ? 'bg-gray-950 border-gray-800/80' : 'bg-gray-50 border-gray-200'}`}>
                        <img src={it.image} className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover border border-gray-800" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-xs md:text-sm truncate">{it.title}</h4>
                          <p className="text-[10px] md:text-xs text-gray-400 font-medium">ID: <code>{it.playerId}</code> | Nick: <code>{it.playerNick}</code></p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] md:text-xs text-orange-400 font-black block">{it.quantity} dona/gem</span>
                          <span className="text-[10px] md:text-xs font-black text-emerald-500">{it.priceSom.toLocaleString()} SO'M</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN PANEL */}
        {activeTab === 'admin' && (
          <div>
            {!user || !user.isAdmin ? (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-6 rounded-3xl text-center max-w-md mx-auto">
                <Lock className="w-12 h-12 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-1">Ruxsat Etilmagan!</h3>
                <p className="text-sm">Admin panel uchun login: <b>bexruz</b>, parol: <b>1234</b></p>
              </div>
            ) : (
              <div className="space-y-6 md:space-y-8">
                <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 md:p-6 rounded-3xl border shadow-md ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-orange-500 flex items-center gap-2">
                      <SlidersHorizontal className="w-6 h-6" /> {t.adminPanel}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">MockAPI `/cards` resursini boshqarish va yangi cardlar qo'shish</p>
                  </div>

                  <button
                    onClick={handleOpenAddModal}
                    className="px-4 py-2.5 md:px-5 md:py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 hover:opacity-90 active:scale-95 transition-transform"
                  >
                    <PlusCircle className="w-5 h-5" />
                    {t.addCard}
                  </button>
                </div>

                <div className={`border rounded-3xl overflow-x-auto shadow-md ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className={`border-b text-[10px] font-black uppercase ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                        <th className="p-4">NAME</th>
                        <th className="p-4">ABOUT</th>
                        <th className="p-4">VALUE (NARXI)</th>
                        <th className="p-4 text-right">AMALLAR</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y text-xs md:text-sm ${darkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td className="p-4 font-bold flex items-center gap-3">
                            <img src={p.img || p.image} className="w-9 h-9 rounded-xl object-cover" />
                            <span>{p.Name || p.title}</span>
                          </td>
                          <td className="p-4 text-xs text-gray-400 max-w-xs truncate">{p.about || p.description}</td>
                          <td className="p-4 font-extrabold text-emerald-500">{Number(p.value || p.price || 50000).toLocaleString()} SO'M</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-2 text-amber-500 hover:bg-amber-500/10 rounded-lg mr-1"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCard(p.id)}
                              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* DINAMIK MODAL FORMALAR */}
      {selectedProduct && (() => {
        let unitPrice = Number(selectedProduct.value || selectedProduct.price || 50000);
        let qty = Math.max(1, Number(quantityInput) || 1);
        const isCurrency = selectedProduct.category === 'Game Currency' || selectedProduct.isGemType;
        
        const titleLower = (selectedProduct.Name || selectedProduct.title || '').toLowerCase();
        const isSupercell = titleLower.includes('brawl') || titleLower.includes('clash') || selectedProduct.gameType === 'supercell';
        const isAccountOrKey = titleLower.includes('cs2') || titleLower.includes('steam') || titleLower.includes('discord') || titleLower.includes('valorant') || selectedProduct.gameType === 'account';

        if (selectedProduct.discountPercent) {
          unitPrice = unitPrice * (1 - selectedProduct.discountPercent / 100);
        }

        const calculatedSom = isCurrency ? unitPrice * qty : unitPrice;
        const calculatedUsd = (calculatedSom / USD_RATE).toFixed(2);

        return (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className={`border rounded-3xl max-w-lg w-full p-5 md:p-6 relative shadow-2xl my-auto animate-in zoom-in-95 duration-200 ${darkMode ? 'bg-[#111827] border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-900'}`}>
              <button
                onClick={() => setSelectedProduct(null)}
                className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-gray-900 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-black'}`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex gap-4 items-center mb-5">
                <img src={selectedProduct.img || selectedProduct.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80"} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border border-gray-800" />
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold">{selectedProduct.Name || selectedProduct.title}</h3>
                  <span className="text-xs bg-orange-500/20 text-orange-500 font-bold px-2 py-0.5 rounded-md">{selectedProduct.category || 'Game'}</span>
                  {selectedProduct.discountPercent > 0 && (
                    <span className="ml-2 text-xs bg-red-500 text-white font-bold px-2 py-0.5 rounded-md">-{selectedProduct.discountPercent}% OFF</span>
                  )}
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 mb-5">
                {isCurrency && (
                  <div>
                    <label className="text-xs font-extrabold text-orange-400 block mb-1 uppercase">
                      {t.gemQuantityLabel}
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="170"
                      value={quantityInput}
                      onChange={(e) => setQuantityInput(e.target.value)}
                      className={`w-full border rounded-xl px-4 py-2.5 md:py-3 text-sm font-black outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-950 border-gray-800 text-emerald-400' : 'bg-gray-100 border-gray-300 text-emerald-600'}`}
                    />
                  </div>
                )}

                {/* 1. SUPERCELL O'YINLARI: Supercell Email va ID */}
                {isSupercell && (
                  <>
                    <div>
                      <label className="text-xs font-extrabold text-amber-400 block mb-1 uppercase flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" /> Supercell ID Email Pochta:
                      </label>
                      <input
                        type="email"
                        placeholder="supercell_account@gmail.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-extrabold text-gray-400 block mb-1 uppercase">O'yinchi Tag / Player ID (#8YPR...):</label>
                      <input
                        type="text"
                        placeholder="#8YPR90GG"
                        value={playerIdInput}
                        onChange={(e) => setPlayerIdInput(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                      />
                    </div>
                  </>
                )}

                {/* 2. STANDART O'YINLAR (Minecraft, PUBG, Roblox): Nickname va Player ID */}
                {!isSupercell && !isAccountOrKey && (
                  <>
                    <div>
                      <label className="text-xs font-extrabold text-gray-400 block mb-1 uppercase">O'yinchi Niki (Nick / Name):</label>
                      <input
                        type="text"
                        placeholder="Gamer_Pro_UZ"
                        value={playerNickInput}
                        onChange={(e) => setPlayerNickInput(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-extrabold text-gray-400 block mb-1 uppercase">O'yinchi Player ID / UID:</label>
                      <input
                        type="text"
                        placeholder="5123987410"
                        value={playerIdInput}
                        onChange={(e) => setPlayerIdInput(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                      />
                    </div>
                  </>
                )}

                {/* 3. AKKOUNT / DIGITALS (CS2, Steam, Discord Nitro): Pochta yoki Login */}
                {isAccountOrKey && (
                  <div>
                    <label className="text-xs font-extrabold text-emerald-400 block mb-1 uppercase flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5" /> Akkaunt Logini yoki Pochtasi:
                    </label>
                    <input
                      type="text"
                      placeholder="steam_login yoki mail@gmail.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                    />
                  </div>
                )}

                <div className={`p-4 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <div>
                    <span className="text-[10px] md:text-xs text-gray-400 font-bold block">{t.totalPriceLabel}</span>
                    <span className="text-lg md:text-xl font-black text-emerald-500">{calculatedSom.toLocaleString()} SO'M</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] md:text-xs text-gray-400 font-bold block">{t.usdValLabel}</span>
                    <span className="text-base md:text-lg font-extrabold text-amber-500">${calculatedUsd} USD</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 text-black font-extrabold text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 active:scale-95 transition-transform"
              >
                <ShoppingBag className="w-5 h-5 inline mr-2" /> {t.addToCartBtn}
              </button>
            </div>
          </div>
        );
      })()}

      {/* SAVAT MODALI */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className={`border-l w-full max-w-md h-full p-5 md:p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 ${darkMode ? 'bg-[#111827] border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-900'}`}>
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-4 md:mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-extrabold text-base md:text-lg">{t.cart} ({cart.length})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">{t.emptyCart}</p>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className={`border p-3.5 rounded-2xl flex items-center justify-between gap-3 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                      <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs md:text-sm truncate">{item.title}</h4>
                        {item.email !== 'Kiritilmadi' && <p className="text-[10px] md:text-xs text-amber-400">Email: {item.email}</p>}
                        {item.playerId !== 'Kiritilmadi' && <p className="text-[10px] md:text-xs text-gray-400">ID: {item.playerId}</p>}
                        {item.playerNick !== 'Kiritilmadi' && <p className="text-[10px] md:text-xs text-gray-400">Nick: {item.playerNick}</p>}
                        <p className="text-[10px] md:text-xs text-orange-400 font-bold">Miqdor: {item.quantity}</p>
                        <p className="text-xs md:text-sm font-extrabold text-emerald-500 mt-0.5">
                          {item.priceSom.toLocaleString()} SO'M <span className="text-[10px] text-amber-500">(${item.priceUsd})</span>
                        </p>
                      </div>
                      <button onClick={() => removeFromCart(item.cartItemId)} className="p-2 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className={`p-4 rounded-2xl border space-y-3 mb-6 ${darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className="text-xs font-black uppercase text-orange-400 tracking-wider flex items-center gap-1.5">
                    <User className="w-4 h-4" /> {t.contactInfo}
                  </h4>

                  <div>
                    <label className="text-[11px] font-bold text-gray-400 block mb-1">{t.yourName}</label>
                    <input
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={customerNameInput}
                      onChange={(e) => setCustomerNameInput(e.target.value)}
                      className={`w-full border rounded-xl px-3.5 py-2 text-xs md:text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-400 block mb-1">{t.yourPhone}</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="+998 90 123 45 67"
                        value={customerPhoneInput}
                        onChange={(e) => setCustomerPhoneInput(e.target.value)}
                        className={`w-full border rounded-xl pl-9 pr-3 py-2 text-xs md:text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-gray-800 space-y-3">
                <div className="flex justify-between items-center text-base md:text-lg font-black">
                  <span>Jami:</span>
                  <div className="text-right">
                    <div className="text-emerald-500">{cartTotalSom.toLocaleString()} SO'M</div>
                    <div className="text-xs text-amber-500 font-bold">${cartTotalUsd} USD</div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 md:py-4 bg-gradient-to-r from-emerald-500 via-orange-500 to-amber-500 text-black font-extrabold text-sm md:text-base rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-transform"
                >
                  <Send className="w-5 h-5" /> {t.sendOrder}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN CARD MODAL */}
      {isAdminCardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-3xl max-w-lg w-full p-5 md:p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 ${darkMode ? 'bg-[#111827] border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-900'}`}>
            <button
              onClick={() => setIsAdminCardModalOpen(false)}
              className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-gray-900 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-black'}`}
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl md:text-2xl font-black mb-1 text-emerald-500">
              {editingCardId ? t.editCard : t.addCard}
            </h3>

            <form onSubmit={handleSaveCardSubmit} className="space-y-3 md:space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold block mb-1 text-gray-400">Name</label>
                <input
                  type="text"
                  placeholder="Clash Royale Gems"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1 text-gray-400">value (SO'M)</label>
                <input
                  type="number"
                  placeholder="85000"
                  value={cardValue}
                  onChange={(e) => setCardValue(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1 text-gray-400">img (URL)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={cardImg}
                  onChange={(e) => setCardImg(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1 text-gray-400">about</label>
                <textarea
                  rows="3"
                  placeholder="Details..."
                  value={cardAbout}
                  onChange={(e) => setCardAbout(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAdminCardModalOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={submittingCard}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold rounded-xl text-sm shadow-md active:scale-95 transition-transform"
                >
                  {submittingCard ? t.saving : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AUTH MODAL (LOGIN / REGISTER) */}
      {authModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`border rounded-3xl max-w-md w-full p-6 relative shadow-2xl animate-in zoom-in-95 duration-200 ${darkMode ? 'bg-[#111827] border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-900'}`}
          >
            <button
              onClick={() => setAuthModal(false)}
              className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
                darkMode ? 'bg-gray-900 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-black'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black">
                  {authMode === 'login' ? t.loginTitle : t.registerTitle}
                </h3>
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded-xl mb-4 text-center font-bold">
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-1">Username</label>
                  <input
                    type="text"
                    placeholder="Your login"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 ${
                      darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-1">Parol</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className={`w-full border rounded-xl pl-4 pr-11 py-2.5 text-sm outline-none focus:border-emerald-500 ${
                        darkMode ? 'bg-gray-950 border-gray-800 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-orange-500 to-amber-500 text-black font-extrabold text-sm shadow-md hover:opacity-95 active:scale-95 transition-transform mt-2"
                >
                  {authMode === 'login' ? t.loginTitle : t.registerTitle}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-gray-800 text-center">
                {authMode === 'login' ? (
                  <button
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className="text-emerald-500 font-bold text-xs underline hover:text-emerald-400 transition-colors"
                  >
                    {t.registerTitle}
                  </button>
                ) : (
                  <button
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className="text-orange-500 font-bold text-xs underline hover:text-orange-400 transition-colors"
                  >
                    {t.loginTitle}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={`border-t mt-12 md:mt-20 py-6 md:py-8 text-center text-xs text-gray-500 ${darkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}>
        <p>© 2026 CYBERX Digital Store. Barcha huquqlar himoyalangan. Create by GentlmeN</p>
      </footer>
    </div>
  );
}