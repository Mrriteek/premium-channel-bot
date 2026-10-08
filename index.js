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

// Delay helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Temporary memory store
const userSessions = new Map();

// -----------------------------------------------------------------------------
// /start Command Handler (Hacker Boot Sequence)
// -----------------------------------------------------------------------------
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  userSessions.set(chatId, { step: 'AWAITING_NAME' });

  // Terminal Initialization
  const msgObj = await bot.sendMessage(
    chatId,
    `<code>[ROOT@RITEEK-MAINFRAME]:~$ ./init_exploit.sh --target=localhost\n[⚙] Connecting to Dark Web Proxy Nodes...\n[░░░░░░░░░░] 0%</code>`,
    { parse_mode: 'HTML' }
  );

  await delay(800);
  await bot.editMessageText(
    `<code>[ROOT@RITEEK-MAINFRAME]:~$ portscan -p 443,8080,9050\n[⚡] Bypassing Cloudflare WAF & Intrusion Prevention Systems...\n[████░░░░░░] 38%</code>`,
    { chat_id: chatId, message_id: msgObj.message_id, parse_mode: 'HTML' }
  );

  await delay(800);
  await bot.editMessageText(
    `<code>[ROOT@RITEEK-MAINFRAME]:~$ injection --payload=ZeroDay_BufferOverflow\n[💉] Injecting Rootkit into Secure Kernel Space...\n[████████░░] 79%</code>`,
    { chat_id: chatId, message_id: msgObj.message_id, parse_mode: 'HTML' }
  );

  await delay(800);
  await bot.editMessageText(
    `<code>[✔] SSH TUNNEL ESTABLISHED (AES-4096 BIT ENCRYPTION)\n[██████████] 100% ACCESS OPEN!</code>`,
    { chat_id: chatId, message_id: msgObj.message_id, parse_mode: 'HTML' }
  );

  await delay(600);

  // Hacker Greeting Card
  const banner = 
`╔════════════════════════════════════════╗
   ☠️ <b>RITEEK HACKING CLASS : MAINFRAME</b> ☠️
╚════════════════════════════════════════╝

<i>⚠️ SECURE ACCESS CONTROL - ZERO KNOWLEDGE PROTOCOL ⚠️</i>

<b>[!] AGENT IDENTIFICATION REQUIRED:</b>
Hacker terminal me entry lene ke liye apna <b>Real Name ya Secret Codename</b> type karke bhejein:`;

  await bot.sendMessage(chatId, banner, { parse_mode: 'HTML' });
});

// -----------------------------------------------------------------------------
// Message Listener (Hacker Encryption & VIP Pass Generator)
// -----------------------------------------------------------------------------
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text.startsWith('/')) return;

  const session = userSessions.get(chatId);

  if (session && session.step === 'AWAITING_NAME') {
    userSessions.delete(chatId);
    const agentName = text.trim().toUpperCase();

    // Heavy Decryption Loader
    const hackLoader = await bot.sendMessage(
      chatId,
      `<code>[+] ALLOCATING TARGET IDENTITY: [${agentName}]\n[~] Generating Unique MAC Signature & TOR Route...\n[►░░░░░░░░░] 12%</code>`,
      { parse_mode: 'HTML' }
    );

    await delay(750);
    await bot.editMessageText(
      `<code>[+] EXTRACTING EXPLOIT DATABASE & ETHICAL HACKING SCRIPTS...\n[~] Decrypting SHA-512 Hash Tables & Botnet Nodes...\n[►►►►░░░░░░] 46%</code>`,
      { chat_id: chatId, message_id: hackLoader.message_id, parse_mode: 'HTML' }
    );

    await delay(750);
    await bot.editMessageText(
      `<code>[+] PREPARING VIP TERMINAL KEY FOR: ${agentName}...\n[~] Disabling Firewalls & Authorizing Razorpay Gateway...\n[►►►►►►►►░░] 84%</code>`,
      { chat_id: chatId, message_id: hackLoader.message_id, parse_mode: 'HTML' }
    );

    await delay(750);
    await bot.editMessageText(
      `<code>[✔] CIPHER KEY ALLOCATED SUCCESSFULLY!\n[~] VIP Channel Pass Ready for Instant Injection!\n[►►►►►►►►►►] 100% DONE!</code>`,
      { chat_id: chatId, message_id: hackLoader.message_id, parse_mode: 'HTML' }
    );

    await delay(600);

    const randomHash = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Ultimate VIP Hacker Course Pass Card
    const accessCard = 
`╔════════════════════════════════════════╗
   💀 <b>RITEEK HACKING CLASS : VIP PASS</b> 💀
╚════════════════════════════════════════╝

👋 <b>Welcome Agent:</b> <code>${agentName}</code>
🆔 <b>Hacker ID:</b> <code>#ETH-${randomHash}</code>
🔐 <b>Clearance Level:</b> <code>ROOT / BLACK-HAT ACCESS</code>
🛰 <b>Security Node:</b> <code>ENCRYPTED (NO TRACE)</code>

━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 <b>VIP CLASS ACCESS INCLUDES:</b>
├─ ⚡ Android & Termux Exploits
├─ 🛡️ WiFi & Network Pentesting
├─ 🌐 Website Bug Bounty & SQLi Attacks
├─ 📱 Dark Web Setup & Cyber Security 2026
└─ 💎 Private Community Support & Tools
━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 <b>One-Time Fee:</b> <b>₹149</b> <strike>₹1,499</strike> <i>(90% Cyber Discount)</i>
🚀 <b>Payment Gateway:</b> <code>100% SECURE INSTANT GATEWAY</code>
━━━━━━━━━━━━━━━━━━━━━━━━━━

👇 <i>Neeche diye gaye button par click karke turant Telegram ke andar apna access unlock karein:</i>`;

    const options = {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '⚡ 💳 UNLOCK ACCESS - PAY ₹149 💳 ⚡',
              web_app: { url: 'https://rzp.io/rzp/7JfgtM9X' } // In-app Telegram Razorpay popup
            }
          ],
          [
            {
              text: '🔄 Re-enter Codename',
              callback_data: 're_register'
            }
          ]
        ]
      }
    };

    await bot.sendMessage(chatId, accessCard, options);
  }
});

// Re-register button handler
bot.on('callback_query', async (query) => {
  if (query.data === 're_register') {
    await bot.answerCallbackQuery(query.id);
    bot.emit('text', { chat: { id: query.message.chat.id }, text: '/start' });
  }
});

// -----------------------------------------------------------------------------
// Express Keep-Alive Server for Render
// -----------------------------------------------------------------------------
const app = express();
app.get('/', (req, res) => {
  res.status(200).send('⚡ RITEEK HACKING CLASS TERMINAL RUNNING LIVE ⚡');
});

app.listen(port, () => {
  console.log(`Hacker node active on port ${port}`);
});
