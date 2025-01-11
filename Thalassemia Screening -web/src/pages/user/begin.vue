<template>
    <!-- 根元素添加 overflow-hidden 防止页面滚动 -->
    <div class="min-h-screen overflow-hidden bg-gray-50 p-6 flex justify-end">
        <!-- 四个框部分：宽度、布局、间距、边距、移动-->
        <div class="w-4/5 grid grid-rows-2 grid-cols-2 gap-8 mt-20 transform translate-y-[-7%]">
            <!-- 上传图片 -->
            <div :style="boxStyles.uploadBox"
                class="w-[90%] h-[90%] m-0 rounded-xl shadow-md flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 hover:shadow-lg transition-shadow">
                <!-- 上传按钮 -->
                <var-button type="info" color="#6BFFE7">上传图片</var-button>
                <!-- 文件格式说明 -->
                <div class="text-xs text-gray-600 text-center mt-4">
                    文件格式为jpg, png<br />
                    大小不能超过2MB
                </div>
            </div>
            <!-- 血液检测项目 -->
            <div :style="boxStyles.bloodTestBox"
                class="w-[90%] h-[90%] m-0 rounded-xl shadow-md flex flex-col justify-center bg-gradient-to-b from-green-50 to-green-100 hover:shadow-lg transition-shadow">
                <div class="text-left space-y-1 px-9">
                    <p class="text-sm text-black">红细胞(RBC)</p>
                    <p class="text-sm text-black">血红蛋白(Hb)</p>
                    <p class="text-sm text-black">白细胞(WBC)</p>
                    <p class="text-sm text-black">中性粒细胞</p>
                    <p class="text-sm text-black">淋巴细胞</p>
                    <p class="text-sm text-black">单核细胞</p>
                    <p class="text-sm text-black">嗜酸性粒细胞</p>
                    <p class="text-sm text-black">嗜碱性粒细胞</p>
                    <p class="text-sm text-black">血小板(PLT)</p>
                </div>
            </div>
            <!--血液要素报告-->
            <div :style="boxStyles.reportBox"
                class="w-[90%] h-[90%] m-0 rounded-xl shadow-md flex flex-col justify-center bg-gradient-to-b from-green-50 to-green-100 hover:shadow-lg transition-shadow">
                <div class="grid grid-cols-2 gap-6 h-full items-center px-8">
                    <div class="text-left space-y-1">
                        <p class="text-sm text-black">红细胞计数(RBC)</p>
                        <p class="text-sm text-black">血红蛋白(Hb)</p>
                        <p class="text-sm text-black">红细胞比容(HCT)</p>
                        <p class="text-sm text-black">平均红细胞体积(MCV)</p>
                        <p class="text-sm text-black">平均红细胞血红蛋白含量(MCH)</p>
                        <p class="text-sm text-black">平均红细胞血红蛋白浓度(MCHC)</p>
                        <p class="text-sm text-black">白细胞计数(WBC)</p>
                        <p class="text-sm text-black">中性粒细胞计数和百分比</p>
                    </div>
                    <div class="text-left space-y-1">
                        <p class="text-sm text-black">淋巴细胞计数和百分比</p>
                        <p class="text-sm text-black">单核细胞计数和百分比</p>
                        <p class="text-sm text-black">嗜酸性粒细胞计数和百分比</p>
                        <p class="text-sm text-black">嗜碱性粒细胞计数和百分比</p>
                        <p class="text-sm text-black">血小板计数(PLT)</p>
                        <p class="text-sm text-black">平均血小板体积(MPV)</p>
                        <p class="text-sm text-black">血小板分布宽度(PDW)</p>
                        <p class="text-sm text-black">血小板压积(PCT)</p>
                    </div>
                </div>
            </div>
            <!-- 生成报告按钮 -->
            <div :style="boxStyles.generateReportBox"
                class="w-[90%] h-[90%] m-0 rounded-xl shadow-md flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 hover:shadow-lg transition-shadow">
                <var-button type="info" color="#6BFFE7">上传报告</var-button>
            </div>
            <!-- 重新上传按钮 -->
            <div :style="boxStyles.web"
                class="w-[90%] h-[90%] m-0 rounded-xl flex flex-col items-center justify-center ">
                <var-button type="info" color="#46FFE1">重新上传</var-button>
            </div>
            <!--下载报告按钮-->
            <div :style="boxStyles.web"
                class="w-[90%] h-[90%] m-0 rounded-xl flex flex-col items-center justify-center ">
                <var-button type="info" color="#46FFE1">下载报告</var-button>
            </div>

        </div>
    </div>
</template>

<!--定义页面的逻辑和功能-->
<script>
import { ref } from 'vue';
import { Snackbar } from '@varlet/ui';

export default {
    setup() {
        const files = ref([]);
        const report = ref('');

        // 文件大小超过限制时的处理
        const onOversize = () => {
            Snackbar.warning('文件大小不能超过2MB');
        };

        // 生成报告
        const generateReport = () => {
            report.value = '这是生成的报告内容。';
            Snackbar.success('报告已生成！');
        };

        // 重新上传
        const reupload = () => {
            files.value = [];
            report.value = '';
            Snackbar.info('已重置上传和报告');
        };

        // 下载报告
        const downloadReport = () => {
            Snackbar.info('下载报告功能待实现');
        };

        // 左箭头点击事件
        const handleLeftArrow = () => {
            Snackbar.info('点击了左箭头');
        };

        // 右箭头点击事件
        const handleRightArrow = () => {
            Snackbar.info('点击了右箭头');
        };

        // 上传按钮点击事件
        const handleUpload = () => {
            Snackbar.info('上传文件功能待实现');
        };

        // 查看详情按钮点击事件
        const viewDetails = () => {
            Snackbar.info('查看详情功能待实现');
        };

        // 导出报告按钮点击事件
        const exportReport = () => {
            Snackbar.info('导出报告功能待实现');
        };

        // 新增按钮点击事件
        const handleButton1 = () => {
            Snackbar.info('点击了按钮 1');
        };

        const handleButton2 = () => {
            Snackbar.info('点击了按钮 2');
        };

        // 定义每个框的样式
        const boxStyles = ref({
            uploadBox: {},
            bloodTestBox: {},
            reportBox: {},
            generateReportBox: {},
        });

        return {
            files,
            report,
            onOversize,
            generateReport,
            reupload,
            downloadReport,
            handleLeftArrow,
            handleRightArrow,
            handleUpload,
            viewDetails,
            exportReport,
            handleButton1,
            handleButton2,
            boxStyles,
        };
    },
};
</script>