import React, { createContext, useContext, useState, useEffect } from 'react';

export interface IncidentLog {
    id: string;
    type: 'sound' | 'vibration' | 'sos';
    timestamp: number;
    details: string;
    level?: number; // decibels or intensity
}

export interface SOSContact {
    id: string;
    name: string;
    phone: string;
    email: string;
}

export interface SafetySettings {
    isMonitoring: boolean;
    sensitivity: 'low' | 'medium' | 'high';
    vibrationEnabled: boolean;
    silentMode: boolean;
    schedule: {
        enabled: boolean;
        start: string; // "22:00"
        end: string;   // "06:00"
    };
    sosContacts: SOSContact[];
}

interface SafetyContextType {
    settings: SafetySettings;
    updateSettings: (newSettings: Partial<SafetySettings>) => void;
    logs: IncidentLog[];
    addLog: (log: Omit<IncidentLog, 'id' | 'timestamp'>) => void;
    isEmergencyActive: boolean;
    setEmergencyActive: (active: boolean) => void;
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

export const useSafety = () => {
    const context = useContext(SafetyContext);
    if (!context) {
        throw new Error('useSafety must be used within a SafetyProvider');
    }
    return context;
};

export const SafetyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<SafetySettings>({
        isMonitoring: false,
        sensitivity: 'medium',
        vibrationEnabled: false,
        silentMode: false,
        schedule: {
            enabled: false,
            start: '22:00',
            end: '06:00',
        },
        sosContacts: [],
    });

    const [logs, setLogs] = useState<IncidentLog[]>([]);
    const [isEmergencyActive, setEmergencyActive] = useState(false);

    const updateSettings = (newSettings: Partial<SafetySettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const addLog = (log: Omit<IncidentLog, 'id' | 'timestamp'>) => {
        const newLog: IncidentLog = {
            ...log,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
        };
        setLogs(prev => [newLog, ...prev]);
    };

    // Schedule Logic
    useEffect(() => {
        if (!settings.schedule.enabled) return;

        const checkSchedule = () => {
            const now = new Date();
            const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            const { start, end } = settings.schedule;

            let isActive = false;
            if (start < end) {
                isActive = currentTime >= start && currentTime < end;
            } else {
                // Crosses midnight
                isActive = currentTime >= start || currentTime < end;
            }

            if (isActive && !settings.isMonitoring) {
                setSettings(prev => ({ ...prev, isMonitoring: true }));
            } else if (!isActive && settings.isMonitoring) {
                setSettings(prev => ({ ...prev, isMonitoring: false }));
            }
        };

        const interval = setInterval(checkSchedule, 60000); // Check every minute
        checkSchedule(); // Initial check

        return () => clearInterval(interval);
    }, [settings.schedule.enabled, settings.schedule.start, settings.schedule.end, settings.isMonitoring]);

    return (
        <SafetyContext.Provider value={{
            settings,
            updateSettings,
            logs,
            addLog,
            isEmergencyActive,
            setEmergencyActive
        }}>
            {children}
        </SafetyContext.Provider>
    );
};
