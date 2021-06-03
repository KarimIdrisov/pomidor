"use strict"

const start = document.getElementById('start')
const timer = document.getElementById('timer')
let time = new Date(1499000) // 25 minutes
let timerId

function launchTime() {
    timer.innerText = `${time.getMinutes()}:${time.getSeconds()}`
    time = new Date(time - 1000)

    console.log(time)
    if (time.getMinutes() === 0 && time.getSeconds() === 0) {
        clearInterval(timerId)
        const overTime = new Notification('Time is over', {
            body: 'You successfully pass this pomidoro. You need some rest!'
        })
        time = new Date(1499000)
    }
}

start.addEventListener("click", () => {
    timerId = setInterval(launchTime, 1000)
})

