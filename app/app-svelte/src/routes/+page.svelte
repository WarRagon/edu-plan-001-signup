<script>
  import { writable } from 'svelte/store';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  const id = writable('');
  const password = writable('');
  const passwordCheck = writable('');

  async function signupRequest() {
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: $id,
          password: $password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${data.status_code} ${data.content}`);
      } else {
        const errorData = await response.json();
        alert(`${errorData.status_code} ${errorData.content}`); 
      }
    } catch (e) {
      console.error(e);
      alert(`Error: ${e}`);
    }
  }
</script>

<main class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
  <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-4 text-center">회원가입</h1>
    <form>
      <Label for="id" class="block text-gray-700">아이디</Label>
      <Input id="id" bind:value={$id} class="w-full mb-4" />

      <Label for="password" class="block text-gray-700">패스워드</Label>
      <Input type="password" id="password" bind:value={$password} class="w-full mb-4" />

      <Label for="passwordCheck" class="block text-gray-700">패스워드 확인</Label>
      <Input type="password" id="passwordCheck" bind:value={$passwordCheck} class="w-full mb-6" />

      <Button on:click={signupRequest} class="w-full bg-indigo-500 text-white hover:bg-indigo-600">회원가입</Button>
    </form>
  </div>
</main>
