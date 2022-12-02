<template>
  <div class="preloader__container">
    <div class="preloader">
        <svg viewBox="-2000 -1000 4000 2000">
            <path id="inf"
            d="M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z"></path>
            <use xlink:href="#inf" stroke-dasharray="1570 5143"
            stroke-dashoffset="6713px"></use>
        </svg>
    </div>
  </div>
</template>

<script>
export default {

};
</script>
<style>
.preloader__container {
    text-align: center;
  }
.preloader svg {
  max-width: 15em;
  border-radius: 3px;
  background: transparent;
  fill: none;
  stroke: #222;
  stroke-linecap: round;
  stroke-width: 12%
}
.preloader use {
    stroke: #9eff00;
    animation: preloader-a 2s linear infinite
}
@keyframes preloader-a {
    to {
        stroke-dashoffset: 0px;
    }
}
</style>
