<template>
    <div @click="$emit('click')" class="cell">
      <span v-if="value !== ''">{{ value }}</span>
    </div>
</template>

<script>
  export default {
    props: {
      value: String,
    }
  }
</script>

<style scoped>
  .cell {
    width: 125px;
    height: 125px;
    border: 2px solid rgb(75,75,75);
    font-size: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>