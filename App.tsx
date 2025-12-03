import { PermissionsPage } from "./components/PermissionsPage";
import { LoginPage, UserData } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { ShieldLogo } from "./components/ShieldLogo";
import { Button } from "./components/ui/button";
import { motion } from "motion/react";
import { useState } from "react";

import { SafetyProvider } from "./context/SafetyContext";

export default function App() {
  return (
    <SafetyProvider>
      <AppContent />
    </SafetyProvider>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<"welcome" | "permissions" | "login" | "dashboard">("welcome");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleLoginSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentPage("dashboard");
  };

  if (currentPage === "dashboard" && userData) {
    return <Dashboard userData={userData} />;
  }

  if (currentPage === "login") {
    return <LoginPage onSubmit={handleLoginSubmit} onBack={() => setCurrentPage("permissions")} />;
  }

  if (currentPage === "permissions") {
    return <PermissionsPage onContinue={() => setCurrentPage("login")} onBack={() => setCurrentPage("welcome")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full flex flex-col items-center justify-center space-y-8">
        {/* Logo with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-blue-500/30 rounded-full scale-150"></div>
          <div className="relative">
            <ShieldLogo />
          </div>
        </div>

        {/* Text content */}
        <div className="text-center space-y-3 px-4">
          <h1 className="text-6xl tracking-wider relative" style={{ fontFamily: "'Orbitron', 'Exo 2', sans-serif" }}>
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{
                opacity: [0, 1, 1, 0.9],
                y: [20, 0, 0, 0],
                filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(0px)"]
              }}
              transition={{
                duration: 2,
                times: [0, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut"
              }}
            >
              Sonic
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{
                opacity: [0, 1, 1, 0.9],
                y: [20, 0, 0, 0],
                filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(0px)"]
              }}
              transition={{
                duration: 2,
                delay: 0.3,
                times: [0, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut"
              }}
            >
              Shield
            </motion.span>
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-blue-400/30 to-blue-600/20 blur-xl -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.5] }}
              transition={{
                duration: 2,
                delay: 0.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut"
              }}
            />
          </h1>
          <motion.p
            className="text-slate-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1, delay: 1 }}
          >
            Your Night Safety Companion
          </motion.p>
        </div>

        {/* Get Started Button */}
        <div className="w-full px-4 pt-8">
          <Button
            onClick={() => setCurrentPage("permissions")}
            className="w-auto px-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl h-11 shadow-lg shadow-blue-500/50 transition-all duration-300 hover:shadow-blue-500/70 hover:scale-[1.02] mx-auto block"
          >
            Get Started
          </Button>

          {/* SOS Quick Access Icon */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-slate-400 text-sm mb-3">Emergency? Tap for instant SOS</p>
            <button
              onClick={() => {
                // Quick SOS - would need to be implemented with actual SOS logic
                if (confirm('Send emergency SOS to your contacts?')) {
                  window.location.href = 'sms:?body=🚨 EMERGENCY! I need help immediately. - SonicShield Alert';
                }
              }}
              className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 hover:shadow-red-500/70 transition-all duration-300 hover:scale-110 mx-auto group"
            >
              <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}