# ng_companion

A new Flutter project.

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

## Found Issues

### 001. Deprecated `serviceWorkerVersion` variable

#### Problem

When running `flutter build web`, the following warning is displayed:

> Warning: In index.html:<LINE_NUMBER>: Local variable for "serviceWorkerVersion" is
deprecated. Use "{{flutter_service_worker_version}}" template token instead.
See https://docs.flutter.dev/platform-integration/web/initialization for more
details.

Pointing to the following piece of code:

```html
<!-- web/index.html -->
<head>
  <script>
    // The value below is injected by flutter build, do not touch.
    var serviceWorkerVersion = null;
  </script>
</head>
```

#### Solution

To solve this, the script tag got removed.

### 002. Deprecated `FlutterLoader.loadEntrypoint` method

#### Problem

When running `flutter build web`, the following warning is displayed:

> Warning: In index.html:<LINE_NUMBER>: "FlutterLoader.loadEntrypoint" is deprecated. Use
"FlutterLoader.load" instead. See
https://docs.flutter.dev/platform-integration/web/initialization for more
details.

Pointing to the following piece of code:

```html
<!-- web/index.html -->
<body>
  <script>
    // ...
    window.addEventListener('load', function(ev) {
      // Download main.dart.js
      _flutter.loader.loadEntrypoint({
        serviceWorker: {
          serviceWorkerVersion: serviceWorkerVersion,
        },
        onEntrypointLoaded: async function(engineInitializer) {
          await engineInitializer.autoStart();
        }
      });
    });
    // ...
  </script>
</body>
```

#### Solution

To solve this, the `loadEntrypoint` method got replaced with the `load` method with no changes in its invocation.

## Observations

### Lazy Entrypoint Loading

The `load` method is the one that resolves the `main.dart.js` entrypoint.

Thus, it is recommended to invoke the `load` method only when required.

### Multi-View Support

To properly mount different Flutter views in the same page, the `multiViewEnabled` flag must be set to `true` in the `initializeEngine` method.

Plus, the app instance returned by `appRunner.runApp` must be cached, so it can later be used to add or remove views with `.addView` and `.removeView` methods, respectively.

### `entryPointBaseUrl` vs `entrypointBaseUrl`

When invoking the `load` method, the `entrypointBaseUrl` and `entryPointBaseUrl` arguments are both accepted by the `config` object.

In some cases, a deprecation warning is displayed in the console, which may lead to favoring the `entrypointBaseUrl` argument over the `entryPointBaseUrl` argument.

However, the `entrypointBaseUrl` argument is not reliable, as may break the initialization process without a clear identifiable reason.

ALWAYS use the `entryPointBaseUrl` argument instead.
