-
<template>
    <div class="flex">
        <!--主体内容 -->
        <div class="flex flex-col flex-1">
            <!-- 头部导航栏 -->
            <div class="top-[100px] left-[-250px] flex justify-center items-center text-white p-4"></div>
            <!-- 个人信息 -->
            <div class="flex justify-center items-center h-[calc(100%-68px)] p-4" style="margin-top: 80px; margin-left: 10px">
                <div class="max-w-[800px] w-full">
                    <h1 class="text-xl font-bold mb-4">个人信息</h1>
                    <!-- 姓名模块 -->
                    <div class="flex flex-wrap gap-32 mb-4">
                        <div class="flex items-center space-x-4">
                            <div>姓名</div>
                            <var-space direction="row" size="mini" />
                            <var-input v-model="name" disabled class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-gray-50 transition-colors" />
                        </div>
                        <!-- 年龄模块 -->
                        <div class="flex items-center space-x-4">
                            <div>年龄</div>
                            <var-input v-model="age" disabled class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-gray-50 transition-colors" />
                        </div>
                    </div>
                    <!-- 性别模块 -->
                    <div class="flex flex-wrap gap-32 mb-4">
                        <div class="flex items-center space-x-4">
                            <div>性别</div>
                            <var-space direction="row" size="mini" />
                            <var-input v-model="gender" disabled class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-gray-50 transition-colors" />
                        </div>
                        <!-- 身份模块 -->
                        <div class="flex items-center space-x-4">
                            <div>身份</div>
                            <var-input v-model="identity" disabled class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-gray-50 transition-colors" />
                        </div>
                    </div>

                    <!-- 联系信息模块 -->
                    <h1 class="text-xl font-bold mb-4">联系信息</h1>
                    <!-- 邮箱地址模块 -->
                    <div class="flex flex-wrap mb-4" style="width: 100%">
                        <div class="flex items-center space-x-4" style="flex: 1">
                            <div>邮箱地址</div>
                            <var-input class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-gray-50 transition-colors" placeholder="请输入您的邮箱地址" v-model="email" style="flex: 1" />
                            <div class="flex space-x-2">
                                <var-button text-color="black" color="rgb(226, 255, 245)" @click="editEmail">编辑</var-button>
                                <var-button text-color="black" color="rgb(226, 255, 245)" @click="saveEmail">保存</var-button>
                            </div>
                            <!-- 添加 iconfont 图标 -->
                            <i class="iconfont icon-email" style="font-size: 20px; color: rgb(226, 255, 245)"></i>
                        </div>

                        <!-- QQ号码模块 -->
                        <div class="flex items-center space-x-4" style="flex: 1">
                            <div>QQ号码</div>
                            <var-input class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-gray-50 transition-colors" placeholder="请输入您的QQ号码" v-model="qq" />
                            <div class="flex space-x-2" style="margin-right: -50px">
                                <var-button text-color="black" color="rgb(226, 255, 245)" @click="editQQ">编辑</var-button>
                                <var-button text-color="black" color="rgb(226, 255, 245)" @click="saveQQ">保存</var-button>
                            </div>
                        </div>
                    </div>

                    <!-- 手机号 -->
                    <div class="flex flex-wrap gap-4 mb-4" style="margin-right: 8px">
                        <div class="flex items-center space-x-4" style="margin-right: 8px">
                            <div>手机号</div>
                            <var-input class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-gray-50 transition-colors" placeholder="请输入您的手机号" v-model="phone" />
                            <var-button text-color="black" color="rgb(226, 255, 245)" @click="editPhone">编辑</var-button>
                            <var-button text-color="black" color="rgb(226, 255, 245)" @click="savePhone">保存</var-button>
                        </div>
                    </div>

                    <!-- 账号管理 -->
                    <h1 class="text-xl font-bold mb-4">账号管理</h1>
                    <div class="flex flex-wrap gap-4">
                        <!-- 修改密码按钮 -->
                        <var-button text-color="black" color="rgb(226, 255, 245)" @click="show = true">修改密码</var-button>

                        <!-- 弹窗 -->
                        <var-dialog title="兰亭序" message="兰亭临帖 行书如行云流水" v-model:show="show" @confirm="Snackbar.success('confirm')" @cancel="Snackbar.error('cancel')" @closed="Snackbar.info('closed')" />
                    </div>
                    <!--退出登录-->
                    <div style="position: relative">
                        <var-button text @click="gologin" text-color="black" style="position: absolute bottom = 30px; left: 600px; font-size: 1.25rem; font-weight: bold">退出登录</var-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            name: '', //姓名
            age: 18, //年龄
            gender: '男', //性别
            identity: '医生', //身份
            email: '12345678@qq.com', // 邮箱地址
            qq: '12345678', // QQ号码
            phone: '123456789', // 手机号
            isEditing: false, //是否编辑
            editedName: '' //编辑后的姓名
        };
    },

    //进入编辑模式
    editName() {
        this.isEditing = true;
        this.editedName = this.name;
    },

    //保存名字
    savename() {
        this.name = this.editedName;
        this.isEditing = false;
    },
    //取消编辑
    cancelEditing() {
        this.isEditing = false;
        this.editedName = this.name; //恢复原名
    },
    gologin() {
        this.$router.push('/login');
    }
};
</script>
<style scoped></style>
