<template lang="pug">
  .winter
    #snow
    .snowflakes
      .snowflake(v-for="n in 10")
        img(:src="require('../assets/snowflake.png')")
</template>

<script>
// import debug from 'debug'

// const log = debug('component:Snowflakes')

export default {
  name: 'Snowflakes',
}
</script>

<style lang="postcss" scoped>
.snowflake {
  color: #fff;
  font-size: 1em;
  font-family: Arial;
  text-shadow: 0 0 1px #000;
}

@keyframes snowflakes-fall {
  0% {top:-10%}
  100% {top:100%}
}
@keyframes snowflakes-shake {
  0% {transform:translateX(0px)}
  50%{transform:translateX(80px)}
  100%{transform:translateX(0px)}
}

.snowflake {
  position: fixed;
  top: -10%;
  user-select: none;
  cursor: default;
  animation:
    snowflakes-fall 10000ms linear infinite running,
    snowflakes-shake 3000ms ease-in-out infinite running;
}
.snowflake:nth-of-type(0) {
  left: 1%;
  animation-delay: 0ms, 0ms;
}
.snowflake:nth-of-type(1) {
  left: 10%;
  animation-delay: 1000ms, 1000ms;
}
.snowflake:nth-of-type(2) {
  left: 20%;
  animation-delay: 6000ms, 500ms;
}
.snowflake:nth-of-type(3) {
  left: 30%;
  animation-delay: 4000ms, 2000ms;
}
.snowflake:nth-of-type(4) {
  left: 40%;
  animation-delay: 2000ms, 2000ms;
}
.snowflake:nth-of-type(5) {
  left: 50%;
  animation-delay: 8000ms, 3000ms;
}
.snowflake:nth-of-type(6) {
  left: 60%;
  animation-delay: 6000ms, 2000ms;
}
.snowflake:nth-of-type(7) {
  left: 70%;
  animation-delay: 2500ms, 1000ms;
}
.snowflake:nth-of-type(8) {
  left: 80%;
  animation-delay: 1000ms, 0ms;
}
.snowflake:nth-of-type(9) {
  left: 90%;
  animation-delay: 3000ms, 1500ms;
}

</style>
