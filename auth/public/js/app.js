const form = document.querySelector('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

const sendLoginInfo = async body => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  const resJson = await res.json();
  return resJson;
};

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const usernameVal = username.value;
  const passwordVal = password.value;
  const formData = new FormData(this);
  console.log(formData);
  const body = {
    usernameVal,
    passwordVal,
  };

  console.log(JSON.stringify(body));

  sendLoginInfo(body);
});
