<script setup lang="ts">
const { visitors, isLoading, error, isConnected, reconnect } = useVisitors()
</script>

<template>
  <div>
    <h1>Visitors</h1>
    <p>Visitors: {{ visitors }}</p>
  </div>
</template>
