import { Inject, Provide } from '@midwayjs/core';
import { query } from '../dbConnPool/mariadb'; // 引入查询函数
import { UserDTO } from '../dto/user';
import { Caching } from '@midwayjs/cache-manager';
import { Context } from '@midwayjs/koa';
//import{CachingFactory, MidwayCache}from "@midwayjs/cache-manager";
//import{InjectClient} from "@midwayjs/core";
@Provide()
export class UserDao {
  @Inject()
  ctx: Context;
  //通过id查找用户
  @Caching('redis', ctx => {
    if (ctx.methodArgs.length > 0) {
      return `findUserId:${ctx.methodArgs[0]}`;
    }
    return null;
  })
  async findUserById(userId: UserDTO['userId']) {
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
        is_admin AS role
      FROM 
        user
      WHERE 
        user_id = ? 
        AND valid_flag = 1  
    `;
    const sqlParams = [userId];
    return await query(sql, sqlParams);
  }


  
  //通过账号邮箱密码查找用户
  async findAccount(field: string, value: string) {
    const sql = `
      SELECT
        COUNT(*) AS count
      FROM 
        user
      WHERE 
        ${field} = ?
    `;
    const sqlParams = [value];
    const result =await query(sql, sqlParams, false); // 设置 throwOnEmptyResult 为 false
    return result[0].count;
  }
  //删除用户
  async delUser(userId: UserDTO['userId']) {
    const sql = `
    UPDATE
        user
      SET
        valid_flag = 0
      WHERE
        user_id = ?
    `;
    const sqlParams = [userId];
    return await query(sql, sqlParams);
  }
  //上传图片
  async uploadImg(url: string){
    console.log("666",this.ctx.state.user);
    const userId = this.ctx.state.user.userId;
    const sql = `
    UPDATE
        user
      SET
        avatar = ?
      WHERE
        user_id = ?
    `;
    const sqlParams = [url,userId];
    await query(sql, sqlParams);
    return url;
  }
}