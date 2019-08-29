<template>
  <div class="container">
    <header-com :title="title" @back="back" />
    <div class="listBox">
      <list-base v-if="!vUserInfo.is_cu">
        <div slot="left" class="m_list_left">
          默认图片
        </div>
        <div slot="main" class="m_list_center">
          <span>是否使用默认图片</span>
        </div>
        <div slot="right" class="m_list_right">
          <cube-switch v-model="defSwitch" />
        </div>
      </list-base>
      <list-base>
        <div slot="left" class="m_list_left">
          我的图片
        </div>
      </list-base>
    </div>
    <div class="my_pic">
      <input
        type="file"
        id="change"
        accept="image"
        @change="fileChange($event)"
      />
      <label for="change"></label>
      <img
        class="add"
        src="https://zfile.bxwh002.cn/wmp/images/pic_add.png"
        @click="selectTap"
      />
      <div class="info_pic" v-for="(item, index) in imgList" :key="item.id">
        <div class="picimg">
          <img :src="item.url" @click="handleImgsClick(index)" />
          <div class="delate" v-if="item.isDefault === 0">
            <span @click="_topPhoto(item.id, index)">置顶</span>
            <span @click="_deletePhoto(item.id, index)">删除</span>
          </div>
        </div>
      </div>
      <!-- <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none;"/> -->
    </div>
  </div>
</template>
<script>
import HeaderCom from 'base/header/header'
import routings from 'common/js/mixins/routings'
import vuexData from 'common/js/mixins/vuex_data'
import ListBase from 'base/m_list_base/m_list_base'
import { popToast } from 'common/js/cubePop'
export default {
  mixins: [routings, vuexData],
  data() {
    return {
      title: '图片管理',
      defSwitch: '',
      imgList: [],
      previewList: [],
      size: 0,
      limit: 6, // 限制图片上传的数量
      initialIndex: 0
    }
  },
  created() {
    this._getMyPhoto()
  },
  mounted() {
    // 监听历史记录点, 添加返回事件监听
    window.onpopstate = () => {
      this.$createImagePreview().hide()
    }
  },
  methods: {
    handleImgsClick(index) {
      this.initialIndex = index
      const params = {
        $props: {
          imgs: this.previewList,
          initialIndex: 'initialIndex', // 响应式数据的key名
          loop: true
        },
        $events: {
          change: i => {
            // 必须更新 initialIndex
            this.initialIndex = i
          }
        }
      }
      this.$createImagePreview({ ...params }).show()
    },
    _setUseDefault(val) {
      var _this = this
      const useDefault = val ? 1 : 0
      this.$api.userComp
        .setUseDefault({
          vid: _this.vid,
          token: _this.token,
          useDefault: useDefault
        })
        .then(res => {
          const errCode = res.data.errCode
          if (errCode === 0) {
            const popToastObj = {
              _this: this,
              txt: '保存成功',
              mask: true
            }
            popToast(popToastObj)
            this._getMyPhoto()
          }
        })
    },
    _getMyPhoto() {
      // 获取数据
      var _this = this
      this.$api.userComp
        .getMyPhoto({
          vid: _this.vid,
          token: _this.token
        })
        .then(res => {
          const data = res.data.data
          this.imgList = data.picInfo
          data.picInfo && (this.previewList = data.picInfo.map(i => i.url))
          const defSwitch = data.useDefault
          defSwitch === 1 ? (this.defSwitch = true) : (this.defSwitch = false)
        })
    },
    selectTap() {
      // 添加图片
      const uploadFile = document.getElementById('upload_file')
      uploadFile.click()
    },
    // 图片上传
    fileChange(el) {
      if (!el.target.files[0].size) return
      this.fileList(el.target)
      el.target.value = ''
    },
    fileList(fileList) {
      let files = fileList.files
      for (let i = 0; i < files.length; i++) {
        // 判断是否为文件夹
        if (files[i].type !== '') {
          this.fileAdd(files[i])
        } else {
          // 文件夹处理
          this.folders(fileList.items[i])
        }
      }
    },
    // 文件夹处理
    folders(files) {
      let _this = this
      // 判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry()
      }
      files.createReader().readEntries(function(file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i])
          } else {
            _this.folders(file[i])
          }
        }
      })
    },
    foldersAdd(entry) {
      let _this = this
      entry.file(function(file) {
        _this.fileAdd(file)
      })
    },
    fileAdd(file) {
      var _this = this
      if (this.limit !== undefined) this.limit--
      if (this.limit !== undefined && this.limit < 0) return
      // 总大小
      this.size = this.size + file.size
      // 判断是否为图片文件
      if (file.type.indexOf('image') === -1) {
        const popToastObj = {
          _this: this,
          txt: '请选择图片文件',
          mask: true
        }
        popToast(popToastObj)
      } else {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function() {
          file.src = this.result
          _this._addPhoto(file.src)
        }
      }
    },
    // 添加图片
    _addPhoto(upic) {
      var _this = this
      const toast = this.$createToast({
        txt: '上传中...',
        mask: true
      })
      toast.show()
      this.$api.userComp
        .addPhoto({
          vid: _this.vid,
          token: _this.token,
          upic: upic,
          bid: _this.vUserInfo.bid
        })
        .then(res => {
          const errCode = res.data.errCode
          const data = res.data.data
          const msg = res.data.msg
          if (errCode === 0) {
            // console.warn('_this.imgList', _this.imgList)
            // console.warn('data', data)
            _this.imgList = _this.imgList || []
            _this.imgList.unshift(data)
            toast.hide()
          } else {
            const popToastObj = {
              _this: this,
              txt: msg,
              mask: true
            }
            popToast(popToastObj)
          }
        })
    },
    // 置顶图片
    _topPhoto(i, index) {
      var _this = this
      this.$api.userComp
        .topPhoto({
          vid: _this.vid,
          token: _this.token,
          id: i
        })
        .then(res => {
          const errCode = res.data.errCode
          const msg = res.data.msg
          const popToastObj = {
            _this: this,
            txt: msg,
            mask: true
          }
          popToast(popToastObj)
          if (errCode === 0) {
            let spliceData = this.imgList.splice(index, 1)
            this.imgList.unshift(spliceData[0])
          }
        })
    },
    // 删除图片
    _deletePhoto(i, index) {
      var _this = this
      this.$api.userComp
        .deletePhoto({
          vid: _this.vid,
          token: _this.token,
          id: i
        })
        .then(res => {
          console.warn('res ', res)
          const errCode = res.data.errCode
          const msg = res.data.msg
          const popToastObj = {
            _this: this,
            txt: msg,
            mask: true
          }
          popToast(popToastObj)
          if (errCode === 0) this.imgList.splice(index, 1)
        })
    },
    back() {
      this.goBack()
    }
  },
  watch: {
    defSwitch(val, bef) {
      if (bef !== '') {
        this._setUseDefault(val)
      }
    },
    imgList(val) {
      val && (this.previewList = val.map(i => i.url))
    }
  },
  components: {
    HeaderCom,
    ListBase
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin';

.my_pic {
  background-color: #fff;
  padding: 2% 0;
  font-size: 0;
  position: relative;
  flex_row();
  flex-wrap: wrap;
  justify-content: flex-start;

  #change, label {
    position: absolute;
    width: 110px;
    height: 110px;
    top: 4%;
    left: 3%;
    opacity: 0;
  }

  .add {
    width: 30.33%;
    height: 110px;
    margin: 1% 1.5%;
    border-color: #dedede;
    border-radius: 5px;
    // flex-grow 1
  }

  .info_pic {
    width: 30.33%;
    height: 110px;
    border-radius: 5px;
    margin: 1% 1.5%;
    position: relative;
    color: #fff;
    font-size: 13px;
    overflow: hidden;

    .picimg {
      width: 100%;
      height: 110px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;

      img {
        display: block;
        object-fit: cover;
        width: 100%;
        height: 110px;
      }
    }

    .delate {
      height: 25px;
      line-height: 25px;
      width: 100%;
      position: absolute;
      bottom: 0;
      background: rgba(0, 0, 0, 0.48);
      z-index: 3;

      span {
        height: 18px;
        line-height: 18px;
        text-align: center;
        display: inline-block;
        width: 48%;
        box-sizing: border-box;

        &:first-child {
          border-right: 1px solid #fff;
        }
      }
    }
  }
}

.listBox {
  margin-top: 54px;

  .m_list_outer {
    height: 44px;

    &:last-child {
      margin: 10px 0;
    }

    .m_list_left {
      width: 20%;
      height: 44px;
      line-height: 44px;
      margin: 0 10px 0 12px;
    }

    .m_list_center {
      flex: 1;
      text-align: right;
      margin-right: 10px;

      span {
        color: #999;
        font-size: 13px;
      }
    }

    .m_list_right {
      margin-right: 10px;
    }
  }
}
</style>
