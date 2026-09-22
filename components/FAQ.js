"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";

const FAQ_DATA = {
  uz: {
    title: "Ko'p Beriladigan Savollar",
    subTitle: "Xarid va xizmatlar bo'yicha eng muhim savollarga javoblar",
    items: [
      {
        q: "Hisobimga o'yin valyutasi qancha vaqtda tushadi?",
        a: "To'lov amalga oshirilgandan va kerakli ma'lumotlar taqdim etilgandan so'ng, buyurtma 5-15 daqiqa ichida avtomatik ravishda bajariladi."
      },
      {
        q: "Hisobim bloklanib qolmaydimi? Bu xavfsizmi?",
        a: "Mutlaqo xavfsiz! Barcha xaridlar rasmiy o'yin ID yoki ishonchli distribyutorlar orqali xavfsiz va qonuniy usulda amalga oshiriladi."
      },
      {
        q: "Buyurtma berish uchun parolimni berishim shartmi?",
        a: "Yo'q, aksariyat xizmatlarimiz uchun faqatgina Player ID (yoki Supercell ID email) kifoya qiladi. Parol hech qachon so'ralmaydi."
      },
      {
        q: "To'lov o'tgandan keyin muammo bo'lsa kimga murojaat qilaman?",
        a: "Yuqoridagi 'Help by Karen' tugmasi orqali sun'iy intellekt yordamchimizga yoki qo'llab-quvvatlash xizmatimizga murojaat qilishingiz mumkin."
      }
    ]
  },
  ru: {
    title: "Часто Задаваемые Вопросы",
    subTitle: "Oтветы на самые важные вопросы по покупкам и услугам",
    items: [
      {
        q: "Как быстро игровой товар зачислится на аккаунт?",
        a: "После оплаты и предоставления необходимых данных заказ выполняется автоматически в течение 5-15 минут."
      },
      {
        q: "Безопасно ли это? Не заблокируют ли мой аккаунт?",
        a: "Абсолютно безопасно! Все покупки совершаются официально через Player ID или проверенных дистрибьюторов."
      },
      {
        q: "Нужно ли предоставлять пароль от аккаунта?",
        a: "Нет, для большинства услуг достаточно только Player ID (или Supercell ID email). Пароль никогда не требуется."
      },
      {
        q: "К кому обратиться, если возникнут проблемы после оплаты?",
        a: "Вы можете обратиться к ИИ-помощнику через кнопку 'Help by Karen' вверху страницы или в нашу службу поддержки."
      }
    ]
  }
};

export default function FAQ({ lang = 'uz' }) {
  const [openIndex, setOpenIndex] = useState(null);
  const currentFaq = FAQ_DATA[lang] || FAQ_DATA.uz;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyberGreen/10 border border-cyberGreen/30 text-cyberGreen text-xs font-black uppercase tracking-widest mb-3">
          <HelpCircle className="w-4 h-4" /> FAQ
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
          {currentFaq.title}
        </h2>
        <p className="text-gray-400 text-xs md:text-sm font-medium mt-1">
          {currentFaq.subTitle}
        </p>
      </div>

      <div className="space-y-4">
        {currentFaq.items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-gray-800 bg-[#121824]/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:border-cyberGreen/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 flex justify-between items-center text-white font-bold text-sm md:text-base cursor-pointer hover:bg-gray-800/40 transition-colors"
              >
                <span>{item.q}</span>
                <div className="w-8 h-8 rounded-xl bg-cyberGreen/10 text-cyberGreen flex items-center justify-center shrink-0 ml-4 font-bold">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-5 pt-0 text-gray-300 border-t border-gray-800/60 bg-[#0b0f17]/60 leading-relaxed text-xs md:text-sm">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}