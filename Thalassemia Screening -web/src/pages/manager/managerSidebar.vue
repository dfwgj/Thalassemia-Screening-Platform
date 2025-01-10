<template>
    <div class="flex h-screen">
        <!-- 侧边栏 -->
        <aside class="w-1/6 bg-custom-teal text-white flex flex-col items-center p-4">
            <!-- 导航链接 -->
            <var-space>
                <var-avatar src="https://varletjs.org/cat.jpg" />
            </var-space>
            <nav class="w-full">
                <ul class="space-y-4">
                    <li>
                        <a href="#" class="block p-2 hover:bg-custom-teal-dark rounded text-center">数据可视化</a>
                    </li>
                    <li>
                        <a href="#" class="block p-2 hover:bg-custom-teal-dark rounded text-center">账号管理</a>
                    </li>
                    <li>
                        <a href="#" class="block p-2 hover:bg-custom-teal-dark rounded text-center">信息修改</a>
                    </li>
                    <li>
                        <a href="#" class="block p-2 hover:bg-custom-teal-dark rounded text-center">数据管理</a>
                    </li>
                    <li>
                        <a href="#" class="block p-2 hover:bg-custom-teal-dark rounded text-center">系统管理</a>
                    </li>
                </ul>
            </nav>
        </aside>

        <!-- 主内容区域 -->
        <main class="flex-1 p-4 bg-gray-100">
            <h1 class="text-2xl font-bold">欢迎来到我的页面</h1>
            <p>这里是页面的主要内容。</p>
        </main>
    </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style>
</style>