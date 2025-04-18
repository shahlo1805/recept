# RECEPT loyihasi uchun back end

# Loyihaning maqsadi:

Foydalanuvchilar categories boyicha taomlarni, ularning retseptlari, kerakli masalliqlarini, agar bor bolsa videolarini ko'ra va hatoo o'zi yangi retsept qo'sha olishi kerak.

# Funksional talablar

- Barcha retseptni category'lari bo'lishi kerak. Masalan taomlar, shirinliklar, ichimliklar va hkz.
- Har bir taom biror category'ga mansub bo'lishi kerak.
- Taomning 1ta rasmi, kerakli masalliqlar, tayyorlanishi, videosi bo'lishi kerak.
- Foydalanuvchi ro'yhatdan o'tmagan holatda ham category va barcha retseptlarni ko'rishi kerak
- Foydalanuvchi email va name bilan ro'yhatdan o'tadi
- Profilga kirish email orqali bo'ladi
- Retcept qo'shmoqchi bo'lgan foydalanuvchi ro'yxattan o'tishi va login qilishi kerak (token beriladi)
- Foydalanuvchi profilini yangilay olishi kerak
- faqat super admin barcha foydaluvchilarni ko'ra oladi va category qo'sha oladi (token beriladi)

# Rollar:

- users;
-

# Nofunksional talablar:

- tezlik
- xavfsizlik
- Kengaya olish

# Database struktura:

1. Users:

- id
- name
- password
- email
- bio
- profile_image
- createdAt


2. category

- id
- categoryName
- createdAt
- updatedAt

3. recepts:

- id
- title
- image
- video
- description
- preperation-plan
- ingredients
- categoryId
- userId




