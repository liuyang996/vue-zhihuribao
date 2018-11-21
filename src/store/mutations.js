export default{
//设置当前日期
SETDATE (state,data) {
    state.todayDate = data;
},
// 收藏文章
COLLECTIONARTICLE (state,data) {
    state.starData.push(data);
    localStorage.setItem('starData',JSON.stringify(state.starData));
},
// cancelCollection
// 取消收藏
CANCELCOLLECTION (state,data) {
    state.starData.forEach((element,index) => {
            if(element.id == data.id){
                state.starData.splice(index,1);
            }
    });
    localStorage.setItem('starData',JSON.stringify(state.starData));
    
},
// 本地存储收藏文章
SETSTARDATA (state,starData){
    state.starData = starData;
},

// menutoggle

MENUTOGGLE (state){
    state.SidebarShow = !state.SidebarShow;
}

}