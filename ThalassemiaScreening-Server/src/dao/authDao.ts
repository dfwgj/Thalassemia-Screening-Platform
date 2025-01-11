import { Inject, Provide } from '@midwayjs/core';
import { InjectClient } from '@midwayjs/core';
import { query } from '../dbConnPool/mariadb'; // 引入查询函数
import { LoginDTO, UserDTO } from '../dto/user';
import { UserDao } from './userDao';
import { uuidv7 } from 'uuidv7';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
//import { Caching} from "@midwayjs/cache-manager";

@Provide()
export class AuthDao {
  @Inject()
  userDao: UserDao;
  // 新注册用户
  async register(
    account: UserDTO['account'],
    name: UserDTO['name'],
    age: UserDTO['age'],
    identity: UserDTO['identity'],
    sex: UserDTO['sex'],
    phone: UserDTO['phone'],
    email: UserDTO['email'],
    hashPassword: UserDTO['hashPassword']
  ) {
    const userId = uuidv7();
    const sql = `
        INSERT INTO user
          ( user_id, account, name, age, identity, sex, phone, email, password, created_at)
          VALUES ( ?,?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;
    const sqlParams = [userId, account, name, age, identity, sex, phone, email, hashPassword];
    await query(sql, sqlParams);
    return "注册成功";
  }
  // 登录验证
  async login(account: LoginDTO['account']) {
    const sql = `
    SELECT
        user_id AS userId,
        account,
        name,
        identity,
        age,
        sex,
        email,
        phone,
        avatar,
        valid_flag AS deleted,
        is_admin AS role,
        password AS passwordHash
    FROM
        user
    WHERE
        account = ?
        AND valid_flag = 1
`;
    const sqlParams = [account];
    return (await query(sql, sqlParams))[0];
  }
  //设置管理员
  @InjectClient(CachingFactory, 'redis')
  cache: MidwayCache; //redis缓存
  async setAdmin(userId: UserDTO['userId']) {
    // 更新数据库中的用户角色为管理员
    const sql = `
      UPDATE
        user
      SET
        is_admin = 1
      WHERE
        student_id = ?
    `;
    const sqlParams = [userId];
    const result = await query(sql, sqlParams);
    // 如果更新成功，更新 Redis 缓存
    if (result.affectedRows > 0) {
      await this.cache.del(`findUserId:${userId}`);
      return await this.userDao.findUserById(userId);
    }
  }
}
