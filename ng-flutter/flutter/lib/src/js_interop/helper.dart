import 'dart:js_interop';

import 'package:web/web.dart';

/// Locates the flutter embedded element by its [targetElementId], and
/// dispatches a JS event named [eventName] with the given [data].
void broadcastAppEvent({
  required String targetElementId,
  required String eventName,
  JSObject? data,
}) {
  final root = document.getElementById(targetElementId) as HTMLElement?;
  assert(root != null, 'Flutter embedded element cannot be found!');
  final eventDetails = CustomEventInit(
    bubbles: true,
    composed: true,
    detail: data,
  );
  root!.dispatchEvent(CustomEvent(eventName, eventDetails));
}
