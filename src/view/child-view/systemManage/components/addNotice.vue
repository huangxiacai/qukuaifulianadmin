<template>
    <div>
        <div>
            <div>公告标题</div>
            <div>
                <Input v-model="getData.phone" placeholder="公告标题"
                       class="setfill"></Input>
            </div>
        </div>
        <div>
            <div>公告内容</div>
            <editor ref="editor"
                    :value="getData.noticeContent"
                    @on-change="handleChange"/>
        </div>
    </div>

</template>

<script>
  import { renderFormMixins } from '../../mixins/rendFormMixins'
  import Editor from '_c/editor'
  export default {
    name: 'addNotice',
    mixins: [renderFormMixins],
    data () {
      return {
        currPoint: {}, // 当前point
        modal_loading: false,
        dbmap: null, // 地图对象
        mapModel: false,
        meetingTime: null,
        getData: {
          noticeContent: null,
          noticeTitle: null,
        },
        getRult: {
          noticeTitle: [
            { required: true, message: '请填写公告标题', trigger: 'change' }
          ],
          noticeContent: [
            { required: true,message: '请填写用户公告内容',  trigger: 'change' }
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
    components: {
      Editor
    },
    computed: {},
    methods: {
      handleChange (html, text) {
        console.log(html, text)
      },
      changeContent () {
        this.$refs.editor.setHtml('<p>powered by wangeditor</p>')
      },
      visibleChange (b) {
        if (!b) {
          this.currPoint = {}
          this.dbmap.clearOverlays()
        } else {

        }
      },
      cancel () {
        this.currPoint = {}
        this.dbmap.clearOverlays()
        this.mapModel = false
      }

    },
    mounted () {

    },
    created () {

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
