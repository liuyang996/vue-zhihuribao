<template>
    <div class="newsDetail">
        <link rel="stylesheet" :href="newsDatailData.css">
        <news-header v-if="newsDatailData.id" :storyExtra="storyExtra"
         @click-share="toggleShareModal" @click-star="starClik"
         @click-comment="comment" @click-thumb="Tipstar"
         :starShow="isStar"></news-header>
        <div class="container">
            <div class="top" v-if="newsDatailData.image">
                <img class="img" :src="image403(newsDatailData.image)" alt="">
                <div class="mask"></div>
                <h1 class="title">{{newsDatailData.title}}</h1>
                <span class="image-source">{{newsDatailData.image_source}}</span>
            </div>
            <div class="my-body" v-html="image403(newsDatailData.body)"></div>
        </div>

        <div class="share-mask" v-show="shareModalIsShow" @click="toggleShareModal">
            <share-modal></share-modal>
        </div>
    </div>
</template>

<script>
import image403 from '@/utils/image403'
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            newsDatailData:{},//新闻详情
            storyExtra:{},//新闻额外信息
            shareModalIsShow:false, //控制分享modal是否显示
            isStar:'', //文章收藏状态
            isFirstEnter:false,
        }
    },
    computed: {
        
    },
    methods:{
        ...mapActions(['CollectionArticle','cancelCollection']),
        image403,
        // 获取新闻详情
        getnewsDatail () {
          return this.$axios.get(`/api/4/news/${this.$route.params.id}`).then(res => {
                if(res.status == 200){
                    // console.log(res.data);
                    this.newsDatailData = res.data;
                }else{
                    console.log('请求有误');
                }
            })
        },
        // 获取新闻额外消息，获取到的内容传递给newsHeader这个组件
        getStoryExtra () {
          return  this.$axios.get(`/api/4/story-extra/${this.newsDatailData.id}`).then(res => {
                 if(res.status == 200){
                    // console.log(res.data);
                    this.storyExtra = res.data;
                }else{
                    console.log('请求有误');
                }
            })
        },
        // 显示或隐藏分享modal
        toggleShareModal() {
            this.shareModalIsShow = !this.shareModalIsShow;
        },
        Tipstar() {
            this.$toast({
                 message: '假的！点了没用～～～',
                 duration: 500
            })
        },
        // 收藏/取消收藏
        starClik (status){
            // console.log(status);
            if(status){  //收藏
                this.CollectionArticle(this.newsDatailData);
                this.$toast({
                    message: '收藏成功~',
                    duration: 500
                })
            }else{ //取消收藏
                this.cancelCollection(this.newsDatailData);
                this.$toast({
                    message: '取消收藏~',
                    duration: 500
                })
            }
            this.isStar = status.toString();


        },
        // 跳转评价页
        comment() {
            this.$router.push({
                path:`/comment/${this.newsDatailData.id}`
            })
        }
        
    },
     beforeRouteEnter (to, from, next) {
        if (from.name === 'home') {
        // 如果是从首页跳转过来的，说明不是返回操作
        to.meta.isBack = false
        } else if (from.name === 'comment') {
        // 如果是从评论页跳转过来的，是返回操作
        to.meta.isBack = true
        }
        next()
    },
    activated () {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.getnewsDatail().then(() => {
            this.getStoryExtra();
        })
        this.$route.meta.isBack = false;
        this.isFirstEnter = false;
    }
  },
   // 此处是在该组件挂载之后执行的内容，但是在<router-view>外使用了<keep-alive>时，从该页返回到HomePage之后，这一页依然是缓存的，不会被清除，所以在HomePage点击另一条新闻进入这一页时，这一页依然会保持和第一次进入的内容一样。
  created () {
    this.isFirstEnter = true
     // 获取文章收藏状态。
    this.isStar = this.$route.params.star;
  },
  components:{
        newsHeader:() => import('@/components/newsHeader'),
        ShareModal:() => import('@/components/ShareModal')
    }
}
</script>

<style lang="scss">
.newsDetail{
    .container{
        padding-top: 112px;
        position: relative;
        .top{
            width: 100%;
            height: 420px;
            position: relative;
            overflow: hidden;
            color: #fff;
            position: absolute;
            .img{
                width: 100%;
                height:auto;
                position: absolute;
                top: 50%;
                left: 0;
                transform:  translateY(-50%);
            }
            .mask{
                width: 100%;
                height: 420px;
                position: absolute;
                background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
            }
            .title{
                position: absolute;
                left: 0;
                bottom: 30px;
                padding:  0 20px;
                line-height: 60px;
                font-size: 48px;
            }
            .image-source{
                position: absolute;
                right: 40px;
                bottom: 15px;
                font-size: 24px;
                opacity: 0.7;
            }
        }
    }
    .share-mask{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 5;
        .share-modal {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>
