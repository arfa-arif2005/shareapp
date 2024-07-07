// script.js

// Home Page
const blogList = document.getElementById('blog-list');
fetch('/api/blogs')
	.then(response => response.json())
	.then(data => {
		data.forEach(blog => {
			const blogHTML = `
				<li>
					<h3>${blog.title}</h3>
					<p>${blog.content}</p>
					<p>By ${blog.author} on ${blog.date}</p>
				</li>
			`;
			blogList.innerHTML += blogHTML;
		});
	});

// Add Blog Page
const addBlogForm = document.getElementById('add-blog-form');
addBlogForm.addEventListener('submit'), event => {
	event.preventDefault();
	const title = document.getElementById('title').value;
	const content = document}