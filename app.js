const start = document.getElementById('start')
const timer = document.getElementById('timer')
let time = new Date(5000)
let timerId

function launchTime() {
    timer.innerText = `${time.getMinutes()}:${time.getSeconds()}`
    time = new Date(time - 1000)

    console.log(time)
    if (time.getMinutes() === 0 && time.getSeconds() === 0) {
        clearInterval(timerId)
        const myNotification = new Notification('Title', {
            body: 'Notification from the Renderer process'
        })
    }
}

start.addEventListener("click", () => {
    timerId = setInterval(launchTime, 1000)
})

