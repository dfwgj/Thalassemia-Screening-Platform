import request from '../utils/request';

const moduleUrl = '/user';

const user = {
    //用户图片上传
    uploadImg(formData) {
        return request.upload(`${moduleUrl}/uploadImg`, formData);
    },
};

export default user;
