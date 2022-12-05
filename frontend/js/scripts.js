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
        // take to a page to say welcome back, sleep for few seconds and then redirect to the home page
        location.assign('../html/index.html')
    })

    signup_btn.addEventListener('click', () => {
        console.log('Signup button clicked')
        s_username = signup_username.value
        s_email = signup_email.value
        s_password = signup_password.value
        // take to a page that says thank you for signing up, sleep for few seconds and then redirect to home page
        location.assign('../html/index.html')
    })
}

timebank_pages.loadIndex = () => {

    // Parallax Effect
    const banner = document.getElementById('banner')
    const moon = document.getElementById('moon')
    const mountain = document.getElementById('mountain')
    const title = document.getElementById('title')

    window.addEventListener('scroll', function() {
        let value = window.scrollY
        banner.style.bottom = value * 1 + 'px'
        moon.style.left = -value * 1 + 'px'
        mountain.style.top = -value * 0.25 + 'px'
        title.style.top = value * 0.25 + 'px'
    })

    // Navigation Bar With Spotlight Effect
    const uls = document.querySelectorAll("nav ul");
    const links = [...document.querySelectorAll("nav a")];
    const light = document.querySelector("nav .tubelight");
    let activeIndex = 0;
    let currentIndex = 0;
    let increment = 1;
    links.forEach((link, index) => 
    {
        if (links[index].classList.contains("active"))
        {
            light.style.left = `${links[index].offsetLeft + light.offsetWidth / 4}px`;
        }
        link.addEventListener("click", (e) => 
        {
            activeIndex = index;
            let t = setInterval(() => 
            {
                if (activeIndex > currentIndex) increment = 1;
                else if (activeIndex < currentIndex) increment = -1;
                currentIndex += increment;

                links[currentIndex].classList.add("active");
                if (currentIndex != -1)
                    links[currentIndex - increment].classList.remove("active");

                if (currentIndex == activeIndex) 
                {
                    e.target.classList.add("active");
                    increment = 0;
                    clearInterval(t);
                }
            }, 50);
            light.style.left = `${e.target.offsetLeft + light.offsetWidth / 4}px`;
        });
    });
}