# SonicShield - Complete Setup Guide

This guide will walk you through setting up and running the SonicShield safety application on both web browsers and mobile devices.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Running on Web Browser](#running-on-web-browser)
- [Running on Android](#running-on-android)
- [Running on iOS](#running-on-ios-macos-only)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

### For Mobile Development

3. **Android Studio** (for Android apps)
   - Download from: https://developer.android.com/studio
   - Install Android SDK and emulator

4. **Xcode** (for iOS apps - macOS only)
   - Download from Mac App Store
   - Install Command Line Tools

---

## Initial Setup

### Step 1: Install Dependencies

Open terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required packages. Wait for it to complete (may take a few minutes).

### Step 2: Verify Installation

Check that everything installed correctly:

```bash
npm list --depth=0
```

You should see packages like `@capacitor/core`, `react`, `vite`, etc.

---

## Running on Web Browser

### Quick Start

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open in browser**:
   - The app will automatically open at `http://localhost:3001/`
   - If not, manually navigate to the URL shown in terminal

3. **Grant permissions**:
   - Click "Get Started"
   - Allow microphone access when prompted
   - Allow location access when prompted

4. **Use the app**:
   - Enter your details on the login page
   - Start using SonicShield!

### Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

---

## Running on Android

### First-Time Setup

#### Step 1: Build the Web App

```bash
npm run build
```

This creates the `build/` folder with your compiled app.

#### Step 2: Verify Android Permissions (Already Done)

The permissions are already configured in `android/app/src/main/AndroidManifest.xml`:
- ✅ Microphone access
- ✅ Location access
- ✅ SMS sending
- ✅ Vibration
- ✅ Background services

#### Step 3: Open in Android Studio

```bash
npm run android
```

This will:
1. Build the web app
2. Sync files to Android project
3. Open Android Studio

**First time?** Wait for Gradle sync to complete (may take 5-10 minutes).

#### Step 4: Run the App

In Android Studio:

1. **Select a device**:
   - Click the device dropdown at the top
   - Choose an emulator or connected physical device
   - If no emulator exists, create one: Tools → Device Manager → Create Device

2. **Run the app**:
   - Click the green "Run" button (▶️)
   - Wait for build to complete
   - App will launch on your device/emulator

3. **Grant permissions**:
   - When the app opens, it will request permissions
   - Allow microphone, location, and SMS access

### Subsequent Runs

After making code changes:

```bash
npm run build
npm run sync
```

Then rebuild in Android Studio (click the green Run button).

### Alternative: Quick Rebuild

```bash
npm run android
```

This does everything in one command.

---

## Running on iOS (macOS Only)

### First-Time Setup

#### Step 1: Add iOS Platform

```bash
npx cap add ios
```

#### Step 2: Configure Permissions

Edit `ios/App/App/Info.plist` and add:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>SonicShield needs microphone access to detect unusual sounds for your safety.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>SonicShield needs your location to send it in emergency alerts.</string>

<key>NSMotionUsageDescription</key>
<string>SonicShield uses motion sensors to detect vibrations and unusual activity.</string>
```

#### Step 3: Open in Xcode

```bash
npm run ios
```

#### Step 4: Run the App

In Xcode:

1. **Select a device**:
   - Choose a simulator or connected iPhone
   - If using physical device, sign the app with your Apple ID

2. **Run the app**:
   - Click the "Play" button (▶️)
   - Wait for build to complete
   - App will launch

3. **Grant permissions**:
   - Allow microphone, location, and motion access

### Subsequent Runs

```bash
npm run build
npm run sync
```

Then rebuild in Xcode.

---

## App Usage Guide

### First Launch

1. **Welcome Screen**
   - Click "Get Started"

2. **Permissions Page**
   - Review required permissions
   - Click "Continue"

3. **Login Page**
   - Enter your name
   - Enter phone number
   - Enter email address
   - Click "Continue"

4. **Dashboard**
   - You're now on the main dashboard!

### Adding Emergency Contacts

1. Click the **menu icon** (☰) in top-left
2. Select **"SOS Details"**
3. Click **"Add Emergency Contact"**
4. Fill in:
   - Name
   - Phone number
   - Email (optional)
5. Click **"Add Contact"**
6. Repeat for additional contacts

### Configuring Monitoring

#### Enable Sound Monitoring

1. On dashboard, toggle **"Sound Monitoring"** ON
2. Speak or make noise to test
3. Check "Recent Activity" for detections

#### Set Sensitivity

1. Open menu → **"Sound Sensitivity"**
2. Choose:
   - **Low**: Only very loud sounds
   - **Medium**: Balanced (recommended)
   - **High**: Even faint sounds
3. Enable **"Silent Mode"** for monitoring without alerts

#### Schedule Monitoring

1. Open menu → **"Time Setting"**
2. Select time range (e.g., "22:00 - 06:00")
3. Monitoring will auto-start/stop

### Testing SOS

1. Add at least one emergency contact
2. Click the large red **"SOS"** button
3. A countdown appears (10 seconds)
4. Click **"I AM SAFE"** to cancel
5. If not cancelled, SMS app opens with alert message

---

## Troubleshooting

### Web Browser Issues

**Problem**: Microphone not working
- **Solution**: 
  - Check browser permissions (click lock icon in address bar)
  - Use HTTPS or localhost only
  - Try Chrome or Edge browser

**Problem**: Page won't load
- **Solution**:
  ```bash
  npm install
  npm run dev
  ```

### Android Issues

**Problem**: "Could not find web assets directory"
- **Solution**:
  ```bash
  npm run build
  npx cap sync
  ```

**Problem**: Gradle sync failed
- **Solution**:
  - Update Android Studio to latest version
  - File → Invalidate Caches → Restart
  - Install required SDK versions when prompted

**Problem**: App crashes on launch
- **Solution**:
  - Check Android Studio Logcat for errors
  - Verify all permissions in AndroidManifest.xml
  - Rebuild: Build → Clean Project → Rebuild Project

**Problem**: Permissions not requesting
- **Solution**:
  - Uninstall app from device
  - Reinstall and try again

### Build Issues

**Problem**: npm install fails
- **Solution**:
  ```bash
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```

**Problem**: TypeScript errors
- **Solution**:
  ```bash
  npm install -D typescript
  npm run build
  ```

### Vibration Detection Shows 0.0

- **This is normal on desktop browsers**
- Vibration detection only works on mobile devices
- Test on actual phone/tablet

---

## Quick Reference Commands

```bash
# Web Development
npm install              # Install dependencies
npm run dev              # Start dev server
npm run build            # Build for production

# Mobile Development
npm run android          # Build and open Android Studio
npm run ios              # Build and open Xcode (macOS)
npm run sync             # Sync changes to mobile projects

# Utilities
npx cap sync             # Sync Capacitor
npx cap open android     # Open Android Studio
npx cap open ios         # Open Xcode
```

---

## Project Structure

```
sonic_1/
├── src/                 # Source code
│   ├── components/      # React components
│   ├── context/         # State management
│   ├── hooks/           # Custom hooks
│   └── utils/           # Utilities
├── android/             # Android app
├── ios/                 # iOS app (if added)
├── build/               # Built web app
├── capacitor.config.ts  # Capacitor config
└── package.json         # Dependencies
```

---

## Getting Help

- Check the [README.md](README.md) for feature documentation
- Review the walkthrough in `.gemini/antigravity/brain/` folder
- Check Android Studio Logcat for mobile errors
- Verify all prerequisites are installed

---

## Next Steps

1. ✅ Complete initial setup
2. ✅ Run on web browser
3. ✅ Add emergency contacts
4. ✅ Configure monitoring settings
5. ✅ Test on mobile device
6. 🚀 Deploy to app stores (optional)

---

**Congratulations!** You're ready to use SonicShield for your safety monitoring needs.
