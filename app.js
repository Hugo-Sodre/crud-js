
document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');
    const postList = document.getElementById('postList');
  
    // Carregar e exibir posts existentes
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
          appendPost(post);
        });
      });
  
    // Adicionar evento de envio de formulário
    postForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const titleInput = document.getElementById('title');
      const title = titleInput.value;
  
      // Enviar novo post para o servidor
      fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      })
        .then(response => response.json())
        .then(newPost => {
          // Adicionar novo post à lista
          appendPost(newPost);
          // Limpar o campo de título
          titleInput.value = '';
        });
    });
  
    // Função para adicionar um post à lista
    function appendPost(post) {
      const li = document.createElement('li');
      li.textContent = post.title;
  
      postList.appendChild(li);
    }
  });
  