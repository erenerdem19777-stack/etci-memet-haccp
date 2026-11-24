# Etçi Memet HACCP

Etçi Memet merkez üretim tesisi için HACCP kayıt ve kontrol uygulaması: sıcaklık, mal kabul (CCP-1), parçalama/köfte (CCP-2), dondurma (CCP-3), sevkiyat, izlenebilirlik, günlük/haftalık/aylık/yıllık kontrol formları ve Ek-5 öz kontrol.

## İndir

| Nerede | Dosya |
|---|---|
| **Android telefon** | [EtciMemet-HACCP.apk](https://github.com/erenerdem19777-stack/etci-memet-haccp/releases/latest/download/EtciMemet-HACCP.apk) |
| **Windows bilgisayar** | [EtciMemet-HACCP-Kurulum.exe](https://github.com/erenerdem19777-stack/etci-memet-haccp/releases/latest/download/EtciMemet-HACCP-Kurulum.exe) |
| **Tarayıcıdan (kurulumsuz)** | https://erenerdem19777-stack.github.io/etci-memet-haccp/ |

Tüm sürümler: [Releases](https://github.com/erenerdem19777-stack/etci-memet-haccp/releases)

## Veriler ve giriş

- Kayıtlar Firebase (Cloud Firestore) üzerinden bütün cihazlarda kendiliğinden eşitlenir; internet yokken cihazda tutulur, bağlantı gelince gönderilir. Kayıtlar bu depoya gitmez.
- İlk açılışta Sorumlu Yönetici hesabı oluşturulur; diğer kullanıcıları yönetici **Ayarlar → Kullanıcılar** bölümünden ekler. Herkes kendi kullanıcı adı ve şifresiyle girer.
- Erişim kuralları: `firebase/firestore.rules` (yalnız eklenen kullanıcılar okuyup yazabilir; ayarları ve kullanıcıları yalnız yönetici değiştirir).
- İsteğe bağlı yedek: **Kayıt → Yedek dosya → Gönder / Birleştir**.

## Geliştirme

- `www/index.html` uygulamanın kendisidir. Android: Capacitor 6, Windows: Electron.
- `main` dalına her gönderimde `.github/workflows/derle.yml` APK, Windows kurulumu ve web sürümünü derleyip yayınlar.
- `keys/debug.keystore` APK'nın sabit imza anahtarıdır (yeni sürümün eskisinin üzerine kurulabilmesi için).
