import * as React from "react";

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface Config {
  onAccepted?: () => void;
  onDismissed?: () => void;
}

/**
 * prompt A2HS if available.
 * Only Chrome and Edge is supported. (https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent)
 */
export const useA2HS = (
  config?: Config
): [IBeforeInstallPromptEvent | null, () => void] => {
  const [
    promptEvent,
    setPromptEvent,
  ] = React.useState<IBeforeInstallPromptEvent | null>(null);

  const promptToInstall = () => {
    if (promptEvent) promptEvent.prompt();
  };

  React.useEffect(() => {
    const listener = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptEvent(e);
      e.userChoice
        .then((result) => {
          if (result.outcome === "accepted") {
            if (config?.onAccepted) config.onAccepted();
          } else {
            if (config?.onDismissed) config.onDismissed();
          }
          return;
        })
        .catch(console.error);
    };

    window.addEventListener("beforeinstallprompt", listener as any);
    return () => {
      window.removeEventListener("beforeinstallprompt", listener as any);
    };
  }, [config]);

  return [promptEvent, promptToInstall];
};
