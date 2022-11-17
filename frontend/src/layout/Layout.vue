<script setup>
import {RouterView} from "vue-router";
import Header from '@/components/Header.vue'
import Asider from '@/components/Asider.vue'
</script>


<template>
    <div>
        <Header />
    </div>
    <div style="display: flex">
        <Asider/>
        <RouterView/>
    </div>
</template>

<style scoped>

</style>