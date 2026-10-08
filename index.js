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

// Sleep / Delay helper function animation ke liye
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Temporary state tracking for user input
const userSessions = new Map();

// -----------------------------------------------------------------------------
// /start Command Handler
// -----------------------------------------------------------------------------
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  userSessions.set(chatId, { step: 'AWAITING_NAME' });

  // Terminal Initializing Animation
  const initialMsg = await bot.sendMessage(
    chatId,
    `<code>⚡ INITIALIZING SECURE SHELL v4.09...\n[░░░░░░░░░░] 0%</code>`,
    { parse_mode: 'HTML' }
  );

  await delay(700);
  await bot.editMessageText(
    `<code>⚡ BYPASSING FIREWALL & ESTABLISHING HANDSHAKE...\n[████░░░░░░] 45%</code>`,
    { chat_id: chatId, message_id: initialMsg.message_id, parse_mode: 'HTML' }
  );

  await delay(700);
  await bot.editMessageText(
    `<code>⚡ ENCRYPTED TUNNEL READY (AES-256 GCM)...\n[██████████] 100%</code>`,
    { chat_id: chatId, message_id: initialMsg.message_id, parse_mode: 'HTML' }
  );

  await delay(500);

  // Hacker Style Prompt for Name
  const welcomeText = 
`╔══════════════════════════════╗
   🛡 <b>CYBER VIP GATEWAY v2.6</b> 🛡
╚══════════════════════════════╝

<i>System is waiting for Identity Verification...</i>

👤 <b>AGENT VERIFICATION REQUIRED:</b>
Kripya apna <b>Pura Naam (Full Name)</b> type karke bhejein taaki aapka encrypted VIP pass generate kiya ja sake.`;

  await bot.sendMessage(chatId, welcomeText, { parse_mode: 'HTML' });
});

// -----------------------------------------------------------------------------
// Message Listener (Name Capture & Loader Animation)
// -----------------------------------------------------------------------------
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ignore commands like /start
  if (!text || text.startsWith('/')) return;

  const session = userSessions.get(chatId);

  if (session && session.step === 'AWAITING_NAME') {
    userSessions.delete(chatId); // Clear session
    const userName = text.trim();

    // Hacker Loader Animation Messages
    const loaderMsg = await bot.sendMessage(
      chatId,
      `<code>🔍 VERIFYING IDENTITY FOR: [${userName.toUpperCase()}]...\n[■□□□□□□□□□] 10%</code>`,
      { parse_mode: 'HTML' }
    );

    await delay(700);
    await bot.editMessageText(
      `<code>🧬 CHECKING DATABASE & DECRYPTING TOKENS...\n[■■■■□□□□□□] 40%</code>`,
      { chat_id: chatId, message_id: loaderMsg.message_id, parse_mode: 'HTML' }
    );

    await delay(700);
    await bot.editMessageText(
      `<code>⚡ ALLOCATING PREMIUM CHANNEL CIPHER SLOT...\n[■■■■■■■■□□] 80%</code>`,
      { chat_id: chatId, message_id: loaderMsg.message_id, parse_mode: 'HTML' }
    );

    await delay(700);
    await bot.editMessageText(
      `<code>✔ ACCESS GRANTED! GENERATING VIP PAYMENT LINK...\n[■■■■■■■■■■] 100%</code>`,
      { chat_id: chatId, message_id: loaderMsg.message_id, parse_mode: 'HTML' }
    );

    await delay(600);

    // Final Beautiful Premium Dashboard Card
    const cardText = 
`╔═════════════════════════════════╗
   👑 <b>PREMIUM VIP CHANNEL PASS</b> 👑
╚═════════════════════════════════╝

👋 <b>Welcome Agent:</b> <code>${userName.toUpperCase()}</code>
🆔 <b>User ID:</b> <code>#TG-${chatId}</code>
📡 <b>Security Status:</b> <code>ENCRYPTED & VERIFIED</code>
💎 <b>Subscription:</b> Lifetime VIP Access
━━━━━━━━━━━━━━━━━━━━━━━
💰 <b>Exclusive Fee:</b> <b>₹149</b> <strike>₹999</strike> <i>(85% OFF)</i>
🚀 <b>Instant Activation:</b> Auto-Invite Link Unlock
━━━━━━━━━━━━━━━━━━━━━━━

⚡ <i>Neeche diye gaye button par click karke turant Telegram ke andar hi pay karein:</i>`;

    const replyOptions = {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '⚡ 💳 PAY ₹149 NOW (UPI / GPAY) ⚡',
              web_app: { url: 'https://rzp.io/rzp/7JfgtM9X' } // Telegram ke andar popup me open hoga
            }
          ],
          [
            {
              text: '🔄 Restart Verification',
              callback_data: 'restart'
            }
          ]
        ]
      }
    };

    await bot.sendMessage(chatId, cardText, replyOptions);
  }
});

// Restart callback button
bot.on('callback_query', async (query) => {
  if (query.data === 'restart') {
    await bot.answerCallbackQuery(query.id);
    bot.emit('text', { chat: { id: query.message.chat.id }, text: '/start' });
  }
});

// -----------------------------------------------------------------------------
// Dummy Express server for Render Web Service Keep-Alive
// -----------------------------------------------------------------------------
const app = express();
app.get('/', (req, res) => {
  res.status(200).send('⚡ Cyber VIP Gateway Bot is Running Live ⚡');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
