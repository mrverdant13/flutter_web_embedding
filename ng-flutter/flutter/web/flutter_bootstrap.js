{{flutter_js}}
{{flutter_build_config}}

if (!window._ngFlutter) {
  window._ngFlutter = {};
}

_ngFlutter.initializationEventName = 'ng-flutter-initialized';

_ngFlutter.initMultiViewApp = async () => {
  if (_ngFlutter.deferredApp) {
    await _ngFlutter.deferredApp.promise;
    return;
  }
  _ngFlutter.deferredApp = Promise.withResolvers();
  _flutter.loader.load({
    config: {
      entryPointBaseUrl: './custom-flutter-component/',
    },
    onEntrypointLoaded: async (engineInitializer) => {
      const appRunner = await engineInitializer.initializeEngine({
        assetBase: './custom-flutter-component/',
        multiViewEnabled: true,
        useColorEmoji: true,
      });
      _ngFlutter.deferredApp.resolve(appRunner.runApp());
    },
  });
  await _ngFlutter.deferredApp.promise;
};

_ngFlutter.addView = async (hostElement, initialData, onStateControllerReady) => {
  const deferredApp = _ngFlutter.deferredApp;
  if (!deferredApp) {
    throw new Error(
      'Deferred app not initialized. ' +
      'Call _ngFlutter.initMultiViewApp() first.'
    );
  }
  const app = await deferredApp.promise;
  hostElement.addEventListener(_ngFlutter.initializationEventName, (event) => {
    const stateController = event.detail;
    onStateControllerReady(stateController);
  }, {
    once: true,
  });
  return app.addView({
    hostElement: hostElement,
    initialData: initialData,
  });
};

_ngFlutter.removeView = async (viewId) => {
  const deferredApp = _ngFlutter.deferredApp;
  if (!deferredApp) {
    throw new Error(
      'Deferred app not initialized. ' +
      'Call _ngFlutter.initMultiViewApp() first.'
    );
  }
  const app = await deferredApp.promise;
  return app.removeView(viewId);
};
