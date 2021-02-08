<template>
  <div>
    <h1 class="header">{{ $t("message.homeHeader") }}</h1>

    <h2 class="text">{{ $t("message.homeContent") }}</h2>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>

<style>
.header {
  margin: 120px auto;
  margin-bottom: 310px;
}
.text {
  margin: 200px auto;
  width: 400px;
}

@media only screen and (max-width: 600px) {
  .header {
    margin: 40px auto;
  }

  .text {
    margin: 96px auto;
    letter-spacing: 0.3em;
    line-height: 1.8em;
  }
}
</style>
