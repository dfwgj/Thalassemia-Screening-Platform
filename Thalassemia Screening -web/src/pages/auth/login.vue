<template>
    <div class="min-h-screen bg-gradient-to-r from-[#006263] to-[#D1FFD1] grid grid-cols-1 md:grid-cols-2">
        <!-- #27DEDF -->
        <div class="absolute top-6 left-6">
            <img src="../../assets/logo.svg" alt="Logo" class="h-20 md:h-24 lg:h-28" />
        </div>
        <div class="hidden md:flex flex-col items-start justify-center text-white pl-16">
            <h1 class="text-6xl font-bold mb-2">地中海贫血筛查平台</h1>
            <p class="text-lg">Thalassemia Screening Platform</p>
        </div>
        <div class="flex items-center justify-center p-4">
            <div class="bg-white p-8 md:p-10 rounded-lg shadow-lg relative overflow-hidden form-container" :style="{ width: isRegister ? '500px' : '400px', height: isRegister ? '650px' : '450px' }">
                <transition name="slide" mode="out-in">
                    <var-form v-if="!isRegister" key="login" ref="loginForm">
                        <h1 class="text-2xl font-bold mb-8 text-center">欢迎登录</h1>
                        <!-- 账号输入框 -->
                        <div class="mb-6">
                            <var-input size="normal" variant="outlined" placeholder="请输入账号" v-model="loginForm.account" :rules="[(v) => !!v || '账号不能为空', (v) => /^[a-zA-Z0-9]+$/.test(v) || '账号只能包含字母和数字']" />
                        </div>
                        <!-- 密码输入框 -->
                        <div class="mb-4">
                            <var-input size="normal" variant="outlined" placeholder="请输入密码" v-model="loginForm.password" type="password" :rules="[(v) => !!v || '密码不能为空']" />
                        </div>
                        <!-- 登录按钮 -->
                        <div class="mb-12">
                            <var-button block type="primary" @click="handleLogin">登录</var-button>
                        </div>
                        <!-- 跳转到注册页面的链接 -->
                        <div class="text-center text-sm text-gray-600">
                            还没有账号？
                            <a href="#" class="text-blue-500 hover:text-blue-700" @click.prevent="switchToRegister">点击此处立即注册！</a>
                        </div>
                    </var-form>
                    <var-form v-else key="register" ref="registerForm">
                        <h1 class="text-2xl font-bold mb-8 text-center">注册账号</h1>
                        <!-- 用户名输入框 -->
                        <div class="mb-3">
                            <var-input size="small" variant="outlined" placeholder="请输入6位以上由英文字母和数字组成的账号" v-model="registerForm.username" :rules="[(v) => !!v || '用户名不能为空']" />
                        </div>
                        <!-- 密码输入框 -->
                        <div class="mb-3">
                            <var-input size="small" variant="outlined" placeholder="请输入6位以上由英文字母和数字组成的密码" v-model="registerForm.password" type="password" :rules="[(v) => !!v || '密码不能为空']" />
                        </div>
                        <!-- 真实姓名输入框 -->
                        <div class="mb-3">
                            <var-input size="small" variant="outlined" placeholder="请输入真实姓名" v-model="registerForm.realName" :rules="[(v) => !!v || '真实姓名不能为空']" />
                        </div>
                        <!-- 邮箱输入框 -->
                        <div class="mb-3">
                            <var-input size="small" variant="outlined" placeholder="请输入邮箱" v-model="registerForm.email" :rules="[(v) => !!v || '邮箱不能为空', (v) => /.+@.+\..+/.test(v) || '邮箱格式不正确']" />
                        </div>
                        <!-- 电话输入框 -->
                        <div class="mb-3">
                            <var-input size="small" variant="outlined" placeholder="请输入电话" v-model="registerForm.phone" :rules="[(v) => !!v || '电话不能为空', (v) => /^\d{11}$/.test(v) || '电话格式不正确']" />
                        </div>
                        <!-- 身份选择框 -->
                        <div class="mb-4">
                            <var-select size="small" variant="outlined" placeholder="请选择身份" v-model="registerForm.role" :rules="[(v) => !!v || '请选择身份']">
                                <var-option label="医生" value="doctor" />
                                <var-option label="科研人员" value="research" />
                            </var-select>
                        </div>
                        <!-- 注册按钮 -->
                        <div class="mb-6">
                            <var-button block type="primary" @click="handleRegister">注册</var-button>
                        </div>
                        <!-- 返回登录页面的链接 -->
                        <div class="text-center text-sm text-gray-600">
                            已有账号？
                            <a href="#" class="text-blue-500 hover:text-blue-700" @click.prevent="switchToLogin">点击此处登录！</a>
                        </div>
                    </var-form>
                </transition>
            </div>
        </div>
        <var-dialog v-model:show="showDialog" title="注册成功" :message="dialogMessage" />
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            isRegister: false,
            showDialog: false, // 控制弹窗显示
            dialogMessage: '', // 弹窗消息内容
            loginForm: {
                account: '',
                password: ''
            },
            registerForm: {
                username: '',
                password: '',
                realName: '',
                email: '',
                phone: '',
                role: ''
            }
        };
    },
    methods: {
        // 切换到注册页面
        switchToRegister() {
            this.isRegister = true;
            this.$nextTick(() => {
                this.$refs.loginForm.resetValidation();
            });
        },
        // 切换到登录页面
        switchToLogin() {
            this.isRegister = false;
            this.$nextTick(() => {
                this.$refs.registerForm.resetValidation();
            });
        },
        // 处理登录逻辑
        async handleLogin() {
            console.log('登录表单数据:', this.loginForm);
            if (!this.loginForm.account || !this.loginForm.password) {
                alert('账号和密码不能为空！');
                return; // 如果有字段为空，则不执行后续代码
            }
            const res = await this.$api.auth.login({
                account: this.loginForm.account,
                password: this.loginForm.password
            });
            if(res){
                this.$router.push('/user/home');
            }else{
                alert('账号或密码错误！');
            }
        },
        // 处理注册逻辑
        handleRegister() {
        }
    }
};
</script>

<style scoped>
.form-container {
    transition: all 0.2s ease-in-out;
}

/* 滑动过渡效果 */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.2s ease;
}

.slide-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>
