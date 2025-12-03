import { motion } from "framer-motion";
import { User, Phone, Mail, MapPin, Hash, CheckCircle2, ArrowLeft } from "lucide-react";
import { UserData } from "./LoginPage";

interface UserDetailsPageProps {
  userData: UserData;
  onBack: () => void;
}

export function UserDetailsPage({ userData, onBack }: UserDetailsPageProps) {
  const detailItems = [
    {
      icon: <User className="w-5 h-5 text-blue-400" />,
      label: "Full Name",
      value: userData.name,
    },
    {
      icon: <Phone className="w-5 h-5 text-blue-400" />,
      label: "Contact Number",
      value: userData.contact,
    },
    {
      icon: <Mail className="w-5 h-5 text-blue-400" />,
      label: "Email Address",
      value: userData.email,
    },
    {
      icon: <MapPin className="w-5 h-5 text-blue-400" />,
      label: "Address",
      value: userData.address,
    },
    {
      icon: <Hash className="w-5 h-5 text-blue-400" />,
      label: "Pincode",
      value: userData.pincode,
    },
  ];

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
        {/* Success Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/50"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-white text-3xl" style={{ fontFamily: "'Orbitron', 'Exo 2', sans-serif" }}>
              Welcome Aboard!
            </h2>
            <p className="text-slate-400 mt-2">
              Your account has been created successfully
            </p>
          </motion.div>
        </div>

        {/* User Details Card */}
        <motion.div
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="mb-4">
            <h3 className="text-white text-xl">Your Details</h3>
            <p className="text-slate-400 text-sm mt-1">
              Review your account information
            </p>
          </div>

          <div className="space-y-4">
            {detailItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors"
              >
                <div className="mt-0.5">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-sm">{item.label}</p>
                  <p className="text-white mt-1 break-words">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-blue-300">
                You're all set! SonicShield is now ready to keep you safe throughout the night.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl"></div>
      </motion.div>
    </div>
  );
}