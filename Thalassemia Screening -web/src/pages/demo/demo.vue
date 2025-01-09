<template>
    <div class="w-full max-w-screen-sm h-full mx-auto px-10 py-10">
        <var-card class="" title="标题 Title" subtitle="副标题 Subtitle" description="这是一个 Demo 页。This is a demo card.">
            <template #extra>
                <var-space>
                    <var-button color="pink" text-color="#fff"></var-button>
                    <var-button type="primary">Button 1</var-button>
                    <var-button type="info">Button 2</var-button>
                </var-space>
            </template>
        </var-card>
        <var-card class="pt-4 flex" title="标题 Title" subtitle="副标题 Subtitle">
            <var-input placeholder="请输入学号" v-model="studentId" />
            <var-input placeholder="请输入密码" type="number" v-model="password" />
            <div class="flex justify-end">
                <var-button class="mt-4" type="primary" @click="summit()">登录</var-button>
            </div>
            <!-- 上传的图片 -->
            <img class="uploader-example-file box-shadow" v-for="f in file" :key="f.id" :src="f.cover" @click="showModal(f.cover)" />
            <!-- 图片预览 -->
            <var-image-preview :images="modalImg" v-model:show="show"></var-image-preview>
            <!-- 上传按钮 -->
            <var-uploader hide-list v-model="file" :maxlength="1" type="file" :maxsize="1000000" accept="image/*"><Icon type="qianbi" extraclass="icon"></Icon></var-uploader>
            <!-- 发送到服务器 -->
            <Icon type="shangchuan" extraclass="icon" size="44" color="#f00" @click="uploadImg"></Icon>
        </var-card>
    </div>
</template>

<script>
export default {
    name: 'DemoPage', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        // 定义组件的响应式数据
        return {
            studentId: '',
            password: '',
            token: '',
            file: [], // 用于存储选中的文件
            show: false, // 控制模态框的显示
            modalImg: [] // 用于存储当前显示的图片
        };
    },
    created() {}, // 组件的生命周期钩子，创建时调用
    mounted() {}, // 组件的生命周期钩子，挂载时调用
    updated() {}, // 组件的生命周期钩子，更新时调用
    methods: {
        // 显示图片预览
        showModal(img) {
            this.modalImg = [img];
            this.show = true;
        },
        //登录
        async summit() {
            const res = await this.$api.auth.login({
                studentId: this.studentId,
                password: this.password
            });
            if (res) {
                alert('登录成功');
            } else {
                alert('登录失败，请检查学号和密码');
            }
        },
        //上传图片
        async uploadImg() {
            const rawFile = this.file[0]?.file || toRaw(this.file[0]);
            const formData = new FormData();
            formData.append('files', rawFile);
            const res = await this.$api.user.uploadImg(formData);
            if (res) {
                // 假设服务器返回的响应体中包含了一个图片地址字段 imageUrl
                this.file[0] = { ...this.file[0], cover: res };
                alert('上传成功');
            } else {
                alert('上传失败，服务器返回的响应体中没有图片地址字段');
            }
        }
    } // 定义组件的方法
};
</script>

<style scoped>
.uploader-example-file {
    width: 200px;
    height: 150px;
    border-radius: 15%;
    object-fit: cover;
}
.box-shadow {
    box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.3);
}
</style>
