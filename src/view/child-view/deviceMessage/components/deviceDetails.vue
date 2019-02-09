<!--设备详情-->
<template>
  <Modal
    v-model="showModalStatus"
    :width="width"
    :mask-closable="maskCloseable"
    @on-visible-change="visibleChage">
    <Tabs :value="tabsValue">
      <TabPane :label="tabPaneLabel" :name="tabPaneName1">
        <!--设备详细情况-->
        <baseDetails ref="baseDetails"></baseDetails>
      </TabPane>
      <TabPane :label="tabPaneLabe2" :name="tabPaneName2">
        <!--设备操作日志-->
        <detailsLog ref="detailsLog"></detailsLog>
      </TabPane>
    </Tabs>
    <!--重写右上角关闭按钮-->
    <Icon slot="close" type="ios-close" @click="cancel" />
    <div slot="footer">
      <Button @click="cancel">取消</Button>
    </div>
  </Modal>
</template>

<script>
  import {modalTemplateMixins} from "../../mixins/modalTemplateMixins";
  import baseDetails from './detalisTabs/baseDetails'
  import detailsLog from './detalisTabs/detailsLog'
  export default {
        name: "deviceDetails",
        mixins: [modalTemplateMixins],
        data() {
            return {
              tabsValue:this.tabPaneName1,
              tabPaneName1:'tabPaneName1',
              tabPaneName2:'tabPaneName2',
              tabPaneLabel:'设备详情',
              tabPaneLabe2:'操作日志',
            }
        },
      props:{
          width:{
            type:Number,
            default:800
          },
        maskCloseable:{
            type:Boolean,
          default:false
        }
      },
        components: {
          baseDetails,
          detailsLog
        },
        computed: {},
        methods: {
          init(row){

          },
          visibleChage(b){
            if(b){

            }else{

            }
          },
          //取消操作
          cancel(){
            this.showModal(false);
          }
        },
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped>
  .ggsmd2{
    position: absolute;
    top:0;
    right:0
  }
  ggsmd{
    width:30px;
    height: 30px;
  }
</style>
