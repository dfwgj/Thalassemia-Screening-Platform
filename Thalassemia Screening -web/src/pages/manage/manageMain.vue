<template>
    <div class="flex min-h-screen">
        <!-- 侧边栏留白 -->
        <div class="w-[20vw] bg-[#006263]"></div>

        <!-- 主页内容 -->
        <div class="flex-1 bg-[#f5f7f9] p-8">
            <!-- 左上角标题 -->
            <h1 class="text-2xl font-bold mb-8">主页</h1>

            <!-- 数据模块 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- 访问量 -->
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-lg font-semibold">访问量</h2>
                    <p class="text-3xl font-bold mt-2">1,234</p>
                    <p class="text-sm text-gray-500">总数：12,345</p>
                </div>

                <!-- 新增病例数 -->
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-lg font-semibold">新增病例数</h2>
                    <p class="text-3xl font-bold mt-2">56</p>
                    <p class="text-sm text-gray-500">总数：789</p>
                </div>

                <!-- 新增用户数 -->
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-lg font-semibold">新增用户数</h2>
                    <p class="text-3xl font-bold mt-2">23</p>
                    <p class="text-sm text-gray-500">总数：456</p>
                </div>
            </div>

            <!-- 统计图 -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-lg font-semibold mb-4">数据统计</h2>
                <!-- 图表容器 -->
                <div ref="chart" class="w-full h-64"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'; // 引入 ECharts

export default {
    name: 'HomePage',
    mounted() {
        this.initChart(); // 在组件挂载时初始化图表
    },
    methods: {
        initChart() {
            // 获取图表容器
            const chartDom = this.$refs.chart;
            // 初始化 ECharts 实例
            const myChart = echarts.init(chartDom);

            // 图表配置
            const option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // X 轴数据
                },
                yAxis: {
                    type: 'value', // Y 轴为数值轴
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320], // Y 轴数据
                        type: 'line', // 折线图
                        smooth: true, // 平滑曲线
                    },
                ],
            };

            // 设置图表配置
            myChart.setOption(option);

            // 窗口大小变化时，调整图表大小
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        },
    },
};
</script>

<style scoped>
/* 如果需要自定义样式，可以在这里添加 */
</style>