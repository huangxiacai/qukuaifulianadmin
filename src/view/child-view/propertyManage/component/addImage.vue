<template>
  <Form :ref="refName" :model="formModel" :rules="formRules" inline>
      <Row :gutter="16" style="margin-top:10px">
        <Col span="8">
          <FormItem type="flex" justify="center" align="middle">
            <div class="formImg">
              <img :src="faceLeft">
            </div>
            <div>
              <Upload
                multiple
                action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">上传左侧面照</Button>
              </Upload>
            </div>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem type="flex" justify="center" align="middle">
            <div class="formImg">
              <img :src="faceMiddle">
            </div>
            <div>
              <Upload
                multiple
                action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">上传正面照</Button>
              </Upload>
            </div>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem type="flex" justify="center" align="middle">
            <div class="formImg">
              <img :src="faceRight">
            </div>
            <div>
              <Upload
                multiple
                action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">上传右侧面照</Button>
              </Upload>
            </div>
          </FormItem>
        </Col>
      </Row>
  </Form>
</template>

<script>
  import {renderFormMixins} from '../../mixins/rendFormMixins'

  export default {
    name: "addImage",
    mixins: [renderFormMixins],
    data() {
      return {
        faceMiddle:'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
        faceLeft:'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
        faceRight:'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
        formModel:{},
        formRules:{}
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

</style>
