import 'dart:js_interop' show JSAnyUtilityExtension, createJSInteropWrapper;
import 'dart:ui_web' as web_ui;

import 'package:flutter/material.dart';
import 'package:ng_companion/multi_view_app.dart';
import 'package:ng_companion/pages/counter.dart';
import 'package:ng_companion/pages/dash.dart';
import 'package:ng_companion/pages/text.dart';
import 'package:ng_companion/src/js_interop.dart';

void main() {
  runWidget(
    MultiViewApp(
      viewBuilder: (BuildContext context) => const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Multi-View Flutter Web Embedding',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _screen = ValueNotifier<DemoScreen>(DemoScreen.counter);
  final _counter = ValueNotifier<int>(0);
  final _text = ValueNotifier<String>('');
  String? _targetElementId;

  late final DemoAppStateManager _state = DemoAppStateManager(
    screen: _screen,
    counter: _counter,
    text: _text,
  );

  @override
  void initState() {
    super.initState();
    final export = createJSInteropWrapper(_state);
    // initialData comes from Angular's
    // addView({ initialData: { targetElementId } })
    final view = View.of(context);
    final initialData = web_ui.views.getInitialData(view.viewId)?.dartify();
    if (initialData is! Map) return;
    final targetElementId = initialData['targetElementId'];
    if (targetElementId is! String) return;
    _targetElementId = targetElementId;
    // Angular listens for this event to receive the state controller
    broadcastAppEvent(
      targetElementId: targetElementId,
      eventName: 'ng-flutter-initialized',
      data: export,
    );
  }

  @override
  void dispose() {
    _screen.dispose();
    _counter.dispose();
    _text.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: ValueListenableBuilder<DemoScreen>(
          valueListenable: _screen,
          builder: (context, value, child) => switch (value) {
            DemoScreen.counter => const Text('Counter'),
            DemoScreen.text => const Text('Text Field'),
            DemoScreen.dash => const Text('Dash'),
          },
        ),
        actions: [
          // This is not reactive, as it is only set in the initState method
          if (_targetElementId != null)
            Padding(
              padding: const EdgeInsets.all(8),
              child: Text('$_targetElementId'),
            ),
        ],
      ),
      body: ValueListenableBuilder<DemoScreen>(
        valueListenable: _screen,
        builder: (context, value, child) => switch (value) {
          DemoScreen.counter => CounterDemo(counter: _counter),
          DemoScreen.text => TextFieldDemo(text: _text),
          DemoScreen.dash => DashDemo(text: _text),
        },
      ),
    );
  }
}
