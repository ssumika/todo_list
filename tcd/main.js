const taskValue = document.getElementsByClassName('task_value')[0];
const taskSubmit = document.getElementsByClassName('task_submit')[0];
const taskList = document.getElementsByClassName('task_list')[0];

//追加ボタンを作成
const addTasks = (task) => {
　　// 入力したタスクを追加・表示
　　const listItem = document.createElement('li');
　　const showItem = taskList.appendChild(listItem);
　　listItem.innerHTML = task;

    //入力された時間の表示
    const date=new Date();
    const hour=date.getHours();
    const minute=date.getMinutes();
    console.log(hour+":"+minute);
    const time = document.createElement('text');
    time.innerHTML = ("0"+hour).slice(-2)+":"+("0"+minute).slice(-2);
    listItem.appendChild(time);
    console.log(listItem);

　　//タスクに削除ボタンを付与
　　const deleteButton = document.createElement('button');
　　deleteButton.innerHTML = 'Delete';
　　listItem.appendChild(deleteButton);

　　//削除ボタンをクリックし、イベントを発動（タスクが削除）
　　deleteButton.addEventListener('click', evt => {
　　　　evt.preventDefault();
　　　　deleteTasks(deleteButton);
　　});
};

//削除ボタンにタスクを消す機能を付与
const deleteTasks = (deleteButton) => {
　　const chosenTask = deleteButton.closest('li');
　　taskList.removeChild(chosenTask);
};

//追加ボタンをクリックし、イベントを発動（タスクが追加）
taskSubmit.addEventListener('click', evt => {
　　evt.preventDefault();
　　const task = taskValue.value;
    if(task!=''){
    　　addTasks(task);
    　　taskValue.value = '';
    }
});

//Enterの無効化 
taskValue.addEventListener('keypress', evt => {
    var keyName=evt.key;
    if(keyName==="Enter"){
    　　evt.preventDefault();
    }
});

