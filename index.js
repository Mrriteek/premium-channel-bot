require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const port = process.env.PORT || 3000;

if (!token) {
  console.error('FATAL: BOT_TOKEN is missing!');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
  console.error(`[Polling Error]: ${error.message}`);
});

// /start command handler
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const messageText = '🔥 Premium Channel Access - ₹149';

  const replyOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '💳 Pay ₹149',
            url: 'https://rzp.io/rzp/7JfgtM9X',
          },
        ],
      ],
    },
  };

  try {
    await bot.sendMessage(chatId, messageText, replyOptions);
  } catch (err) {
    console.error(`Failed to send message:`, err.message);
  }
});

// Dummy Express server for Render
const app = express();
app.get('/', (req, res) => {
  res.status(200).send('Premiam_Channel_Bot is active.');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
