document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');
    const postList = document.getElementById('postList');

    
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                appendPost(post);
            });
        });

    
    postForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const titleInput = document.getElementById('title');
        const title = titleInput.value;

        
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        })
            .then(response => response.json())
            .then(newPost => {
                appendPost(newPost);
                titleInput.value = '';
            });
    });

    function appendPost(post) {
        const li = document.createElement('li');
        li.textContent = post.title;
        li.classList.add('list-group-item');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'btn-warning', 'mx-2'); 
        editButton.classList.add('edit-button');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.classList.add('delete-button');

        li.dataset.id = post.id;

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        postList.appendChild(li);
    }

    postList.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const postId = event.target.parentElement.dataset.id;

            if (event.target.classList.contains('edit-button')) {
                const newTitle = prompt('Entre com o novo nome:');
                if (newTitle !== null) {
                    updatePost(postId, newTitle);
                }
            } else if (event.target.classList.contains('delete-button')) {
                if (confirm('Quer mesmo excluir essa linha?')) {
                    deletePost(postId);
                }
            }
        }
    });

    
    function updatePost(postId, newTitle) {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle }),
        })
            .then(response => response.json())
            .then(updatedPost => {
                
                const postElement = document.querySelector(`li[data-id="${postId}"]`);
                postElement.textContent = updatedPost.title;
            });
    }

    
    function deletePost(postId) {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    
                    const postElement = document.querySelector(`li[data-id="${postId}"]`);
                    postElement.remove();
                }
            });
    }
});