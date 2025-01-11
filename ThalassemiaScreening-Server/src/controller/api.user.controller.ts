import {
  Inject,
  Controller,
  Get,
  Query,
  UseGuard,
  Put,
  Files,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/api.user.service';
import { UserDTO } from '../dto/user';
import { AuthGuard } from '../guard/auth.guard';
import { UploadMiddleware } from '@midwayjs/busboy';
import { UploadFileInfo } from '@midwayjs/busboy';

@Controller('/user')
//使用@Controller 装饰器定义了一个控制器，路由前缀为 /api/user。这意味着所有与用户相关的请求都将以这个路径开头。
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  /**
   * @name getUser 获取用户信息
   * @description GET /api/user/getUser?userId=xxx
   * @param {string} userId - 用户ID
   * @returns {object} user - 用户信息
   */
  @UseGuard(AuthGuard)
  @Get('/getUser')
  async getUser(@Query('userId') userId: UserDTO['userId']): Promise<object> {
    // 检查 uid 是否存在
    return await this.userService.findAccount("userId",userId);
  }
    /**
   * @name uploadImg 上传图片
   * @description Put /user/uploadImg
   * @param {File} files - 上传的图片文件
   * @returns {string} - 上传状态
   */
  @Put('/uploadImg', { middleware: [UploadMiddleware] })
  async uploadImg(@Files('files') files: Array<UploadFileInfo>): Promise<any> {
    // 上传文件
      return await this.userService.uploadImg(files);
  }
}