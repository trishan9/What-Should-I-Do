let fetchBtn = document.querySelector(".activityBtn")
let deleteBtn, editBtn, editActivity, activityValue
let activitiesDiv = document.querySelector(".renderActivity")
const clearBtn = document.querySelector(".clearBtn")
let loadText = document.querySelector(".load")
let activitiesArr = []
let url = 'https://www.boredapi.com/api/activity'


const fetchActivity = async () => {
    activitiesArr = []
    loadText.innerHTML = 'Loading activities....'
    let response = await fetch(url)
    let result = await response.json()
    let { activity, type } = result

    activitiesArr.push({ 'activity': activity, 'typeOfActivity': type })

    activitiesArr.forEach((data) => {
        let ihtml = `
        <div class="activityDiv">
            <div className="details">
                <p class="activity">${data.activity}</p>
                <p class="type">Type: ${data.typeOfActivity.charAt(0).toUpperCase() + data.typeOfActivity.slice(1)}</p>
            </div>
            <img src="edit.png" alt="" class="edit-icon">
            <img src="trash.png" alt="" class="delete-icon">
        </div>
        `
        loadText.innerHTML = ''
        activitiesDiv.innerHTML += ihtml


        // <======================= Edit Button =======================>
        editBtn = document.querySelectorAll(".edit-icon")
        editBtn.forEach((btn, index, arr) => {
            btn.addEventListener("mouseenter", () => {
                btn.src = 'hover-edit.png'
            })

            btn.addEventListener("mouseleave", () => {
                btn.src = 'edit.png'
            })

            btn.addEventListener("click", () => {
                let element = deleteBtn[index].parentElement
                console.log(element)
            })
        })

        // <======================= Delete Button =======================>
        deleteBtn = document.querySelectorAll(".delete-icon")
        deleteBtn.forEach((btn, index, arr) => {
            btn.addEventListener("mouseenter", () => {
                btn.src = 'hover-trash.png'
            })

            btn.addEventListener("mouseleave", () => {
                btn.src = 'trash.png'
            })

            btn.addEventListener("click", () => {
                let element = deleteBtn[index].parentElement
                element.remove()
                loadText.innerHTML = 'Activity deleted succesfully!!!'
                setTimeout(clearLoadFunc, 500)
            })
        })
    })
}

const clearFunc = () => {
    activitiesDiv.innerHTML = ''
    loadText.innerHTML = 'All activities are cleared succesfully!!!'
    setTimeout(clearLoadFunc, 500)
}

const clearLoadFunc = () => {
    loadText.innerHTML = ''
}

fetchBtn.addEventListener("click", fetchActivity)
clearBtn.addEventListener("click", clearFunc)