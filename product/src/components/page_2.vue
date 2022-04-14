<template>
   <div id='app'>
      <v-calendar :attributes="attrs" ></v-calendar>         
   </div>
</template>

<script>

export default({
  name: 'CalendarTest',
  data(){
     return{
      attrs: [
         {
            key: 'today',
            highlight: {
               backgroundColor: '#ff8080',
            },
            dates: new Date(),
            popover: {
               label: 'メッセージを表示できます',
            },
         }
      ],
   }
  }
})
</script>

<style>
</style>