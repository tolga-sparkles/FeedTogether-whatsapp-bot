# WhatsApp Bot - FeedTogether Anket Sistemi

WhatsApp gruplarına otomatik olarak yemek değerlendirme anketleri gönderen bot.

## Özellikler

- 🤖 Otomatik WhatsApp anket gönderimi
- 📊 1-5 yıldız değerlendirme sistemi
- 🎯 Belirli WhatsApp gruplarını hedefleme
- 🔐 QR kod ile güvenli kimlik doğrulama
- ⚡ Hızlı kurulum ve dağıtım
- 🛡️ Hata yönetimi ve zarif kapanış

## Gereksinimler

- Node.js (v14 veya üzeri)
- Python (v3.7 veya üzeri)
- WhatsApp hesabı
- Chrome/Chromium tarayıcı (Puppeteer için)

## Kurulum

1. **Depoyu klonlayın:**
```bash
git clone <repo-url>
cd "whatsapp-bot copy"
```

2. **Node.js bağımlılıklarını yükleyin:**
```bash
npm install
```

3. **Python bağımlılıklarını yükleyin:**
```bash
pip install -r requirements.txt
```

4. **Ortam dosyası oluşturun:**
Proje kökünde `.env` dosyası oluşturun:
```env
GROUP_ID=hedef_grup_id@g.us
POLL_QUESTION=Lütfen bu yemeği 1-5 arası puanlayın
PUPPETEER_EXECUTABLE_PATH=/chrome/yolu
```

## Yapılandırma

### Ortam Değişkenleri

| Değişken | Açıklama | Zorunlu | Varsayılan |
|----------|----------|---------|------------|
| `GROUP_ID` | Hedef WhatsApp grup ID'si | ✅ Evet | - |
| `POLL_QUESTION` | Anket soru metni | ❌ Hayır | "Lütfen bu yemeği 1-5 arası puanlayın" |
| `PUPPETEER_EXECUTABLE_PATH` | Chrome yürütülebilir yolu | ❌ Hayır | Otomatik algıla |

### Grup ID Bulma

1. Botu hedef WhatsApp grubuna ekleyin
2. Botu hata ayıklama modunda çalıştırın
3. Konsol loglarında grup ID'lerini kontrol edin
4. Grup ID'sini kopyalayın (format: `sayılar@g.us`)

## Kullanım

### Temel Kullanım

```bash
npm start
```

### Komut Satırı Argümanları ile

```bash
node bot.js --groupId=1234567890@g.us --executablePath=/usr/bin/google-chrome "Özel anket sorusu"
```

### Komut Satırı Seçenekleri

- `--groupId=<ID>`: Hedef grup ID'si belirt
- `--executablePath=<YOL>`: Chrome yürütülebilir yolunu belirt
- `<soru>`: Özel anket sorusu (bayrak gerekmez)

## İlk Kurulum

1. **Botu çalıştırın:**
```bash
npm start
```

2. **QR kodu tarayın:**
   - Terminalinizde QR kod görünecek
   - Telefonunuzda WhatsApp'ı açın
   - Ayarlar > Bağlı Cihazlar'a gidin
   - QR kodu tarayın

3. **Kimlik doğrulama:**
   - Bot kimlik doğrulama verilerini yerel olarak kaydeder
   - Sonraki çalıştırmalarda QR tarama gerekmez

## Dosya Yapısı

```
whatsapp-bot copy/
├── bot.js                 # Ana bot uygulaması
├── food_handler.py        # Yemek işleme araçları
├── image_handler.py       # Görüntü işleme araçları
├── package.json           # Node.js bağımlılıkları
├── requirements.txt       # Python bağımlılıkları
├── .env                   # Ortam değişkenleri
├── .gitignore            # Git yok sayma kuralları
├── auth_data/            # WhatsApp kimlik doğrulama verileri
└── README.md             # Bu dosya
```

## Detaylı Özellikler

### Anket Sistemi
- Otomatik 1-5 değerlendirme anketleri oluşturur
- Tek seçimli oylama (çoklu cevap yok)
- Özelleştirilebilir soru metni
- Otomatik teslim onayı

### Hata Yönetimi
- Bağlantı zaman aşımı koruması
- Kimlik doğrulama hatası kurtarma
- Hatalarda zarif kapanış
- Detaylı hata günlüğü

### Güvenlik
- Yerel kimlik doğrulama depolama
- Güvenli oturum yönetimi
- Kodda hassas veri yok
- Ortam değişkeni koruması

## Sorun Giderme

### Yaygın Sorunlar

**QR kod görünmüyor:**
```bash
# Chrome yolunu manuel olarak belirtin
node bot.js --executablePath=/usr/bin/google-chrome
```

**Kimlik doğrulama başarısız:**
```bash
# Auth verilerini temizleyin ve tekrar deneyin
rm -rf auth_data/
npm start
```

**Grup ID bulunamıyor:**
```bash
# Botun hedef gruba eklendiğinden emin olun
# Grup ID formatını kontrol edin: sayılar@g.us
```

**Puppeteer sorunları:**
```bash
# Chrome bağımlılıklarını yükleyin (Linux)
sudo apt-get install -y gconf-service libasound2-dev libatk1.0-dev libc6-dev
```

### Hata Ayıklama Modu

Detaylı günlükleme etkinleştir:
```bash
DEBUG=* node bot.js
```

## Geliştirme

### Yeni Özellik Ekleme

1. **Yemek İşleyici (Python):**
   - `food_handler.py`'ye yemek işleme mantığı ekleyin
   - Child process kullanarak Node.js ile entegre edin

2. **Görüntü İşleyici (Python):**
   - `image_handler.py`'ye görüntü işleme ekleyin
   - Yemek görüntü analizi desteği

3. **Bot Genişletmeleri:**
   - Yeni WhatsApp özellikleri için `bot.js`'yi değiştirin
   - Yeni anket türleri veya mesaj işleyicileri ekleyin

### Katkıda Bulunma

1. Depoyu fork edin
2. Özellik dalı oluşturun
3. Değişikliklerinizi yapın
4. Kapsamlı test edin
5. Pull request gönderin

## Lisans

Bu proje ISC Lisansı altında lisanslanmıştır - detaylar için package.json dosyasına bakın.

## Destek

Sorunlar ve sorular için:
1. Sorun giderme bölümünü kontrol edin
2. Hatalar için konsol loglarını inceleyin
3. Tüm bağımlılıkların yüklendiğinden emin olun
4. WhatsApp grup izinlerini doğrulayın

## Değişiklik Günlüğü

### Versiyon 1.0.0
- İlk sürüm
- Temel anket gönderme işlevi
- QR kod kimlik doğrulaması
- Ortam değişkeni yapılandırması
- Hata yönetimi ve günlükleme

---

**Not:** Bu bot yalnızca eğitim ve meşru iş amaçları için tasarlanmıştır. Lütfen WhatsApp Hizmet Şartlarına saygı gösterin ve spam yapmaktan kaçının.

---

# WhatsApp Bot - FeedTogether Poll System

A WhatsApp bot that automatically sends rating polls to specific groups for food rating and feedback collection.

## Features

- 🤖 Automated WhatsApp poll sending
- 📊 1-5 star rating system
- 🎯 Target specific WhatsApp groups
- 🔐 Secure authentication with QR code
- ⚡ Fast deployment and setup
- 🛡️ Error handling and graceful shutdown

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- A WhatsApp account
- Chrome/Chromium browser (for Puppeteer)

## Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd "whatsapp-bot copy"
```

2. **Install Node.js dependencies:**
```bash
npm install
```

3. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create environment file:**
Create a `.env` file in the project root:
```env
GROUP_ID=your_target_group_id@g.us
POLL_QUESTION=Lütfen bu yemeği 1-5 arası puanlayın
PUPPETEER_EXECUTABLE_PATH=/path/to/chrome
```

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GROUP_ID` | Target WhatsApp group ID | ✅ Yes | - |
| `POLL_QUESTION` | Question text for the poll | ❌ No | "Lütfen bu yemeği 1-5 arası puanlayın" |
| `PUPPETEER_EXECUTABLE_PATH` | Chrome executable path | ❌ No | Auto-detect |

### Finding Group ID

1. Add the bot to your target WhatsApp group
2. Run the bot in debug mode
3. Check console logs for group IDs
4. Copy the group ID (format: `numbers@g.us`)

## Usage

### Basic Usage

```bash
npm start
```

### With Command Line Arguments

```bash
node bot.js --groupId=1234567890@g.us --executablePath=/usr/bin/google-chrome "Custom poll question"
```

### Command Line Options

- `--groupId=<ID>`: Specify target group ID
- `--executablePath=<PATH>`: Specify Chrome executable path
- `<question>`: Custom poll question (no flag needed)

## First Time Setup

1. **Run the bot:**
```bash
npm start
```

2. **Scan QR code:**
   - A QR code will appear in your terminal
   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices
   - Scan the QR code

3. **Authentication:**
   - The bot will save authentication data locally
   - Subsequent runs won't require QR scanning

## File Structure

```
whatsapp-bot copy/
├── bot.js                 # Main bot application
├── food_handler.py        # Food processing utilities
├── image_handler.py       # Image processing utilities
├── package.json           # Node.js dependencies
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── auth_data/            # WhatsApp authentication data
└── README.md             # This file
```

## Features in Detail

### Poll System
- Creates 1-5 rating polls automatically
- Single-choice voting (no multiple answers)
- Customizable question text
- Automatic delivery confirmation

### Error Handling
- Connection timeout protection
- Authentication failure recovery
- Graceful shutdown on errors
- Detailed error logging

### Security
- Local authentication storage
- Secure session management
- No sensitive data in code
- Environment variable protection

## Troubleshooting

### Common Issues

**QR Code not appearing:**
```bash
# Try specifying Chrome path manually
node bot.js --executablePath=/usr/bin/google-chrome
```

**Authentication failed:**
```bash
# Clear auth data and retry
rm -rf auth_data/
npm start
```

**Group ID not found:**
```bash
# Make sure bot is added to the target group
# Check group ID format: numbers@g.us
```

**Puppeteer issues:**
```bash
# Install Chrome dependencies (Linux)
sudo apt-get install -y gconf-service libasound2-dev libatk1.0-dev libc6-dev
```

### Debug Mode

Enable detailed logging:
```bash
DEBUG=* node bot.js
```

## Development

### Adding New Features

1. **Food Handler (Python):**
   - Add food processing logic to `food_handler.py`
   - Integrate with Node.js using child processes

2. **Image Handler (Python):**
   - Add image processing to `image_handler.py`
   - Support for food image analysis

3. **Bot Extensions:**
   - Modify `bot.js` for new WhatsApp features
   - Add new poll types or message handlers

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License - see the package.json file for details.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review console logs for errors
3. Ensure all dependencies are installed
4. Verify WhatsApp group permissions

## Changelog

### Version 1.0.0
- Initial release
- Basic poll sending functionality
- QR code authentication
- Environment variable configuration
- Error handling and logging

---

**Note:** This bot is for educational and legitimate business purposes only. Please respect WhatsApp's Terms of Service and avoid spamming.
