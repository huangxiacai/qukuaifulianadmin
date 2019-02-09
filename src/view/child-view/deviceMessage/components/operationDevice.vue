<!--编辑和修改的操作-->
<template>
  <Modal
    v-model="hasShowModal"
    :width="width"
    :footer-hide="true"
    @on-visible-change="onVisibleChange"
    :title="title">


  </Modal>
</template>

<script>
  import {packageNextModal} from '../../mixins/packageNextModal'
  import handleDevice from './step/handleDevice'
  import relationUser from './step/relationUser'
  import {getPersonTree} from '@/libs/util'

  export default {
    name: 'operationDevice',
    mixins: [packageNextModal],
    data() {
      return {
        tabsLabel1: '新建设备',//tabs 名称
        tabsLabel2: '关联用户',
        setDeviceBaseData: {}
      }
    },
    components: {
      handleDevice,
      relationUser
    },
    props: {
      title: '关联用户',
      width: {
        type: Number,
        default: 900
      },
      deviceBaseData: {
        type: Object
      }

    },
    computed: {
      getAreaListData() {
        return this.$store.state.areaManage.areaListData;
      }
    },
    methods: {

      /**
       * 显示状态发生变化时触发
       */
      onVisibleChange(b) {
        if (b) {

        } else {

        }
      },

    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
