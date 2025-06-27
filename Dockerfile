# Устанавливаем Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальные файлы
COPY . .

# Собираем Next.js приложение
RUN npm run build

# Указываем порт, на котором будет работать приложение
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]