import 'dart:js_interop' as js;

import 'package:ng_companion/src/js_interop.dart';
import 'package:web/web.dart';

@js.JS('_ngFlutter')
external JsNgFlutter get ngFlutter;

/// Locates the flutter embedded element by its [targetElementId], and
/// injects the state controller into the flutter embedded element.
void injectStateController({
  required String targetElementId,
  js.JSObject? data,
}) {
  final root = document.getElementById(targetElementId) as HTMLElement?;
  assert(root != null, 'Flutter embedded element cannot be found!');
  final eventDetails = CustomEventInit(
    bubbles: true,
    composed: true,
    detail: data,
  );
  root!.dispatchEvent(
    CustomEvent(
      ngFlutter.initializationEventName,
      eventDetails,
    ),
  );
}
