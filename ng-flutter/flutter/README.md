# ng_companion

Flutter web companion for the [ng-flutter](../README.md) Angular + Flutter integration demo. This app runs embedded inside Angular and shares state (screen, counter, text) via JavaScript interop.

## Architecture

### Multi-View Support

The app uses `MultiViewApp` and `runWidget` so it can render into multiple host elements. Angular mounts one instance per `ng-flutter` component and passes `targetElementId` via `initialData` so each view can target its host DOM element for events.

### JS Interop

* **`DemoAppStateManager`**

  `@JSExport()` class that exposes `screen`, `clicks`, `text`, `setText`, `onClicksChanged`, and `onTextChanged` to JavaScript.

* **`createJSInteropWrapper`**

  From `dart:js_interop`. It wraps the state manager for JS consumption.

* **`broadcastAppEvent`**

  Dispatches a custom event (e.g. `flutter-initialized`) on the host DOM element with the wrapped state so Angular can receive and bind to it.

### Bootstrap

`web/flutter_bootstrap.js` holds initialization code based on `{{flutter_js}}` and `{{flutter_build_config}}` placeholder variables. It does not perform any actual Flutter initialization. It only prepares the environment for the actual initialization process.

Angular injects this script and serves the Flutter assets under `/flutter`, so the entry point (`main.dart.js`) is loaded lazily only when required.

## Development

This is not a runnable Flutter project. It should only be used as a dependency for the Angular project by building it:

```bash
flutter build web
```

## Observations

### Empty `web/index.html`

Given that this project is not aimed at being a standalone runnable project, the `web/index.html` file was kept empty.

### Deprecated `serviceWorkerVersion` Variable

When building the Flutter project, the following warning is displayed:

> Warning: In index.html:<LINE_NUMBER>: Local variable for "serviceWorkerVersion" is
deprecated. Use "{{flutter_service_worker_version}}" template token instead.
See https://docs.flutter.dev/platform-integration/web/initialization for more
details.

To solve this, any reference to the `serviceWorkerVersion` variable was removed, as it was not required anymore.

### Deprecated `FlutterLoader.loadEntrypoint` Method

When running the Flutter project, the following warning is displayed:
> Warning: In index.html:<LINE_NUMBER>: "FlutterLoader.loadEntrypoint" is deprecated. Use
"FlutterLoader.load" instead. See
https://docs.flutter.dev/platform-integration/web/initialization for more
details.

To solve this, the `loadEntrypoint` method was replaced with the `load` method.

Initially, this method was invoked in a script tag in the `web/index.html` file. Afterwards, since the project was not aimed at being a standalone runnable project, the `web/index.html` file was kept empty, and the entry point loading was delegated to the Angular side.

For specific details on the signature and implementation of these methods, see the [JS scripts for the Flutter Web Engine](https://github.com/flutter/flutter/tree/master/engine/src/flutter/lib/web_ui/flutter_js/src)


### Lazy Entrypoint Loading

`load` resolves `main.dart.js` on demand.

It is strongly recommended to call it only when the Flutter view is about to be shown for better performance.

### Multi-View Support

To mount multiple Flutter views on the same page, the host must:

1. Pass `multiViewEnabled: true` to `engineInitializer.initializeEngine()`.
2. Cache the app instance returned by `appRunner.runApp()`.
3. Use `.addView()` and `.removeView()` to create and destroy views.

### `entryPointBaseUrl` vs `entrypointBaseUrl`

Both `entryPointBaseUrl` (capital P) and `entrypointBaseUrl` (lowercase p) are accepted. However, the lowercase variant can result in unreliable behavior that is difficult to debug.

ALWAYS use the capital variant `entryPointBaseUrl`. Even if a deprecation warning is displayed.
