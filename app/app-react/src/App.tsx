import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';

function App() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  async function signupRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${data.status_code} ${data.content}`);
      } else {
        const errorData = await response.json();
        alert(`${errorData.status_code} ${errorData.content}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">회원가입</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <Label htmlFor="id" className="block text-gray-700">아이디</Label>
          <Input 
            id="id" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
            className="w-full mb-4" 
          />
          
          <Label htmlFor="password" className="block text-gray-700">패스워드</Label>
          <Input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full mb-4" 
          />
          
          <Label htmlFor="passwordCheck" className="block text-gray-700">패스워드 확인</Label>
          <Input 
            type="password" 
            id="passwordCheck" 
            value={passwordCheck} 
            onChange={(e) => setPasswordCheck(e.target.value)} 
            className="w-full mb-6" 
          />
          
          <Button 
            type="button"
            onClick={signupRequest} 
            className="w-full bg-indigo-500 text-white hover:bg-indigo-600"
          >
            회원가입
          </Button>
        </form>
      </div>
    </main>
  );
}

export default App;