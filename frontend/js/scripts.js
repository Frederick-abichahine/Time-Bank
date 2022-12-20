// ##################################
// Declaring & Initializing Variables
// ##################################

const timebank_pages = {} 
const base_url = "http://localhost:8000/api/v0.1/"

// ###############
// Loader Function
// ###############

timebank_pages.loaderFunction = (func_name) => {
    eval("timebank_pages.load" + func_name + "()")
  }

// #######################
// Login & Signup Function
// #######################

timebank_pages.loadLoginSignup = async() => {
    // Retrieving the login input fields & button
    const login_email = document.getElementById('logemail')
    const login_password = document.getElementById('logpass')
    const login_btn = document.getElementById('logbtn')
    const l_message = document.getElementById('display-message-login')

    // Retrieving the signup input fields & button
    const signup_username = document.getElementById('signname')
    const signup_email = document.getElementById('signemail')
    const signup_password = document.getElementById('signpass')
    const signup_btn = document.getElementById('signbtn')
    const s_message = document.getElementById('display-message-signup')

    // Post API Function when the login button is clicked
    login_btn.addEventListener('click', async() => {
        const l_email = login_email.value
        const l_password = login_password.value
        const l_url = base_url + "auth/login"
        const l_formData = new FormData()
        l_formData.append('email', l_email)
        l_formData.append('password', l_password)
        const l_resp = await timebank_pages.postAPI(l_url, l_formData)

        if (l_resp){
            l_message.innerHTML = "<i><h6 style = \"color: green;\"> Success</h6></i>"
            localStorage.setItem('token', l_resp.data.access_token) // Storing the token in local storage for future use
            location.assign('../html/index.html')
        }
        else{
            l_message.innerHTML = "<i><h6 style = \"color: red;\"> Uh Oh! Something Is Not Right</h6></i>"
        }
    })

    // Post API Function when the signup button is clicked
    signup_btn.addEventListener('click', async() => {
        const s_username = signup_username.value
        const s_email = signup_email.value
        const s_password = signup_password.value
        const s_url = base_url + "auth/register"
        const s_formData = new FormData()
        s_formData.append('username', s_username)
        s_formData.append('email', s_email)
        s_formData.append('password', s_password)
        const s_resp = await timebank_pages.postAPI(s_url, s_formData)
        console.log(s_resp)

        if (s_resp){
            s_message.innerHTML = "<i><h6 style = \"color: green;\"> Success</h6></i>"
            location.assign('./login_signup.html')
        }
        else{
            s_message.innerHTML = "<i><h6 style = \"color: red;\"> Uh Oh! Something Is Not Right</h6></i>"
        }
    })
}

// ##################
// Home Page Function
// ##################

timebank_pages.loadIndex = async() => {
    // Getting the token from local storage, to perform user tasks
    const tokenn = localStorage.getItem('token') 
    const url = base_url + "auth/user-profile"
    const resp = await timebank_pages.getAuthUserAPI(url, tokenn)

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

    // Calling funtion to display working and appropriate navigation bar
    timebank_pages.loadNav(50) // 50px will be the starting position of the spotlight

    // The navigation and search bars will appear after a certain amount of scrolling
    let navbar = document.getElementById('nav_bar')
    let search = document.getElementById('search')
    window.addEventListener('scroll', function() {
        // If the page has been scrolled more than 300px, the navigation bar will appear
        if (window.scrollY > 300) {
            navbar.classList.add('scrolled')
        } else {
            navbar.classList.remove('scrolled')
        }
        // If the page has been scrolled more than 500px, the search bar will appear
        if (window.scrollY > 550) {
            search.classList.add('scrolled')
        } else {
            search.classList.remove('scrolled')
        }
    })

    // Getting & Displaying All The Posts With The User That Posted It
    const post_url = base_url + "posts/get-all-posts"
    const post_resp = await timebank_pages.getAPI(post_url)
    const post_container = document.getElementById('whole-post')

    // Looping for all posts & displaying the content on the home page
    for (let i = 0; i < post_resp.data.length; i++) {
        post_container.innerHTML += `
        <div class="post-container">
        <div class="post">
        <div class="user-pic">
            <img id="profile-pic" src="${post_resp.data[i].user[0].profile_picture}" alt="display-pic">
        </div>
        <div class="post-content">
            <div class="post-details">
                <h2 id="user-info">${post_resp.data[i].user[0].username}<br><span>${post_resp.data[i].user[0].description}</span></h2>
                <i><h4 id="location">Location: ${post_resp.data[i].user[0].location}</h4></i>
                <div class="post-info">
                    <h3 id="skill-to-offer">Skill to offer: <br> ${post_resp.data[i].post.skill_to_offer}</h3>
                    <hr>
                    <h3 id="skill-to-learn">Skill to learn: <br> ${post_resp.data[i].post.skill_to_learn}</h3>
                    <hr>
                    <h3 id="offer-time">Offer time: <br> ${post_resp.data[i].post.offer_time} hour(s)</h3>
                </div>
                <div class="send-message">
                    <button id="message-btn">Message</button>
                </div>
            </div>
        </div>
    </div>
    </div>`
    
    }
} 

// ######################
// Messages Page Function
// ######################

timebank_pages.loadMessages = () => {
    // Calling funtion to display working and appropriate navigation bar
    timebank_pages.loadNav(250) // 250px will be the starting position of the spotlight
}

// #####################
// Profile Page Function
// #####################

timebank_pages.loadProfile = async() => {
    // Calling funtion to display working and appropriate navigation bar
    timebank_pages.loadNav(118) // 118px will be the starting position of the spotlight
    const edit_btn = document.getElementById('edit-profile-btn')
    edit_btn.addEventListener('click', () => {
        console.log('edit button clicked')
        location.assign('../html/profile.html') // To fix: takes to the edit profile page
    })
    // Getting the token from local storage & using it to get the user's profile information
    const tokenn = localStorage.getItem('token')
    const url = base_url + "auth/user-profile"
    const resp = await timebank_pages.getAuthUserAPI(url, tokenn)

    // Getting the user's profile picture
    const profile_pic = document.getElementById('pp')
    profile_pic.src = `${resp.data.profile_picture}`

    // Getting the user's name and description
    const profile_info = document.getElementById('profile-info')
    profile_info.innerHTML = `${resp.data.username}` + "<br><span>" + `${resp.data.description}` + "</span>"

    // Getting the user's location
    const user_location = document.getElementById('location')
    user_location.innerHTML = `${resp.data.location}`

    // Getting the date the user joined
    const date_joined = document.getElementById('date-joined')
    const date = resp.data.created_at
    const fixed_date = date.slice(0, 10)
    date_joined.innerHTML = "Joined: " + `${fixed_date}`

    // Getting the number of posts the user has made
    const user_id = resp.data.id
    const url2 = base_url + "posts/count-posts"
    const resp2 = await timebank_pages.getAuthUserAPI(url2, tokenn)
    const num_posts = document.getElementById('num-posts')
    num_posts.innerHTML = "Posts: " + `${resp2.data}`
}

// ##################
// Post Page Function
// ##################

timebank_pages.loadPost = async() => {
    timebank_pages.loadNav(185)
    const url = base_url + "posts/create-post"
    const tokenn = localStorage.getItem('token')

    // Retrieving the post input fields & button
    const skill_to_offer = document.getElementById('to-offer')
    const skill_to_learn = document.getElementById('to-learn')
    const offer_time = document.getElementById('offer-time')
    const post_btn = document.getElementById('edit-profile-btn')

    // Adding an event listener to the post button
    post_btn.addEventListener('click', async() => {
        const form_data = new FormData()
        form_data.append('skill_to_offer', skill_to_offer.value)
        form_data.append('skill_to_learn', skill_to_learn.value)
        form_data.append('offer_time', offer_time.value)
        const resp = await timebank_pages.postAPI(url, form_data, tokenn)
        if (resp) {
            location.assign('../html/index.html')
        }
        else{
            const message = document.getElementById('display-error')
            message.innerHTML = "<i><h4 style = \"color: red; text-align: center;\"> Uh Oh! Something Is Not Right</h4></i>"
        }
    })
}

// #######################
// Navigation Bar Function
// #######################

timebank_pages.loadNav = (px) => { // px is the starting position of the spotlight
    // Navigation Bar With Spotlight Effect
    const uls = document.querySelectorAll("nav ul")
    const links = [...document.querySelectorAll("nav a")]
    const light = document.querySelector("nav .tubelight")
    let activeIndex = 0
    let currentIndex = 0
    let increment = 1
    links.forEach((link, index) => 
    {
        if (links[index].classList.contains("active"))
        {
            light.style.left = px+'px'
        }
        link.addEventListener("click", (e) => 
        {
            activeIndex = index
            let t = setInterval(() => 
            {
                if (activeIndex > currentIndex) increment = 1
                else if (activeIndex < currentIndex) increment = -1
                currentIndex += increment

                links[currentIndex].classList.add("active")
                if (currentIndex != -1)
                    links[currentIndex - increment].classList.remove("active")

                if (currentIndex == activeIndex) 
                {
                    e.target.classList.add("active")
                    increment = 0
                    clearInterval(t)
                }
            }, 50)
            light.style.left = `${e.target.offsetLeft + light.offsetWidth / 4}px`
        })
    })

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
        await delay(700) // adding a small delay for the animation to take place
        location.assign('../html/index.html')
    })
    profile.addEventListener('click', async () => {
        await delay(700)
        location.assign('../html/profile.html')
    })
    post.addEventListener('click', async () => {
        await delay(700)
        location.assign('../html/post.html')
    })
    about.addEventListener('click', async () => {
        await delay(700)
        location.assign('../html/index.html')
    })

    message.addEventListener('click', async () => {
        await delay(700)
        location.assign('../html/messages.html')
    })

    logout.addEventListener('click', async () => {
        await delay(700)
        const tokenn = localStorage.getItem('token')
        const logout_url = base_url + 'auth/logout'
        const logout_formData = new FormData()
        const exit = await timebank_pages.postAPI(logout_url, logout_formData, tokenn)
        location.assign('../html/login_signup.html')
    })
}

// #############
// API Functions
// #############

timebank_pages.getAPI = async(url) => {
    //using axios to get data
    try{
        return await axios(url)
    } catch (error) {
        console.log("error", error)
    }
}
// "Authorization": `Bearer ${token}`,
timebank_pages.getAuthUserAPI = async(url, token=null) => {
    //using axios to get data
    try{
        return await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
    } catch (error) {
        console.log("error", error)
    }
}

timebank_pages.postAPI = async(url, data, token=null) => {
    //using axios to post data
    try{
        return await axios.post(url, data, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
    } catch (error) {
        console.log("error", error)
    }
}