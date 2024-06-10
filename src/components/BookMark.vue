<template>
  <div class="bookmark">
    <div class="bookmark-top">My Bookmark</div>
    <div class="bookmark-bottom"></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.bookmark {
  position: absolute;
  width: 100px;
  height: 250px;
  background-color: #ff6347;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.bookmark-top {
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2em;
  font-family: Arial, sans-serif;
  padding: 10px;
}

.bookmark-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background-color: #ff6347;
  clip-path: polygon(50% 0, 0% 100%, 100% 100%);
}

</style>
