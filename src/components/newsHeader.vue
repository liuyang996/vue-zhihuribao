<template>
    <header class="news-header">
        <div class="left" @click="back">
            <img class="back" src="../assets/images/back.png" alt="">
        </div>
        <div class="right">
            <img class="item" @click="$emit('click-share')"  src="../assets/images/share.png" alt="">
            <img class="item" v-if="starShow == 'false'" @click="star(true)"  src="../assets/images/star.png" alt="">
            <img class="item" v-else @click="star(false)"  src="../assets/images/star_on.png" alt="">
            <div class="item comment" @click="$emit('click-comment')">
                <img src="../assets/images/comment.png" alt="">
                <span class="num">{{storyExtra.comments}}</span>
            </div>
              <div class="item thumb" @click="$emit('click-thumb')">
                <img src="../assets/images/thumb_up.png" alt="">
                <span class="num">{{storyExtra.popularity}}</span>
            </div>
        </div>
    </header>

</template>

<script>
export default {
    props:{
        storyExtra:Object,
        starShow:String
    },
    data () {
        return {
        }
    },
    methods: {
        back() {
            this.$router.back();
        },
        star (status) {
            this.$emit('click-star',status)
        }
    }
};
</script>

<style lang="scss">
.news-header {
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
    img{
        width: 50px;
    }
  .left {
    display: flex;
    align-items: center;
    .back {
      margin: 0 70px 0 40px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .item{
        margin-right: 50px;
         &:last-child {
        // margin-right: 0;
      }
      .num{
          font-size: 30px; /*px*/
          color: #FFF;
          width: 9px;
          display: inline-block;
      }
    }
    .comment,.thumb{
        display: flex;
        align-items: center;
        span{
            margin-left: 10px;
        }
    }
  }
}
</style>
