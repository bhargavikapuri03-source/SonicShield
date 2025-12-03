# SonicShield - Your Night Safety Companion

A comprehensive safety application that monitors sound and vibration to detect unusual activity and send emergency alerts to your contacts.

## Features

- 🎤 **Sound Detection**: Real-time microphone monitoring with adjustable sensitivity
- 📳 **Vibration Detection**: Motion sensor integration for detecting physical disturbances
- 🚨 **Emergency Alerts**: Automatic SOS with 10-second countdown
- 📱 **Contact Management**: Add/edit/delete emergency contacts with name, phone, and email
- 📊 **Activity Log**: Track all detected incidents with timestamps
- ⏰ **Scheduled Monitoring**: Auto-activate during specific hours (e.g., 9 PM - 6 AM)
- 🔕 **Silent Mode**: Monitor without audible alerts
- 📍 **GPS Location**: Include location in SOS messages
- 🎯 **Panic Button**: One-tap emergency alert

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

For mobile app development:
- **Android Studio** (for Android)
- **Xcode** (for iOS, macOS only)

### Installation

1. **Clone or download this repository**

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the App

### Web Version (Browser)

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open in browser**:
   - The app will open automatically at `http://localhost:3001/`
   - Or manually navigate to the URL shown in terminal

3. **Grant permissions**:
   - Allow microphone access when prompted
   - Allow location access for SOS feature  s

### Mobile App (Android)

1. **Build the web app**:
   ```bash
   npm run build
   ```

2. **Add Android permissions** (first time only):
   - Open `android/app/src/main/AndroidManifest.xml`
   - Add the following permissions inside `<manifest>` tag:
   ```xml
   <uses-permission android:name="android.permission.RECORD_AUDIO" />
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   <uses-permission android:name="android.permission.SEND_SMS" />
   <uses-permission android:name="android.permission.VIBRATE" />
   <uses-permission android:name="android.permission.WAKE_LOCK" />
   ```

3. **Open in Android Studio**:
   ```bash
   npm run android
   ```

4. **Run the app**:
   - Wait for Gradle sync to complete
   - Connect an Android device or start an emulator
   - Click the green "Run" button in Android Studio

### Mobile App (iOS - macOS only)

1. **Add iOS platform** (first time only):
   ```bash
   npx cap add ios
   ```

2. **Build and open in Xcode**:
   ```bash
   npm run ios
   ```

3. **Configure permissions** (first time only):
   - In Xcode, open `Info.plist`
   - Add permission descriptions for microphone, location, and motion

4. **Run the app**:
   - Select a simulator or connected device
   - Click the "Play" button in Xcode

## Usage Guide

### First Time Setup

1. **Welcome Screen**: Click "Get Started"
2. **Permissions**: Grant microphone and location access
3. **Login**: Enter your name, contact number, and email
4. **Dashboard**: You're ready to use SonicShield!

### Adding Emergency Contacts

1. Open the **Settings** menu (hamburger icon)
2. Click **SOS Details**
3. Click **Add Emergency Contact**
4. Enter contact name, phone number, and email
5. Click **Add Contact**

### Configuring Monitoring

1. **Sound Sensitivity**: Settings → Sound Sensitivity
   - Low: Only very loud sounds
   - Medium: Balanced (recommended)
   - High: Even faint sounds

2. **Schedule**: Settings → Time Setting
   - Enable automatic monitoring during specific hours
   - Example: 10 PM - 6 AM

3. **Silent Mode**: Settings → Sound Sensitivity → Silent Mode
   - Monitoring continues without audible alerts

### How It Works

1. **Enable Monitoring**: Toggle "Sound Monitoring" on the dashboard
2. **Detection**: When loud noise or vibration is detected:
   - Emergency alert appears with 10-second countdown
   - Click "I AM SAFE" to cancel
   - If not cancelled, SOS is sent to all contacts
3. **SOS Message**: Includes:
   - Alert message
   - Your GPS location
   - Timestamp

## Development

### Project Structure

```
sonic_1/
├── src/
│   ├── components/      # React components
│   ├── context/         # State management
│   ├── hooks/           # Custom hooks (sound/vibration detection)
│   ├── utils/           # Utility functions
│   └── main.tsx         # App entry point
├── android/             # Android app (Capacitor)
├── build/               # Built web app (output directory)
└── capacitor.config.ts  # Capacitor configuration
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (web)
npm run build            # Build for production

# Mobile
npm run android          # Build and open Android Studio
npm run ios              # Build and open Xcode (macOS)
npm run sync             # Sync web changes to mobile

# Utilities
npm install              # Install dependencies
npm audit                # Check for vulnerabilities
```

### Making Changes

1. Edit files in `src/` folder
2. For web: Changes auto-reload with `npm run dev`
3. For mobile:
   ```bash
   npm run build
   npm run sync
   ```
   Then rebuild in Android Studio/Xcode

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Capacitor** - Native mobile wrapper
- **Framer Motion** - Animations
- **Radix UI** - UI components
- **Recharts** - Data visualization
- **Web Audio API** - Sound detection
- **DeviceMotion API** - Vibration detection
- **Geolocation API** - GPS location

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS may require permissions)
- **Mobile Browsers**: Limited background monitoring

## Troubleshooting

### Microphone Not Working
- Check browser permissions
- Ensure HTTPS or localhost
- Try different browser

### Vibration Detection Shows 0.0
- Feature works on mobile devices only
- Desktop browsers don't provide motion data
- Test on actual phone/tablet

### Build Errors
```bash
npm install              # Reinstall dependencies
npm run build            # Try building again
```

### Android Studio Issues
- Update to latest version
- Install required Android SDK
- Sync Gradle files

## License

This project is for educational and personal use.

## Support

For issues or questions, please check the walkthrough documentation in the `.gemini` folder.