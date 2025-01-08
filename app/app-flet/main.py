import flet as ft
import requests


def main(page: ft.Page):
  id = ft.TextField()
  password = ft.TextField()
  password_check = ft.TextField()

  def signup_request(e):
    url = 'http://127.0.0.1:8000/api/signup'
    data = {
        'id': id.value,
        'password': password.value
    }

    response = requests.post(url, json=data)
    response_data = response.json()
    page.snack_bar = ft.SnackBar(ft.Text(f"{response_data['status_code']} {response_data['content']}"))
    page.snack_bar.open = True
    page.update()

  page.add(
    ft.Text("아이디"),
    id,    
    ft.Text("패스워드"),
    password,
    ft.Text("패스워드확인"),
    password_check,
    ft.TextButton(text="회원가입", on_click=signup_request),
  )

ft.app(main)