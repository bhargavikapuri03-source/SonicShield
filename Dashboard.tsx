import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mic, Activity, Clock, Users, FileText, Volume2, RotateCcw, Crown, ArrowLeft, ChevronRight, Bell, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { UserData } from "./LoginPage";
import { ShieldLogo } from "./ShieldLogo";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useSafety } from "../context/SafetyContext";
import { useSoundDetection } from "../hooks/useSoundDetection";
import { useVibrationDetection } from "../hooks/useVibrationDetection";
import { PanicButton } from "./PanicButton";
import { AdBanner } from "./AdBanner";
import { SOSContactEditor } from "./SOSContactEditor";
import { triggerSOS, getLocation } from "../utils/sosLogic";

interface DashboardProps {
  userData: UserData;
  onBack?: () => void;
}

export function Dashboard({ userData, onBack }: DashboardProps) {
  const { settings, updateSettings, logs, isEmergencyActive, setEmergencyActive } = useSafety();
  const { decibelLevel } = useSoundDetection();
  const { intensity } = useVibrationDetection();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSettingDialog, setActiveSettingDialog] = useState<string | null>(null);

  // Emergency Countdown
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isEmergencyActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isEmergencyActive && countdown === 0) {
      triggerSOS(settings.sosContacts);
      setEmergencyActive(false);
      setCountdown(10);
    } else if (!isEmergencyActive) {
      setCountdown(10);
    }
    return () => clearInterval(timer);
  }, [isEmergencyActive, countdown, settings.sosContacts, setEmergencyActive]);

  // Mock data for sound frequency graph (could be replaced with real logs aggregation)
  const soundData = [
    { day: "Mon", frequency: 45 },
    { day: "Tue", frequency: 52 },
    { day: "Wed", frequency: 38 },
    { day: "Thu", frequency: 65 },
    { day: "Fri", frequency: 48 },
    { day: "Sat", frequency: 70 },
    { day: "Sun", frequency: 55 },
  ];

  const settingsItems = [
    { id: "time", icon: Clock, label: "Time Setting" },
    { id: "sos", icon: Users, label: "SOS Details" },
    { id: "reports", icon: FileText, label: "Reports" },
    { id: "sensitivity", icon: Volume2, label: "Sound Sensitivity" },
    { id: "revert", icon: RotateCcw, label: "Revert False Alert" },
    { id: "pro", icon: Crown, label: "Pro Subscription" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Emergency Overlay */}
      <AnimatePresence>
        {isEmergencyActive && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-gradient-to-b from-red-600 to-red-700 flex flex-col items-center justify-center p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Alert Icon */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-6"
            >
              <div className="w-32 h-32 bg-red-500/40 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-2">Unusual Sound Detected</h2>
            <p className="text-white/90 text-lg mb-8">Are You Safe?</p>

            {/* Circular Countdown Timer */}
            <div className="relative mb-8">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "552.92", strokeDashoffset: "0" }}
                  animate={{ strokeDashoffset: `${(countdown / 10) * 552.92}` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-7xl font-bold text-white">{countdown}</div>
                <div className="text-white/80 text-sm mt-1">seconds</div>
              </div>
            </div>

            {/* Sound Level and Time */}
            <div className="flex items-center gap-6 mb-8 text-white">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                <span className="font-semibold">{Math.round(decibelLevel)} dB</span>
              </div>
              <div className="w-px h-5 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-sm space-y-3">
              {/* I'm Safe Button */}
              <Button
                onClick={() => setEmergencyActive(false)}
                className="w-full bg-white text-emerald-600 hover:bg-gray-100 text-lg py-6 rounded-full font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                I'm Safe
              </Button>

              {/* Send SOS Now Button */}
              <Button
                onClick={async () => {
                  const location = await getLocation().catch(() => undefined);
                  triggerSOS(settings.sosContacts, location);
                  setEmergencyActive(false);
                }}
                variant="outline"
                className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg py-6 rounded-full font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Send SOS Now
              </Button>
            </div>

            {/* Auto-send message */}
            <p className="text-white/70 text-sm mt-6">
              SOS will be sent automatically when timer reaches 0
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Watermark Shield Logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-96 h-96 opacity-[0.03]">
          <ShieldLogo size={384} />
        </div>
      </div>

      {/* Header with Logo and Title */}
      <motion.div
        className="flex items-center justify-between p-6 border-b border-slate-800 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button and Menu Button - Left */}
        <div className="flex items-center gap-3">
          {onBack && (
            <motion.button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 hover:border-blue-500/50 transition-all text-slate-300 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          <motion.button
            onClick={() => setIsSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 hover:border-blue-500/50 transition-all text-slate-300 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Logo and Title - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-xl" style={{ fontFamily: "'Orbitron', 'Exo 2', sans-serif" }}>
            <span className="text-blue-400">Sonic</span>
            <span className="text-white">Shield</span>
          </h1>
        </div>

        {/* Notification Bell - Right */}
        <motion.button
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 hover:border-blue-500/50 transition-all text-slate-300 hover:text-white relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5" />
          {/* Notification badge */}
          {logs.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              {logs.length}
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="p-6 space-y-6 max-w-4xl mx-auto relative z-10">

        {/* Panic Button Section */}
        <div className="flex justify-center py-4">
          <PanicButton />
        </div>

        {/* Ad Placement 1 */}
        <AdBanner />

        {/* Last Threat Detect Section */}
        <motion.div
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-white text-xl">Recent Activity</h2>

          <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
            {logs.length === 0 ? (
              <p className="text-slate-500 text-sm">No recent incidents detected.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                  <p className="text-red-300 mb-2">{log.details}</p>
                  <p className="text-slate-400 text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Current Status Section */}
        <motion.div
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-white text-xl">Current Status</h2>

          {/* Mic Active */}
          <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${settings.isMonitoring ? "bg-blue-500/20" : "bg-slate-700/30"
                }`}>
                <Mic className={`w-5 h-5 ${settings.isMonitoring ? "text-blue-400" : "text-slate-500"}`} />
              </div>
              <div>
                <span className="text-white block">Sound Monitoring</span>
                <span className="text-xs text-slate-400">Current Level: {decibelLevel} dB</span>
              </div>
            </div>
            <Button
              onClick={() => updateSettings({ isMonitoring: !settings.isMonitoring })}
              className={settings.isMonitoring
                ? "bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-300 hover:text-red-200"
                : "bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-300 hover:text-green-200"
              }
            >
              {settings.isMonitoring ? "Disable" : "Enable"}
            </Button>
          </div>

          {/* Vibration Status */}
          <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${settings.vibrationEnabled ? "bg-blue-500/20" : "bg-slate-700/30"
                }`}>
                <Activity className={`w-5 h-5 ${settings.vibrationEnabled ? "text-blue-400" : "text-slate-500"}`} />
              </div>
              <div>
                <span className="text-white block">Vibration Monitoring</span>
                <span className="text-xs text-slate-400">Intensity: {intensity.toFixed(1)}</span>
              </div>
            </div>
            <Button
              onClick={() => updateSettings({ vibrationEnabled: !settings.vibrationEnabled })}
              className={settings.vibrationEnabled
                ? "bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-300 hover:text-red-200"
                : "bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-300 hover:text-green-200"
              }
            >
              {settings.vibrationEnabled ? "Disable" : "Enable"}
            </Button>
          </div>
        </motion.div>

        {/* Ad Placement 2 */}
        <AdBanner />
      </div>

      {/* Settings Sidebar - Opens from Left with Top to Bottom motion */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-slate-900 border-r border-slate-800 z-50 overflow-y-auto"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <h2 className="text-white text-xl">Settings</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Content - List of Settings */}
              <div className="p-4">
                {settingsItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSettingDialog(item.id)}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all mb-3"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${item.id === 'pro' ? 'text-amber-400' : 'text-blue-400'}`} />
                        <span className="text-white">{item.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Setting Dialogs */}
      {/* Time Setting Dialog */}
      <Dialog open={activeSettingDialog === "time"} onOpenChange={(open) => !open && setActiveSettingDialog(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Time Setting
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">Set the active monitoring hours</p>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-white">Enable Schedule</span>
              <Button
                size="sm"
                variant={settings.schedule.enabled ? "default" : "outline"}
                onClick={() => updateSettings({ schedule: { ...settings.schedule, enabled: !settings.schedule.enabled } })}
              >
                {settings.schedule.enabled ? "On" : "Off"}
              </Button>
            </div>
            <Select
              value={`${settings.schedule.start} - ${settings.schedule.end}`}
              onValueChange={(val) => {
                const [start, end] = val.split(" - ");
                updateSettings({ schedule: { ...settings.schedule, start, end } });
              }}
            >
              <SelectTrigger className="w-full bg-slate-800/50 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="20:00 - 06:00" className="text-white">20:00 - 06:00</SelectItem>
                <SelectItem value="21:00 - 06:00" className="text-white">21:00 - 06:00</SelectItem>
                <SelectItem value="22:00 - 06:00" className="text-white">22:00 - 06:00</SelectItem>
                <SelectItem value="23:00 - 07:00" className="text-white">23:00 - 07:00</SelectItem>
                <SelectItem value="00:00 - 08:00" className="text-white">00:00 - 08:00</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogContent>
      </Dialog>

      {/* SOS Details Dialog */}
      <Dialog open={activeSettingDialog === "sos"} onOpenChange={(open) => !open && setActiveSettingDialog(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              SOS Emergency Contacts
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-slate-400 text-sm">
              Add emergency contacts who will receive SMS alerts when unusual activity is detected.
            </p>
            <SOSContactEditor
              contacts={settings.sosContacts}
              onUpdate={(contacts) => updateSettings({ sosContacts: contacts })}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Reports Dialog */}
      <Dialog open={activeSettingDialog === "reports"} onOpenChange={(open) => !open && setActiveSettingDialog(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Reports
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-slate-400 text-sm">Sound Frequency - Last Week</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={soundData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="frequency"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sound Sensitivity Dialog */}
      <Dialog open={activeSettingDialog === "sensitivity"} onOpenChange={(open) => !open && setActiveSettingDialog(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-blue-400" />
              Sound Sensitivity
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">Adjust the sensitivity level for sound detection and recording</p>
            <RadioGroup value={settings.sensitivity} onValueChange={(val: any) => updateSettings({ sensitivity: val })}>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-700/30 transition-colors">
                <RadioGroupItem value="low" id="low" className="border-slate-600" />
                <Label htmlFor="low" className="flex-1 cursor-pointer text-white">
                  <span className="block">Low</span>
                  <span className="text-xs text-slate-400">Records only loud sounds</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-700/30 transition-colors">
                <RadioGroupItem value="medium" id="medium" className="border-slate-600" />
                <Label htmlFor="medium" className="flex-1 cursor-pointer text-white">
                  <span className="block">Medium</span>
                  <span className="text-xs text-slate-400">Balanced sensitivity</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-700/30 transition-colors">
                <RadioGroupItem value="high" id="high" className="border-slate-600" />
                <Label htmlFor="high" className="flex-1 cursor-pointer text-white">
                  <span className="block">High</span>
                  <span className="text-xs text-slate-400">Records even faint sounds</span>
                </Label>
              </div>
            </RadioGroup>

            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-white">Silent Mode</span>
                <Button
                  size="sm"
                  variant={settings.silentMode ? "destructive" : "outline"}
                  onClick={() => updateSettings({ silentMode: !settings.silentMode })}
                >
                  {settings.silentMode ? "On" : "Off"}
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-1">When on, alarms won't sound, but SOS will still trigger.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Revert False Alert Dialog */}
      <Dialog open={activeSettingDialog === "revert"} onOpenChange={(open) => !open && setActiveSettingDialog(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-blue-400" />
              Revert False Alert
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">
              If a false alert was sent, you can send a revert message to all contacts
            </p>
            <Button
              className="w-full bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/50 text-amber-300 hover:text-amber-200"
              onClick={() => {
                alert("Revert message will be sent to all contacts");
                setActiveSettingDialog(null);
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Send Revert Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pro Subscription Dialog */}
      <Dialog open={activeSettingDialog === "pro"} onOpenChange={(open) => !open && setActiveSettingDialog(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              Pro Subscription
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-white">Upgrade to Pro</h4>
                <p className="text-xs text-amber-300">$9.99/month</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">✓</span>
                <span>Unlimited sound recording storage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">✓</span>
                <span>Advanced AI threat detection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">✓</span>
                <span>Priority emergency response</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">✓</span>
                <span>Detailed analytics & reports</span>
              </li>
            </ul>
            <Button
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white"
            >
              Upgrade Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}