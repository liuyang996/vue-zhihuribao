<template>
    <div class="home">
        <header class="header" ref="header">
            <div class="left">
                <img @click="SidebarStatus" class="menu" src="../../assets/images/menu.png" alt="">
                <span class="tit">{{getHeaderTitle()}}</span>
            </div>
            <div class="right">
                <img class="ball" @click="notComplete02" src="../../assets/images/bell.png" alt="">
                <img class="more" @click="toggleMore" src="../../assets/images/more.png" alt="">
            </div>
        </header>
        <div class="home-wrapper" ref="wrapper">
            <div class="content">
                
            <div class="swiper-wrapper">

                <Swiper :swiperData="swiperData" @click-to="swiperClick"></Swiper>
            </div>
            <div class="today-hot" ref="hotNews">
                <div class="hot-title">
                    <span>今日要闻</span>
                </div>
                <news-item @click-to="newsDetail(item)" class="item" v-for="(item,index) in todayHot" :key="index" :story="item"></news-item>
            </div>
            <div ref="beforeNews" class="beforeNews">
                <div class="news-before" v-for="(item,index) in beforeStories">
                    <div class="news-title">
                        <span>{{dateFormat(item.date)}}</span>
                    </div>
                    <news-item @click-to="newsDetail(ChildItem)" class="item" v-for="(ChildItem,index) in item.stories" :key="index" :story="ChildItem"></news-item>
                </div>
            </div>

            </div>
            <div class="more-mask" v-if="moreIsShow" @click="toggleMore">
                <div class="more-block" @click.stop="notComplete02">
                    <div class="more-item">
                        <span>夜间模式</span>
                    </div>
                    <div class="more-item">
                        <span>设置选项</span>
                    </div>
                </div>
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
import moment from 'moment'
import BScroll from "better-scroll";
import { mapState,mapActions} from 'vuex'
var vm = this;
export default {
    data() {
        return {
            todayHot:[], //今日要闻
            beforeStories:[], //以往要闻
            swiperData:[], //轮播图数据  
            moreIsShow:false,//设置状态
            title:'首页', //头部title
            date:new Date(),
            num:0,
            scrollY:0, //滚动高度
            listHeight:[], //列表高度区间
            isFirstEnter:false, //是否第一次进入
        }
    },
    computed:{
        ...mapState(['todayDate','pastDate','todayDate','starData','SidebarShow']),
    },
    watch: {
    },
    methods: {
        ...mapActions(['setDate','menutoggle']),
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
        // swiper跳转详情页
        swiperClick (id) {
            let StarStatus = false;
            this.starData.forEach(element => {
                if(element.id == id){
                    StarStatus = true;
                }
           });
            this.$router.push({
                path:`/newsDetail/${id}/${StarStatus}`
            })
        },
        // 获取最新消息
       getNewsLatest(){
            this.$axios.get('/api/4/news/latest').then(res => {
                if(res.status == 200){
                // console.log(res.data);
                this.todayHot = res.data.stories;
                this.swiperData = res.data.top_stories;
                this.setDate(res.data.date);
                this.$nextTick(()=> {
                    this._initScroll();
                    this._calculateHeight();
                    // this.getHeaderTitle();
                   
                })
            }else{
                console.log('请求有误');
                console.log('xxxxxxxxxxxx')
            }
            })
			
        },
        // 设置
        toggleMore() {
            this.moreIsShow = !this.moreIsShow;
        },
        notComplete02() {
            this.$toast({
                message: '假的！点了没用～～～',
                duration: 500
            })
        },
        // 侧边栏菜单
        SidebarStatus () {
            this.menutoggle();
        },
        // 侧边栏点击监听
        menuHome () {
            this.menutoggle();
            this.title = '首页';
            this.getNewsLatest();
        },
        // 获取以往数据
        getPastData () {
            let date = '';
            this.date.setDate(this.date.getDate() - 1);  //将日期前推一天
            date =  this.changeDate2String(this.date);
            return this.$axios.get(`/api/4/news/before/${date}`).then(res =>{
                  if(res.status == 200){
                    // console.log(res.data);
                    // push数组
                    let obj = {date:res.data.date,stories:res.data.stories};
                    this.beforeStories.push(obj);
                  }else{
                        console.log('请求有误');
                  }
            })
        },
        // 将Date类型的日期转换成String类型
        changeDate2String (date) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            month = month < 10 ? '0' + month : month; // 格式化月份，小于10前置0
            day = day < 10 ? '0' + day : day; // 格式化日期，小于10前置0;
            let dateStr = year.toString() + month.toString() + day.toString();
            return dateStr;
        },
        dateFormat (dateString) {
            let day = '';
             switch (moment(dateString).format('e')) {
                case '0':
                day = '日'
                break
                case '1':
                day = '一'
                break
                case '2':
                day = '二'
                break
                case '3':
                day = '三'
                break
                case '4':
                day = '四'
                break
                case '5':
                day = '五'
                break
                case '6':
                day = '六'
                break

                default:
                break
            }
            return moment(dateString).format('MM月DD日') + ' 星期' + day;
        },
        //我的收藏
        Collection () {
            this.$router.push({
                path:'/collection'
            })
            this.menutoggle();
        },
        // 初始化scroll滚动和点击事件，
        _initScroll () {
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                probeType:3
            });
            //滚动结束时触发
            this.scroll.on('scrollEnd',(pos) => {
                if(this.scroll.y <= (this.scroll.maxScrollY + 50)){ //上拉加载
                    this.getPastData().then(()=>{ //获取以往数据
                         this.$nextTick(() => {
                            this.scroll.refresh();
                                this._calculateHeight();
                            })
                        });
                }
            })
            //滚动时触发
            this.scroll.on('scroll',(pos)=>{
                //scrollY接收变量
                this.scrollY = Math.abs(Math.round(pos.y));
                this.getHeaderTitle();
            })
           
        },
        
        // 获取今日要闻和往日新闻的高度数组
        _calculateHeight () {
            this.listHeight = []; //清空数组
            //获取顶部高度、今日要闻高度、以往新闻高度。
            let headerHt = this.$refs.header.clientHeight;
            let itemList =  this.$refs.beforeNews.getElementsByClassName('news-before');
            let hotHeight =  this.$refs.hotNews.offsetTop - document.documentElement.scrollTop-headerHt;
            // 默认先添加0和今日要闻的高度。
            let height = 0;
            this.listHeight.push(height);
            this.listHeight.push(hotHeight);
            for(let i = 0;i<itemList.length;i++){
                  let item = itemList[i];
                //   height+=item.offsetTop;
                  height=item.offsetTop-headerHt;
                  this.listHeight.push(height);
            }
            // console.log(this.listHeight);
        },
        // 计算当前滚动距离在高度区间的下标值。
        getHeaderTitle() {
            let num = 0;
            let title = '';
            for(let i = 0;i<this.listHeight.length;i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                if(!height2 || this.scrollY >= height1 && this.scrollY <= height2){
                    num = i;
                    break;
                }
            }
            switch (num){
                case 0 : title='首页'; break;
                case 1 : title='今日要闻'; break;
                default : 
                title = this.dateFormat(this.beforeStories[num-2].date);
            }
            return  title;
            
        }
        
    },
    beforeRouteEnter (to, from, next) {
    //   console.log(from);
        //如果是从新闻详情页跳转过来的，说明是返回
      if(from.name == 'newsDetail'){
          to.meta.isBack = true;
      }  
      next();
    },
    // 路由周期函数
    activated() {
        // console.log(this.isFirstEnter)
        if(!this.$route.meta.isBack || this.isFirstEnter){
            this.getNewsLatest();
        }else{
            this.scroll.scrollTo(0,-(this.scrollY));
        }
        this.$route.meta.isBack = false;
        this.isFirstEnter = false;
        
    },
    created() {
        this.isFirstEnter = true; 
    },
    mounted() {
        
    },
    components:{
        Swiper: () => import('@/components/swiper'),  //懒加载
        NewsItem: () => import('@/components/newsItem'),
        sidebarMenu: () => import('@/components/sidebarMenu')
    }
}
</script>

<style lang="scss">
.home{
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
        .right{
            display: flex;
            align-items:center;
            .more{
                 margin: 0 40px 0 70px;
            }
        }
    }
    .home-wrapper{
        height: 100%;
        .content{
            padding-top: 112px;
        }
        .swiper-wrapper{
            height: 470px;
        }
        .today-hot,.news-before{
            .hot-title,.news-title{
                height: 108px;
                display: flex;
                align-items: center;
                padding: 0 30px;
                font-size: 27px;
                font-weight: normal;
                color: #4d4d4d;
            }
            .item{
                margin:  0 auto 17px;
            }
        }
        .beforeNews {
            // position: relative;
        }
        .more-mask{
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
            .more-block{
                width: 408px;
                background: #fff;
                border-radius: 10px;
                position: absolute;
                top: 5px;
                right: 8px;
                font-size: 34px;
                box-shadow: 0 1px 10px #000;
                z-index: 11;
                .more-item{
                    height: 100px;
                    padding: 0 32px;
                    display: flex;
                    align-items: center;
                }
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
