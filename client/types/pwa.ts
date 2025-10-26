// PWA Types

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface NotificationPermission {
  permission: NotificationPermission;
  supported: boolean;
}

export interface OfflineQueueItem {
  id: string;
  type: 'predict' | 'chat';
  data: any;
  timestamp: number;
}

