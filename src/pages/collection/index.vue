<template>
    <div class="collection">
         <header class="header">
            <div class="left">
                <img @click="SidebarStatus" class="menu" src="../../assets/images/menu.png" alt="">
                <span class="tit">{{starData.length}}条收藏</span>
            </div>
        </header>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <news-item @click-to="newsDetail(item)" class="item" v-for="(item,index) in starData" :key="index" :story="item"></news-item>
            </div>
        </div>

        <transition name="fade">
            <div class="mask" v-show="SidebarShow" @click="SidebarStatus">
                <transition name="slide">
                    <sidebar-menu @gethome="menuHome" @Collection="Collection" v-show="SidebarShow" class="sidebar-menu"></sidebar-menu>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState,mapActions } from 'vuex'
export default {
    data () {
        return {
        }
    },
    computed:{
        ...mapState(['starData','SidebarShow'])
    },
    components:{
        NewsItem: () => import('@/components/newsItem'),
        sidebarMenu: () => import('@/components/sidebarMenu')
    },
    methods :{
        ...mapActions(['menutoggle']),
      // 侧边栏点击监听
        menuHome () {
            // this.SidebarShow = false;
            this.menutoggle();
            this.$router.push({
                path:`/`
            })
        },
      // 侧边栏菜单
        SidebarStatus () {
            this.menutoggle();
        },
      // 跳转详情页
        newsDetail(item) {
           let StarStatus = false;
        //    console.log(this.starData);
           this.starData.forEach(element => {
                if(element.id == item.id){
                    StarStatus = true;
                }
           });
            this.$router.push({
                path:`/newsDetail/${item.id}/${StarStatus}`
            })
        },
        //我的收藏
        Collection () {
            this.menutoggle();
            this.$router.push({
                path:'/collection'
            })
        }
        
    },
    created() {
        this.$nextTick(() =>{
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true
            });
        })
    },
    
}
</script>

<style lang="scss">
.collection{
    height: 100%;
    background: #f3f3f3;
    overflow: scroll;
        .header{
        height: 112px;
        width: 100%;
        background: #00a2ed;
        display: flex;
        align-items:center;
        justify-content:space-between;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 3;
        img {
            width: 40px;
            height: 40px;
        }
        .left{
            display: flex;
            align-items:center;
            .menu{
                margin: 0 70px 0 40px;
            }
            .tit{
                font-size: 40px;
                color: #fff;
            }
        }
    }
    .wrapper{
        height: 100%;
        .content{
            padding-top: 122px;
            .item{
                margin:  0 auto 17px;
            }
        }
    }
    .mask{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9;
        .sidebar-menu{
            position: absolute;
            left: 0;
            top: 0;
            z-index: 10;
        }
        
    }
.slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(-100%);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to {
    background: rgba(0, 0, 0, 0);
  }
}
</style>
