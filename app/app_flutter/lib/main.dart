import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: SignupPage(),
    );
  }
}

class SignupPage extends StatefulWidget {
  const SignupPage({super.key});

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final TextEditingController idController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController passwordCheckController = TextEditingController();

  Future<void> signupRequest() async {
    if (!mounted) return;

    final url = Uri.parse('http://127.0.0.1:8000/api/signup');
    final data = {
      'id': idController.text,
      'password': passwordController.text,
    };

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: jsonEncode(data),
      );

      if (!mounted) return;

      final decodedBody = jsonDecode(utf8.decode(response.bodyBytes));

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content:
              Text('${decodedBody["status_code"]} ${decodedBody["content"]}'),
        ),
      );
    } catch (e) {
      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: $e'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Material(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text("아이디"),
              TextField(
                controller: idController,
              ),
              const Text("패스워드"),
              TextField(
                controller: passwordController,
                obscureText: true,
              ),
              const Text("패스워드확인"),
              TextField(
                controller: passwordCheckController,
                obscureText: true,
              ),
              TextButton(
                onPressed: signupRequest,
                child: const Text("회원가입"),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    idController.dispose();
    passwordController.dispose();
    passwordCheckController.dispose();
    super.dispose();
  }
}
