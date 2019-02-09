<template>
  <div>
    <Form :ref="refName"
          :model="formModel"
          :rules="formRules" label-position="top" inline>
      <FormItem label="小区名称" prop="name" class="layout_50">
        <div>{{formModel.name}}</div>
      </FormItem>
      <FormItem label="小区地址" prop="addr" class="layout_50">
        <div>{{formModel.addr}}</div>
      </FormItem>
      <FormItem label="上传合同" prop="file_id" class="layout_50">
        <Upload v-model="formModel.file_id" action="//jsonplaceholder.typicode.com/posts/">
          <Button icon="ios-cloud-upload-outline">上传合同</Button>
        </Upload>
      </FormItem>
      <FormItem label="合同开始时间" prop="startday" class="layout_50">
        <DatePicker
          v-model="formModel.startday"
          type="date"
                    placeholder="请选择合同开始时间"
                    style="width: 100%"
                    ></DatePicker>
      </FormItem>
      <FormItem label="合同到期时间" prop="endday" class="layout_50">
        <DatePicker
          v-model="formModel.endday"
          type="date"
                    style="width: 100%"
                    placeholder="请选择合同到期时间"
        ></DatePicker>
      </FormItem>
    </Form>
    <Table :columns="columns" :data="contractListData"></Table>
  </div>
</template>

<script>
    export default {
        name: "contractManage",
        mixins: [],
        data() {
            return {
              refName:'refName',
              columns:[
                {
                  title: '合约',
                  key: 'name'
                },
                {
                  title: '上传时间',
                  key: 'create_timesec'
                },
                {
                  title: '状态',
                  key: 'states'
                },
                {
                  title: '操作',
                  key: 'name'
                },
              ],
              contractListData:[],
              formModel:{
                addr:null,
                endday:null,
                file_id:'',
                uploadContractList:[],
                startday:null,
              },
              formRules:{
                file_id:[
                  { required: true, message: '请选择上传合同', trigger: 'change' }
                ],
                endday:[
                  { required: true, type: 'date', message: '请选择合同结束时间', trigger: 'change' }],
                startday:[
                  { required: true, type: 'date', message: '请选择合同开始时间', trigger: 'change' }
                ]
              }
            }
        },
      props:{
        getModelData:{}
      },
        components: {},
        computed: {},
        methods: {},
        mounted() {
        },
        created() {
          Object.assign(this.formModel,this.getModelData)
        }
    }
</script>

<style scoped>
  .layout_50{
    width:calc(50% - 12px)
  }
  .layout_50{
    margin-bottom:15px;
  }
</style>
