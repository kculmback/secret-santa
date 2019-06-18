<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button type="button" @click="test">test</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import * as Cookies from 'js-cookie'
import HelloWorld from '@/components/HelloWorld.vue'

const csrf = Cookies.get('XSRF-TOKEN')

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  methods: {
    test () {
      fetch('//localhost:8081/api/', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'csrf-token': csrf,
        },
      }).then(response => console.log(response))
    },
  },
}
</script>
