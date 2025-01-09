<template>
    <i class="iconfont" :class="[iconclass, extraclass]" :style="{ fontSize: size + 'px', color:color}"></i>
</template>

<script>
var map = {
    qianbi: 'icon-qianbi',
    yuanpan: 'icon-yuanpan',
    shangchuan: 'icon-shangchuan',
};
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        extraclass: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: "24" // 默认大小为 24px
        },
        color: {
            type: String,
            default: '#000' // 默认颜色为黑色
        }
    },
    computed: {
        iconclass() {
            return map[this.type];
        }
    }
};
</script>

<style scoped>
@import '//at.alicdn.com/t/c/font_4804862_osodv3rz2v.css';
</style>
