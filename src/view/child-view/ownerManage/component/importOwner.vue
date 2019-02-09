<!--批量导入业主-->
<template>
  <Form :ref="refName" :model="formModel" :rules="formRules" inline>
    <div class="formTitle">请按照业主信息导入模板对业主信息进行导入!</div>
    <FormItem label="导入文件" prop="fileObj" class="layout100">
      <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">选择文件</Button>
      </Upload>
      <div><a href="/images/myw3schoolimage.jpg" download="w3logo">下载批量文件导入模板</a></div>
      <FormItem label="导入结果" prop="fileObj" class="layout100">
        <div>123132</div>
      </FormItem>
    </FormItem>
  </Form>
</template>

<script>
  import {renderFormMixins} from '../../mixins/rendFormMixins'
    export default {
        name: "importOwner",
      mixins: [renderFormMixins],
        data() {
            return {
              formModel:{
                fileObj:null,
              },
              formRules:{

              }
            }
        },
        components: {},
        computed: {},
        methods: {},
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped>
    .formTitle{
      text-align: center;
      margin-top:15px;
    }
</style>
