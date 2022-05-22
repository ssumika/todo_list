<template>
   <div class="app">
      <h2>やること</h2>
         <form class="add-form" v-on:submit.prevent="doAdd">
         <!-- コメント入力フォーム -->
         コメント <input type="text" ref="comment">
         日付 <input type="date" v-model="setday" ref="setday">
         <!-- 追加ボタンのモック -->
         <button type="submit">追加</button>
         </form>
         ※削除の際はctrlキーを同時押ししてください
      <div class="task_table">
         <tbody>
            <!-- [1] ここに <tr> で ToDo の要素を1行づつ繰り返し表示したい -->
               <tr v-for="item in computedTodos" v-bind:key="item.id">
                  <th>{{ item.day }}</th>
                  <td>{{ item.comment }}</td>
                  <td class="state">
                    <div v-if="item.state===0">
                     <button v-on:click="doStart(item)">
                        開始
                     </button>
                    </div>
                    <div v-else-if="item.state===1">
                     <button v-on:click="doStop(item)">
                        {{item.condition}}
                     </button>
                     <button v-on:click="doFinish(item)">
                        完了
                     </button>
                     </div>
                     <div v-if="item.state===-1">
                     <td>{{ item.time }}分</td>
                  </div>
                  </td>
                  
                  <td class="button">
                     <!-- 削除ボタンのモック -->
                     <button v-on:click.ctrl="doRemove(item)">
                        削除
                     </button>
                  </td>

                  <td v-if="item.state===1">
                     <div class="timer-result">
                  <!--時間の経過を表示-->
                     <p>{{( '0' + Math.floor( item.pastTime / 60000 ) ).slice(-2)}} : {{( '0'+Math.floor( item.pastTime / 1000 % 60 ) ).slice(-2)}}</p>
                     </div>
                  </td>
                  
               </tr>
         </tbody>
      </div>
   </div>
      

</template>

<script>
import _ from "lodash"


// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default({
  name: 'ToDoAdd',
  data(){
     return{
      todos:[],
      setday: [
            new Date().getFullYear(),
            ('0' + (new Date().getMonth()+1)).slice(-2),
            ('0' + new Date().getDate()).slice(-2)
          ].join('-'),
     }
  },
  methods:{
      // ToDo 追加の処理
      doAdd: function() {
      // ref で名前を付けておいた要素を参照
      var comment = this.$refs.comment
      var setday = this.$refs.setday
      // 入力がなければ何もしないで return
      if (!comment.value.length) {
         return
      }
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「開始前=0」で作成
      this.todos.push({
         id: todoStorage.uid++,
         comment: comment.value,
         state: 0,
         condition: "停止",
         break: 0,
         day: ((setday.value).slice(-5)).replace('-','/'),
         startTime: 0 ,
         pastTime: 0 ,
         stopTime: 0 ,
         timerObj: null
      })
      // フォーム要素を空にする
      comment.value = ''

      //lodashを使ったグループ化(使ってない)
      let group=_.groupBy(this.todos,"day");
      console.log(group)
      //console.log(this.group["05/22"][0])

      },

      //開始を押したらタイマーを動かす
      doStart: function(item) {
         //console.log("Start");
         var date=new Date();
         item.start=date.getHours() + ":"+ date.getMinutes();
         //console.log(item.start)
         item.state = 1

         item.startTime = Date.now()
         item.timerObj = setInterval(function(){
            item.pastTime = Date.now() - item.startTime
         },10)
         
      },

      //停止/再開を押したらタイマーを一時停止/再開
      doStop: function(item) {
         if(item.condition=="停止"){
            //console.log("Stop");
            var date=new Date();
            item.stop=date.getHours() + ":"+ date.getMinutes();
            //console.log(item.stop)
            item.condition ="再開"
            
            item.stopTime=item.pastTime
            clearInterval( item.timerObj )

         }else{
            //console.log("Restart");
            var date_r=new Date();
            item.restart=date_r.getHours() + ":"+ date_r.getMinutes();
            //console.log(item.restart)
            const [start_h,start_m]=item.stop.split(":");
            const [finish_h,finish_m]=item.restart.split(":");
            if((parseInt(finish_h*60)+parseInt(finish_m))-(parseInt(start_h*60)+parseInt(start_m))>=0){
               item.break+=(parseInt(finish_h*60)+parseInt(finish_m))-(parseInt(start_h*60)+parseInt(start_m));
            }else{
               item.break+=(parseInt(finish_h*60)+parseInt(finish_m))-(parseInt(start_h*60)+parseInt(start_m))+24*60;
            }
            //console.log(item.break);
            item.condition ="停止"

            item.startTime = Date.now()
            item.timerObj = setInterval(function(){
               item.pastTime = item.stopTime + Date.now() - item.startTime 
            },10)
         }
      },

      //完了を押したら時間を表示
      doFinish: function(item) {
         //console.log("Finish");
         var date=new Date();
         item.finish=date.getHours() + ":"+ date.getMinutes();
         //console.log(item.finish)

         const [start_h,start_m]=item.start.split(":");
         const [finish_h,finish_m]=item.finish.split(":");
         console.log("start:",start_h,":",start_m);
         console.log("finish:",finish_h,":",finish_m);
         console.log("break",item.break);
         if((parseInt(finish_h*60)+parseInt(finish_m))-(parseInt(start_h*60)+parseInt(start_m))-parseInt(item.break)>=0){
            item.time=(parseInt(finish_h*60)+parseInt(finish_m))-(parseInt(start_h*60)+parseInt(start_m))-parseInt(item.break);
         }else{
            item.time=(parseInt(finish_h*60)+parseInt(finish_m))-(parseInt(start_h*60)+parseInt(start_m))-parseInt(item.break)+24*60;
         }
         console.log(item.time);
         item.state = -1
      },
     
      //削除の処理
      doRemove: function(item) {
         //console.log("Delete");
         var index = this.todos.indexOf(item)
         this.todos.splice(index, 1)
      },

      
  },

  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function(todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      deep: true,

    }
  },
  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  },
  computed: {
   //todosの中身を日付順にソートする
    computedTodos: function() {
      let schedules=[]
      for(let i=0; i<Object.keys(this.todos).length; i++){
         if (!schedules.includes(this.todos[i].day)){
            schedules.push(this.todos[i].day)
         }
      }
      schedules.sort()
      //console.log(this.schedules)

      let tasks=[]
      for (const schedule of schedules) {
         for (const todo of this.todos){
            if(todo.day===schedule){
               tasks.push(todo)
            }
         }
      }
      return tasks;
    },
  }
});


</script>

<style>
td{
   padding:5px;
}

</style>