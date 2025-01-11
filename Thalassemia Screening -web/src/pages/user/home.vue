<template>
    <!-- 根容器，使用 flex 布局 -->
    <div class="flex bg-gray-100">
        <!-- 主内容区域 -->
        <div class="p-8">
            <!-- 返回按钮 -->
            <div class="fixed left-[18vw]">
                <var-button type="info" round color="#006263" style="width: 30px; height: 30px" @click="handleLeftArrow">
                    <var-icon name="<" />
                    &lt;
                </var-button>
            </div>
            <div class="fixed left-[22vw]">
                <var-button type="info" round color="#006263" style="width: 30px; height: 30px" @click="handleRightArrow">
                    <var-icon name=">" />
                    &#62;
                </var-button>
            </div>
            <div class="w-[81vw] h-[70vh] mt-12 grid grid-cols-2 gap-8">
                <!--第一页：上传图片页-->
                <div class="rounded-xl shadow-md flex flex-col items-center justify-center bg-white h-[35vh]">
                    <!-- 上传按钮 -->
                    <var-button type="info" color="#006263">上传图片</var-button>
                    <!-- 文件格式说明 -->
                    <div class="text-xs text-gray-600 text-center mt-4">
                        文件格式为jpg, png
                        <br />
                        大小不能超过1MB
                    </div>
                </div>
                <!-- 第二页：血液检测页 -->
                <div class="rounded-xl shadow-md flex flex-col justify-center bg-white h-[35vh]">
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
                <!-- 第三页：血液要素报告 -->
                <div class="rounded-xl shadow-md flex flex-col justify-center bg-white h-[35vh]">
                    <div class="grid grid-cols-2 gap-6 items-center px-8">
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

                <!--第四页：生成报告页-->
                <div class="rounded-xl shadow-md flex items-center justify-center bg-white h-[35vh]">
                    <!-- 生成报告按钮 -->
                    <var-button type="info" color="#006263">生成报告</var-button>
                </div>
            </div>
            <!-- 重新上传按钮 -->
            <div class="grid grid-cols-2 gap-6 mt-10 h-[10vh]">
                <div class="w-[40vw] rounded-xl flex items-center justify-center">
                    <var-button type="info" color="#006263">重新上传</var-button>
                </div>
                <!-- 下载报告按钮 -->
                <div class="w-[40vw] rounded-xl flex items-center justify-center">
                    <var-button type="info" color="#006263">下载报告</var-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
/* 自定义颜色 */
</style>
