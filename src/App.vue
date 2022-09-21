<template>
  <div class="header">
    <div class="header-title"><h1>ToDoList</h1></div>
      <div class="header-menu">
        <ul>
          <li><router-link to="/">今日の記録</router-link></li>
          <li><router-link to="/page2">振り返り</router-link></li>
          <li><router-link to="/page3">今後の目標</router-link></li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
  ul{
    display: flex;
  }
  li{
    list-style:none;
    padding:5px 20px;
  }
</style>

