import 'package:flutter/material.dart';

class CounterDemo extends StatelessWidget {
  const CounterDemo({
    required this.counter,
    super.key,
  });

  final ValueNotifier<int> counter;

  @override
  Widget build(BuildContext context) {
    return SizedBox.expand(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          spacing: 16,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
              textAlign: TextAlign.center,
            ),
            ValueListenableBuilder(
              valueListenable: counter,
              builder: (context, value, child) => Text(
                '$value',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            ),
            IconButton.filled(
              tooltip: 'Increment',
              onPressed: () {
                counter.value++;
              },
              icon: const Icon(Icons.add),
            ),
          ],
        ),
      ),
    );
  }
}
