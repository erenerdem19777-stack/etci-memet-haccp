// cap add android sonrası: kamera izni (fotoğraf çekme) ve sürüm bilgisi
const fs = require('fs');
const mf = 'android/app/src/main/AndroidManifest.xml';
let x = fs.readFileSync(mf, 'utf8');
if (!x.includes('android.permission.CAMERA')) {
  x = x.replace('<uses-permission android:name="android.permission.INTERNET" />',
    '<uses-permission android:name="android.permission.INTERNET" />\n    <uses-permission android:name="android.permission.CAMERA" />\n    <uses-feature android:name="android.hardware.camera" android:required="false" />');
}
fs.writeFileSync(mf, x);
const bg = 'android/app/build.gradle';
let g = fs.readFileSync(bg, 'utf8');
const run = process.env.GITHUB_RUN_NUMBER || '1';
g = g.replace(/versionCode \d+/, 'versionCode ' + run).replace(/versionName "[^"]*"/, 'versionName "1.0.' + run + '"');
if (!g.includes('keys/debug.keystore')) {
  g = g.replace(/android\s*\{/, "android {\n    signingConfigs {\n        debug {\n            storeFile file('../../keys/debug.keystore')\n            storePassword 'android'\n            keyAlias 'androiddebugkey'\n            keyPassword 'android'\n        }\n    }");
}
fs.writeFileSync(bg, g);
console.log('AndroidManifest ve build.gradle güncellendi');
