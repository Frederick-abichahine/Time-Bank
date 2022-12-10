// ##################################
// Declaring & Initializing Variables
// ##################################

const timebank_pages = {}
const base_url = "localhost:8000/api/"

// ###############
// Loader Function
// ###############

timebank_pages.loaderFunction = (func_name) => {
    eval("timebank_pages.load" + func_name + "()")
  }

// #######################
// Login & Signup Function
// #######################

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

    login_btn.addEventListener('click', async() => {
        console.log('Login button clicked')
        l_email = login_email.value
        l_password = login_password.value
        // take to a page to say welcome back, sleep for few seconds and then redirect to the home page
        const url = base_url + "login"
        const formData = new FormData();
        formData.append('email', l_email);
        formData.append('password', l_password);
        const resp = await timebank_pages.postAPI(url, formData)
        if(!resp.data[0]) {
            //message.innerHTML = "<i><h6 style = \"color: red;\"> Please fill out all information</h6></i>"
            console.log('Please fill out all information')
        } else {
            location.assign('../html/index.html')
        }
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

// ##################
// Home Page Function
// ##################

timebank_pages.loadIndex = () => {

    // Parallax Effect
    const banner = document.getElementById('banner')
    const moon = document.getElementById('moon')
    const mountain = document.getElementById('mountain')
    const title = document.getElementById('title')

    window.addEventListener('scroll', function() {
        const value = window.scrollY // value is the number of pixels we have scrolled down (y-axis)
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
            light.style.left = `${links[index].offsetLeft + light.offsetWidth}px`;
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

    let navbar = document.getElementById('nav_bar');
    let search = document.getElementById('search');

    // The navigation and search bars will appear after a certain amount of scrolling
    window.addEventListener('scroll', function() {
        // If the page has been scrolled more than 300px, the navigation bar will appear
        if (window.scrollY > 300) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // If the page has been scrolled more than 500px, the search bar will appear
        if (window.scrollY > 550) {
            search.classList.add('scrolled');
        } else {
            search.classList.remove('scrolled');
        }
    });

    // Going to the appropriate page upon click
    const home = document.getElementById('home_btn')
    const profile = document.getElementById('profile_btn')
    const post = document.getElementById('post_btn')
    const message = document.getElementById('chat_btn')
    const about = document.getElementById('about_btn')
    const logout = document.getElementById('logout_btn')
    const delay = ms => new Promise(res => setTimeout(res,ms)) // delay function
    const nav = document.getElementById('nav_bar')

    home.addEventListener('click', async () => {
        console.log('home button clicked')
        await delay(700) // adding a small delay for the animation to take place
        location.assign('../html/index.html')
    })
    profile.addEventListener('click', async () => {
        console.log('profile button clicked')
        await delay(700)
        location.assign('../html/index.html')
    })
    post.addEventListener('click', async () => {
        console.log('post button clicked')
        await delay(700)
        location.assign('../html/index.html')
    })
    about.addEventListener('click', async () => {
        console.log('about button clicked')
        await delay(700)
        location.assign('../html/index.html')
    })

    message.addEventListener('click', async () => {
        console.log('message button clicked')
        await delay(700)
        location.assign('../html/index.html')
    })

    logout.addEventListener('click', async () => {
        console.log('logout button clicked')
        await delay(700)
        location.assign('../html/login_signup.html')
    })

    
}

// #############
// API Functions
// #############

timebank_pages.postAPI = async(url, data, token=null) => {
    //use axios to post data to the API
    try{
        return await axios.post(url, data, {
            headers: {
                "Authentication": token,
            }
        })
    } catch (error) {
        console.log("error", error)
    }
}