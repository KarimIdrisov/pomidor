"use strict"

const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const continueBtn = document.getElementById('continue')
const timer = document.getElementById('timer')

let time = new Date(1499000) // 25 minutes
let timerId

function launchTime() {
    const minutes = time.getMinutes().toString().length === 1 ? '0' + time.getMinutes() : time.getMinutes()
    const seconds = time.getSeconds().toString().length === 1 ? '0' + time.getSeconds() : time.getSeconds()
    timer.innerText = `${minutes}:${seconds}`
    time = new Date(time - 1000)

    if (time.getMinutes() === 0 && time.getSeconds() === 0) {
        clearInterval(timerId)
        const overTime = new Notification('Time is over', {
            body: 'You successfully pass this pomidoro. You need some rest!'
        })
        time = new Date(1499000)
    }
}

startBtn.addEventListener("click", () => {
    if (time.getMilliseconds() !== 1499000) {
        clearInterval(timerId)
        time = new Date(1499000)
        timerId = setInterval(launchTime, 1000)
        pauseBtn.hidden = false
        continueBtn.hidden = true
        return;
    }
    time = new Date(1499000)
    timerId = setInterval(launchTime, 1000)
})

pauseBtn.addEventListener('click', () => {
    clearInterval(timerId)
    pauseBtn.hidden = true
    continueBtn.hidden = false
})

continueBtn.addEventListener('click', () => {
    timerId = setInterval(launchTime, 1000)
    pauseBtn.hidden = false
    continueBtn.hidden = true
})





