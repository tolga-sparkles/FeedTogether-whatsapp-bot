require('dotenv').config();
const { Client, LocalAuth, Poll } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');

// Parse command line arguments
const args = process.argv.slice(2);
const executablePath =
    (args.find(arg => arg.startsWith('--executablePath='))?.split('=')[1])
    || process.env.PUPPETEER_EXECUTABLE_PATH;
const groupId =
    (args.find(arg => arg.startsWith('--groupId='))?.split('=')[1])
    || process.env.GROUP_ID;
const pollQuestion =
    (args.find(arg => !arg.startsWith('--')))
    || process.env.POLL_QUESTION
    || "Lütfen bu yemeği 1-5 arası puanlayın";

if (!groupId) {
    console.error('Hedef grup ID eksik. --groupId=<ID> ile geçin veya GROUP_ID ortam değişkenini ayarlayın.');
    process.exit(1);
}

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'whatsapp-bot',
        dataPath: '.wwebjs_auth'
    }),
    puppeteer: {
        executablePath: executablePath || undefined,
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ]
    }
});

// QR code display
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Error handling
client.on('auth_failure', () => {
    console.error('Authentication failed!');
    process.exit(1);
});

client.on('disconnected', (reason) => {
    console.log('Client disconnected:', reason);
    client.destroy();
    process.exit(1);
});

// Poll sending function
async function sendRatingPoll(targetGroupId, question) {
    const ratingOptions = ['1', '2', '3', '4', '5'];
    
    try {
        const poll = new Poll(question, ratingOptions, {
            allowMultipleAnswers: false
        });

        const messageAck = new Promise((resolve) => {
            client.on('message_ack', (msg, ack) => {
                console.log('Mesaj durumu:', ack);
                if (ack >= 1) {
                    resolve(true);
                }
            });
        });

        const timeout = new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('Mesaj gönderimi zaman aşımına uğradı')), 30000);
        });

        console.log('Anket gönderiliyor...');
        const sentMessage = await client.sendMessage(targetGroupId, poll);
        console.log('Anket gönderildi, onay bekleniyor...');

        try {
            await Promise.race([messageAck, timeout]);
            console.log('Anket başarıyla iletildi!');
            console.log('Bot kapatılıyor...');
            await client.destroy();
            process.exit(0);
        } catch (error) {
            console.warn('Uyarı:', error.message);
            console.log('Anket gönderildi fakat onay alınamadı.');
            console.log('Bot kapatılıyor...');
            await client.destroy();
            process.exit(1);
        }
    } catch (err) {
        console.error('Hata detayları:', err);
        if (err.message) console.error('Hata mesajı:', err.message);
        if (err.stack) console.error('Stack trace:', err.stack);
        console.log('Bot kapatılıyor...');
        await client.destroy();
        process.exit(1);
    }
}

// Ready event handler
client.on('ready', async () => {
    console.log('Bot çalışıyor!');
    await sendRatingPoll(groupId, pollQuestion);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down...');
    client.destroy();
    process.exit(0);
});

// Initialize bot
client.initialize().catch(err => {
    console.error('Initialization failed:', err);
    process.exit(1);
});
