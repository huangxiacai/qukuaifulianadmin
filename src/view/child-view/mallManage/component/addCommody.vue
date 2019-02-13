<template>
    <div>
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>
            <FormItem label="商品名称" class="qdd_layout50" prop="productName">
                <Input v-model="getData.productName"  placeholder="请输入商品名称"
                       class="setfill"></Input>
            </FormItem>
            <FormItem label="商品分类" class="qdd_layout50" prop="productTypeId">
                <Select v-model="getData.productTypeId" placeholder="请选择商品分类" :transfer="true">
                    <Option v-for="item in productTypeData"
                            :value="item.value"
                            :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="商品的福豆价格" class="qdd_layout50" prop="amount">
                <InputNumber :max="4" :min="0" v-model="getData.amount" class="setfill"></InputNumber>
            </FormItem>
            <FormItem label="购买商品添加的福利值" class="qdd_layout50" prop="addWelfare">
                <InputNumber :max="4" :min="0" v-model="getData.addWelfare" class="setfill"></InputNumber>
            </FormItem>
            <FormItem label="商品LOGO图地址" class="qdd_layout50" prop="logo">
                <Input v-model="getData.logo" placeholder="请填写商品LOGO图地址"
                       class="setfill" ></Input>
            </FormItem>
            <FormItem label="商品图片" class="qdd_layout50" prop="image">
                <Input v-model="getData.image" placeholder="请填写商品图片"
                       class="setfill" ></Input>
            </FormItem>
            <FormItem label="商品运费" class="qdd_layout50" prop="freight">
                <InputNumber :max="4" :min="0" class="setfill"  v-model="getData.freight" placeholder="请填写商品运费"></InputNumber>
            </FormItem>

        </Form>
    </div>

</template>

<script>
  import { renderFormMixins } from '../../mixins/rendFormMixins'
  export default {
    name: 'addCommody',
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
          productName:null,
          productTypeId:null,
          amount:null,
          addWelfare:null,
          productDetail:null,
          logo:null,
          image:null,
          freight:null
        },
        getRult: {
          productName: [
            { required: true, message: '请填写商品名称', trigger: 'blur' }
          ],
          productTypeId: [
            { required: true, message: '商品分类Id', trigger: 'blur' }
          ],
          amount: [
            { required: true,type:'number', message: '请填写商品的福豆价格', trigger: 'change' }
          ],
          addWelfare: [
            { required: true,type:'number', message: '请选择购买商品添加的福利值', trigger: 'change' }
          ],
          productDetail: [
            { required: true,message: '请填写商品详情', trigger: 'blur' }
          ],
          logo:[
            { required: true,message: '请填写商品LOGO图地址', trigger: 'blur' }
          ],
          image:[
            { required: true,message: '请填写商品图片', trigger: 'blur' }
          ],
          freight:[{ required: true,type:'number', message: '请填写商品运费', trigger: 'change' }]
        }
      }
    },
    computed:{
      productTypeData(){
        return this._vm.$store.state.shopManage.productTypeData
      }
    },
    props: {
      _vm:{

      },
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
