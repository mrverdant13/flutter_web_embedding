import 'package:flutter/material.dart';

class DashDemo extends StatefulWidget {
  const DashDemo({
    required this.text,
    super.key,
  });

  final ValueNotifier<String> text;

  @override
  State<DashDemo> createState() => _DashDemoState();
}

class _DashDemoState extends State<DashDemo> {
  late final TextEditingController textController;

  int _totalCharCount = 0;

  @override
  void initState() {
    super.initState();
    // Initial value of the text box.
    _totalCharCount = widget.text.value.length;
    textController = TextEditingController.fromValue(
      TextEditingValue(
        text: widget.text.value,
        selection: TextSelection.collapsed(offset: widget.text.value.length),
      ),
    );
    // Report changes.
    textController.addListener(_onTextControllerChange);
    // Listen to changes from the outside.
    widget.text.addListener(_onTextStateChanged);
  }

  void _onTextControllerChange() {
    widget.text.value = textController.text;
    setState(() {
      _totalCharCount = textController.text.length;
    });
  }

  void _onTextStateChanged() {
    textController.value = TextEditingValue(
      text: widget.text.value,
      selection: TextSelection.collapsed(offset: widget.text.value.length),
    );
  }

  @override
  void dispose() {
    widget.text.removeListener(_onTextStateChanged);
    textController.dispose();
    super.dispose();
  }

  void _handleClear() {
    textController.value = TextEditingValue(
      // Explicit initial value
      // ignore: avoid_redundant_argument_values
      text: '',
      selection: TextSelection.collapsed(offset: widget.text.value.length),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textTheme = theme.textTheme;
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
            child: ColoredBox(
              color: theme.primaryColor,
              child: Column(
                // Explicit cross axis alignment
                // ignore: avoid_redundant_argument_values
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'TEXT LENGTH!',
                    style: textTheme.titleLarge!.copyWith(color: Colors.white),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(12),
                    child: ClipOval(
                      child: Container(
                        color: Colors.white,
                        padding: const EdgeInsets.all(2),
                        child: ClipOval(
                          child: Container(
                            color: theme.primaryColor,
                            padding: const EdgeInsets.all(2),
                            child: const CircleAvatar(
                              radius: 45,
                              backgroundColor: Colors.white,
                              foregroundImage: AssetImage('assets/dash.png'),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Text(
                    '$_totalCharCount',
                    style:
                        textTheme.displayLarge!.copyWith(color: Colors.white),
                  ),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    autofocus: true,
                    controller: textController,
                    // Explicit single line
                    // ignore: avoid_redundant_argument_values
                    maxLines: 1,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      hintText: 'Type something!',
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 12),
                  child: Ink(
                    decoration: ShapeDecoration(
                      color: theme.primaryColor,
                      shape: const CircleBorder(),
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.refresh),
                      color: Colors.white,
                      onPressed: _handleClear,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
