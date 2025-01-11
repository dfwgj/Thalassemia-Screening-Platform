<template>
    <div class="flex h-screen bg-[#006263]">
        <!-- 侧边栏 -->
        <div class="w-[15VW] bg-custom-teal text-white flex flex-col items-center p-4 space-y-6">
            <!-- 导航链接 -->
            <var-space>
                <var-avatar src="https://varletjs.org/cat.jpg" />
            </var-space>
            <div class="text-2xl font-bold">您好，吴先生</div>
            <var-button block color="#FFFFFF" @click="goHome">主页</var-button>
            <var-button block color="#FFFFFF" @click="goMyInfro">我的</var-button>
            <var-button block color="#FFFFFF">关于</var-button>
            <var-button block color="#FFFFFF" @click="goHistory">历史记录</var-button>
        </div>

        <!-- 主内容区域 -->
        <div class="flex-1  bg-gray-100">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    methods: {
        // 跳转到主页
        goHome() {
            this.$router.push('/user/home');
        },
        // 跳转到我的信息页面
        goMyInfro() {
            this.$router.push('/user/myInfo');
        },
        goHistory() {
            this.$router.push('/user/historyPages');
        }
    }
};
</script>

<style></style>
