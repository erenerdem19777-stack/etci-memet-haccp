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

// WhatsApp vb.de .json aktarım dosyasına dokununca "Etçi Memet HACCP" ile açılabilsin
let mx = fs.readFileSync(mf, 'utf8');
if (!mx.includes('etcimemet-dosya')) {
  const types = ['application/json', 'application/octet-stream', 'text/json'];
  const view = '\n            <!-- etcimemet-dosya -->\n            <intent-filter>\n                <action android:name="android.intent.action.VIEW" />\n                <category android:name="android.intent.category.DEFAULT" />\n                <data android:scheme="content" />\n' + types.map(t => '                <data android:mimeType="' + t + '" />\n').join('') + '            </intent-filter>\n';
  const send = '            <intent-filter>\n                <action android:name="android.intent.action.SEND" />\n                <category android:name="android.intent.category.DEFAULT" />\n' + types.map(t => '                <data android:mimeType="' + t + '" />\n').join('') + '            </intent-filter>\n';
  const i = mx.indexOf('</intent-filter>');
  const j = i + '</intent-filter>'.length;
  mx = mx.slice(0, j) + view + send + mx.slice(j);
  fs.writeFileSync(mf, mx);
}
const ma = 'android/app/src/main/java/com/etcimemet/haccp/MainActivity.java';
fs.writeFileSync(ma, `package com.etcimemet.haccp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    // "Paylaş" ile gelen dosyayı (SEND) "Aç" (VIEW) gibi uygulamaya ilet
    private static void paylasimiAc(Intent i) {
        if (i != null && Intent.ACTION_SEND.equals(i.getAction())) {
            Uri u = i.getParcelableExtra(Intent.EXTRA_STREAM);
            if (u != null) {
                i.setAction(Intent.ACTION_VIEW);
                i.setData(u);
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            }
        }
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        paylasimiAc(getIntent());
        super.onCreate(savedInstanceState);
    }
    @Override
    protected void onNewIntent(Intent intent) {
        paylasimiAc(intent);
        super.onNewIntent(intent);
    }
}
`);
console.log('AndroidManifest ve build.gradle güncellendi');
