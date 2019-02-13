<template>
    <div>
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>
            <FormItem label="分类名称" class="qdd_layout100" prop="typeName">
                <Input v-model="getData.typeName"  placeholder="请输入分类名称"
                       class="setfill"></Input>
            </FormItem>
            <FormItem label="排序字段" class="qdd_layout100" prop="sort">
                <InputNumber v-model="getData.sort" placeholder="请输入排序字段"
                       class="setfill"></InputNumber>
            </FormItem>

        </Form>
    </div>

</template>

<script>
  import { renderFormMixins } from '../../mixins/rendFormMixins'
  export default {
    name: 'addBannerManage',
    mixins: [renderFormMixins],
    data () {
      return {
        getData: {
          typeName:null,
          sort:null
        },
        getRult: {
          typeName: [
            { required: true, message: '请填写分类名称', trigger: 'blur' }
          ],
          sort: [
            { required: true,type:'number', message: '请填写排序字段', trigger: 'blur' }
          ]
        }
      }
    },
    props: {
      setData: {
        type: Object,
        default: null
      }
    },
    components: {},
    computed: {},
    methods: {

    },
    mounted () {

    },
    created () {
        if(this.setData!=undefined){
          Object.assign(this.getData,this.setData)
        }
    }
  }
</script>

<style scoped>
    .setfill {
        width: 100%;
    }

    .show_area {
        height: 300px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .qdd_layout50, .qdd_layout100 {
        margin-bottom: 18px;
    }

    .qdd_layout50 {
        width: calc(50% - 12px)
    }

    .qdd_layout100 {
        width: calc(100% - 12px)
    }
    #bdmap{
        height:450px;
        width:100%;
        margin:-16px;
    }
</style>
