# 🪟 Window Sale App

Приложение для управления заказами окон, клиентами, сотрудниками и процессами (установка, замеры, оплата и т.д.)

---

## 🚀 Технологии

- **Node.js + Express** – серверная логика
- **PostgreSQL** + Sequelize – база данных
- **JWT + bcrypt** – авторизация и безопасность
- **Vite + React (если будет фронт)** – клиентская часть
- **Postman** – тестирование API

---

## 📁 Структура проекта

```
window-sale-app/
│
├── models/              # Sequelize модели (Klient, Tootaja, Roll и т.д.)
├── controllers/         # Контроллеры для маршрутов
├── routes/              # Express-маршруты
├── seeders/             # Сидеры для начальных данных (роли)
├── config/              # Настройки базы данных
├── middleware/          # Авторизация (JWT)
├── .env                 # Переменные окружения (НЕ публиковать)
├── server.js            # Точка входа
├── package.json         # Зависимости
└── README.md            # Этот файл
```

---

## 🔐 Переменные окружения (.env)

Создай файл `.env` в корне проекта и добавь туда:

```env
DB_DATABASE=DB_Zakovits
DB_USER=postgres
DB_PASSWORD=пароль
DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA=windows_sale
DB_DIALECT=postgres

SERVER_PORT=3000
JWT_SECRET=твой_секретный_ключ
```

---

## ⚙️ Установка

```bash
git clone https://github.com/zhakki/windows.git
cd windows
npm install
```

---

## 🛠️ Команды

```bash
# Запуск сервера
npm run dev

# Синхронизация БД
node server.js

# Применить сидеры (добавить роли)
npx sequelize-cli db:seed:all --env development
```

---

## ✅ Готовые пользователи

| Роль     | Email              | Пароль     |
|----------|--------------------|------------|
| Клиент   | ilona@example.com  | salasana123 |
| Менеджер | admin@manager.com  | admin123    |

---

## 📬 Контакты

Автор проекта: [@zhakki](https://github.com/zhakki)  
Если хочешь продолжать разработку — welcome!