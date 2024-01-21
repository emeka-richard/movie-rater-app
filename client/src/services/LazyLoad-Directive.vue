<template>
    <div>

    </div>
</template>

<script setup>
const inserted = element => {
    function loadIMG (){
        const imageEl = Array.from(element.children).find(el => el.nodeName === "IMG")
        if(imageEl){
            imageEl.addEventListener("load", ()=>{
                setTimeout(() => element.classList.add("loaded"), 100);
            });
            imageEl.addEventListener("error", ()=> console.error("error"));
            imageEl.src = imageEl.dataset.url
        }
    }

    function handleIntersect (entries, observer){
        entries.forEach(entry => {
            if(entry.isIntersecting){
                loadIMG();
                observer.unobserver(element)
            }
        })
    }

    function createObserver(){
        const options = {
            root: null,
            threshold: "0"
        }
        const observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(element)
    }

    if(window["IntersectionObserver"]){
        createObserver();
    } else {
        loadIMG();
    }
}

</script>

<style lang="scss" scoped>

</style>