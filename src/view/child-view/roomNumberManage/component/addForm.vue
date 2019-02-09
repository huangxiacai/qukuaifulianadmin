<template>
  <div>
    <Form :ref="refName" :model="formModel" :rules="formRules" :label-width="80">
      <FormItem label="所选小区" prop="building_guid">
        <Select :disabled="true" v-model="formModel.building_guid" placeholder="请选择小区" >
          <Option v-for="(item,index) in communityListData"
                  :key="index"
                  :value="item.value"
                  :label="item.label">{{item.label}}</Option>
        </Select>
      </FormItem>
      <FormItem label="房号" prop="room_name">
        <Input v-model="formModel.room_name" placeholder="请填写房号">
        </Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {renderFormMixins} from '../../mixins/rendFormMixins'
  export default {
    name: "delCommunity",
    mixins: [renderFormMixins],
    data() {
      return {
        formModel:{
          building_guid:null,
          room_name:null,
        },
        formRules:{
          room_name:[
            { required: true, message: '房号不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    props:{
      _vm:{},
      currCommunity:{}
    },
    components: {},
    computed: {
      communityListData(){
        return this._vm.$store.state.communtiyListArr
      }
    },
    methods: {

    },
    mounted() {

    },
    created() {
      if(this.currCommunity!=undefined){
        this.$set(this.formModel,"building_guid",this.currCommunity)
      }
    }
  }
</script>

<style scoped>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
