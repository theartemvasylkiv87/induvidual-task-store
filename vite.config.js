import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  plugins: [injectHTML()],
  // Вказуємо, що наш index.html лежить в колінь, але збирати будемо все красиво
  server: {
    open: true // Автоматично відкриватиме браузер при запуску
  }
});