# Dapur Mama — Sistem Pengurusan Resepi (React Native + Expo, JavaScript)

Design mengikut Figma "Sistem Pengurusan Resepi — Design System, Wireframe & Mockup".

## Pasang & jalankan
```bash
bash setup.sh            # cipta projek DapurMama + pasang dependencies
cd DapurMama
npx expo start           # tekan "a" untuk emulator Android, atau imbas QR dengan Expo Go
```

## Struktur
- `App.js` — navigasi skrin resepi dan profil + muat font Inter & Source Serif Pro
- `src/theme.js` — token warna/jarak/taip dari Figma
- `src/context/RecipeContext.js` — CRUD (addRecipe, getRecipe/recipes, updateRecipe, deleteRecipe)
- `src/storage/recipeStorage.js` — penyimpanan setempat (AsyncStorage), dengan sepuluh resepi contoh pada pemasangan pertama
- `src/components/BottomNav.js` — navigasi bawah Home, Tambah resepi, Search dan Profile
- `src/utils/validation.js` — pengesahan input
- `src/screens/` — RecipeListScreen (skrin 01 & 02), SearchScreen (carian semua resepi), FavoritesScreen (resepi kegemaran), RecipeFormScreen (03, 04, 06), RecipeDetailScreen (05, 07)

## Debugging
Log `[DapurMama]` keluar dalam Metro/Logcat (mod dev sahaja):  `adb logcat *:S ReactNativeJS:V`

## Pengesahan & penyimpanan setempat
- Borang Daftar Akaun, Log Masuk dan Resepi menggunakan pengesahan input JavaScript.
- Akaun, sesi dan koleksi resepi disimpan menggunakan AsyncStorage pada peranti.
- Jalankan ujian pengesahan: `npm test`
- Jalankan lint: `npm run lint`

## Release build (Android APK) — EAS
```bash
npm i -g eas-cli && eas login
eas build:configure
eas build -p android --profile preview     # APK untuk ujian/hantaran
eas build -p android --profile production  # AAB untuk Google Play
```
Atau tanpa EAS: `npx expo prebuild -p android` kemudian `cd android && ./gradlew assembleRelease`
(APK di `android/app/build/outputs/apk/release/`).
Tetapkan `name`, `slug`, `version`, `android.package` (cth. `com.namaanda.dapurmama`), `icon` dalam `app.json`.
