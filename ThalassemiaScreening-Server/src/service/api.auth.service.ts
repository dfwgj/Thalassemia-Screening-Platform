import { Provide, Inject, Config } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';
import * as bcrypt from 'bcryptjs';
import { AuthDao } from '../dao/authDao';
import { BigIntService } from './bigInt.service';
import { LoginDTO, UserDTO } from '../dto/user';
import { UserDao } from '../dao/userDao';

@Provide()
export class AuthService {
  @Inject()
  ctx: Context;
  @Inject()
  jwtService: JwtService;
  @Inject()
  authDao: AuthDao;
  @Inject()
  userDao: UserDao;
  @Inject()
  bigIntService: BigIntService; //BigInt转换
  @Config('jwtConfig') // 动态注入配置
  jwtConfig: { secret: string; expiresIn: string | number };
  //用户注册
  async register(
    account: UserDTO['account'],
    name: UserDTO['name'],
    age: UserDTO['age'],
    identity: UserDTO['identity'],
    sex: UserDTO['sex'],
    phone: UserDTO['phone'],
    email: UserDTO['email'],
    password: UserDTO['password'],
  ) {
    const hashPassword = await bcrypt.hash(password, 10);
    // 在返回结果之前进行 BigInt 转换
    return this.bigIntService.bigInt(
      await this.authDao.register(account, name, age, identity, sex, phone, email,hashPassword)
    );
  }
  // 登录方法
  async login( account: LoginDTO['account'], password: LoginDTO['password']) {
    // 获取用户实体
    const user = await this.authDao.login(account);
    if (!user || user.length === 0) {
      // 用户不存在
      throw new Error('账户不存在或者账号被封禁');
    }
    // 验证密码
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw new Error('密码错误');
    }
    // 生成 token
    return await this.jwtService.sign(
      {
        userId: user.userId,
        account: user.account,
        name: user.name,
        age: user.age,
        identity: user.identity,
        sex: user.sex,
        phone: user.phone,
        email: user.email,
        avatar: user.avatar,
        userRole: user.role,
      },
      this.jwtConfig.secret,
      {
        expiresIn: this.jwtConfig.expiresIn,
      }
    );
  }
  // Token 验证方法
  async tokenVerify(token: UserDTO['token']) {
    const decoded: any = await this.jwtService.verify(
      token,
      this.jwtConfig.secret,
      { complete: true }
    );
    return decoded.payload;
  }
  //设置管理员
  async setAdmin(userId: UserDTO['userId']) {
    return await this.authDao.setAdmin(userId);
  }
  //删除用户
  async delUser(userId: UserDTO['userId']) {
    return this.bigIntService.bigInt(await this.userDao.delUser(userId));
  }
}
