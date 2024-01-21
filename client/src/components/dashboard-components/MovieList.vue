<template>
  <section class="movieList-wrapper">
    <!-- <section class="movieList-section-1"></section> -->
    <section class="movieList-section-1" ref="moviesRef">
      <div
        class="movieItem-container"
        v-for="movie in moviesList"
        :key="movie.id"
      >
        <!-- <img v-if="!isImgUrlLoaded" class="blur-img" /> -->
        <img class="movie-img-tag" :src="movie.imgURL" :alt="movie.title" loading="lazy"/>
        <div class="movie-details">
          <h2>Title: {{ movie.title }}</h2>
          <h2>Year: {{ movie.year }}</h2>
          <p>
            Rated: <span>{{ movie.rated }}</span>
          </p>
          <button class="rating-btn">Rate | Review</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, provide, nextTick } from "vue";
import gotIMG from "@/assets/imgs/got-img.png";
import extIMG from "@/assets/imgs/ext-img.png";
import rmIMG from "@/assets/imgs/rm-img.png";
import lwIMG from "@/assets/imgs/lw-img.png";
import fmIMG from "@/assets/imgs/fm-img.png";
import fmSmall from "@/assets/imgs/fm-small.png";
import lwSmall from "@/assets/imgs/lw-small.png";
import rmSmall from "@/assets/imgs/rm-small.png";
import extSmall from "@/assets/imgs/ext-small.png";
import gotSmall from "@/assets/imgs/got-small.png";

const moviesRef = ref();
const isImgUrlLoaded = ref(false);

const movieArr2 = [
  {
    id: 1,
    title: "Game of Throne",
    year: 2000,
    genre: "Epic",
    rated: "N/A",
    imgURL: gotIMG,
  },
  {
    id: 2,
    title: "Extraction 2",
    year: 2000,
    genre: "N/A",
    rated: "N/A",
    imgURL: extIMG,
  },
  {
    id: 3,
    title: "RM",
    year: 2000,
    genre: "Epic",
    rated: "N/A",
    imgURL: rmIMG,
  },
  {
    id: 4,
    title: "LW",
    year: 2000,
    genre: "Epic",
    rated: "N/A",
    imgURL: lwIMG,
  },
  {
    id: 5,
    title: "FM",
    year: 2000,
    genre: "Epic",
    rated: "N/A",
    imgURL: fmIMG,
  },
];
const movieArr1 = [
  {
    id: 1,
    title: "Game of Throne",
    year: 2000,
    genre: "Epic",
    rated: "N/A",
    imgURL: gotSmall,
  },
  {
    id: 2,
    title: "Extraction 2",
    year: 2000,
    genre: "N/A",
    rated: "N/A",
    imgURL: extSmall,
  },
  {
    id: 3,
    title: "RM",
    year: 2000,
    genre: "Epic",
    rated: "N/A",
    imgURL: rmSmall,
  },
  {
    id: 4,
    title: "LW",
    year: 2000,
    genre: "Epic",
    rated: "N/A",
    imgURL: lwSmall,
  },
  {
    id: 5,
    title: "FM",
    year: 2000,
    genre: "Epic",
    rated: "N/A",
    imgURL: fmSmall,
  },
];

const moviesList = !isImgUrlLoaded.value ? movieArr1 : movieArr2

onMounted(()=>{
  nextTick(()=>{
    window.addEventListener("scroll", onScroll)
    onScroll();
  })
})
onBeforeUnmount(()=>{
  window.removeEventListener("scroll", onScroll)
})

const getMoviesImgUrl = ()=>{
  
}

const onScroll = ()=>{
  const movieSection = moviesRef["value"]
  if(movieSection){
    const marginTopMovie = movieSection.getBoundingClientRect().top;
    const windowInnerHeight = window.innerHeight;
    console.log(marginTopMovie, windowInnerHeight)
    if((marginTopMovie - windowInnerHeight) < -50){
      setTimeout(() => {
        getMoviesImgUrl()
      }, 1200);
    }
  }
}
// provide('movieList', movieArr)
</script>

<style scoped>
.movieList-wrapper {
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
}
.movieList-section-1 {
  width: inherit;
  height: inherit;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.125rem;
  background-color: var(--bg-color-6);
  padding: 0.5rem;
}
.movieItem-container {
  width: 100%;
  height: max-content;
  max-height: 100%;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0rem 0.125rem 0.25rem 0.125rem var(--bg-color-4-4);
}

.rating-btn {
  font-size: clamp(0.75rem, 1vw, 1rem);
  font-size: 300;
  color: var(--bg-color-2);
  background-color: var(--color-3);
  border: none;
  border-radius: .25rem;
  padding: .25rem .5rem;
  margin-top: .125rem;
  cursor: pointer;

  &:hover {
    color: var(--color-3);
    background-color: var(--bg-color-2);
    border: 1px solid var(--color-3);
    transition: all 300ms ease-in-out;
  }
}
.movie-img-tag {
  width: inherit;
  height: 300px;
  border-radius: inherit;
  border-bottom-right-radius: unset;
  border-bottom-left-radius: unset;
  /* transition: all 200ms ease-in-out; */
  animation: opacity 1s linear;

  &:hover {
    opacity: .8;
  }
}
@keyframes opacity {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
.movie-details {
  width: inherit;
  /* height: 100px; */
  max-height: 100%;
  padding: 0.5rem;
  box-shadow: inset 0 -30px 30px -15px var(--word-color-1);
}
.movie-details h2,
p {
  font-size: clamp(1rem, 1vw, 1.5rem);
  font-size: 400;
}
</style>
