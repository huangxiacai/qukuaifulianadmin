<template>
    <div>
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>
            <FormItem label="用户手机号" class="qdd_layout100" prop="phone">
                <Input v-model="getData.phone" :maxlength="11" placeholder="请输入用户手机号"
                       class="setfill"></Input>
            </FormItem>
            <FormItem label="排序字段" class="qdd_layout100" prop="sort">
                <InputNumber v-model="getData.sort" placeholder="请输入排序字段"
                       class="setfill"></InputNumber>
            </FormItem>
            <FormItem label="是否上架" class="qdd_layout100" prop="status">
                <Select v-model="getData.status"  :transfer="true">
                    <Option v-for="item in getStatus"
                            :value="item.value"
                            :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="是否跳转" class="qdd_layout100" prop="type">
                <Select v-model="getData.type" :transfer="true">
                    <Option v-for="item in getType"
                            :value="item.value"
                            :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem v-if="getData.type==0" label="跳转链接" class="qdd_layout100" prop="desc">
                <Input v-model="getData.desc" placeholder="请填写跳转链接"
                       class="setfill" ></Input>
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
        getStatus:[
          {
            value:0,
            label:'上架',
          },
          {
            value:1,
            label:'下架',
          }
        ],
        getType:[
          {
            value:0,
            label:'跳转',
          },
          {
            value:1,
            label:'不跳转',
          }
        ],
        currPoint: {}, // 当前point
        modal_loading: false,
        dbmap: null, // 地图对象
        mapModel: false,
        meetingTime: null,
        getData: {
          shopImage:null,
          sort:null,
          status:null,
          type:null,
          desc:null
        },
        getRult: {
          shopImage: [
            { required: true, message: '请上传轮播图', trigger: 'blur' }
          ],
          sort: [
            { required: true,type:'number', message: '请填写排序字段', trigger: 'blur' }
          ],
          status: [
            { required: true,type:'number', message: '请选择是否上架', trigger: 'change' }
          ],
          type: [
            { required: true,type:'number', message: '请选择是否跳转', trigger: 'change' }
          ],
          desc: [
            { required: true,message: '请填写跳转链接', trigger: 'blur' }
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
        height: 380px;
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
