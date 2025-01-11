<template>
    <div class="flex h-screen bg-[#006263]">
        <!-- 侧边栏 -->
        <div class="w-[15vw] bg-custom-teal text-white flex flex-col items-center p-4 space-y-6">
            <!-- 导航链接 -->
            <var-space>
                <var-avatar src="https://varletjs.org/cat.jpg" />
            </var-space>
            <div class="text-2xl font-bold">您好，吴先生</div>
            <var-button block color="#FFFFFF" @click="goMain">主页</var-button>
            <var-button block color="#FFFFFF" @click="goUser">用户管理</var-button>
            <var-button block color="#FFFFFF">病历管理</var-button>
            <var-button block color="#FFFFFF">数据管理</var-button>
            <var-button block color="#FFFFFF">系统管理</var-button>
        </div>
        <!-- 主内容区域 -->
        <div class="flex-1 p-4 bg-gray-100">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'main',
    methods: {
        goMain() {
            this.$router.push('/manager/panel');
        },
        goUser() {
            this.$router.push('/manager/userManagement');
        }
    }
};
</script>

<style></style>
