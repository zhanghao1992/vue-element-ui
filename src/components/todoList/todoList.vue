<template>
  <div class="todoList">
    <div class="head">
      <input type="text" v-model="input" @keyup.enter="add">
      <a href="javascript:void(0);" ref="add" @click="add">确定</a>
    </div>
    <div class="nav">
      <a :class="{active:activeIndex===0}" @click="changActiveIndex(0)" href="javascript:void(0);">全部</a>
      <a :class="{active:activeIndex===1}" @click="changActiveIndex(1)" href="javascript:void(0);">已读</a>
      <a :class="{active:activeIndex===2}" @click="changActiveIndex(2)" href="javascript:void(0);">未读</a>
    </div>
    <ul class="infoList">
      <template v-for="(item,index) in infoList">
        <li v-if="item.state===activeIndex&&activeIndex!==0">
          <span class="content" :class="{havaRead:item.state===1}">{{item.content}}</span>
          <a href="javascript:void (0);" @click="changeState(item)">{{itemText(item)}}</a>
        </li>
        <li v-if="activeIndex===0">
          <span></span>
          <span class="content" :class="{havaRead:item.state===1}">{{item.content}}</span>
          <a href="javascript:void (0);" @click="changeState(item)">{{itemText(item)}}</a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
/*
* activeIndex 0全部  1已读  2未读
* */
export default {
  data () {
    return {
      input: '',
      activeIndex: 0,
      infoList: [
        {
          content: 'jquery',
          state: 2
        },
        {
          content: 'css',
          state: 1
        },
        {
          content: 'html',
          state: 1
        }
      ]
    }
  },
  methods: {
    changActiveIndex (index) {
      this.activeIndex = index
    },
    itemText (item) {
      return item.state === 1 ? '标记为未读' : '标记为已读'
    },
    changeState (item) {
      console.log(item.state)
      const index = this.infoList.findIndex(it => it === item)
      this.infoList[index].state = item.state === 1 ? 2 : 1
    },
    add () {
      if (this.input) {
        this.infoList.push({content: this.input, state: 2})
        this.input = ''
      } else {
        alert('请输入内容！')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
a {
  text-decoration: none;
}
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.todoList {
  width: 500px;
  margin: 100px auto;
  padding: 50px;
  background-color: #E9EEF3;
  .head {
    display: flex;
    height: 24px;
    line-height: 24px;
    input {
      flex: 1;
      border: none;
      border-radius: 4px;
      background-color: #B3C0D1;
      text-indent: 1em;
      outline: none;
    }
    a {
      width: 80px;
      text-align: center;
      background-color: #f60;
      color: #fff;
      border-radius: 4px;
    }
  }
  .nav {
    margin-top: 5px;
    display: flex;
    height: 24px;
    line-height: 24px;
    a {
      width: 60px;
      text-align: center;
      background-color: #ccc;
      border-radius: 12px;
      color: #333333;
      margin-right: 6px;
      &.active {
        background-color: #f60;
        color: #fff;
      }
    }
  }
  .infoList {
    li {
      display: flex;
      .content {
        flex: 1;
      }
    }
    .havaRead {
      text-decoration-line: line-through;
      /*text-decoration-color: deeppink;*/
    }
    a {
      font-size: 10px;
      text-decoration: underline;
      color: cornflowerblue;
    }
  }
}
</style>
