<template>
    <div class="share-modal" @click.stop>
        <div class="header">分享</div>
        <div class="share-content">
            <div class="item" @click="shareTip" v-for="(item,index) in shareList" :key="index">
                <img class="icon" :src="item.img" alt="">
                <span class="name">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import weibo from '@/assets/images/sina_weibo.png'
import wechat from '@/assets/images/wechat.png'
import friendCircle from '@/assets/images/friend_circle.png'
import yinxiang from '@/assets/images/yinxiang.png'
import youdaoyun from '@/assets/images/youdaoyun.png'
import qq from '@/assets/images/QQ.png'
import morePlat from '@/assets/images/more_plat.png'
export default {
    data() {
        return {
            shareList:[
                {img:weibo,name:'新浪微博'},
                {img:wechat,name:'微信'},
                {img:friendCircle,name:'微信朋友圈'},
                {img:yinxiang,name:'印象笔记'},
                {img:youdaoyun,name:'有道云笔记'},
                {img:qq,name:'QQ'},
                {img:morePlat,name:'更多平台'},
            ]
        }
    },
    methods: {
        shareTip() {
          
            this.$toast({
                 message: '假的！点了没用～～～',
                 duration: 500
            })
        }
    }
}
</script>

<style lang="scss">
.share-modal{
    width: 646px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 10px #000;
    .header{
        height: 128px;
        padding: 0 50px;
        display: flex;
        align-items: center;
        font-size: 40px;
        font-weight: bold;
    }
    .share-content{
        display: flex;
        flex-wrap: wrap;
        .item{
            height: 200px;
            width: 33.3%;
            display: flex;  
            align-items: center;
            flex-direction: column;
            font-size: 26px;
            line-height: 26px;
            color: #606060;
             .icon {
                width: 114px;
                height: 114px;
                margin-bottom: 15px;
            }
        }
    }
}
</style>
