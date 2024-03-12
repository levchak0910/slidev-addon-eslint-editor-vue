<!-- SomeComponent.vue -->

<template>
  <div class="some-component--containe">
    <div
      v-for="group in groups"
      :key="group.id"
      class="some-component--grou"
      :disabled="disabled"
      :class="{
        actve: group.id === id,
        interative,
      }"
    >
      <span class="some-component--group-title bold forbidden">
        {{ group.titleBold }}
      </span>
      <span class="some-compnent--group-title itali">
        {{ group.titleItalic }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.some-component--container {
  top: 0;
  display: flex;
  position: relative;

  @media screen and (max -width: 700px) {
    /* ... */
  }

  div {
    span {
      /* ... */
    }
    span > b {
      /* ... */
    }
    & > p {
      /* ... */
    }
  }
  &--group-title {
    /* ... */
  }
}

.some-component--group {
  &[disabled] {
    /* ... */
  }
  &.active {
    /* ... */
  }
  &.interactive {
    /* ... */
  }
}

.some-component--group-title {
  &.bold {
    /* ... */
  }
  &.italic {
    /* ... */
  }
}
</style>
