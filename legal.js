// Тексты и логика страниц privacy.html и terms.html.
// Страница сообщает, какой документ показать, через <body data-legal-doc="privacy|terms">.
// Язык берётся из localStorage.osuzLang (как на остальных страницах сайта).
// Разметка текстов: "## " — заголовок раздела, "* " — пункт списка,
// "**текст**" — жирный, любая другая строка — отдельный абзац.
(() => {
    'use strict';

    const DOCS = {
        privacy: {
            ru: {
                title: 'Политика конфиденциальности',
                text: `Настоящая Политика конфиденциальности (далее — «Политика») регулирует порядок сбора, хранения, использования и защиты персональных данных Пользователей при использовании программного комплекса (веб-сайт, POS-система и Telegram-бот), далее — «Сервис». Термины «Сервис», «Пользователь» и «Продавец» используются в значении, определённом Пользовательским соглашением.
Регистрируясь или иным образом используя Сервис, Пользователь соглашается с условиями настоящей Политики и даёт согласие на обработку своих персональных данных на изложенных ниже условиях.

## 1. Общие положения
1.1. Политика применяется ко всем ресурсам Сервиса — сайту, Telegram-боту и связанным с ними сервисам.
1.2. Обработка персональных данных осуществляется в соответствии с Законом Республики Узбекистан «О персональных данных».
1.3. Учётная запись Пользователя едина для сайта и Telegram-бота: номер телефона является ключевым идентификатором Пользователя вне зависимости от канала обращения к Сервису.
1.4. Продолжая использовать Сервис после ознакомления с настоящей Политикой, Пользователь подтверждает своё согласие на обработку персональных данных.

## 2. Какие данные собираются
2.1. При регистрации и использовании Сервиса могут собираться следующие данные:
* номер телефона (подтверждается SMS-кодом при регистрации)
* имя и фамилия
* адрес электронной почты (при указании)
* дата рождения (при указании)
* язык интерфейса
2.2. При оформлении Заказа дополнительно обрабатываются:
* состав корзины и история Заказов
* координаты адреса доставки (при выборе доставки), в том числе сохранённое для повторного использования местоположение
* фотография чека об оплате (при безналичной оплате с доставкой)
2.3. При использовании Telegram-бота дополнительно обрабатываются идентификатор чата Telegram (chat_id) и данные, передаваемые самим Telegram при взаимодействии с ботом.
2.4. Технические данные: сведения об устройстве и браузере, IP-адрес, данные авторизационных сессий (токены), журналы действий, необходимые для работы и защиты Сервиса.

## 3. Цели обработки данных
Персональные данные используются исключительно для:
* регистрации и идентификации Пользователя, включая вход через SMS-код
* формирования и передачи Запросов наличия и Заказов Продавцам
* организации доставки — передачи Продавцу координат и данных о получателе
* передачи Продавцу подтверждения оплаты (чека)
* связи с Пользователем по вопросам, связанным с Заказами
* обеспечения работы и безопасности Сервиса (авторизация, предотвращение злоупотреблений)
* улучшения качества поиска и работы Сервиса на основе обезличенной статистики

## 4. Cookies и аналогичные технологии
4.1. Сайт может использовать файлы cookies и аналогичные технологии для хранения сессии Пользователя, сохранения настроек (например, языка интерфейса) и работы корзины.
4.2. Пользователь может ограничить использование cookies в настройках браузера, однако это может привести к ограничению доступности отдельных функций Сервиса (например, потребуется повторный вход).

## 5. Передача данных третьим лицам
5.1. Персональные данные Пользователя передаются Продавцу в объёме, необходимом для обработки Запроса и исполнения Заказа: имя, номер телефона, состав заказа, способ получения, координаты доставки (при доставке) и чек об оплате (при безналичной оплате).
5.2. Продавец самостоятельно несёт ответственность за дальнейшую обработку и сохранность переданных ему данных в рамках исполнения Заказа.
5.3. Иным третьим лицам данные могут передаваться только:
* по требованию государственных органов в порядке, установленном законодательством
* поставщикам технической инфраструктуры, обеспечивающим работу Сервиса (хостинг, сервис SMS-рассылки Eskiz.uz для отправки кода подтверждения), — в объёме, необходимом для оказания соответствующих услуг
5.4. Сервис не продаёт персональные данные Пользователей третьим лицам и не использует их в рекламных целях без отдельного согласия Пользователя.

## 6. Хранение и защита данных
6.1. Данные хранятся в течение времени, необходимого для целей их обработки, либо до отзыва согласия Пользователем, если иное не предусмотрено законодательством.
6.2. Сервис применяет технические и организационные меры защиты данных: ограничение доступа, авторизацию по токенам с возможностью отзыва (при смене пароля или выходе со всех устройств), хранение паролей в зашифрованном виде.
6.3. При обнаружении утечки персональных данных Сервис обязуется уведомить об этом затронутых Пользователей и предпринять меры по минимизации последствий.

## 7. Права пользователя
Пользователь вправе:
* получить информацию о том, какие его персональные данные обрабатываются Сервисом
* потребовать исправления неточных данных
* самостоятельно завершить сессию (выйти из аккаунта) в личном кабинете на сайте — это сразу делает недействительными все ранее выданные токены доступа
* самостоятельно удалить свои персональные данные, подтвердив действие паролем в личном кабинете на сайте: имя, фамилия, email, дата рождения, сохранённая геолокация и пароль удаляются, доступ к аккаунту прекращается. История уже созданных Заказов сохраняется в обезличенном от привязки к текущей учётной записи виде — Продавцу и Сервису необходимо иметь возможность подтвердить факт и условия совершённой сделки
* отозвать согласие на обработку данных в любой момент, обратившись к Владельцу Сервиса, если требуется удаление данных, не затрагиваемых самостоятельным удалением аккаунта (например, данных в истории Заказов по истечении срока, необходимого для их хранения)
Самостоятельное удаление аккаунта и выход из системы доступны в личном кабинете Пользователя на сайте. Для остальных обращений, связанных с реализацией указанных прав, Пользователь может обратиться к Владельцу Сервиса способом, указанным в разделе «Контакты».

## 8. Изменение политики
8.1. Сервис вправе вносить изменения в настоящую Политику. Актуальная редакция всегда доступна на ресурсах Сервиса.
8.2. Изменения вступают в силу с момента публикации новой редакции. Продолжение использования Сервиса после публикации изменений означает согласие Пользователя с обновлённой Политикой.

## 9. Контакты
По всем вопросам, связанным с обработкой персональных данных, Пользователь может обратиться к Владельцу Сервиса через контакты, указанные в Сервисе (веб-сайт или Telegram-бот).`
            },
            uz: {
                title: 'Maxfiylik siyosati',
                text: `Ushbu Maxfiylik siyosati (keyingi o‘rinlarda — «Siyosat») dasturiy majmuadan (veb-sayt, POS-tizim va Telegram-bot), keyingi o‘rinlarda — «Servis»dan foydalanishda Foydalanuvchilarning shaxsiy ma’lumotlarini yig‘ish, saqlash, ulardan foydalanish va ularni himoya qilish tartibini belgilaydi. «Servis», «Foydalanuvchi» va «Sotuvchi» atamalari Foydalanuvchi kelishuvida belgilangan ma’noda qo‘llaniladi.
Ro‘yxatdan o‘tish yoki Servisdan boshqa tarzda foydalanish orqali Foydalanuvchi ushbu Siyosat shartlariga rozilik bildiradi va o‘z shaxsiy ma’lumotlarini quyida bayon etilgan shartlarda qayta ishlashga rozilik beradi.

## 1. Umumiy qoidalar
1.1. Siyosat Servisning barcha resurslariga — saytga, Telegram-botga va ular bilan bog‘liq xizmatlarga nisbatan qo‘llaniladi.
1.2. Shaxsiy ma’lumotlarni qayta ishlash O‘zbekiston Respublikasining «Shaxsga doir ma’lumotlar to‘g‘risida»gi Qonuniga muvofiq amalga oshiriladi.
1.3. Foydalanuvchining hisob qaydnomasi sayt va Telegram-bot uchun yagona: telefon raqami Servisga qaysi kanal orqali murojaat qilinishidan qat’i nazar Foydalanuvchining asosiy identifikatori hisoblanadi.
1.4. Ushbu Siyosat bilan tanishib chiqqandan keyin Servisdan foydalanishni davom ettirish orqali Foydalanuvchi shaxsiy ma’lumotlarini qayta ishlashga roziligini tasdiqlaydi.

## 2. Qanday ma’lumotlar yig‘iladi
2.1. Ro‘yxatdan o‘tish va Servisdan foydalanishda quyidagi ma’lumotlar yig‘ilishi mumkin:
* telefon raqami (ro‘yxatdan o‘tishda SMS-kod bilan tasdiqlanadi)
* ism va familiya
* elektron pochta manzili (ko‘rsatilgan bo‘lsa)
* tug‘ilgan sana (ko‘rsatilgan bo‘lsa)
* interfeys tili
2.2. Buyurtma rasmiylashtirilganda qo‘shimcha ravishda quyidagilar qayta ishlanadi:
* savat tarkibi va Buyurtmalar tarixi
* yetkazib berish manzili koordinatalari (yetkazib berish tanlanganda), shu jumladan qayta foydalanish uchun saqlangan joylashuv
* to‘lov cheki surati (yetkazib berish bilan naqd pulsiz to‘lovda)
2.3. Telegram-botdan foydalanilganda qo‘shimcha ravishda Telegram chat identifikatori (chat_id) va bot bilan muloqot paytida Telegramning o‘zi uzatadigan ma’lumotlar qayta ishlanadi.
2.4. Texnik ma’lumotlar: Servis ishlashi va himoyasi uchun zarur bo‘lgan qurilma va brauzer haqidagi ma’lumotlar, IP-manzil, avtorizatsiya seanslari ma’lumotlari (tokenlar), harakatlar jurnallari.

## 3. Ma’lumotlarni qayta ishlash maqsadlari
Shaxsiy ma’lumotlar faqat quyidagi maqsadlarda foydalaniladi:
* Foydalanuvchini ro‘yxatdan o‘tkazish va identifikatsiya qilish, shu jumladan SMS-kod orqali kirish
* Mavjudlik so‘rovlari va Buyurtmalarni shakllantirish hamda Sotuvchilarga uzatish
* yetkazib berishni tashkil etish — Sotuvchiga koordinatalar va qabul qiluvchi haqidagi ma’lumotlarni uzatish
* Sotuvchiga to‘lov tasdig‘ini (chekni) uzatish
* Buyurtmalarga oid masalalar bo‘yicha Foydalanuvchi bilan bog‘lanish
* Servis ishlashi va xavfsizligini ta’minlash (avtorizatsiya, suiiste’molliklarning oldini olish)
* shaxsi aniqlanmaydigan statistika asosida qidiruv va Servis ishlash sifatini yaxshilash

## 4. Cookies va shunga o‘xshash texnologiyalar
4.1. Sayt Foydalanuvchi seansini saqlash, sozlamalarni (masalan, interfeys tilini) saqlash va savat ishlashi uchun cookie fayllari va shunga o‘xshash texnologiyalardan foydalanishi mumkin.
4.2. Foydalanuvchi brauzer sozlamalarida cookie fayllaridan foydalanishni cheklashi mumkin, biroq bu Servisning ayrim funksiyalari mavjudligining cheklanishiga olib kelishi mumkin (masalan, qayta kirish talab qilinadi).

## 5. Ma’lumotlarni uchinchi shaxslarga uzatish
5.1. Foydalanuvchining shaxsiy ma’lumotlari Sotuvchiga So‘rovni qayta ishlash va Buyurtmani bajarish uchun zarur hajmda uzatiladi: ism, telefon raqami, buyurtma tarkibi, olish usuli, yetkazib berish koordinatalari (yetkazib berishda) va to‘lov cheki (naqd pulsiz to‘lovda).
5.2. Sotuvchi Buyurtmani bajarish doirasida o‘ziga uzatilgan ma’lumotlarni keyingi qayta ishlash va ularning saqlanishi uchun mustaqil ravishda javobgar bo‘ladi.
5.3. Boshqa uchinchi shaxslarga ma’lumotlar faqat quyidagi hollarda uzatilishi mumkin:
* qonunchilikda belgilangan tartibda davlat organlarining talabiga ko‘ra
* Servis ishlashini ta’minlovchi texnik infratuzilma yetkazib beruvchilariga (xosting, tasdiqlash kodini yuborish uchun Eskiz.uz SMS-xabarnoma xizmati) — tegishli xizmatlarni ko‘rsatish uchun zarur hajmda
5.4. Servis Foydalanuvchilarning shaxsiy ma’lumotlarini uchinchi shaxslarga sotmaydi va Foydalanuvchining alohida roziligisiz ulardan reklama maqsadlarida foydalanmaydi.

## 6. Ma’lumotlarni saqlash va himoya qilish
6.1. Ma’lumotlar, agar qonunchilikda boshqacha tartib nazarda tutilmagan bo‘lsa, ularni qayta ishlash maqsadlari uchun zarur bo‘lgan muddat davomida yoki Foydalanuvchi roziligini qaytarib olgunga qadar saqlanadi.
6.2. Servis ma’lumotlarni himoya qilishning texnik va tashkiliy choralarini qo‘llaydi: kirishni cheklash, bekor qilish imkoniyati bo‘lgan tokenlar orqali avtorizatsiya (parol o‘zgartirilganda yoki barcha qurilmalardan chiqilganda), parollarni shifrlangan holda saqlash.
6.3. Shaxsiy ma’lumotlarning sizib chiqishi aniqlanganda Servis bu haqda tegishli Foydalanuvchilarni xabardor qilish va oqibatlarini kamaytirish choralarini ko‘rish majburiyatini oladi.

## 7. Foydalanuvchining huquqlari
Foydalanuvchi quyidagi huquqlarga ega:
* Servis uning qaysi shaxsiy ma’lumotlarini qayta ishlayotgani haqida ma’lumot olish
* noto‘g‘ri ma’lumotlarni tuzatishni talab qilish
* saytdagi shaxsiy kabinetda seansni mustaqil ravishda yakunlash (hisobdan chiqish) — bu avval berilgan barcha kirish tokenlarini darhol bekor qiladi
* saytdagi shaxsiy kabinetda amalni parol bilan tasdiqlab, o‘z shaxsiy ma’lumotlarini mustaqil ravishda o‘chirish: ism, familiya, email, tug‘ilgan sana, saqlangan geolokatsiya va parol o‘chiriladi, hisobga kirish to‘xtatiladi. Avval yaratilgan Buyurtmalar tarixi joriy hisob qaydnomasiga bog‘lanmagan holda saqlanadi — Sotuvchi va Servis amalga oshirilgan bitim fakti va shartlarini tasdiqlash imkoniyatiga ega bo‘lishi kerak
* hisobni mustaqil o‘chirish qamrab olmaydigan ma’lumotlarni (masalan, saqlash uchun zarur muddat o‘tgandan keyin Buyurtmalar tarixidagi ma’lumotlarni) o‘chirish talab qilinsa, Servis Egasiga murojaat qilib, istalgan vaqtda ma’lumotlarni qayta ishlashga roziligini qaytarib olish
Hisobni mustaqil o‘chirish va tizimdan chiqish saytdagi Foydalanuvchining shaxsiy kabinetida mavjud. Ko‘rsatilgan huquqlarni amalga oshirish bilan bog‘liq boshqa murojaatlar uchun Foydalanuvchi Servis Egasiga «Kontaktlar» bo‘limida ko‘rsatilgan usulda murojaat qilishi mumkin.

## 8. Siyosatni o‘zgartirish
8.1. Servis ushbu Siyosatga o‘zgartirishlar kiritishga haqli. Amaldagi tahrir har doim Servis resurslarida mavjud.
8.2. O‘zgartirishlar yangi tahrir e’lon qilingan paytdan boshlab kuchga kiradi. O‘zgartirishlar e’lon qilinganidan keyin Servisdan foydalanishni davom ettirish Foydalanuvchining yangilangan Siyosatga roziligini bildiradi.

## 9. Kontaktlar
Shaxsiy ma’lumotlarni qayta ishlash bilan bog‘liq barcha masalalar bo‘yicha Foydalanuvchi Servis Egasiga Servisda (veb-sayt yoki Telegram-bot) ko‘rsatilgan kontaktlar orqali murojaat qilishi mumkin.`
            },
            en: {
                title: 'Privacy Policy',
                text: `This Privacy Policy (the "Policy") governs how Users' personal data is collected, stored, used and protected when using the software platform (website, POS system and Telegram bot), hereinafter the "Service". The terms "Service", "User" and "Seller" have the meaning defined in the User Agreement.
By registering or otherwise using the Service, the User accepts the terms of this Policy and consents to the processing of their personal data on the terms set out below.

## 1. General provisions
1.1. The Policy applies to all resources of the Service — the website, the Telegram bot and related services.
1.2. Personal data is processed in accordance with the Law of the Republic of Uzbekistan "On Personal Data".
1.3. The User account is shared between the website and the Telegram bot: the phone number is the User's key identifier regardless of the channel used to access the Service.
1.4. By continuing to use the Service after reading this Policy, the User confirms their consent to the processing of personal data.

## 2. What data is collected
2.1. The following data may be collected during registration and use of the Service:
* phone number (confirmed with an SMS code during registration)
* first and last name
* email address (if provided)
* date of birth (if provided)
* interface language
2.2. When an Order is placed, the following is additionally processed:
* cart contents and Order history
* delivery address coordinates (if delivery is chosen), including a location saved for reuse
* a photo of the payment receipt (for non-cash payment with delivery)
2.3. When the Telegram bot is used, the Telegram chat identifier (chat_id) and data transmitted by Telegram itself during interaction with the bot are additionally processed.
2.4. Technical data: device and browser information, IP address, authorization session data (tokens) and activity logs required for the operation and protection of the Service.

## 3. Purposes of data processing
Personal data is used solely for:
* registering and identifying the User, including sign-in with an SMS code
* creating Availability Requests and Orders and passing them to Sellers
* arranging delivery — passing the coordinates and recipient details to the Seller
* passing payment confirmation (the receipt) to the Seller
* contacting the User about matters related to Orders
* ensuring the operation and security of the Service (authorization, abuse prevention)
* improving search quality and the Service based on anonymized statistics

## 4. Cookies and similar technologies
4.1. The website may use cookies and similar technologies to keep the User's session, save settings (for example, the interface language) and run the cart.
4.2. The User may restrict cookies in the browser settings; however, this may limit the availability of some features of the Service (for example, signing in again may be required).

## 5. Transfer of data to third parties
5.1. The User's personal data is passed to the Seller to the extent necessary to process the Request and fulfil the Order: name, phone number, order contents, receiving method, delivery coordinates (for delivery) and the payment receipt (for non-cash payment).
5.2. The Seller is solely responsible for any further processing and safekeeping of the data passed to them in the course of fulfilling the Order.
5.3. Data may be passed to other third parties only:
* at the request of government authorities in the manner prescribed by law
* to technical infrastructure providers that support the operation of the Service (hosting, the Eskiz.uz SMS service used to send confirmation codes), to the extent necessary to provide the relevant services
5.4. The Service does not sell Users' personal data to third parties and does not use it for advertising without the User's separate consent.

## 6. Data storage and protection
6.1. Data is stored for as long as necessary for the purposes of its processing, or until the User withdraws consent, unless otherwise required by law.
6.2. The Service applies technical and organizational data protection measures: access restriction, token-based authorization with revocation (on password change or signing out of all devices), and storing passwords in encrypted form.
6.3. If a personal data leak is detected, the Service undertakes to notify the affected Users and take measures to minimize the consequences.

## 7. User rights
The User has the right to:
* receive information about which of their personal data is processed by the Service
* request correction of inaccurate data
* end the session on their own (sign out) in the personal account on the website — this immediately invalidates all previously issued access tokens
* delete their personal data on their own by confirming the action with a password in the personal account on the website: first and last name, email, date of birth, saved geolocation and password are deleted, and access to the account is terminated. The history of Orders already created is kept without a link to the current account, since the Seller and the Service need to be able to confirm the fact and terms of a completed transaction
* withdraw consent to data processing at any time by contacting the Service Owner, if deletion of data not covered by self-service account deletion is required (for example, data in the Order history after the required retention period has expired)
Self-service account deletion and signing out are available in the User's personal account on the website. For other requests related to exercising these rights, the User may contact the Service Owner as described in the "Contacts" section.

## 8. Changes to the Policy
8.1. The Service may amend this Policy. The current version is always available on the Service's resources.
8.2. Changes take effect from the moment the new version is published. Continued use of the Service after the changes are published means the User accepts the updated Policy.

## 9. Contacts
For any questions related to the processing of personal data, the User may contact the Service Owner via the contacts provided in the Service (website or Telegram bot).`
            }
        },
        terms: {
            ru: {
                title: 'Пользовательское соглашение',
                text: `Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между Владельцем Сервиса и Пользователем при использовании программного комплекса (включая веб-интерфейс, POS-систему и Telegram-бота), предназначенного для поиска товаров, формирования запросов и взаимодействия с Продавцами.

## 1. Термины
**Сервис** — программно-аппаратный комплекс, включающий сайт, POS-систему и Telegram-бота, предоставляющий Пользователям возможность поиска товаров, формирования запросов и передачи заказов Продавцам.
**Пользователь** — физическое лицо, использующее Сервис.
**Продавец (Партнер)** — юридическое или физическое лицо, размещающее товары в Сервисе и осуществляющее их продажу Пользователям вне Сервиса.
**Запрос наличия** — действие Пользователя, направленное на уточнение наличия выбранных товаров у Продавца.
**Заказ** — информация о намерении Пользователя приобрести товар, сформированная после подтверждения наличия Продавцом.
**Способ получения** — самовывоз у Продавца либо доставка по указанным Пользователем координатам.
**Чек об оплате** — фотография документа, подтверждающего перевод денежных средств Продавцу, загружаемая Пользователем в Сервис для передачи Продавцу.

## 2. Общие положения
2.1. Сервис является **агрегатором информации и заказов** и не является продавцом товаров.
2.2. Сервис не является стороной сделки купли-продажи между Пользователем и Продавцом.
2.3. Все сделки, включая оплату и передачу товара, осуществляются напрямую между Пользователем и Продавцом.
2.4. Использование Сервиса означает полное согласие Пользователя с условиями настоящего Соглашения.

## 3. Порядок работы сервиса
3.1. Пользователь может:
* осуществлять поиск товаров
* добавлять товары в корзину
* отправлять Запрос наличия
3.2. После формирования корзины Пользователь нажимает кнопку **«Запросить»**, что означает отправку Запроса наличия Продавцу.
3.3. Продавец вправе:
* подтвердить наличие товаров
* отклонить запрос
3.4. В случае подтверждения Пользователю становится доступна функция оформления Заказа. Номер телефона Пользователь предоставляет при регистрации в Сервисе (подтверждается SMS-кодом); повторно он не запрашивается.
3.5. Оформление Заказа означает передачу Продавцу информации о намерении Пользователя приобрести товар и включает следующие шаги:
* выбор Способа получения — самовывоз или доставка (для доставки Пользователь передаёт координаты адреса)
* при доставке — выбор способа оплаты из предложенных Продавцом (карта, Payme, Click, QR-код или банковский перевод по реквизитам Продавца)
* при оплате банковским переводом — указание названия компании и ИНН Продавца, на которые оформляется перевод
* при безналичной оплате — загрузка Чека об оплате в Сервис для передачи Продавцу
* после получения доставленного товара — подтверждение получения Пользователем в Сервисе, которым Заказ считается исполненным
3.6. Перевод денежных средств Продавцу Пользователь осуществляет самостоятельно и напрямую, вне платёжной инфраструктуры Сервиса. Сервис не является платёжным агентом, не принимает, не переводит и не хранит денежные средства Пользователя. Передача Продавцу реквизитов для оплаты и Чека об оплате через Сервис носит информационный характер и не означает участия Сервиса в расчётах между Пользователем и Продавцом. Фактическая передача товара при самовывозе осуществляется **вне Сервиса**.
3.7. Пользователь вправе отменить Заказ до момента выбора Способа получения. После выбора Способа получения отмена возможна только по договорённости с Продавцом напрямую.

## 4. Особенности исполнения заказа
4.1. Подтверждение Продавцом наличия товара не является гарантией заключения сделки.
4.2. Пользователь не обязан завершать покупку после оформления Заказа.
4.3. В случае если Пользователь не явился за товаром:
* Заказ считается неисполненным
* никаких обязательств у сторон не возникает
4.4. Сервис не отслеживает и не гарантирует факт завершения сделки.

## 5. Ответственность
5.1. Сервис не несёт ответственности за:
* наличие товара
* актуальность цен
* качество товаров
* действия Продавцов
* корректность и факт совершения оплаты между Пользователем и Продавцом, а также за сохранность денежных средств при переводе по реквизитам Продавца
5.2. Продавец несёт полную ответственность за:
* достоверность информации о товаре
* наличие товара
* условия продажи
* качество товара
* достоверность предоставленных реквизитов для оплаты и факт получения оплаты от Пользователя
5.3. Пользователь самостоятельно принимает решения о взаимодействии с Продавцом.

## 6. Персональные данные
6.1. Пользователь соглашается на обработку персональных данных, включая:
* номер телефона
* имя и фамилию
* координаты адреса доставки (при выборе доставки)
* Чек об оплате
* технические данные
6.2. Данные используются исключительно для:
* передачи Заказов Продавцам
* организации доставки
* передачи Продавцу подтверждения оплаты
* связи с Пользователем
Подробнее — в [Политике конфиденциальности](privacy.html).

## 7. Telegram-бот
7.1. Telegram-бот является интерфейсом Сервиса.
7.2. Любые действия Пользователя в боте (нажатие кнопок, отправка данных) считаются юридически значимыми.
7.3. Нажатие кнопки «START» или аналогичной означает принятие условий Соглашения.

## 8. Заключительные положения
8.1. Сервис предоставляется «как есть» без гарантий бесперебойной работы.
8.2. Сервис вправе изменять функциональность и условия Соглашения без предварительного уведомления.
8.3. Все споры решаются в соответствии с законодательством Республики Узбекистан.

Пользователь подтверждает, что ознакомился с условиями Соглашения и принимает их в полном объеме.`
            },
            uz: {
                title: 'Foydalanuvchi kelishuvi',
                text: `Ushbu Foydalanuvchi kelishuvi (keyingi o‘rinlarda — «Kelishuv») tovarlarni qidirish, so‘rovlarni shakllantirish va Sotuvchilar bilan o‘zaro aloqa qilish uchun mo‘ljallangan dasturiy majmuadan (veb-interfeys, POS-tizim va Telegram-bot ham shular jumlasidan) foydalanishda Servis Egasi va Foydalanuvchi o‘rtasidagi munosabatlarni tartibga soladi.

## 1. Atamalar
**Servis** — sayt, POS-tizim va Telegram-botdan iborat, Foydalanuvchilarga tovarlarni qidirish, so‘rovlarni shakllantirish va buyurtmalarni Sotuvchilarga uzatish imkonini beruvchi dasturiy-apparat majmua.
**Foydalanuvchi** — Servisdan foydalanuvchi jismoniy shaxs.
**Sotuvchi (Hamkor)** — Servisda tovarlarni joylashtiruvchi va ularni Foydalanuvchilarga Servisdan tashqarida sotuvchi yuridik yoki jismoniy shaxs.
**Mavjudlik so‘rovi** — Foydalanuvchining tanlangan tovarlar Sotuvchida mavjudligini aniqlashtirishga qaratilgan harakati.
**Buyurtma** — Sotuvchi mavjudlikni tasdiqlaganidan keyin shakllantirilgan, Foydalanuvchining tovarni sotib olish niyati haqidagi ma’lumot.
**Olish usuli** — Sotuvchidan olib ketish yoki Foydalanuvchi ko‘rsatgan koordinatalar bo‘yicha yetkazib berish.
**To‘lov cheki** — Sotuvchiga pul mablag‘lari o‘tkazilganini tasdiqlovchi hujjat surati; Foydalanuvchi uni Sotuvchiga uzatish uchun Servisga yuklaydi.

## 2. Umumiy qoidalar
2.1. Servis **ma’lumotlar va buyurtmalar agregatori** hisoblanadi va tovarlar sotuvchisi emas.
2.2. Servis Foydalanuvchi va Sotuvchi o‘rtasidagi oldi-sotdi bitimining tarafi emas.
2.3. Barcha bitimlar, shu jumladan to‘lov va tovarni topshirish, bevosita Foydalanuvchi va Sotuvchi o‘rtasida amalga oshiriladi.
2.4. Servisdan foydalanish Foydalanuvchining ushbu Kelishuv shartlariga to‘liq roziligini bildiradi.

## 3. Servisning ishlash tartibi
3.1. Foydalanuvchi:
* tovarlarni qidirishi
* tovarlarni savatga qo‘shishi
* Mavjudlik so‘rovini yuborishi mumkin
3.2. Savat shakllantirilgandan keyin Foydalanuvchi **«So‘rash»** tugmasini bosadi, bu Sotuvchiga Mavjudlik so‘rovi yuborilishini anglatadi.
3.3. Sotuvchi quyidagilarga haqli:
* tovarlar mavjudligini tasdiqlash
* so‘rovni rad etish
3.4. Tasdiqlangan taqdirda Foydalanuvchiga Buyurtmani rasmiylashtirish funksiyasi ochiladi. Telefon raqamini Foydalanuvchi Servisda ro‘yxatdan o‘tishda taqdim etadi (SMS-kod bilan tasdiqlanadi); u qayta so‘ralmaydi.
3.5. Buyurtmani rasmiylashtirish Sotuvchiga Foydalanuvchining tovarni sotib olish niyati haqidagi ma’lumotni uzatishni anglatadi va quyidagi bosqichlarni o‘z ichiga oladi:
* Olish usulini tanlash — olib ketish yoki yetkazib berish (yetkazib berish uchun Foydalanuvchi manzil koordinatalarini uzatadi)
* yetkazib berishda — Sotuvchi taklif qilgan to‘lov usullaridan birini tanlash (karta, Payme, Click, QR-kod yoki Sotuvchi rekvizitlari bo‘yicha bank o‘tkazmasi)
* bank o‘tkazmasi orqali to‘lashda — o‘tkazma rasmiylashtiriladigan Sotuvchi kompaniyasining nomi va STIRini ko‘rsatish
* naqd pulsiz to‘lovda — Sotuvchiga uzatish uchun To‘lov chekini Servisga yuklash
* yetkazib berilgan tovar olingandan keyin — Foydalanuvchi tomonidan Servisda olinganini tasdiqlash, shu bilan Buyurtma bajarilgan hisoblanadi
3.6. Sotuvchiga pul mablag‘larini Foydalanuvchi Servisning to‘lov infratuzilmasidan tashqarida mustaqil va bevosita o‘tkazadi. Servis to‘lov agenti emas, Foydalanuvchining pul mablag‘larini qabul qilmaydi, o‘tkazmaydi va saqlamaydi. Servis orqali Sotuvchiga to‘lov rekvizitlari va To‘lov chekini uzatish axborot xarakteriga ega va Servisning Foydalanuvchi va Sotuvchi o‘rtasidagi hisob-kitoblarda ishtirok etishini anglatmaydi. Olib ketishda tovarni amalda topshirish **Servisdan tashqarida** amalga oshiriladi.
3.7. Foydalanuvchi Olish usuli tanlanguniga qadar Buyurtmani bekor qilishga haqli. Olish usuli tanlangandan keyin bekor qilish faqat Sotuvchi bilan bevosita kelishuv asosida mumkin.

## 4. Buyurtmani bajarish xususiyatlari
4.1. Sotuvchi tomonidan tovar mavjudligining tasdiqlanishi bitim tuzilishining kafolati emas.
4.2. Foydalanuvchi Buyurtmani rasmiylashtirgandan keyin xaridni yakunlashga majbur emas.
4.3. Agar Foydalanuvchi tovar uchun kelmasa:
* Buyurtma bajarilmagan hisoblanadi
* taraflarda hech qanday majburiyat yuzaga kelmaydi
4.4. Servis bitim yakunlanganligini kuzatmaydi va kafolatlamaydi.

## 5. Javobgarlik
5.1. Servis quyidagilar uchun javobgar emas:
* tovar mavjudligi
* narxlarning dolzarbligi
* tovarlar sifati
* Sotuvchilarning harakatlari
* Foydalanuvchi va Sotuvchi o‘rtasidagi to‘lovning to‘g‘riligi va amalga oshirilganligi, shuningdek Sotuvchi rekvizitlari bo‘yicha o‘tkazmada pul mablag‘larining saqlanishi
5.2. Sotuvchi quyidagilar uchun to‘liq javobgar:
* tovar haqidagi ma’lumotlarning ishonchliligi
* tovar mavjudligi
* sotish shartlari
* tovar sifati
* taqdim etilgan to‘lov rekvizitlarining ishonchliligi va Foydalanuvchidan to‘lov olinganligi
5.3. Foydalanuvchi Sotuvchi bilan o‘zaro aloqa qilish to‘g‘risida mustaqil qaror qabul qiladi.

## 6. Shaxsiy ma’lumotlar
6.1. Foydalanuvchi shaxsiy ma’lumotlarini qayta ishlashga rozilik beradi, jumladan:
* telefon raqami
* ism va familiya
* yetkazib berish manzili koordinatalari (yetkazib berish tanlanganda)
* To‘lov cheki
* texnik ma’lumotlar
6.2. Ma’lumotlar faqat quyidagi maqsadlarda foydalaniladi:
* Buyurtmalarni Sotuvchilarga uzatish
* yetkazib berishni tashkil etish
* Sotuvchiga to‘lov tasdig‘ini uzatish
* Foydalanuvchi bilan bog‘lanish
Batafsil — [Maxfiylik siyosatida](privacy.html).

## 7. Telegram-bot
7.1. Telegram-bot Servisning interfeysi hisoblanadi.
7.2. Foydalanuvchining botdagi har qanday harakatlari (tugmalarni bosish, ma’lumotlarni yuborish) yuridik ahamiyatga ega deb hisoblanadi.
7.3. «START» yoki shunga o‘xshash tugmani bosish Kelishuv shartlarini qabul qilishni anglatadi.

## 8. Yakuniy qoidalar
8.1. Servis uzluksiz ishlash kafolatlarisiz «boricha» taqdim etiladi.
8.2. Servis funksionallikni va Kelishuv shartlarini oldindan xabardor qilmasdan o‘zgartirishga haqli.
8.3. Barcha nizolar O‘zbekiston Respublikasi qonunchiligiga muvofiq hal qilinadi.

Foydalanuvchi Kelishuv shartlari bilan tanishib chiqqanini va ularni to‘liq hajmda qabul qilishini tasdiqlaydi.`
            },
            en: {
                title: 'User Agreement',
                text: `This User Agreement (the "Agreement") governs the relationship between the Service Owner and the User when using the software platform (including the web interface, POS system and Telegram bot) designed for searching for products, creating requests and interacting with Sellers.

## 1. Terms
**Service** — a hardware and software platform consisting of the website, POS system and Telegram bot that enables Users to search for products, create requests and pass orders to Sellers.
**User** — an individual using the Service.
**Seller (Partner)** — a legal entity or individual who lists products in the Service and sells them to Users outside the Service.
**Availability Request** — a User's action aimed at checking whether the selected products are available from the Seller.
**Order** — information about the User's intention to buy a product, created after the Seller confirms availability.
**Receiving Method** — pickup from the Seller or delivery to the coordinates specified by the User.
**Payment Receipt** — a photo of a document confirming a money transfer to the Seller, uploaded by the User to the Service to be passed to the Seller.

## 2. General provisions
2.1. The Service is an **aggregator of information and orders** and is not a seller of goods.
2.2. The Service is not a party to the sale and purchase transaction between the User and the Seller.
2.3. All transactions, including payment and handover of goods, are carried out directly between the User and the Seller.
2.4. Use of the Service means the User fully accepts the terms of this Agreement.

## 3. How the Service works
3.1. The User may:
* search for products
* add products to the cart
* send an Availability Request
3.2. After filling the cart, the User clicks the **"Request"** button, which sends an Availability Request to the Seller.
3.3. The Seller may:
* confirm that the products are available
* decline the request
3.4. Once availability is confirmed, the User can place an Order. The User provides a phone number during registration in the Service (confirmed with an SMS code); it is not requested again.
3.5. Placing an Order means passing information about the User's intention to buy the product to the Seller, and includes the following steps:
* choosing the Receiving Method — pickup or delivery (for delivery, the User provides the address coordinates)
* for delivery — choosing a payment method from those offered by the Seller (card, Payme, Click, QR code or bank transfer using the Seller's details)
* for payment by bank transfer — specifying the Seller's company name and TIN to which the transfer is made
* for non-cash payment — uploading the Payment Receipt to the Service to be passed to the Seller
* after receiving the delivered goods — the User confirms receipt in the Service, after which the Order is considered fulfilled
3.6. The User transfers money to the Seller independently and directly, outside the Service's payment infrastructure. The Service is not a payment agent and does not accept, transfer or hold the User's funds. Passing the payment details and the Payment Receipt to the Seller through the Service is for information only and does not mean the Service participates in settlements between the User and the Seller. The actual handover of goods on pickup takes place **outside the Service**.
3.7. The User may cancel an Order until the Receiving Method is chosen. After the Receiving Method is chosen, cancellation is possible only by direct agreement with the Seller.

## 4. Order fulfilment
4.1. The Seller's confirmation of availability does not guarantee that a transaction will be concluded.
4.2. The User is not obliged to complete the purchase after placing an Order.
4.3. If the User does not come to collect the goods:
* the Order is considered unfulfilled
* no obligations arise for either party
4.4. The Service does not track or guarantee the completion of a transaction.

## 5. Liability
5.1. The Service is not responsible for:
* product availability
* how up to date prices are
* product quality
* the actions of Sellers
* the correctness and fact of payment between the User and the Seller, or the safety of funds transferred using the Seller's details
5.2. The Seller is fully responsible for:
* the accuracy of product information
* product availability
* the terms of sale
* product quality
* the accuracy of the payment details provided and the receipt of payment from the User
5.3. The User makes their own decisions about interacting with the Seller.

## 6. Personal data
6.1. The User consents to the processing of personal data, including:
* phone number
* first and last name
* delivery address coordinates (if delivery is chosen)
* the Payment Receipt
* technical data
6.2. The data is used solely for:
* passing Orders to Sellers
* arranging delivery
* passing payment confirmation to the Seller
* contacting the User
See the [Privacy Policy](privacy.html) for details.

## 7. Telegram bot
7.1. The Telegram bot is an interface of the Service.
7.2. Any actions of the User in the bot (pressing buttons, sending data) are considered legally significant.
7.3. Pressing the "START" button or a similar one means accepting the terms of the Agreement.

## 8. Final provisions
8.1. The Service is provided "as is" without any guarantee of uninterrupted operation.
8.2. The Service may change its functionality and the terms of the Agreement without prior notice.
8.3. All disputes are resolved in accordance with the legislation of the Republic of Uzbekistan.

The User confirms that they have read the terms of the Agreement and accept them in full.`
            }
        }
    };

    const UI = {
        ru: { eyebrow: 'Документы', cart: 'Корзина', orders: 'Заказы', signIn: 'Войти', other: { privacy: 'Пользовательское соглашение', terms: 'Политика конфиденциальности' } },
        uz: { eyebrow: 'Hujjatlar', cart: 'Savat', orders: 'Buyurtmalar', signIn: 'Kirish', other: { privacy: 'Foydalanuvchi kelishuvi', terms: 'Maxfiylik siyosati' } },
        en: { eyebrow: 'Documents', cart: 'Cart', orders: 'Orders', signIn: 'Sign in', other: { privacy: 'User agreement', terms: 'Privacy policy' } }
    };
    const OTHER_HREF = { privacy: 'terms.html', terms: 'privacy.html' };

    const docKey = document.body.dataset.legalDoc === 'terms' ? 'terms' : 'privacy';

    function readLang() {
        try {
            const value = localStorage.getItem('osuzLang');
            return ['ru', 'uz', 'en'].includes(value) ? value : 'ru';
        } catch {
            return 'ru';
        }
    }

    let currentLang = readLang();

    function esc(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function inline(line) {
        return esc(line)
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[(.+?)\]\(([a-z0-9.#-]+\.html)\)/gi, '<a href="$2">$1</a>');
    }

    function render(text) {
        const out = [];
        let list = null;
        const flush = () => {
            if (list) out.push(`<ul>${list.join('')}</ul>`);
            list = null;
        };
        for (const raw of text.split('\n')) {
            const line = raw.trim();
            if (line.startsWith('* ')) {
                (list = list || []).push(`<li>${inline(line.slice(2))}</li>`);
                continue;
            }
            flush();
            if (!line) continue;
            if (line.startsWith('## ')) out.push(`<h2>${inline(line.slice(3))}</h2>`);
            else out.push(`<p>${inline(line)}</p>`);
        }
        flush();
        return out.join('');
    }

    function setText(id, value) {
        const node = document.getElementById(id);
        if (node) node.textContent = value;
    }

    function updateCustomerHeader() {
        let customer = null;
        try {
            customer = JSON.parse(localStorage.getItem('osuzCustomer') || 'null');
        } catch {
            customer = null;
        }
        const fallback = UI[currentLang].signIn;
        const value = customer
            ? [customer.name, customer.surname].filter(Boolean).join(' ').trim() || customer.phone || fallback
            : fallback;
        document.querySelectorAll('[data-customer-account-text]').forEach(node => {
            node.textContent = value;
        });
    }

    // Счётчик в шапке: у гостя корзина лежит в localStorage, у вошедшего
    // покупателя её знает только сервер — тогда бейдж просто скрыт, как на orders.html.
    function updateCartBadge() {
        const badge = document.getElementById('headerCartCount');
        if (!badge) return;
        let count = 0;
        try {
            if (!localStorage.getItem('osuzCustomerAccessToken')) {
                const cart = JSON.parse(localStorage.getItem('osuzGuestCart') || '{"sellers":[]}');
                count = (cart.sellers || []).reduce((sum, seller) =>
                    sum + (seller.items || []).reduce((s, item) => s + Math.max(0, Number(item.quantity) || 0), 0), 0);
            }
        } catch {
            count = 0;
        }
        badge.textContent = count > 99 ? '99+' : String(count);
        badge.classList.toggle('hidden', count <= 0);
    }

    function applyLanguage() {
        const doc = DOCS[docKey][currentLang];
        const ui = UI[currentLang];
        document.documentElement.lang = currentLang;
        document.title = `${doc.title} — OSUZ`;
        const select = document.getElementById('languageSelect');
        if (select) select.value = currentLang;
        setText('headerCartText', ui.cart);
        setText('headerOrdersText', ui.orders);
        setText('legalEyebrow', ui.eyebrow);
        setText('legalTitle', doc.title);
        document.getElementById('legalBody').innerHTML = render(doc.text);
        const other = document.getElementById('legalOtherLink');
        if (other) {
            other.href = OTHER_HREF[docKey];
            other.querySelector('span').textContent = ui.other[docKey];
        }
        updateCustomerHeader();
    }

    function applyTheme() {
        let theme = 'light';
        try {
            theme = localStorage.getItem('osuzTheme') || 'light';
        } catch {}
        document.body.classList.toggle('dark-mode', theme === 'dark');
        window.lucide?.createIcons?.();
    }

    document.getElementById('languageSelect')?.addEventListener('change', event => {
        currentLang = ['ru', 'uz', 'en'].includes(event.target.value) ? event.target.value : 'ru';
        try {
            localStorage.setItem('osuzLang', currentLang);
        } catch {}
        applyLanguage();
    });

    document.getElementById('themeToggle')?.addEventListener('click', () => {
        let theme = 'light';
        try {
            theme = localStorage.getItem('osuzTheme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem('osuzTheme', theme);
        } catch {}
        applyTheme();
    });

    window.addEventListener('storage', event => {
        if (event.key === 'osuzLang') {
            currentLang = readLang();
            applyLanguage();
        }
        if (event.key === 'osuzTheme') applyTheme();
        if (['osuzGuestCart', 'osuzCustomerAccessToken'].includes(event.key)) updateCartBadge();
        if (event.key === 'osuzCustomer') updateCustomerHeader();
    });

    applyLanguage();
    applyTheme();
    updateCartBadge();
})();
