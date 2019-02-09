<template>
  <Form :ref="refName" :model="formModel" :rules="formRules" inline>
    <FormItem label="所属小区" prop="building_guid" class="layout50">
      <Select v-model="formModel.building_guid">
        <Option v-for="(item,index) in communtiyList"
                :key="index"
                :value="item.value"
                :label="item.label">{{item.label}}</Option>
      </Select>
    </FormItem>
    <FormItem label="业主姓名" prop="owner_name" class="layout50">
      <Input v-model="formModel.owner_name" placeholder="请填写业主姓名">
      </Input>
    </FormItem>
    <FormItem label="业主手机号码" prop="owner_mobile" class="layout50">
      <Input v-model="formModel.owner_mobile" placeholder="请填写业主手机号码">
      </Input>
    </FormItem>
    <FormItem label="业主身份证号码" prop="id_number" class="layout50">
      <Input v-model="formModel.id_number" placeholder="请填写业主身份证号码">
      </Input>
    </FormItem>
    <FormItem label="房号" prop="room_number" class="layout50">
      <Input v-model="formModel.room_number" placeholder="请填写房号">
      </Input>
    </FormItem>
  </Form>

</template>

<script>
  import {renderFormMixins} from '../../mixins/rendFormMixins'
    export default {
        name: "addForm",
        mixins: [renderFormMixins],
        data() {
            return {
              formModel:{

              },
              formRules:{
                building_guid:[
                  { required: true, message: '所属小区不能为空', trigger: 'change' }
                ],
                owner_name:[
                  { required: true, message: '业主姓名不能为空', trigger: 'blur' }
                ],
                room_number:[
                  { required: true, message: '房号不能为空', trigger: 'blur' }
                ],
                owner_mobile:[
                  {required: true, message: '业主手机号不能为空', trigger: 'change'},
                  {pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '业主手机号格式不正确', trigger: 'change'}
                ],
                id_number:[
                  {required: true, message: '业主身份证号不能为空', trigger: 'change'},
                  {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '业主身份证号不正确', trigger: 'change'}
                ],
              }
            }
        },
      props:{
          _vm:{},
        getModelData:{},
      },
        components: {

        },
        computed: {
          communtiyList(){
            return this._vm.$store.state.communtiyListArr;
          }
        },
        methods: {},
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped>
  .layout50, .layout100 {
    margin-bottom: 15px;
  }

  .layout50 {
    width: calc(50% - 12px);
  }

  .layout100 {
    width: calc(100% - 12px);
  }

  .formHeight {
    height: 400px;
    overflow-y: auto;
  }
</style>
