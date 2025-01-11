<template>
    <div class="bg-gray-100 flex-1">
        <!-- 右侧内容区域 -->
        <div class="flex-1 p-4">
            <!-- 标题和搜索框 -->
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-semibold">用户管理</h2>
                <div class="relative">
                    <var-input variant="outlined" placeholder="搜索..." v-model="searchValue" class="w-64">
                        <template #prepend-icon>
                            <var-icon name="magnify" />
                        </template>
                    </var-input>
                </div>
            </div>
            <!-- 历史记录表格 -->
            <div class="bg-white p-4 rounded-lg shadow-md mx-auto">
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
                        <tr v-if="filteredList.length === 0">
                            <td colspan="4" class="px-6 py-1.4 whitespace-nowrap text-center text-base text-gray-500">暂无数据</td>
                        </tr>
                        <tr v-for="(record, index) in filteredList" :key="index" class="odd:bg-gray-50 even:bg-white">
                            <td class="px-6 py-1.5 whitespace-nowrap text-center text-base text-gray-500">{{ record.id }}</td>
                            <td class="px-6 py-1.5 whitespace-nowrap text-center text-base text-gray-900">{{ record.name }}</td>
                            <td class="px-6 py-1.5 whitespace-nowrap text-center text-base text-gray-500">{{ record.time }}</td>
                            <td class="px-6 py-1.5 whitespace-nowrap text-base text-blue-500 hover:text-blue-800 flex justify-center items-center">
                                <var-space :size="[10, 10]">
                                    <var-button block color="#006263" text-color="white" @click="viewRecord(record)" class="w-35" style="border-radius: 8px">编 辑</var-button>
                                </var-space>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- 分页组件 -->
                <div class="flex justify-center mt-6">
                    <var-pagination :current="currentPage" :total="list.length" @change="handlePageChange" />
                </div>
            </div>
        </div>
        <!-- 居中弹窗 -->
        <var-popup v-model:show="showCenterPopup">
            <div class="popup-example-block">
                <h3 class="text-lg font-semibold mb-2">{{ selectedRecord.name }}</h3>
                <p class="mb-2">性别：{{ selectedRecord.sex }}</p>
                <p class="mb-2">身体状况：{{ selectedRecord.details }}</p>
                <var-space :size="[10, 10]">
                    <var-button type="danger" @click="deleteUser(selectedRecord)">删除</var-button>
                </var-space>
            </div>
        </var-popup>
    </div>
</template>

<script>
export default {
    name: 'managerUser',
    data() {
        return {
            searchValue: '', // 搜索框的值
            list: [
                // 模拟的历史记录数据
                { id: 1, name: '宁艺卓', time: '2023-10-01 10:00', sex: '女', details: '非常健康！' },
                { id: 2, name: '刘知珉', time: '2023-10-02 11:00', details: '刘知珉的详细信息' },
                { id: 3, name: '内永枝利', time: '2023-10-03 12:00', details: '内永枝利的详细信息' },
                { id: 4, name: '金旼炡', time: '2023-10-04 12:00', details: '金旼炡的详细信息' }
            ],
            currentPage: 1, // 当前页码
            pageSize: 5, // 每页显示的记录数
            showCenterPopup: false, // 控制弹窗显示
            selectedRecord: {} // 当前选中的记录
        };
    },
    computed: {
        // 过滤后的列表，根据搜索值进行过滤
        filteredList() {
            return this.list.filter((record) => record.name.includes(this.searchValue) || record.time.includes(this.searchValue)).slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        },
        // 总页数
        totalPages() {
            return Math.ceil(this.list.length / this.pageSize);
        }
    },
    methods: {
        // 查看记录
        viewRecord(record) {
            this.selectedRecord = record;
            this.showCenterPopup = true;
        },
        // 处理分页变化
        handlePageChange(page) {
            this.currentPage = page;
        },
        deleteUser(record) {
            this.list = this.list.filter((user) => user.id !== record.id);
            this.showCenterPopup = false;
        }
    }
};
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
