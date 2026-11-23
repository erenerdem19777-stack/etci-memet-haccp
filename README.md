# Etçi Memet HACCP

Etçi Memet merkez üretim tesisi için HACCP kayıt ve kontrol uygulaması: sıcaklık, mal kabul (CCP-1), parçalama/köfte (CCP-2), dondurma (CCP-3), sevkiyat, izlenebilirlik, günlük/haftalık/aylık/yıllık kontrol formları ve Ek-5 öz kontrol.

## İndir

| Nerede | Dosya |
|---|---|
| **Android telefon** | [EtciMemet-HACCP.apk](https://github.com/erenerdem19777-stack/etci-memet-haccp/releases/latest/download/EtciMemet-HACCP.apk) |
| **Windows bilgisayar** | [EtciMemet-HACCP-Kurulum.exe](https://github.com/erenerdem19777-stack/etci-memet-haccp/releases/latest/download/EtciMemet-HACCP-Kurulum.exe) |
| **Tarayıcıdan (kurulumsuz)** | https://erenerdem19777-stack.github.io/etci-memet-haccp/ |

Tüm sürümler: [Releases](https://github.com/erenerdem19777-stack/etci-memet-haccp/releases)

## Veriler

- Kayıtlar yalnız kullanılan cihazda saklanır; bu depoya veya internete gitmez.
- Cihazlar arası aktarım: **Kayıt → Veri aktarımı → Gönder** (dosya WhatsApp, e-posta, Drive… ile paylaşılır) ve öteki cihazda **Birleştir**. İki yönlüdür; aynı kayıt iki kez eklenmez.
- Giriş: Ayarlar → Kullanıcılar bölümünden kullanıcı adı ve şifre tanımlanır; liste aktarım dosyasıyla öteki cihazlara geçer.

## Geliştirme

- `www/index.html` uygulamanın kendisidir. Android: Capacitor 6, Windows: Electron.
- `main` dalına her gönderimde `.github/workflows/derle.yml` APK, Windows kurulumu ve web sürümünü derleyip yayınlar.
- `keys/debug.keystore` APK'nın sabit imza anahtarıdır (yeni sürümün eskisinin üzerine kurulabilmesi için).
