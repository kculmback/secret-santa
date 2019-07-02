<template lang="pug">
  #app
    snowflakes
    router-view
</template>

<script>
import Snowflakes from './components/Snowflakes'

export default {
  name: 'App',
  components: { Snowflakes },
}
</script>

<style lang="postcss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  @apply bg-bg min-h-screen w-full text-font;
}
</style>
