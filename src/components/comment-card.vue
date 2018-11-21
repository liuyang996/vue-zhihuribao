<template>
    <div class="card" >
        <div class="avatar">
            <img :src="image403(comment.avatar)" alt="">
        </div>
        <div class="main">
            <h2 class="author">{{comment.author}}</h2>
            <div class="text">{{comment.content}}</div>
            <div class="reply_to" v-if="comment.reply_to">
                <span class="reply-author">//{{comment.reply_to.author}}:</span>
                <span class="reply-txt">{{comment.reply_to.content}}</span>
            </div>
            <div class="time">{{dateFormat(comment.time)}}</div>
        </div>
        <div class="likes">
            <img src="../assets/images/thumb_up_gray.png" alt="">
            <span>{{comment.likes}}</span>
        </div>
    </div>
</template>

<script>
import image403 from '@/utils/image403'
import moment from 'moment'
export default {
    props:{
        comment:Object
    },
    methods: {
        image403,
        dateFormat (dateString) {
            return moment(dateString).format('MM-DD HH:mm')
        },
    }
}
</script>

<style lang="scss">
    .card{
        padding: 30px 60px 30px 30px;
        display: flex;
        font-size: 40px;
        line-height: 55px;
        position: relative;
        .avatar {
            width: 74px;
            margin-right: 10px;
        img {
            width: 74px;
            height: 74rpx;
            border-radius: 50%;
        }
      }
      .main{
          flex: 1;
          width: 1px; // 
          .author{
            font-weight: bold;
             margin-bottom: 20px;
             font-size: 40px;
          }
          .reply_to{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            .reply-author{
                  font-weight: bold;
              }
            .reply-txt{
              
            }
          }
          .time {
            font-size: 30px;
            color: #afafaf;
            margin-top: 40px;
            }
      }
      .likes{
            position: absolute;
            right: 30px;
            top: 34px;
            font-size: 30px;
            line-height: 30px;
            color: #b8b8b8;
            img {
            width: 30px;
            height: 30px;
            }
      }
    }
</style>
