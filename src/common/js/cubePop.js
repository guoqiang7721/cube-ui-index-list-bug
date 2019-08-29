// def toast
export const popToast = function(obj) {
  obj._this
    .$createToast({
      txt: obj.txt,
      time: obj.time || 1000,
      mask: obj.mask || false,
      type: 'txt',
      onTimeout: () => {}
    })
    .show()
}
// 默认一个按钮
export const popDiaglogAlert = function(obj) {
  obj._this
    .$createDialog({
      type: 'alert',
      title: obj.title,
      content: obj.content,
      icon: obj.icon || 'cubeic-alert',
      showClose: true,
      maskClosable: obj.maskClosable || false,
      confirmBtn: {
        text: obj.confirmBtnText || '确定'
      },
      params: obj.params,
      onConfirm: () => {
        obj._this.popDiaglogAlertConfirm(obj.i, obj.params)
      }
    })
    .show()
}
// 附带取消按钮
export const popDialogBtn = function(obj) {
  obj._this
    .$createDialog({
      type: 'confirm',
      icon: obj.icon || 'cubeic-alert',
      showClose: true,
      title: obj.title,
      content: obj.content,
      maskClosable: obj.maskClosable || false,
      confirmBtn: {
        text: obj.confirmBtnText || '确定',
        active: true,
        disabled: false,
        href: 'javascript:;'
      },
      cancelBtn: {
        text: obj.cancelBtnText || '取消',
        active: false,
        disabled: false,
        href: 'javascript:;'
      },
      onConfirm: () => {
        obj._this.popDialogBtnConfirm(obj.i)
      },
      onCancel: () => {
        obj._this.popDialogBtnCancel(obj.i)
      }
    })
    .show()
}
