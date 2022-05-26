<template>

<div>
    <div>
        Количество лайков {{ likes }}
    </div>
    Привет мир
    <button @click="likes += 1">
        +1
    </button>
    
</div>

</template>

<script>

export default {
    data() {
        return {
            likes: 0,
        }
    }
}


</script>



<style>

</style>

