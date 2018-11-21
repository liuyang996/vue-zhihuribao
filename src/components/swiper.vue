<template>
    <div class="swiper">
        <swiper :options="swiperOption" ref="mySwiper" v-if="swiperData.length > 0"> 
            <!-- slides -->
            <swiper-slide class="slide" v-for="(item,index) in swiperData" :key="index">
                <img class="img" :src="image403(item.image)" alt="">
                <div class="mask"></div>
                <span class="title">{{item.title}}</span>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import image403 from '@/utils/image403'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
 props:{
     swiperData:Array
 },
  data() {
      let vm = this
      return {
          swiperOption:{
        　  loop:true,
            autoplay: 3000,
            // delay:3000,
            disableOnInteraction: false,
            autoplayDisableOnInteraction:false,
            // pagination: {
            //     el: '.swiper-pagination'
            // },
            pagination:'.swiper-pagination',
            observer:true,//修改swiper自己或子元素时，自动初始化swiper 
            observeParents:true,//修改swiper的父元素时，自动初始化swiper 
            onClick: function(swiper){
                // console.log('你点了Swiper');
                // console.log(swiper.realIndex);
                vm.$emit('click-to',vm.swiperData[swiper.realIndex].id);
                // vm.$router.push({
                //     path:`/newsDetail/${vm.swiperData[swiper.realIndex].id}` 
                // })
            }
          }
      }
  },
  methods:{
      image403
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
.swiper-pagination-bullet {
    height: 16px;
    width: 16px;
    background: #88878d;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background: #fffffd;
      opacity: 1;
    }
  }

 .swiper-container{
     height: 100%;
 }
    .swiper{
        width: 100%;
        height: 470px;
        .slide{
            width: 100%;
            height: 100%;
             .mask {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
                z-index: 0;
                }
            .img{
                width: 100%;
                height: auto;
                position: absolute;
                left: 0;
                top: 0;
            }
            .title {
                font-size: 46px;
                line-height: 54px;
                position: absolute;
                left: 0;
                bottom: 55px;
                padding: 0 34px;
                color: #fffffc;
                }
        }
    }
</style>


    