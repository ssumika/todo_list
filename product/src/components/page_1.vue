<template>
   <div class="app">
      <h2>やること</h2>
         <form class="add-form" v-on:submit.prevent="doAdd">
         <!-- コメント入力フォーム -->
         コメント <input type="text" ref="comment">
         <!-- 追加ボタンのモック -->
         <button type="submit">追加</button>
         </form>
         ※削除の際はctrlキーを同時押ししてください
      <div class="task_table">
         <tbody>
            <!-- [1] ここに <tr> で ToDo の要素を1行づつ繰り返し表示したい -->
               <tr v-for="item in todos" v-bind:key="item.id">
                  <th>{{ item.id }}</th>
                  <td>{{ item.comment }}</td>
                  <!--
                  <td class="state">
                     <button v-on:click="doChangeState(item)">
                        {{ labels[item.state] }}
                     </button>
                  </td>
                  -->
                  <td class="state">
                    <div v-if="!item.state">
                     <button v-on:click="doStart(item)">
                        開始
                     </button>
                    </div>
                    <div v-else>
                     <button v-on:click="doStop(item)">
                        {{item.condition}}
                     </button>
                     <button v-on:click="doFinish(item)">
                        完了
                     </button>
                    </div>
                  </td>
                  
                  <td class="button">
                     <!-- 削除ボタンのモック -->
                     <button v-on:click.ctrl="doRemove(item)">
                        削除
                     </button>
                  </td>
               </tr>
         </tbody>
      </div>
   </div>
      

</template>

<script>

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
      options: [
        { value: -1, label: 'すべて' },
        { value: 0,  label: '作業中' },
        { value: 1,  label: '完了' }
      ],
      // 選択している options の value を記憶するためのデータ
      // 初期値を「-1」つまり「すべて」にする
      current: -1,
     }
  },
  methods:{
      // ToDo 追加の処理
      doAdd: function() {
      // ref で名前を付けておいた要素を参照
      var comment = this.$refs.comment
      // 入力がなければ何もしないで return
      if (!comment.value.length) {
         return
      }
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
         id: todoStorage.uid++,
         comment: comment.value,
         state: 0,
         condition: "停止",
         break: 0
      })
      // フォーム要素を空にする
      comment.value = ''
      },
      doStart: function(item) {
         console.log("Start");
         var date=new Date();
         item.start=date.getHours() + ":"+ date.getMinutes();
         console.log(item.start)
         item.state = 1
      },
      doStop: function(item) {
         if(item.condition=="停止"){
            console.log("Stop");
            var date=new Date();
            item.stop=date.getHours() + ":"+ date.getMinutes();
            console.log(item.stop)
            item.condition ="再開"
         }else{
            console.log("Restart");
            var date_r=new Date();
            item.restart=date_r.getHours() + ":"+ date_r.getMinutes();
            console.log(item.restart)
            const [start_h,start_m]=item.stop.split(":");
            const [finish_h,finish_m]=item.restart.split(":");
            item.break+=(finish_h*60+finish_m)-(start_h*60+start_m);
            console.log(item.break);
            item.condition ="停止"
         }
      },
      doFinish: function(item) {
         console.log("Finish");
         var date=new Date();
         item.finish=date.getHours() + ":"+ date.getMinutes();
         console.log(item.finish)

         const [start_h,start_m]=item.start.split(":");
         const [finish_h,finish_m]=item.finish.split(":");
         item.time=(finish_h*60+finish_m)-(start_h*60+start_m)-item.break;
         console.log(item.time);
         item.state = 0
      },
      

      doChangeState: function(item) {
         console.log("Change");
         item.state = item.state ? 0 : 1
      },
      // 削除の処理
      doRemove: function(item) {
         console.log("Delete");
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
      deep: true
    }
  },
  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  },
  computed: {
    computedTodos: function() {
      // データ current が -1 ならすべて
      // それ以外なら current と state が一致するものだけに絞り込む
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },
    labels() {
        return this.options.reduce(function(a, b) {
          return Object.assign(a, { [b.value]: b.label })
        }, {})
        // キーから見つけやすいように、次のように加工したデータを作成
        // {0: '作業中', 1: '完了', -1: 'すべて'}
      }
  },
});


</script>

<style>

</style>