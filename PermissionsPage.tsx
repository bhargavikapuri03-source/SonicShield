import { motion } from "framer-motion";
import { Mic, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface Permission {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: string | null;
}

interface PermissionsPageProps {
  onContinue: () => void;
  onBack: () => void;
}

export function PermissionsPage({ onContinue, onBack }: PermissionsPageProps) {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "microphone",
      icon: <Mic className="w-6 h-6" />,
      title: "Microphone Access",
      description: "To detect sounds during the night",
      selected: null,
    },
    {
      id: "location",
      icon: <MapPin className="w-6 h-6" />,
      title: "Location Access",
      description: "To provide location-based safety alerts",
      selected: null,
    },
  ]);

  const [currentPermissionIndex, setCurrentPermissionIndex] = useState(0);

  const handlePermissionSelect = async (option: string) => {
    if (option === "deny") {
      // User denied, just mark as selected
      const updatedPermissions = [...permissions];
      updatedPermissions[currentPermissionIndex].selected = option;
      setPermissions(updatedPermissions);

      setTimeout(() => {
        if (currentPermissionIndex < permissions.length - 1) {
          setCurrentPermissionIndex(currentPermissionIndex + 1);
        }
      }, 400);
      return;
    }

    // Actually request the permission
    const currentPerm = permissions[currentPermissionIndex];
    let granted = false;

    try {
      if (currentPerm.id === "microphone") {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Stop immediately, we just needed permission
        granted = true;
      } else if (currentPerm.id === "location") {
        // Request location permission
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        granted = true;
      }
    } catch (error) {
      console.error("Permission denied:", error);
      granted = false;
    }

    const updatedPermissions = [...permissions];
    updatedPermissions[currentPermissionIndex].selected = granted ? option : "deny";
    setPermissions(updatedPermissions);

    // Move to next permission after a short delay
    setTimeout(() => {
      if (currentPermissionIndex < permissions.length - 1) {
        setCurrentPermissionIndex(currentPermissionIndex + 1);
      }
    }, 400);
  };

  const currentPermission = permissions[currentPermissionIndex];
  const allPermissionsSet = permissions.every(p => p.selected !== null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 hover:border-blue-500/50 transition-all text-slate-300 hover:text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      <motion.div
        className="max-w-lg w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/50"
          >
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </motion.div>
          <h2 className="text-white text-3xl" style={{ fontFamily: "'Orbitron', 'Exo 2', sans-serif" }}>
            App Permissions
          </h2>
          <p className="text-slate-400">
            SonicShield needs these permissions to protect you
          </p>

          {/* Progress indicator */}
          <div className="flex gap-2 justify-center pt-2">
            {permissions.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${index < currentPermissionIndex
                    ? "w-8 bg-blue-500"
                    : index === currentPermissionIndex
                      ? "w-12 bg-blue-500"
                      : "w-8 bg-slate-700"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Permission Card - Only show current permission */}
        <motion.div
          key={currentPermission.id}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-6"
        >
          {/* Permission Info */}
          <div className="flex items-start gap-4">
            <div className="text-blue-400 mt-1">
              {currentPermission.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-white text-xl">{currentPermission.title}</h3>
              <p className="text-slate-400 mt-2">
                {currentPermission.description}
              </p>
            </div>
          </div>

          {/* Permission Options */}
          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePermissionSelect("while-using")}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-800/50 text-slate-300 hover:bg-blue-600 hover:text-white transition-all"
            >
              While using the app
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePermissionSelect("allow")}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-800/50 text-slate-300 hover:bg-blue-600 hover:text-white transition-all"
            >
              Allow
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePermissionSelect("deny")}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-800/50 text-slate-300 hover:bg-red-600 hover:text-white transition-all"
            >
              Deny
            </motion.button>
          </div>
        </motion.div>

        {/* Continue Button - Only show when all permissions are set */}
        {allPermissionsSet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl h-12 shadow-lg shadow-blue-500/50 transition-all duration-300 hover:shadow-blue-500/70"
            >
              Continue
            </Button>
          </motion.div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl"></div>
      </motion.div>
    </div>
  );
}