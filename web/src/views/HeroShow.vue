<template>
  <div>
    <img class="w-100" :src="`${this.model.image}`" alt="">
  </div>
</template>

<script>
export default {
  props:{
    id:{required:true}
  },
  data() {
    return {
      model:null
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`/heroes/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
}
</script>