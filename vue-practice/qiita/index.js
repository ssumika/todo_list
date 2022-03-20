var app = new Vue({
  el:'#app',
  data:{
    newItem:"",
    todos:[]
  },
  methods:{
    addItem:function(event){
      if(this.newItem == '')return;
      var todo = {
        item: this.newItem,
        isDone:false
      };
      this.todos.push(todo);
      this.newItem = ''
    },
    deleteItem:function(index){ //indexを引数に指定
      this.todos.splice(index,1) //indexで指定された要素を1つ削除
    }
  }
})