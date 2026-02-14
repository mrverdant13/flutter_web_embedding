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
  initMultiViewApp: () => Promise<void>;
  addView: (
    hostElement: HTMLElement,
    initialData: any,
    onStateControllerReady: (state: NgFlutterStateController) => void,
  ) => Promise<number>;
  removeView: (viewId: number) => Promise<any>;
};

// The global _ngFlutter namespace
declare var _ngFlutter: NgFlutter;
