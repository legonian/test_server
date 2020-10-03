const signup_btn = document.getElementById('sign_up')
const login_btn = document.getElementById('log_in')

const login_tab_btn = document.getElementById('login_tab')
const signup_tab_btn = document.getElementById('signup_tab')

const signupForm = document.getElementById('signup_form')
const loginForm = document.getElementById('login_form')

const login_tab = document.getElementsByClassName('login')[0]
const signup_tab = document.getElementsByClassName('signup')[0]

const modal_window = document.getElementsByClassName('modal-background')[0]
const modal_close_btn = document.getElementsByClassName('modal-close')[0]

const dropdown = document.getElementsByClassName('dropdown')[0]
const dropdownContent = document.getElementsByClassName('dropdown-content')[0]

const isUserLogged = Boolean(signup_btn)

function show_signup_tab() {
  signup_tab.style.display = "block"
  login_tab.style.display = "none"

  signup_tab_btn.classList.add('active')
  login_tab_btn.classList.remove('active')
}
function show_login_tab() {
  login_tab.style.display = "block"
  signup_tab.style.display = "none"

  login_tab_btn.classList.add('active')
  signup_tab_btn.classList.remove('active')
}

if ( isUserLogged ) {
  signup_btn.onclick = function () {
    modal_window.style.display = 'block'
    show_signup_tab()
  }
  login_btn.onclick = function () {
    modal_window.style.display = 'block'
    show_login_tab()
  }
  modal_window.onmousedown = function(event) {
    if (event.target == modal_window) {
      modal_window.style.display = "none"
    }
  }
  modal_close_btn.onclick = function () {
    modal_window.style.display = 'none'
  }
  login_tab_btn.onclick = function () { show_login_tab() }
  signup_tab_btn.onclick = function () { show_signup_tab() }
} else {
  dropdown.onmouseover = function () {
	  dropdownContent.style.display = 'block';
  }
  dropdown.onmouseout = function () {
	  dropdownContent.style.display = 'none';
  }
}

loginForm.onsubmit = async function ( event ) {
  event.preventDefault()
  const formBody = JSON.stringify({
    username: loginForm.username.value, 
    password: loginForm.password.value, 
    'g-recaptcha-response': grecaptcha.getResponse()
  })
  console.log(formBody)
  const res = await fetch('/user/login', {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    body: formBody
  })
  if (res.status === 200) {
    //alert(`Creds are OK, now you go to ${res.url}`)
    window.location.assign(res.url)
  } else {
    alert('Bad Creds')
  }
}

// Password validation
/*
let input = document.querySelectorAll('input[name="password"]')[1]
input.onblur = function () {
  const checkPassword = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,60}$/g
	if (input.value.match(checkPassword)){
		input.style.border = '2px solid lightgreen'
	} else {
		input.style.border = '2px solid red'
	}
}
*/
