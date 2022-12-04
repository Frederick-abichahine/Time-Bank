// ##################################
// Declaring & Initializing Variables
// ##################################

const timebank_pages = {}
const base_url = "" // will be added later

// ###############
// Loader Function
// ###############

timebank_pages.loaderFunction = (func_name) => {
    eval("timebank_pages.load" + func_name + "()")
  }

// #########
// Functions
// #########

timebank_pages.loadLoginSignup = () => {
    // Retrieving the login input fields & button
    const login_email = document.getElementById('logemail')
    const login_password = document.getElementById('logpass')
    const login_btn = document.getElementById('logbtn')

    // Retrieving the signup input fields & button
    const signup_username = document.getElementById('signname')
    const signup_email = document.getElementById('signemail')
    const signup_password = document.getElementById('signpass')
    const signup_btn = document.getElementById('signbtn')

    login_btn.addEventListener('click', () => {
        console.log('Login button clicked')
        l_email = login_email.value
        l_password = login_password.value
        
    })

    signup_btn.addEventListener('click', () => {
        console.log('Signup button clicked')
        s_username = signup_username.value
        s_email = signup_email.value
        s_password = signup_password.value
    })

}