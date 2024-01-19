<template>
  <section class="movieList-wrapper">
    <!-- <section class="movieList-section-1"></section> -->
    <section class="movieList-section-1">
      <div
        class="movieItem-container"
        v-for="movie in movieArr"
        :key="movie.id"
      >
        <!-- <div class="movieItem-container-1"> -->
        <img class="movie-img-tag" :src="movie.imgURL" :alt="movie.title" />
        <div class="movie-details">
          <h2>Title: {{ movie.title }}</h2>
          <h2>Year: {{ movie.year }}</h2>
          <p>
            Rated: <span>{{ movie.rated }}</span>
          </p>
          <!-- <div class="rating-button-container"> -->
          <button class="rating-btn">Rate</button>
          <!-- </div> -->
          <!-- </div> -->
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { provide } from "vue";
import gotIMG from "@/assets/imgs/got-img.png";
import extIMG from "@/assets/imgs/ext-img.png";
import rmIMG from "@/assets/imgs/rm-img.png";
import lwIMG from "@/assets/imgs/lw-img.png";
import fmIMG from "@/assets/imgs/fm-img.png";

const movieArr = [
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
  font-size: clamp(0.75rem, 1vw, 1.25rem);
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
