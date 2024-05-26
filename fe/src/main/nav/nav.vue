<script>
export default{
    methods:{
        mainNav(path){
         router.push({path})
        //could use router-link :to
        }
    }
}
</script>

<template>
    <nav>
        <div class="logo">
            Picture App
        </div>

        <ul class="Navigation">
            <li @click="this.mainNav('/main/profile')" class="option">option</li>
        </ul>

    </nav>

</template>

<style lang="scss" scoped>

@import url("./nav.scss");
</style>
