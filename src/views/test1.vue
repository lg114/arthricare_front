<template>
  <div>
    <div class="biggestBox">
      <ul>




        <!-- data-type=0 隐藏删除按钮 data-type=1 显示删除按钮 -->
        <li style="background-color:black" class="li_vessel" v-for="(item,index) in lists " data-type="0" :key="index" >
          <!-- "touchstart" 当手指触摸屏幕时候触发  "touchend"  当手指从屏幕上离开的时候触发  "capture" 用于事件捕获-->
<!-- 


            MedObject -->
            <div class="contant" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="oneself">
              <img class="image" :src="item.imgUrl" alt />
              <div class="rightBox">
                <div>{{item.title}}</div>
                <div>{{item.subheading}}</div>
                <div>{{item.faddish}}</div>
                <div>{{item.price}}</div>
              </div>
            </div>
          


          <div class="removeBtn" @click="remove" :data-index="index">删除</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TheIndex",
    data() {
      return {
        lists: [{
            title: "标题1",
            imgUrl: "https://z3.ax1x.com/2021/05/18/gfwKHg.jpg",
            subheading: "副标题1",
            faddish: "爆款",
            price: "￥12.00",
          },
          {
            title: "标题2",
            imgUrl: "https://z3.ax1x.com/2021/05/18/gfwKHg.jpg",
            subheading: "副标题2",
            faddish: "爆款",
            price: "￥58.00",
          },
          {
            title: "标题3",
            imgUrl: "https://z3.ax1x.com/2021/05/18/gfwKHg.jpg",
            subheading: "副标题3",
            faddish: "爆款",
            price: "￥99.99",
          },
          {
            title: "标题4",
            imgUrl: "https://z3.ax1x.com/2021/05/18/gfwKHg.jpg",
            subheading: "副标题4",
            faddish: "爆款",
            price: "￥88.32",
          },
          {
            title: "标题5",
            imgUrl: "https://z3.ax1x.com/2021/05/18/gfwKHg.jpg",
            subheading: "副标题5",
            faddish: "爆款",
            price: "￥9999.99",
          },
        ],
        startX: 0, //滑动开始
        endX: 0, //滑动结束
      };
    },
    methods: {
      // 向左滑动出现删除按钮时，点击商品信息区域取消删除
      oneself() {
        if (this.checkSlide()) {
          this.restSlide();
        } else {
          // 点击商品信息弹出弹框
          console.log("点击当前商品触发事件...");
        }
      },
      //滑动开始
      touchStart(e) {
        // 记录初始位置
        this.startX = e.touches[0].clientX;
      },
      //滑动结束
      touchEnd(e) {
        // 当前滑动的父级元素
        let parentElement = e.currentTarget.parentElement;
        // 记录结束位置
        this.endX = e.changedTouches[0].clientX;
        // 左滑大于30距离删除出现
        if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
          this.restSlide();
          parentElement.dataset.type = 1;
        }
        // 右滑
        if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
          this.restSlide();
          parentElement.dataset.type = 0;
        }
        this.startX = 0;
        this.endX = 0;
      },
      //判断当前是否有滑块处于滑动状态
      checkSlide() {
        let listItems = document.querySelectorAll(".li_vessel");
        for (let i = 0; i < listItems.length; i++) {
          if (listItems[i].dataset.type == 1) {
            return true;
          }
        }
        return false;
      },
      //复位滑动状态
      restSlide() {
        let listItems = document.querySelectorAll(".li_vessel");
        // 复位
        for (let i = 0; i < listItems.length; i++) {
          listItems[i].dataset.type = 0;
        }
      },
      //删除数据信息
      remove(e) {
        // 当前索引值
        let index = e.currentTarget.dataset.index;
        // 复位
        this.restSlide();
        // 删除数组lists中一个数据
        this.lists.splice(index, 1);
      },
    },
  };
</script>

<style scoped>
  .biggestBox {
    overflow: hidden;
    /*超出部分隐藏*/
  }

  ul {
    /* 消除 ul 默认样式 */
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .li_vessel {
    /* 全部样式 0.2秒 缓动*/
    transition: all 0.2s;
  }

  /* =0隐藏 */
  .li_vessel[data-type="0"] {
    transform: translate3d(0, 0, 0);
  }

  /* =1显示 */
  .li_vessel[data-type="1"] {
    /* -64px 设置的越大可以左滑的距离越远，最好与下面删除按钮的宽度以及定位的距离设置一样的值*/
    transform: translate3d(-64px, 0, 0);
  }

  /* 删除按钮 */
  .li_vessel .removeBtn {
    width: 64px;
    height: 103px;
    background: #ff4949;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 22px;
    position: absolute;
    top: 0px;
    right: -64px;
    line-height: 103px;
    text-align: center;
    border-radius: 2px;
  }

  /* 左边的图片样式 */
  .contant {
    overflow: hidden;
    /*消除图片带来的浮动*/
    padding: 10px;
    background: #ffffff;
  }

  .contant .image {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    float: left;
  }

  /* 右边的文字信息样式 */
  .rightBox {
    overflow: hidden;
    padding-left: 8px;
  }

  .rightBox div:first-child {
    font-weight: bold;
  }

  .rightBox div:nth-child(2) {
    margin-top: 4px;
    font-size: 14px;
  }

  .rightBox div:nth-child(3) {
    width: 36px;
    background: rgb(219, 91, 113);
    color: white;
    font-size: 12px;
    text-align: center;
    padding: 2px 4px 2px 4px;
    margin-left: auto;
  }

  .rightBox div:last-child {
    color: red;
    font-size: 14px;
    font-weight: bold;
  }
</style>
