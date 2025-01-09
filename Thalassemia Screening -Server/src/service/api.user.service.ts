import { Provide, Inject } from '@midwayjs/core';
import { UserDao } from '../dao/userDao';
import { UserDTO } from '../dto/user';
import { BigIntService } from './bigInt.service';
import { GetFileExtension } from './originelFileName.service'
import { OSSService } from '@midwayjs/oss';
import { uuidv7 } from 'uuidv7';
import { join } from 'path';
import { UploadFileInfo } from '@midwayjs/busboy';

@Provide()
export class UserService {
  @Inject()
  userDao: UserDao;
  @Inject()
  bigIntService: BigIntService;
  @Inject()
  getFileExtension: GetFileExtension;
  @Inject()
 ossService: OSSService;
  // 通过用户 ID 查找用户
  async findUserById(userId: UserDTO['userId']) {
    // 从数据库中查询用户信息
    const user = await this.userDao.findUserById(userId);
    return user;
  }
  // 通过学生 ID 查找用户
  async findStudentIdById(studentId: UserDTO['studentId']) {
    // 从数据库中查询用户信息
    const user = await this.userDao.findStudentIdById(studentId);
    return user;
  }
  // 删除用户
  async deleteUser(userId: UserDTO['userId']) {
    // 从数据库中删除用户信息
    const result = await this.userDao.delUser(userId);
    return result;
  }
  //上传图片
  async uploadImg( files: Array<UploadFileInfo>) {
    // 获取文件扩展名
    const originalFilename = this.getFileExtension.getFileExtension(files);
    // 使用 UUID 创建唯一文件名
    const filename = uuidv7() + '.' + originalFilename;

    // 构建上传文件的目标路径（根据需求可以更改路径）
    const targetPath = join('oss', filename);

    // 上传文件到 OSS
    const result = await this.ossService.put(targetPath, files[0].data); // 这里传递文件的路径

    if (result) {
      // 上传成功，保存文件的 URL 地址到数据库
      const fileUrl = result.url;
      return await this.userDao.uploadImg(fileUrl); // 假设 userDao.uploadImg 保存 URL 到数据库
    } else {
      throw new Error('上传图片失败');
    }
  }
}