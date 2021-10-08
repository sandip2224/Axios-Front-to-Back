// AXIOS Globals
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


// GET REQUEST
function getTodos() {
	// axios({
	//     method: 'get',
	//     url: 'https://jsonplaceholder.typicode.com/todos',
	//     params: {
	//         _limit: 5
	//     }
	// })
	// axios.get('https://jsonplaceholder.typicode.com/todos', {
	//     params: {
	//         _limit: 5
	//     }
	// })
	axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5', { timeout: 1000 })  // Waits for response for 1000ms
		.then(res => showOutput(res))
		.catch(err => console.error(err))
}

// POST REQUEST
function addTodo() {
	// axios({
	// 	method: 'post',
	// 	url: 'https://jsonplaceholder.typicode.com/todos',
	// 	data: {
	// 		title: 'New Todo',
	// 		completed: false
	// 	}
	// })
	axios.post('https://jsonplaceholder.typicode.com/todos', {
		title: 'New Todo',
		completed: false
	})
		.then(res => showOutput(res))
		.catch(err => console.err(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
	// axios.put('https://jsonplaceholder.typicode.com/todos/1', {
	// 	title: 'Updated Todo',
	// 	completed: true
	// })
	axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
		title: 'Updated Todo',
		completed: true
	})
		.then(res => showOutput(res))
		.catch(err => console.err(err))
}

// DELETE REQUEST
function removeTodo() {
	axios.delete('https://jsonplaceholder.typicode.com/todos/1')
		.then(res => showOutput(res))
		.catch(err => console.err(err))
}

// SIMULTANEOUS DATA REQUESTS
function getData() {
	axios.all([
		axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
		axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
	])
		.then(axios.spread((todos, posts) => {
			showOutput(posts)
		}))
		.catch(err => console.error(err))
}

// CUSTOM HEADERS
function customHeaders() {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'JWT_TOKEN'
		}
	}
	axios.post('https://jsonplaceholder.typicode.com/todos', {
		title: 'New Todo',
		completed: false
	}, config)
		.then(res => showOutput(res))
		.catch(err => console.err(err))
}

// ERROR HANDLING
function errorHandling() {
	axios.get('https://jsonplaceholder.typicode.com/todoss')
		.then(res => showOutput(res))
		.catch(err => {
			if (err.response) {
				// Srver responded with a status other tha 200
				console.error(err.response.data);
				console.error(err.response.status);
				console.error(err.response.headers);
			}
			else if (err.request) {
				// Request was made but no response
				console.error(err.request)
			}
			else {
				console.error(err.message)
			}
		})

}

// CREATING MIDDLEWARE/INTERCEPTOR
axios.interceptors.request.use(config => {
	console.log(`${config.method.toUpperCase()} request sent to ${config.url}`);
	return config
}, err => {
	return Promise.reject(error)
})

// Show output in browser
function showOutput(res) {
	document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
        <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
        <div class="card-header">
            Headers
        </div>
        <div class="card-body">
            <pre>${JSON.stringify(res.headers, null, 2)}</pre>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-header">
            Data
        </div>
        <div class="card-body">
            <pre>${JSON.stringify(res.data, null, 2)}</pre>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-header">
            Config
        </div>
        <div class="card-body">
            <pre>${JSON.stringify(res.config, null, 2)}</pre>
        </div>
    </div>
    `;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('error').addEventListener('click', errorHandling);