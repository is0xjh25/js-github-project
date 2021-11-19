function getUsers(user) {
	return fetch(`https://api.github.com/search/users?q=${user}`)
	.then((res)=> {
		return res.json();
	})
	.then ((json)=>{
		return json.items;
	})
}

function getRepos(user) {
	return fetch(`https://api.github.com/users/${user}/repos`)
	.then((res)=> {
		return res.json();
	})
	.then ((json)=>{
		return json;
	})
}

function getReposByKeyword(keyword) {
	return fetch(`https://api.github.com/search/repositories?q=${keyword}`)
	.then((res)=> {
		return res.json();
	})
	.then ((json)=>{
		return json.items;
	})
}

document.addEventListener('DOMContentLoaded', () => {

	document.querySelector('#search-repos').addEventListener('click', (e)=>{
		e.preventDefault();
		let val = document.querySelector('#search').value;
		document.getElementById('user-list').innerHTML = "";
		document.getElementById('repos-list').innerHTML = "";

		getReposByKeyword(val).then((repos) => {
			repos.forEach(repo => {
				let element = document.createElement('li');
				element.innerHTML = repo.url;
				document.getElementById('repos-list').appendChild(element);
			})
		})
	})

	document.getElementById('github-form').addEventListener('submit', (e)=>{
		e.preventDefault();
		let val = document.querySelector('#search').value;
		document.getElementById('user-list').innerHTML = "";
		getUsers(val).then(users=>{
			users.forEach(user=>{
				let element = document.createElement('li');
				element.innerHTML = user.login;
				document.getElementById('user-list').appendChild(element);

				element.addEventListener('click', (e) => {
					document.getElementById('repos-list').innerHTML = "";
					getRepos(user.login).then(repos => {
						repos.forEach(repo => {
						let elementRepo = document.createElement('li');
						elementRepo.innerHTML = repo.url;
						document.getElementById('repos-list').appendChild(elementRepo);
						})
					})
				})
			})
		})
	})
})