let apiKey = `3a3443077e9542d88fc62508261007`;
let apiGeo = `0bdc3e6bd44d4ee5b5a1e32ad9777fdd`;
const wetherLogoDiv = document.querySelector("#wether-logo-id");
const wetherCondition = document.querySelector("#wether-logo-condition");
const temprature = document.querySelector("#temprature-id");
const cityName = document.querySelector("#city-name-id");
const wind = document.querySelector(".wind-desc");
const humidityInfo = document.querySelector(".humidity-info");
 
let getWether = async (city) => {
    console.log(city);
    let url = `http://api.weatherapi.com/v1/current.json?key=3a3443077e9542d88fc62508261007&q=${city}&aqi=yes`
    
    try {
        const res = await fetch(url);
        let data = await res.json();
        console.log(data);

        return showWether(data);
    } catch (error) {
        alert("404 error")
    }

}
getWether("Allahabad");


function showWether(data){
    cityName.innerHTML = data.location.name;
    wetherCondition.innerHTML = data.current.condition.text;
    wind.innerHTML = data.current.wind_kph;
    temprature.innerHTML = `${data.current.temp_c}&#176`
    humidityInfo.innerHTML = data.current.humidity;
    wetherLogoDiv.setAttribute("src", `${data.current.condition.icon}`)
}


// let  getLocationName = async (lat, long) =>{
//     let query = `${lat},${long}`;
//     let apiUrl = `ttps://api.opencagedata.com/geocode/v1/json?key=0bdc3e6bd44d4ee5b5a1e32ad9777fdd&q=${query}&pretty=1&no_annotations=1`;
//     try {
//         const res = await fetch(apiUrl);
//         let data = await res.json();
//         let cityIs = data.results[0].components.city;
        
        // getWether(cityIs);
    // } catch (error) {
        // alert("Location will not present in our server.")
    // }
// }

// navigator.geolocation.getCurrentPosition(
//     (postion) => {
//         const {latitude, longitude} = postion.coords

//         getLocationName( latitude, longitude);
//     }, (error) =>{
//       alert("Wether fetching will not work. Plase allow location")  
//     }
// )









const timeElem = document.querySelector("#time-dashboard");
const weekName = document.querySelector("#weekName");
const form = document.querySelector(".form-common");
const dailyPlannerForm1 = document.querySelector("#daily-planner-form");
const dailyPlannerHeading = document.querySelector(".daily-planner-heading");
const dailyPlannerForm2 = document.querySelector(".timeline-form-ind")
function dateTime() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");

    let weekDayName = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let monthName = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    let currnetWeekDay = weekDayName[now.getDay()];
    let currentMonth = monthName[now.getMonth()];
    timeElem.innerHTML = `${hours}:${minutes}`;
    weekName.innerHTML = `${currnetWeekDay} | ${monthName[now.getMonth()]} ${String(now.getDate()).padStart(2, "0")}`
    dailyPlannerHeading.innerHTML = `${currnetWeekDay}, ${currentMonth} ${String(now.getDate()).padStart(2, "0")}`
}
dateTime();
// setInterval(dateTime, 1000)

document.querySelector("#mobile-todo-feature").addEventListener("click", e => {

})




// form opening and closing

const formDiv1 = document.querySelector(".task-form");
const dashboardContent = document.querySelector(".content");

// oppening
document.querySelector("#toggle-form-1").addEventListener("click", () => {
    formDiv1.classList.toggle("flex");
    dashboardContent.classList.toggle("blur");
})
document.querySelector("#add-btn-fixed-nav").addEventListener("click", () => {
    if (window.innerWidth <= 1250) {
        formDiv1.classList.toggle("flex");
        // formDiv1.elements[0].focus();
    } else {
        form.elements[0].focus();
    }

})
document.querySelector(".timeline-add-btn").addEventListener("click", () => {
    if (window.innerWidth <= 1250) {
        dailyPlannerForm2.classList.toggle("flex");
        
    } else {
        dailyPlannerForm1.elements[0].focus();
    }

})
document.querySelector("#mobile-task-add").addEventListener("click", e => {
     formDiv1.classList.toggle("flex");
       
})
// closing
document.querySelector(".bg").addEventListener("click", () => {
    formDiv1.classList.remove("flex");
    dashboardContent.classList.remove("blur");
})
document.querySelector(".bg-2").addEventListener("click", () => {
    dailyPlannerForm2.classList.remove("flex");
})
// Form opening logic end 

// timeer code

const timerBtn = document.querySelector("#timer-btn");
const tizmerShow = document.querySelector("#timer-show");
const playPuseIcon = document.querySelector("#play-icon");
const pomodoroPlay = document.querySelector("#pomodoro-div-play");
const pomodoroReset = document.querySelector("#pomodoro-div-reset")
const pomodroTimerShow = document.querySelector(".time-pomodoro");
const pomodoroIcon = document.querySelector("#pomodoro-icon");
let timer = null; // keep reference globally
let workTime = 25 * 60;
let timeLeft = workTime;

function pomomodoroTimer(sec) {
    let minutes = Math.floor(sec / 60);
    let secs = sec % 60;
    return String(minutes).padStart(2, '0') + ":" + String(secs).padStart(2, '0');
}

timerBtn.addEventListener("click", () => {
    if (playPuseIcon.classList.contains("ri-play-large-fill")) {
        // Start Session
        playPuseIcon.classList.remove("ri-play-large-fill");
        playPuseIcon.classList.add("ri-close-large-line");
        document.querySelector("#timer-btn-text").innerHTML = "Stop Session";

        timeLeft = workTime;
        tizmerShow.innerHTML = pomomodoroTimer(timeLeft);

        timer = setInterval(() => {
            timeLeft--;
            tizmerShow.innerHTML = pomomodoroTimer(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timer);
                timer = null;
                tizmerShow.innerHTML = "00:00";
                alert("⏰ Session Complete!");
            }
        }, 1000);

    } else {
        // Force Stop Session
        clearInterval(timer);
        timer = null;
        timeLeft = workTime; // reset back to 25 min
        tizmerShow.innerHTML = pomomodoroTimer(timeLeft);

        playPuseIcon.classList.add("ri-play-large-fill");
        playPuseIcon.classList.remove("ri-close-large-line");
        document.querySelector("#timer-btn-text").innerHTML = "Start Session";
    }
});

pomodoroPlay.addEventListener("click", e => {
    if (pomodoroIcon.classList.contains("ri-play-fill")) {
        // PLAY → START SESSION
        pomodoroIcon.classList.remove("ri-play-fill");
        pomodoroIcon.classList.add("ri-pause-fill");

        // Reset only when starting fresh
        if (!timeLeft || timeLeft <= 0) {
            timeLeft = workTime;
        }
        pomodroTimerShow.innerHTML = pomomodoroTimer(timeLeft);

        timer = setInterval(() => {
            timeLeft--;
            pomodroTimerShow.innerHTML = pomomodoroTimer(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timer);
                timer = null;
                pomodroTimerShow.innerHTML = "00:00";
                alert("⏰ Session Complete!");
            }
        }, 1000);
    } else {
        // ELSE → PAUSE / RESUME LOGIC
        if (pomodoroIcon.classList.contains("ri-pause-fill")) {
            // PAUSE
            clearInterval(timer);
            timer = null;
            pomodoroIcon.classList.remove("ri-pause-fill");
            pomodoroIcon.classList.add("ri-play-fill");
        } else {
            // RESUME (continue from current timeLeft)
            pomodoroIcon.classList.remove("ri-play-fill");
            pomodoroIcon.classList.add("ri-pause-fill");

            timer = setInterval(() => {
                timeLeft--;
                pomodroTimerShow.innerHTML = pomomodoroTimer(timeLeft);

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    timer = null;
                    pomodroTimerShow.innerHTML = "00:00";
                    alert("⏰ Session Complete!");
                }
            }, 1000);
        }
    }
});



pomodoroReset.addEventListener("click", e => {
     clearInterval(timer);
        timer = null;
        timeLeft = workTime; // reset back to 25 min
        pomodroTimerShow.innerHTML = pomomodoroTimer(timeLeft);

        pomodoroIcon.classList.add("ri-play-fill");
        pomodoroIcon.classList.remove("ri-close-large-line");
        

})

const pomodorClose2 = document.querySelector("#pomodoro-close-btn");
const pomodorClose1 = document.querySelector(".bg5");
const pomodoroTimerDiv = document.querySelector(".pomodoro-timer-div");
const pomodorClick1 = document.querySelector("#pomodoro-content");
const pomodorClick2 = document.querySelector("#pomodoro-timer-li");
const pomodorClick3 = document.querySelector("#pomodoro-timer-feature");


let clickOnPomodoro = [pomodorClick1, pomodorClick2, pomodorClick3]

clickOnPomodoro.forEach(e => {
    pomodoroTimerFn(e);
})

function pomodoroTimerFn(div){
div.addEventListener("click", e => {
    if(pomodoroTimerDiv.classList.contains("flex")){
        pomodoroTimerDiv.classList.remove("flex");
    } else {
        pomodoroTimerDiv.classList.add("flex");
    }
})
}

pomodorClose1.addEventListener("click", e => {
    pomodoroTimerDiv.classList.remove("flex");
})
pomodorClose2.addEventListener("click", e=> {
    pomodoroTimerDiv.classList.remove("flex");
})



// Id Generator
function generateId(prefix = "id") {
    const uniquePart = Math.random().toString(36).substr(2, 9);
    const timePart = Date.now().toString(36);
    return `${prefix}-${timePart}-${uniquePart}`;
}

// add New Task Logic
let taskArr = JSON.parse(localStorage.getItem("tasks")) || [];

const taskContainer = document.querySelector(".bottom-todo-right");
const tasks = document.querySelectorAll(".task");

function uiCreater(elem) {
    let div = document.createElement("div");
    div.classList.add("task", `${elem.priority}`, `${elem.status}`)
    div.setAttribute("id", `${elem.id}`)
    div.innerHTML += `
    <div class="task-right">
    <div class="checkbox-div">
    <label class="checkbox">
                                    <input onchange="donefunction('${elem.id}')" type="checkbox" ${elem.status == 'completed' ? 'checked' : ''}>
                                    <span class="check high"></span>
                                </label>
                                </div>
                                <div class="task-content-title">
                                <h2 >${elem.title}</h2>
                                <div class="extra-info">
                                <div class="date-end">
${elem.dueDate !== ""
            ? `<i class="${elem.status === 'completed' ? 'ri-check-double-line' : 'ri-calendar-2-line'}"></i>`
            : ""}
                                
                                        <p>${elem.dueDate}</p>
                                    </div>
                                    <p class="priority-label">
                                        ${elem.priority}
                                        </p>
                                </div>
                            </div>
                        </div>
                        <div class="hover-edit-delete">
                        <button onclick="updatfunction('${elem.id}')" class="commont-container"><i class="ri-pencil-line"></i></button>
                        <button onclick="deletefunction('${elem.id}')" class="commont-container"><i class="ri-delete-bin-6-line"></i></button>
                        </div>
                        `
    taskContainer.appendChild(div);
}

function fetchUi(s) {
    let count = 0;
    taskArr.forEach(elem => {
        if(elem.status === "active"){
            count++;
        }
    })

    document.querySelector("#counter-task-dashboard").innerHTML = count;

    taskContainer.innerHTML = "";
    taskArr.forEach(elem => {

        uiCreater(elem);


    })
}
fetchUi();

let updateIndex = null;
function formInfo(elem) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = e.target[0].value.trim();
        let priority = e.target[1].value;
        let dueDate = e.target[2].value;

        if (title === "") {
            return;
        }
        let taskObj = {
            id: generateId(),
            title,
            priority,
            dueDate,
            status: "active"
        }

        if (updateIndex == null) {
            taskArr.push(taskObj);
        } else {
            taskObj.id = elem.id;
            taskObj.status = elem.status;
            taskArr[updateIndex] = taskObj;
            updateIndex = null;

        }
        localStorage.setItem("tasks", JSON.stringify(taskArr));
        fetchUi();

        form.reset();
    })
    document.querySelector(".todo-form").addEventListener("submit", (e) => {
         e.preventDefault();
        let title = e.target[0].value.trim();
        let priority = e.target[1].value;
        let dueDate = e.target[2].value;

        if (title === "") {
            return;
        }
        let taskObj = {
            id: generateId(),
            title,
            priority,
            dueDate,
            status: "active"
        }

        if (updateIndex == null) {
            taskArr.unshift(taskObj);
        } else {
            taskObj.id = elem.id;
            taskObj.status = elem.status;
            taskArr[updateIndex] = taskObj;
            updateIndex = null;

        }
        localStorage.setItem("tasks", JSON.stringify(taskArr));
        fetchUi();

        formDiv1.classList.remove("flex")
        document.querySelector(".todo-form").reset();
    })
    
}
formInfo();
function updatfunction(id) {
    let find = taskArr.find(elem => elem.id === id);
    updateIndex = taskArr.findIndex(elem => elem.id === id);

    if(window.innerWidth >= 1250){
        form.elements[0].value = find.title;
        form.elements[2].value = find.priority;
        form.elements[3].value = find.dueDate;
        form.elements[0].focus();
        console.log("update")
    } else {
        document.querySelector(".task-form").classList.add("flex");
    }
    formInfo(find);
}
function deletefunction(id) {
    console.log("Delete Function")
    let findIndex = taskArr.findIndex(elem => elem.id === id);
    console.log(findIndex)
    taskArr.splice(findIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    fetchUi()
}
function donefunction(id) {
    let find = taskArr.find(elem => elem.id === id);
    let findIndex = taskArr.findIndex(elem => elem.id === id);
    if (find.status === "active") {
        find.status = "completed";
    } else {
        find.status = "active";
    }
    taskArr[findIndex] = find;
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    fetchUi();
}

// Active Feature 
let todoFeatureActive = document.querySelectorAll(".top-right-feature");

function activeStateIndex(e) {
    e.classList.toggle("active-feature");
    let selectedText = e.innerText.toLowerCase();
    console.log(selectedText)
    let filterIs
    if (selectedText === "all task") {
        fetchUi();
    } else {
        filterIs = taskArr.filter(elem => elem.status === selectedText)
        taskContainer.innerHTML = "";
        console.log(filterIs)
        filterIs.forEach(item => {
            uiCreater(item);
        })
    }
}

todoFeatureActive.forEach(p => {
    p.addEventListener("click", (e) => {
        todoFeatureActive.forEach(elem => {
            elem.classList.remove("active-feature")
        })
        activeStateIndex(p);
    })
    p.classList.remove("active-feature");
})

// filter logic
const filterSelect = document.getElementById("filter-select");

filterSelect.addEventListener("change", () => {
    const selectedValue = filterSelect.value;

    let filterIs
    if (selectedValue === "all") {
        fetchUi();
    } else {
        filterIs = taskArr.filter(elem => elem.priority === selectedValue)
        taskContainer.innerHTML = "";
        console.log(filterIs)
        filterIs.forEach(item => {
            uiCreater(item);
        })
    }
});

// side nav logic

const dashboardLi = document.querySelector("#dashboard-li")
const todoLi = document.querySelector("#todo-li")
const dailyPlannerLi = document.querySelector("#daily-planner-id")
const pomodoroLi = document.querySelector("#pomodoro-timer-li")
const dailyGoalLi = document.querySelector("#daily-goal-li")
const todoMobileLi = document.querySelector("#mobile-menu-icon");
const dailyPlannerMobile = document.querySelector("#mobile-planner-icon")
const dashboardMobile = document.querySelector("#mobile-dashboard-icon")
const goalMobile = document.querySelector("#mobile-goal-icon")
const todoFeatrue = document.querySelector("#mobile-todo-feature")
const dailyPlannerFeature = document.querySelector("#mobile-daily-planner-feature");
const goalsFeature = document.querySelector("#mobile-goals-feature");
let sideNavLiArr = [goalsFeature,dailyPlannerFeature,todoFeatrue,goalMobile,dashboardMobile,dailyPlannerMobile,todoMobileLi,dashboardLi, todoLi, dailyPlannerLi, dailyGoalLi];



let liOpen = JSON.parse(localStorage.getItem("li-check")) || "todo-li";
activeLi(sideNavLiArr.find(e => e.id === liOpen))

function activeLi(row) {
    console.log("a", row)
    sideNavLiArr.forEach(e => e.classList.remove("active-nav-list"))
    row.classList.add("active-nav-list")
    localStorage.setItem("li-check", JSON.stringify(row.id));
    let contentSelector = {
        content: dashboardContent,
        todoContainer: document.querySelector(".todo-container"),
        dailyPlaner: document.querySelector(".daily-planner"),
        contentMobile: dashboardContent,
        todoContainerMobile: document.querySelector(".todo-container"),
        dailyPlanerMobile: document.querySelector(".daily-planner"),
        dailyGoal: document.querySelector(".goal-div-wrapper"),
        dailyGoalMobile: document.querySelector(".goal-div-wrapper")
    }

    let currentValue = contentSelector[row.getAttribute("value")];

    currentValue.classList.toggle("flex")
    
}

function daskboardChecker() {
    if (dashboardContent.classList.contains("flex")) {
        document.querySelector(".fixed-nav-pc").classList.remove("flex");
        console.log("on")
    } else {
        document.querySelector(".fixed-nav-pc").classList.add("flex");
        console.log("off");
    }
}
daskboardChecker();

function fetchLi(row) {
    row.addEventListener("click", (e) => {
        console.log(e)
        sideNavLiArr.forEach(e => {
            e.classList.remove("flex")
            console.log("e wala", e)

        })
        activeLi(row);
        daskboardChecker();
        window.location.reload();
    })

}
function fetchSection() {
    sideNavLiArr.forEach(e => {
        fetchLi(e);
    })
}
fetchSection();
// dashboard

document.querySelector(".todo-feature").addEventListener("click", (e) => {
    document.querySelector(".todo-container").classList.toggle("flex")
    dashboardContent.classList.remove("flex")
    daskboardChecker();


    todoLi.classList.add("active-nav-list")
    dashboardLi.classList.remove("active-nav-list")
    fetchSection();

})

document.querySelector(".daily-feature").addEventListener("click", (e) => {
    document.querySelector(".daily-planner").classList.toggle("flex")
    dashboardContent.classList.remove("flex")
    daskboardChecker();


    dailyPlannerLi.classList.add("active-nav-list")
    dashboardLi.classList.remove("active-nav-list")
    fetchSection();

})

document.querySelector(".goals").addEventListener("click", (e) => {
    document.querySelector(".goal-div-wrapper").classList.toggle("flex")
    dashboardContent.classList.remove("flex")
    daskboardChecker();


    document.querySelector("#daily-goal-li").classList.add("active-nav-list")
    dashboardLi.classList.remove("active-nav-list")
    fetchSection();

})



// Daily planner 

let timelineArr = JSON.parse(localStorage.getItem("timeline")) || [];


const dailyPlannerFormBtn = document.querySelector("#daily-planner-form-btn");
const timelinContainer = document.querySelector(".timeline-box-bottom");
const timeLineCounter = document.querySelector(".counter-timeline")

function countertimeline(){
    let count = 0;
    
    timelineArr.forEach(e => {
        if(e.status === 'timelineActive'){
            count++;
        }
    })
    
    timeLineCounter.innerHTML = count;
    
}
countertimeline();


function dailyUiCreater(elem) {
   
    let div = document.createElement("div");
    if (isEventTimeGreater(elem.time)) {
        div.classList.add("timeline-content", "timeline-active");
        let index = timelineArr.findIndex(e => e.id === elem.id)

        timelineArr[index].status = "timelineActive";
        localStorage.setItem("timeline", JSON.stringify(timelineArr));
    } else {
        div.classList.add("timeline-content", "timeline-deactive");
        let index = timelineArr.findIndex(e => e.id === elem.id)

        timelineArr[index].status = "timelineDeactive";
        localStorage.setItem("timeline", JSON.stringify(timelineArr));
    }

    div.setAttribute("id", `${elem.id}`)
    div.innerHTML += `
    <div class="line-ribbont"></div>
     <div class="timeline-timer">
                            <p>${elem.time}</p>
                        </div>
                        <div class="timeline-des">
                            <div class="timeline-des-top">
                                <h3>${elem.title}</h3>
                                <i onclick='deleteTimeline("${elem.id}")' class="delete-timeline ri-close-circle-fill"></i>
                            </div>
                            <div class="timeline-des-bottom">
                                <p>${elem.desc}</p>
                            </div>
                        `
    timelinContainer.appendChild(div);
    countertimeline();
}

function fetchdailyUi(s) {
    let count = 0;



    timelinContainer.innerHTML = "";
    timelineArr.sort((a, b) => {
        let [ah, am] = a.time.split(":").map(Number);
        let [bh, bm] = b.time.split(":").map(Number);

        let aMinutes = ah * 60 + am;
        let bMinutes = bh * 60 + bm;

        return aMinutes - bMinutes;
    });
    console.log(timelineArr);

    timelineArr.forEach(elem => {


        dailyUiCreater(elem);
        

    })

    
    timelineArr.forEach(elem => {
        if(elem.status === "timelineActive"){
            count++;
        }
    })

    document.querySelector("#planner-counter").innerHTML = `${count} more plans`;
}
fetchdailyUi();


let timelineUpdateIndex = null;
function timelineformInfo(elem) {
    dailyPlannerForm1.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = e.target[0].value.trim();
        let time = e.target[1].value.trim();
        let desc = e.target[2].value.trim();

        console.log(time);
        console.log(typeof time)
        if (title === "" || time === "") {
            return;
        }
        let timelinetaskObj = {
            id: generateId(),
            title,
            time,
            desc,
            status: "timeline-active"
        }

        if (timelineUpdateIndex == null) {
            timelineArr.push(timelinetaskObj);
        } else {
            timelinetaskObj.id = elem.id;
            timelinetaskObj.status = elem.status;
            timelineArr[timelineUpdateIndex] = timelinetaskObj;
            timelineUpdateIndex = null;

        }
        localStorage.setItem("timeline", JSON.stringify(timelineArr));
        fetchdailyUi();

        countertimeline();
        dailyPlannerForm1.reset();
    })
    document.querySelector("#daily-planner-form-ind").addEventListener("submit", (e) => {
        e.preventDefault();
        let title = e.target[0].value.trim();
        let time = e.target[1].value.trim();
        let desc = e.target[2].value.trim();

        console.log(time);
        console.log(typeof time)
        if (title === "" || time === "") {
            return;
        }
        let timelinetaskObj = {
            id: generateId(),
            title,
            time,
            desc,
            status: "timeline-active"
        }

        if (timelineUpdateIndex == null) {
            timelineArr.push(timelinetaskObj);
        } else {
            timelinetaskObj.id = elem.id;
            timelinetaskObj.status = elem.status;
            timelineArr[timelineUpdateIndex] = timelinetaskObj;
            timelineUpdateIndex = null;

        }
        localStorage.setItem("timeline", JSON.stringify(timelineArr));
        fetchdailyUi();

        countertimeline();
        document.querySelector(".timeline-form-ind").classList.remove("flex")
        dailyPlannerForm1.reset();
    })
}
timelineformInfo();
// function updatfunction(id){
//     let find = taskArr.find(elem => elem.id === id);
//     updateIndex = taskArr.findIndex(elem => elem.id === id);

//     form.elements[0].value = find.title;
//     form.elements[2].value = find.priority;
//     form.elements[3].value = find.dueDate;
//     formInfo(find);
//     form.elements[0].focus();
// }
function deleteTimeline(id){
    console.log("Delete timeline")
    let findIndex = timelineArr.findIndex(elem => elem.id === id);
    console.log(findIndex)
    timelineArr.splice(findIndex, 1);
    localStorage.setItem("timeline", JSON.stringify(timelineArr));
    countertimeline();
    fetchdailyUi();
}


// Goal Section

const goalToggleBtn = document.querySelector(".goal-add-btn");
const goalForm = document.querySelector(".goal-div-form-wrapper");
const goalCloser = document.querySelector(".bg4");

goalToggleBtn.addEventListener("click", () => {
    goalForm.classList.toggle("flex");
})
goalCloser.addEventListener("click", ()=> {
    goalForm.classList.remove("flex");
})

let goalArr = JSON.parse(localStorage.getItem("goalArr")) || [];

const goalFomBtn = document.querySelector("#goal-form-submit");
const goalTitle = document.querySelector("#goal-input-title")
const goalDes = document.querySelector("#goal-input-des")
const goalContainer = document.querySelector(".bottom-goal-div");

function goalUiCreater(elem) {
    let div = document.createElement("div");
    div.classList.add("goal-container", "float-slow")
    div.setAttribute("id", `${elem.id}`)
    div.innerHTML += `
   <div class="goal-top">
                    <h2>${elem.title}</h2>
                    <div class="goal-center">
                        <p>${elem.description}</p>
                    </div>
                </div>
                
                    <div class="edit-delete-goal">
                         <button onclick="updationGoal('${elem.id}')" ><i class="ri-pencil-line"></i></button>
                        <button onclick="deletionGoal('${elem.id}')"  class="red"><i class="red ri-delete-bin-6-line"></i></button>
                       
                    </div>
                        `
    goalContainer.appendChild(div);
}

function goalfetchUi(s) {
    goalContainer.innerHTML = "";
    goalArr.forEach(elem => {

        goalUiCreater(elem);


    })
}
goalfetchUi();


let goalUpdateIndex = null
function goalInfoForm(elem){
goalFomBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = goalTitle.value.trim();
    let description = goalDes.value.trim(); 

     if (title === "") {
            return;
        }
        let taskObj = {
            id: generateId(),
            title,
            description
        }

        if (goalUpdateIndex == null) {
            goalArr.unshift(taskObj);
        } else {
            taskObj.id = elem.id;
            taskArr[goalUpdateIndex] = taskObj;
            goalUpdateIndex = null;
        }
        localStorage.setItem("goalArr", JSON.stringify(goalArr));
        goalfetchUi();

        goalTitle.value = "";
        goalDes.value = "";
        goalForm.classList.remove("flex")
        
})
}
goalInfoForm();
function updationGoal(id) {
    console.log(id)
    let find = goalArr.find(elem => elem.id === id);
    goalUpdateIndex = goalArr.findIndex(elem => elem.id === id);

    goalForm.classList.add("flex")
    
        goalTitle.value = find.title;
        goalDes.value = find.description;
    
    goalInfoForm(find);
}
function deletionGoal(id) {
    console.log("Delete Function")
    let findIndex = goalArr.findIndex(elem => elem.id === id);
    console.log(findIndex)
    goalArr.splice(findIndex, 1);
    localStorage.setItem("goalArr", JSON.stringify(goalArr));
    goalfetchUi()
}
document.querySelector(".goals").addEventListener("click", e => {
    document.querySelector(".goal-div-wrapper").classList.add("flex")
})
















function isEventTimeGreater(eventTime) {
    // Current time
    let now = new Date();
    let currentHours = now.getHours();
    let currentMinutes = now.getMinutes();

    // Convert current time → minutes
    let currentTotalMinutes = currentHours * 60 + currentMinutes;

    // Convert event time "HH:MM" → minutes
    let [eh, em] = eventTime.split(":").map(Number);
    let eventTotalMinutes = eh * 60 + em;

    // Compare
    return eventTotalMinutes > currentTotalMinutes;
}

