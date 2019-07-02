<template lang="pug">
  .secret-santa
    .secret-santa__container
      h1 hey
</template>

<script>
// import debug from 'debug'

// const log = debug('component:SecretSanta')

export default {
  name: 'SecretSanta',
}
</script>

<style lang="postcss" scoped>
.secret-santa {
  @apply pt-12 px-4;

  &__container {
    width: 100%;
    max-width: 600px;
    position: relative;
    @apply shadow-md rounded mx-auto p-4 bg-secondary;
  }
}
</style>
