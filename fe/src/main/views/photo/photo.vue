<script>
    export default{
        name:"photo",
        data(){
            return{
                ph: $router.params
            }
        }
    }
</script>
<template>
    <div class="photo">
        {{ph}}
    </div>
</template>
