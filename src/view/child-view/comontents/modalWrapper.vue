<template>
  <Modal
    title="Title"
    v-model="modal7"

    :closable="false">
    <p>Content of dialog</p>
    <p>Content of dialog</p>
    <p>Content of dialog</p>
  </Modal>
</template>

<script>
  export default {
    name: 'modalPackage',
    mixins: [],
    data () {
      return {
        Title:111,
        modal7:false
      }
    },
    components: {},
    computed: {},
    methods: {
      init(b){
        this.modal7=b;
      }
    },
    mounted () {
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
