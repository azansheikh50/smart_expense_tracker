# Smart Bachat

Smart Bachat is an offline-first smart expense tracker and personal finance manager built for the Teyzix Core Mobile App Development task `MAD-1`.

The app lets users register, sign in, record income and expenses, plan monthly/category budgets, search transaction history, review analytics, schedule reminders, use biometric login, switch currencies/themes, and export a monthly PDF report.

## Demo Account

- Email: `demo@smartbachat.app`
- Password: `Demo123!`
- Fastest option: select **Demo account**, then enter the name you want displayed.

The demo account includes six months of sample finance data for immediate dashboard testing.

## Implemented Requirements

| Requirement | Implementation |
| --- | --- |
| Registration and login | Local account registration, salted password hashes, validation, and persistent sessions |
| Secure sessions | Session tokens and biometric account references use Expo SecureStore on Android/iOS |
| Expense management | Add, edit, delete, and view expenses |
| Income management | Add, edit, and view income |
| Transaction fields | Amount, category, date, payment method, and description |
| Budget planning | Monthly budget plus editable category limits |
| Budget consumption | Monthly and category progress indicators with warning states |
| Analytics | Income, expenses, savings, six-month trend, and category breakdown |
| Search and filters | Text search plus type, date, and category filters |
| Notifications | Daily 8:00 PM reminder and 80%/100% budget alerts on Android/iOS |
| Offline support | AsyncStorage persistence, queued local changes, network state, and reconnect sync |
| Responsive UI | Phone-first interface with a constrained responsive web layout |
| State management | Typed React context with immutable state updates and persistence |
| Clean organization | Models, storage, context, reusable UI, screens, and modals are separated |
| Bonus: biometrics | Fingerprint/Face ID login through Expo Local Authentication |
| Bonus: PDF reports | Monthly report generation and sharing through Expo Print/Sharing |
| Bonus: multi-currency | PKR, USD, EUR, and GBP display support |
| Bonus: dark mode | Persistent light/dark preference |

## Technology

- Expo SDK 56
- React Native 0.85
- React 19 and TypeScript
- AsyncStorage for offline finance data
- SecureStore and Expo Crypto for authentication/session storage
- Expo Notifications and Local Authentication
- React Native SVG for analytics
- Expo Print and Sharing for PDF reports
- NetInfo for connectivity and sync state

## Project Structure

```text
.
|-- App.tsx
|-- app.json
|-- eas.json
|-- src/
|   |-- AppContext.tsx
|   |-- AuthScreen.tsx
|   |-- MainApp.tsx
|   |-- components.tsx
|   |-- constants.ts
|   |-- demoData.ts
|   |-- modals.tsx
|   |-- storage.ts
|   |-- types.ts
|   `-- utils.ts
`-- screenshots/
```

## Run the App

### Prerequisites

- Node.js 20 or newer
- npm
- Expo Go on a phone, or Android Studio for an emulator

### Install and start

```bash
npm install
npm run start:clear
```

Then:

1. Install Expo Go on the Android/iOS phone.
2. Keep the phone and computer on the same network.
3. Scan the QR code shown by Expo.
4. Select **Demo account**, enter your name, and open the populated app.

### Mobile red-screen recovery

The project includes the required `expo-font` native dependency used by the icon system. After updating an older copy of the project, always reinstall packages and clear Metro's cache:

```bash
npm install
npm run start:clear
```

Also update Expo Go from the Play Store/App Store before scanning the new QR code. Do not reopen an old QR entry from Expo Go's recent-project list.

If the phone still displays a cached error:

1. Stop the terminal with `Ctrl+C`.
2. Force-close Expo Go.
3. Clear Expo Go's app cache from the phone settings, or reinstall Expo Go.
4. Run `npm run start:clear`.
5. Scan the newly generated QR code.

`expo-notifications` is also loaded lazily. Expo Go never imports that unsupported native module, so the SDK 53+ "Android Push notifications functionality was removed from Expo Go" red screen is avoided. Local reminders and budget notifications remain enabled in an APK or development build.

Secure session keys use only the characters accepted by Expo SecureStore. If SecureStore is unavailable on a device, the app falls back safely instead of raising an unhandled startup error.

The interface uses `react-native-safe-area-context` instead of React Native's deprecated `SafeAreaView`, preventing the development warning overlay shown by newer Expo Go versions.

Run the web version:

```bash
npm run web
```

## Build the Required APK

An Expo account is required for the cloud APK build. The included `eas.json` already defines an installable `preview` APK profile.

```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

When the build finishes:

1. Open the EAS build link printed in the terminal.
2. Download the generated `.apk`.
3. Rename it to `Smart-Bachat-MAD-1.apk`.
4. Install it on an Android device and test login, transaction CRUD, budgets, notifications, offline mode, and PDF export.
5. Add the APK to the final submission folder or release section of the GitHub repository.

For a Play Store `.aab` build:

```bash
npx eas-cli build --platform android --profile production
```

## Quality Checks

```bash
npm run typecheck
npm run export:web
```

The completed project was verified with:

- A strict TypeScript compile
- A production Expo web export
- Phone-sized browser testing at `430 x 932`
- Demo authentication
- Dashboard rendering
- Type/date/category filters
- Budget and settings pages
- Add-expense form submission
- Zero browser console errors and zero page errors

## Screenshots

![Authentication](screenshots/01-authentication.png)

![Demo name prompt](screenshots/01b-demo-name-prompt.png)

![Dashboard](screenshots/02-dashboard.png)

![Filtered transactions](screenshots/03-transactions-filtered.png)

![Budget planning](screenshots/04-budget-planning.png)

![Settings](screenshots/05-settings.png)

![Add transaction](screenshots/06-add-transaction.png)

## GitHub Submission

Run these commands after installing Git:

```bash
git init
git add .
git commit -m "Complete MAD-1 smart expense tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-bachat.git
git push -u origin main
```

Recommended repository sections:

1. Add the APK to a GitHub Release.
2. Keep the screenshots in `screenshots/`.
3. Include the task ID `MAD-1` in the repository description.
4. Confirm the README renders correctly on GitHub.
5. Submit the repository URL and APK before June 19, 2026.

## Offline and Sync Design

Finance records are written locally first, so all CRUD and analytics continue to work without internet access. Changes are marked pending while offline and the sync state is cleared when connectivity returns.

The assignment lists the backend as optional. For production deployment, the `syncNow` method in `src/AppContext.tsx` is the intended integration point for Firebase Authentication and Firestore synchronization.

## Notes

- Notification scheduling and biometrics require an Android/iOS build; browsers show the preference UI but cannot provide native device capabilities.
- Web PDF export opens the browser print dialog. Android/iOS creates and shares a PDF file.
- Currency switching changes display formatting; it does not convert historical values using exchange rates.
