class Toast {
    constructor () {
        this.isShow = false
    }

    isShowListenter(val) {}

    setIsShow(val) {
        this.isShow = val
        this.isShowListenter(val)
      }

    changeShowToast(listener) {
        this.isShowListenter = listener
    }
}