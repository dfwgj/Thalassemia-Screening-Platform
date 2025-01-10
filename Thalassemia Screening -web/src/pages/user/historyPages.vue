<template>
    <div class="min-h-screen bg-gray-100 flex">
        <!-- 左侧空出来1/6的侧边栏空隙 -->
        <div class="w-1/6 bg-gray-200"></div>
        <!-- 右侧内容区域 -->
        <div class="w-4/5 p-7">
            <!-- 标题和搜索框 -->
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-semibold">历史记录</h2>
                <div class="relative">
                    <var-input variant="outlined" placeholder="搜索..." v-model="searchValue" class="w-64">
                        <template #prepend-icon>
                            <var-icon name="magnify" />
                        </template>
                    </var-input>
                </div>
            </div>
            <!-- 历史记录表格 -->
            <div class="bg-white p-5 rounded-lg shadow-md max-w-5xl mx-auto h-[600px]">
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th class="px-6 py-1.4 bg-gray-50 text-center text-base font-medium text-gray-500 uppercase tracking-wider">序号</th>
                            <th class="px-6 py-1.4 bg-gray-50 text-center text-base font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                            <th class="px-6 py-1.4 bg-gray-50 text-center text-base font-medium text-gray-500 uppercase tracking-wider">时间</th>
                            <th class="px-6 py-1.4 bg-gray-50 text-center text-base font-medium text-gray-500 uppercase tracking-wider">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="list.length === 0">
                            <td colspan="4" class="px-6 py-1.4 whitespace-nowrap text-center text-base text-gray-500"></td>
                        </tr>
                        <tr v-for="(record, index) in list" :key="index" class="odd:bg-gray-50 even:bg-white">
                            <td class="px-6 py-1.5 whitespace-nowrap text-center text-base text-gray-500">{{ record.id }}</td>
                            <td class="px-6 py-1.5 whitespace-nowrap text-center text-base text-gray-900">{{ record.name }}</td>
                            <td class="px-6 py-1.5 whitespace-nowrap text-center text-base text-gray-500">{{ record.time }}</td>
                            <td class="px-6 py-1.5 whitespace-nowrap text-base text-blue-500 hover:text-blue-800 flex justify-center items-center">
                                <var-space :size="[10, 10]">
                                    <var-button type="primary" @click="viewRecord(record)" class="w-35" style="border-radius: 8px;">查 看</var-button>
                                </var-space>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- 分页组件 -->
                <div class="flex justify-center mt-6">
                    <var-pagination :simple="false" :current="currentPage" :total="totalPages * pageSize" :size-option="[5, 10]" @change="get"/>
                </div>
            </div>
        </div>

        <!-- 居中弹窗 -->
        <var-popup v-model:show="showCenterPopup">
            <div class="popup-example-block">
                <h3 class="text-lg font-semibold mb-4">宁艺卓</h3>
                <p>宁宁</p>
            </div>
        </var-popup>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 模拟数据生成函数
function gen(current, size) {
    return Array.from({ length: size }).map((_, index) => {
        const id = (current - 1) * size + index + 1
        return {
            id: id,
            name: `Name ${id}`,
            time: `2023-10-${String(id).padStart(2, '0')} 10:00`,
        }
    })
}

// 当前页码
const currentPage = ref(1)
// 每页显示的记录数
const pageSize = ref(10)
// 表格数据
const list = ref(gen(currentPage.value, pageSize.value))
// 搜索框的值
const searchValue = ref('')

// 居中弹窗控制
const showCenterPopup = ref(false)
const selectedRecord = ref({ id: '', name: '', time: '' })

// 计算总页数
const totalPages = computed(() => Math.ceil(100 / pageSize.value)) // 假设总记录数为 100

// 获取数据
function get(current, size) {
    currentPage.value = current
    pageSize.value = size
    list.value = gen(current, size)
}

// 查看记录
function viewRecord(record) {
    selectedRecord.value = record // 设置选中的记录
    showCenterPopup.value = true // 显示居中弹窗
}
</script>

<style scoped>
.table-example-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
    padding: 0 16px;
}

.popup-example-block {
    padding: 24px;
    width: 280px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>