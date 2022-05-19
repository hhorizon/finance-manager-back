### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

"start": "cross-env NODE_ENV=production node -r dotenv/config ./server.js",
"start:dev": "cross-env NODE_ENV=development nodemon -r dotenv/config ./server.js",
"lint": "eslint **/\*.js",
"lint:fix": "eslint --fix **/\*.js"
