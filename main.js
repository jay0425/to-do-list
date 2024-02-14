// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다.
// 유저가 delete 버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 사라진다.
// 1. check 버튼을 클릭하는 순갅 true false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false 이면 안끝난걸로 간주하고 그대로.

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만.
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴.

let underLine = document.getElementById('under-line');
let menus = document.querySelectorAll('.tab');

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.task-tabs div');
let taskList = [];
let mode = 'all';
let filterList = [];

menus.forEach((menu) => menu.addEventListener('click', (e) => indicator(e)));
addButton.addEventListener('click', addTask);

function indicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + 'px';
  underLine.style.width = e.currentTarget.offsetWidth + 'px';
  underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
}

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

function addTask() {
  let taskValue = taskInput.value;
  if (taskValue === '') return alert('할 일을 입력해주세요😃');

  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
  taskInput.value = '';
}

function render() {
  // 1. 내가 선택한 탭에 따라서
  let list = [];
  if (mode === 'all') {
    list = taskList;
  } else if (mode === 'ongoing' || mode === 'done') {
    list = filterList;
  }
  // 2. 리스트를 달리 보여준다.
  // all  => taskList
  // ongoing, done  => filterList
  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
      <div class="task task-complete" id="${list[i].id}">
     <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">
          <i class="fa-solid fa-rotate-right fa-spin" ></i>
        </button>
        <button onclick="deleteTask('${list[i].id}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
  </div>
      `;
    } else {
      resultHTML += `
    <div class="task" id="${list[i].id}">
     <div>${list[i].taskContent}</div>
     <div>
      <button onclick="toggleComplete('${list[i].id}')">
        <i class="fa-solid fa-check"></i>
      </button>
      <button onclick="deleteTask('${list[i].id}')">
        <i class="fa-solid fa-trash"></i>
      </button>
     </div>
  </div>`;
    }
  }

  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  console.log(taskList);
  render();
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];

  if (mode === 'all') {
    // 전체 리스트를 보여준다.
    render();
  } else if (mode === 'ongoing') {
    // 진행중인 아이템을 보여준다.
    // task.isComplete=false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === 'done') {
    // 끝나는 케이스
    // task.isComplete=true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function enterKey() {
  if (window.event.keyCode == 13) {
    // 엔터키가 눌렸을 때
    addTask();
  }
}
