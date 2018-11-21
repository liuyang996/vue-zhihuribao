<template>
    <div class="sidebar" @click.stop.prevent>
        <div class="sidebar-header">
            <div class="user" @click="tip">
                <img class="avatar" :src="image403('http://pic1.zhimg.com/da8e974dc_m.jpg')">
                <span class="name">请登录</span>
            </div>
            <div class="cont">
                <div class="item" @click="$emit('Collection')">
                    <img class="img" src="../assets/images/star.png" alt="">
                    <span>我的收藏</span>
                </div>
                <div class="item" @click="tip">
                    <img class="img" src="../assets/images/download.png" alt="">
                    <span>离线下载</span>
                </div>
            </div>
        </div>
        <div class="sidebar-content">
            <div class="cont-home active" @click="$emit('gethome')">
                <img src="../assets/images/homePage.png" alt="">
                <span>首页</span>
            </div>
            <div class="cont-themes" v-for="(theme, index) in themesList" :key="index" >
                <span>{{theme.name}}</span>
                <img v-if="themeIsSubscribed(theme.name)" class="right-arrow" src="../assets/images/left_arrow.png" alt="">
                <img v-else src="../assets/images/plus.png" alt="" >
            </div>
        </div>
    </div>
</template>

<script>
import image403 from '@/utils/image403'
export default {
    data() {
        return {
            themesList:[],
        }
    },
    methods: {
        image403,
        // 获取主题日报列表
        getThemesList () {
            this.$axios.get('/api/4/themes').then(res => {
                 if(res.status == 200){
                    // console.log(res.data);
                    this.themesList = res.data.others
                }else{
                    console.log('请求有误');
                }
            })
        },
         // 计算显示的某一项主题日报是否已经被订阅。包含的话表示已订阅，返回true
        themeIsSubscribed (themeName) {
            return this.themeSubscribed.indexOf(themeName) > -1
        },
        tip() {
            this.$toast({
                message: '假的！点了没用～～～',
                duration: 500
            })
        },
       
    },
    created() {
        this.getThemesList();
    },
}
</script>

<style lang="scss">
.sidebar{
    width: 634px;
    height: 100%;
    font-size: 34px;
    overflow: scroll;
    background: #fff;
    .sidebar-header{
        background: #00a2ed;
        color:#fff;
        width: 634px;
        .user{
             padding-left: 30px;
             height: 110px;
             display: flex;
             align-items: center;
            .avatar{
                width: 70px;
                height: 70px;
                border-radius: 50%;
                margin-right: 26px;
            }
            .name{
                // font-size: 24px;
            }
        }
        .cont{
            height: 110px;
            display: flex;
            padding: 0 60px;
            justify-content: space-between;
            align-items: center;
            .item{
                font-weight: bold;
            }
            img{
                width: 32px;
                height: 32px;
                margin-right: 40px;
            }
        }
    }
    .sidebar-content{
        
        .cont-home{
            height: 103px;
            padding-left: 45px;
            display: flex;
            align-items: center;
            &.active {
                background: #f0f0f0;
            }
            img{
                width: 32px;
                height: 32px;
                margin-right: 33px;
            }
            span{
                color: #00a2ed;
            }
        }
    }
    
}
</style>
