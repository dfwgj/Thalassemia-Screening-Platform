import {
  Inject,
  Controller,
  Post,
  Put,
  Body,
  Headers,
  UseGuard,
  Del,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AuthService } from '../service/api.auth.service';
import { UserService } from '../service/api.user.service';
import { UserDTO, LoginDTO } from '../dto/user';
import { AuthGuard } from '../guard/auth.guard';

@Controller('/auth')
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  authService: AuthService;

  @Inject()
  userService: UserService;
  /**
   * @name register 用户注册
   * @description POST /api/user/register
   * @param {string} password - 密码
   * @returns {object} user - 用户信息
   * */
  @Post('/register')
  async register(
    @Body('name') name: UserDTO['name'],
    @Body('studentId') studentId: UserDTO['studentId'],
    @Body('college') college: UserDTO['college'],
    @Body('grade') grade: UserDTO['grade'],
    @Body('major') major: UserDTO['major'],
    @Body('phone') phone: UserDTO['phone'],
    @Body('email') email: UserDTO['email'],
    @Body('password') password: UserDTO['password'],
    @Body('hashPassword') hashPassword: UserDTO['hashPassword']
  ): Promise<object> {
    //是否存在该用户
    const user = await this.userService.findStudentIdById(studentId);
    if (user) {
      throw new Error('用户已经存在');
    }
    const result = await this.authService.register(
      name, studentId, college, grade, major, phone, email, password, hashPassword
    );
    console.log(result);
    return result;
  }
  /**
   * @name login 用户登录
   * @description POST /auth/login
   * @param {string} account - 用户账号
   * @param {string} body - 用户密码
   * @returns {Object} token - 登录凭证
   */
  @Post('/login')
  async login(
    @Body('studentId') studentId: LoginDTO['studentId'],
    @Body('password') password: LoginDTO['password']
  ): Promise<string> {
    return await this.authService.login(studentId, password);
  }
  /**
   * @name tokenVerify 凭证校验
   * @description POST /auth/tokenVerify
   * @header {string} Authorization 用户凭证
   * @returns {Object} payload 凭证负载
   */
  @Post('/tokenVerify')
  async tokenVerify(
    @Headers('Authorization') token: UserDTO['token']
  ): Promise<unknown> {
    token = this.ctx.request.header.authorization.split(' ')[1];
    return await this.authService.tokenVerify(token);
  }
  /**
   * @name setAdmin 设置管理员
   * @description Put /auth/setAdmin
   * @param {string} userId - 用户id
   * @returns {Object} success 成功提示
   */
  //@UseGuard(AuthGuard)
  @Put('/setAdmin')
  async setAdmin(@Body('userId') userId: UserDTO['userId']): Promise<object> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }
    return await this.authService.setAdmin(userId);
  }
  /**
   * @name delUser 删除用户
   * @description Del /auth/del
   * @param {string} userId - 用户id
   * @returns {Object} success 成功提示
   */
  @UseGuard(AuthGuard)
  @Del('/del')
  async delUser(@Body('userId') userId: UserDTO['userId']): Promise<object> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }
    return await this.authService.delUser(userId);
  }
}
