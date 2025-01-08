
from http.server import BaseHTTPRequestHandler

class CustomRequestHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        # CORS 헤더 추가
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        BaseHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        # OPTIONS 요청에 대한 응답
        self.send_response(200, "OK")
        self.end_headers()