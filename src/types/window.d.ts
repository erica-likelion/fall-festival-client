export interface BeforeInstallPromptEvent {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  preventDefault(): void;
  prompt(): Promise<void>;
}

declare global {
  interface Window {
    $: typeof import('jquery');
    jQuery: typeof import('jquery');
  }

  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
