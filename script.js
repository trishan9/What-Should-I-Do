let fetchBtn = document.querySelector(".activityBtn")
let activitiesDiv = document.querySelector(".renderActivity")
const clearBtn = document.querySelector(".clearBtn")
let loadText = document.querySelector(".load")
let url = 'https://www.boredapi.com/api/activity'
let activitiesArr = []
let typesArr = []


const fetchActivity = async () => {
    loadText.innerHTML = 'Loading activities....'
    let response = await fetch(url)
    let result = await response.json()
    let { activity, type } = result

    activitiesArr.push({ 'activity': activity, 'typeOfActivity': type })

    let ihtml = `
    <p class="activity">${activity}<br/>Type: ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
    `

    loadText.innerHTML = ''
    activitiesDiv.innerHTML += ihtml
}

const clearFunc = () => {
    activitiesDiv.innerHTML = ''
    loadText.innerHTML = 'Activities cleared succesfully!!!'
    setTimeout((func) => {
        loadText.innerHTML = ''
    }, 500)
}

const deleteFunc = () => {

}

fetchBtn.addEventListener("click", fetchActivity)
clearBtn.addEventListener("click", clearFunc)






























































