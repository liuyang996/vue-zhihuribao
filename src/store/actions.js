export default {
    //设置当前日期
    setDate ({commit},date){
        commit('SETDATE',date)
    },
    // 收藏文章
    CollectionArticle ({commit},data) {
        commit('COLLECTIONARTICLE',data)
    },
    // 取消收藏
    cancelCollection ({commit},data) {
        commit('CANCELCOLLECTION',data)
        // commit('SETSTARDATA')
    },
    // 侧边菜单显示隐藏状态切换
    menutoggle({commit}){
        commit('MENUTOGGLE');
    }
}