// NgFlutter State Controller
type NgFlutterStateController = {
  screen: string;
  clicks: number;
  text: string;
  setText: (value: string) => void;
  onClicksChanged: (callback: () => void) => void;
  onTextChanged: (callback: () => void) => void;
};

// NgFlutter type
type NgFlutter = {
  initializationEventName: string;
  initMultiViewApp: () => Promise<void>;
  addView: (
    hostElement: HTMLElement,
    initialData: unknown,
    onStateControllerReady: (state: NgFlutterStateController) => void
  ) => Promise<number>;
  removeView: (viewId: number) => Promise<unknown>;
};

// The global _ngFlutter namespace
declare const _ngFlutter: NgFlutter;
