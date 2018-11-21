<template>
    <div class="comment">
        <div class="header">
            <div class="left" @click="back">
                <img class="back" src="../../assets/images/back.png" alt="">
                <span class="title">{{storyExtra.comments}}条点评</span>
            </div>
            <div class="right" @click="tip">
                <img class="write" src="../../assets/images/write.png" alt="">
            </div>
        </div>
        <div class="content">
            <div class="long-comment">
                <div class="top">
                    <span>{{storyExtra.long_comments}}条长评</span>
                </div>
                <comment-card v-for="(item,index) in Longcomments" :key="index" :comment="item" class="comment-card"></comment-card>
            </div>
            <div class="short-comment">
                <div class="top">
                    <span>{{storyExtra.short_comments}}条短评</span>
                </div>
                <comment-card v-for="(item,index) in Shortcomments" :key="index"  :comment="item" class="comment-card"></comment-card>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        comment:Object
    },
    data() {
        return {
            storyExtra:{}, //新闻额外信息
            Longcomments:[],
            Shortcomments:[],
        }
    },
    methods: {
        back() {
            this.$router.back();
        },
         // 获取新闻额外消息，获取到的内容传递给newsHeader这个组件
        getStoryExtra () {
          return  this.$axios.get(`/api/4/story-extra/${this.$route.params.id}`).then(res => {
                 if(res.status == 200){
                    // console.log(res.data);
                    this.storyExtra = res.data;
                }else{
                    console.log('请求有误');
                }
            })
        },
        //获取新闻对应长评论查看
        getnewsCommentLong () {
            this.$axios.get(`/api/4/story/${this.$route.params.id}/long-comments`).then(res =>{
                if(res.status == 200){
                    // console.log(res.data);
                    this.Longcomments = res.data.comments;
                    // console.log(this.Longcomments);
                    
                }else{
                    console.log('请求有误');
                }
            })
        },
        //获取新闻对应短评论查看
        getnewsCommentShort () {
            this.$axios.get(`/api/4/story/${this.$route.params.id}/short-comments`).then(res =>{
                if(res.status == 200){
                    // console.log(res.data);
                    this.Shortcomments = res.data.comments;
                }else{
                    console.log('请求有误');
                }
            })
        },
        tip() {
            this.$toast({
                 message: '假的！点了没用～～～',
                 duration: 500
            })
        },
     
    },
    created() {
        this.getStoryExtra();
        this.getnewsCommentLong();
        this.getnewsCommentShort();
    },
    components: {
        commentCard: () => import('@/components/comment-card')
    }
};
</script>

<style lang="scss">
.comment{
    .header{
        height: 112px;
        width: 100%;
        background: #00a2ed;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 3;
        img {
            width: 50px;
        }
        .left {
            display: flex;
            align-items: center;
            .back {
            margin: 0 70px 0 40px;
            }
            .title{
                color: #fff;
                font-size: 40px;
            }
        }
        .write {
            width: 60px;
            margin-right: 50px;
        }
    }
    .content{
        padding-top: 112px;
        .long-comment, .short-comment {
            .top {
            height: 100px;
            font-size: 30px;
            line-height: 30px;
            padding-left: 30px;
            display: flex;
            align-items: center;
            border-top: 2px solid #dcdcdc;
            }
            .comment-card {
            border-top: 2px solid #dcdcdc;
            }
        }
    }
}
</style>
