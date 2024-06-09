<template>
  <div class="container">
    <template v-for="index in 5" :key="index">
      <svg width=" 24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="star">
        <path d=" M12.8649 2.99628C12.4796 2.33213 11.5204 2.33213 11.1351 2.99628L8.42101 7.67359C8.23064 8.00168
          7.90159 8.22557 7.52653 8.28222L2.44021 9.05044C1.58593 9.17947 1.28627 10.2581 1.95158 10.8093L5.74067
          13.9485C6.09141 14.2391 6.25633 14.6975 6.17113 15.1449L5.17996 20.35C5.02327 21.1729 5.88706 21.8122 6.62821
          21.4219L11.4176 18.9001C11.7821 18.7082 12.2178 18.7082 12.5824 18.9001L17.3718 21.4219C18.1129 21.8122
          18.9767 21.1729 18.82 20.35L17.8289 15.1449C17.7437 14.6975 17.9086 14.2391 18.2593 13.9485L22.0484
          10.8093C22.7137 10.2581 22.4141 9.17947 21.5598 9.05044L16.4735 8.28222C16.0984 8.22557 15.7694 8.00168 15.579
          7.67359L12.8649 2.99628Z" fill="currentColor" />
      </svg>
    </template>
    <div class="overlay" :style="{ width: `${100 - percentage * 100}%` }">
    </div>
    <div class="star_overlay">
      <div v-for="index in 5" @click="editable && setRating(index * 2)"
        @mouseenter="editable && setHoverRating(index * 2)" @mouseleave="editable && resetHoverRating()"></div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';

const emit=defineEmits(['rate'])

const hovered = ref(false);
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const pre_percentage = props.value / 10

const editable = ref(props.editable)
const percentage = ref(pre_percentage)

const setRating = (rating) => {
  console.log(rating)
  emit('rate',rating)
  editable.value = false
}

const setHoverRating = (rating) => {
  percentage.value = rating / 10;
};

const resetHoverRating = () => {
  percentage.value = pre_percentage;
};
</script>

<style scoped>
.container {
  display: inline-flex;
  align-items: center;
  position: relative;
  width: fit-content;
}

.star_overlay {
  display: inline-flex;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;

  * {
    display: inline-block;
    width: 20%;
    height: 100%;
    cursor: pointer;
  }
}

.star {
  color: #ffd700;
  stroke: gray;
  stroke-width: 1px;
  filter: drop-shadow(0 0 3px rgba(255, 223, 0, 0.5));
  transition: all 0.3s ease;
}

.star:hover {
  filter: drop-shadow(0 0 10px rgba(255, 223, 0, 1));
}

.overlay {
  background-color: black;
  opacity: 0.7;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  @supports (mix-blend-mode: color) {
    mix-blend-mode: color;
    opacity: unset;
  }
}
</style>
