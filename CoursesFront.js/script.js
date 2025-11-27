let form = document.getElementById("form");
let titleInput = document.getElementById("titleInput");
let teacherInput = document.getElementById("teacherInput");
let createBtn = document.getElementById("createBtn");
let container = document.getElementById("container");
let updateBtn = document.getElementById("updateBtn");


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const courseData = {
        title: titleInput.value,
        teacher: teacherInput.value
    };


fetch("http://localhost:5000/courses", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(courseData)
})
.then(resp=>resp.json())
.then(() => {
    fetchCourses();
    form.reset();
  });
});


//  GET
//  GET and DISPLAY
//  /allcourses

function fetchCourses() {

// updateBtn paslepe del comand "none", o createBtn parodo button
    createBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
// aaaaaaaaaaaaaaa

    fetch("http://localhost:5000/allcourses")
    .then((resp)=>resp.json())
.then((data)=> {
    console.log()

    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    if(data.lenghth === 0){
        container.style.display = "none";
        const message = document.getElementById("message");
        message.textContent = "no data found....";
    } else {
        data.forEach((course, index) => {
            const row = document.createElement("tr");
            row.id = `row-${course.id}`;

            const td1 = document.createElement("td");
            td1.textContent = index + 1;

            const td2 = document.createElement("td");
            td2.textContent = course.title;

            const td3 = document.createElement("td");
            td3.textContent = course.teacher;

            const td4 = document.createElement("td");
            const editBtn = document.createElement("button");
            editBtn.textContent = "EDIT";
            editBtn.classList = "edit";
            editBtn.setAttribute("data-id", course._id);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "DELETE";
            deleteBtn.setAttribute("class", "delete");
            deleteBtn.setAttribute("data-id", course._id);

            td4.append(editBtn, deleteBtn);
            row.append(td1, td2, td3, td4);
            tableBody.append(row);
        });


const allEditButtons = document.querySelectorAll(".edit")
    console.log(allEditButtons);
    allEditButtons.forEach((btn) => {
    btn.addEventListener("click", handClickEdit);
});

const allDeleteButton = document.querySelectorAll(".delete")
    allDeleteButton.forEach((btn) => {
   btn.addEventListener("click", handleClickDelete);
});
    }  
});
}

//  PUT
//  UPDATE data
//  get(/courses/:id)
//  /courses/:id

function handClickEdit(event) {
   const courseID = event.target.getAttribute("data-id");
   console.log(courseID);

   

fetch(`http://localhost:5000/courses/${courseID}`)
 .then((resp) =>resp.json())
 .then((data) => {
    
    console.log(data);
    titleInput.value = data.title;
    teacherInput.value = data.teacher;

    updateBtn.style.display = "inline-block";
    updateBtn.setAttribute("data-id", courseID);

    createBtn.style.display = "none";
 });
}

    updateBtn.addEventListener("click", () => {
    const courseID = updateBtn.getAttribute("data-id"); 

    const updatedRecord = {
        title: titleInput.value,
        teacher: teacherInput.value,
    };

    fetch(`http://localhost:5000/courses/${courseID}`, {
     method: "PUT", 
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify(updatedRecord)
})  
    .then((resp) => resp.json())
    .then(() => {
        fetchCourses();
        form.reset();
    });
});

//  DELETE
//  get(/courses/:id)
//  /courses/:id

function handleClickDelete(event) {
    const courseID = event.target.getAttribute("data-id"); 

    fetch(`http://localhost:5000/courses/${courseID}`, {
        method: "DELETE",
    })
    .then((resp) => resp.json())
    .then((data) => {
    fetchCourses();
    
    
    
  });
}

fetchCourses();
