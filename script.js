let fetchBtn = document.querySelector(".activityBtn")
let activitiesDiv = document.querySelector(".renderActivity")
const clearBtn = document.querySelector(".clearBtn")
let loadText = document.querySelector(".load")
let activitiesArr = []
let url = 'https://www.boredapi.com/api/activity'
let deleteBtn, editBtn


const fetchActivity = async () => {
    activitiesArr = []
    loadText.innerHTML = 'Loading activities....'
    let response = await fetch(url)
    let result = await response.json()
    let { activity, type } = result

    activitiesArr.push({ 'activity': activity, 'typeOfActivity': type })
    activitiesArr.forEach((data) => {
        let ihtml = `<div class="activityDiv">
                        <div class="details">
                            <p class="activity">${data.activity}</p>
                            <p class="type">Type: ${data.typeOfActivity.charAt(0).toUpperCase() + data.typeOfActivity.slice(1)}</p>
                        </div>
                        <img src="images/edit.png" alt="" class="edit-icon">
                        <img src="images/trash.png" alt="" class="delete-icon">
                    </div>`
        loadText.innerHTML = ''
        activitiesDiv.innerHTML += ihtml


        // <======================= Edit Function =======================>
        const editFunc = () => {
            let UpdateEditBtn = document.querySelectorAll(".edit-icon")
            UpdateEditBtn.forEach((btn, index) => {
                btn.addEventListener("mouseenter", () => {
                    btn.src = 'images/hover-edit.png'
                })

                btn.addEventListener("mouseleave", () => {
                    btn.src = 'images/edit.png'
                })

                btn.addEventListener("click", () => {
                    let element = UpdateEditBtn[index].parentElement
                    console.log(element)
                    let ihtml = `<textarea class = "textarea">${element.querySelector('.activity').innerHTML}</textarea>`
                    element.innerHTML = ihtml

                    let textarea = document.querySelector('.textarea')
                    textarea.addEventListener("change", () => {
                        element.innerHTML = `
                            <div class="details">
                                <p class="activity">${textarea.value}</p>
                                <p class="type">Type: ${data.typeOfActivity.charAt(0).toUpperCase() + data.typeOfActivity.slice(1)}</p>
                            </div>
                            <img src="images/edit.png" alt="" class="edit-icon">
                            <img src="images/trash.png" alt="" class="delete-icon">`
                        updateDataFunc()
                    })
                })
            })
        }


        // <======================= Delete Function =======================>
        const deleteFunc = () => {
            let UpdateDeleteBtn = document.querySelectorAll(".delete-icon")
            UpdateDeleteBtn.forEach((btn, index, arr) => {
                btn.addEventListener("mouseenter", () => {
                    btn.src = 'images/hover-trash.png'
                })

                btn.addEventListener("mouseleave", () => {
                    btn.src = 'images/trash.png'
                })

                btn.addEventListener("click", () => {
                    let element = UpdateDeleteBtn[index].parentElement
                    element.remove()
                    loadText.innerHTML = 'Activity deleted succesfully!!!'
                    setTimeout(clearLoadFunc, 500)
                })
            })
        }

        // <======================= Update Function =======================>
        const updateDataFunc = () => {
            editFunc()
            deleteFunc()
        }

        editBtn = document.querySelectorAll(".edit-icon")
        editBtn.forEach(() => {
            updateDataFunc()
        })

        deleteBtn = document.querySelectorAll(".delete-icon")
        deleteBtn.forEach(() => {
            updateDataFunc()
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