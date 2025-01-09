import { MidwayConfig } from '@midwayjs/core';
import { createRedisStore } from '@midwayjs/cache-manager';
import { tmpdir } from 'os';
import { join } from 'path';

export default {
  // 用于Cookie标志密钥，应更改为自己的密钥并确保其安全性。
  keys: '1',
  //代码染色配置
  codeDye: {
    matchHeaderKey: 'codeDye',
  },
  //示例http://127.0.0.1:7001/api/auth/tokenVerify?codeDye=html
  //示例http://127.0.0.1:7001/api/user/getUser?userId=135&codeDye=html
  koa: {
    port: 7001, // 设置 Koa 服务器的端口
    hostname: '127.0.0.1', // 设置 Koa 服务器的主机名
    globalPrefix: 'api', // 设置全局路由前缀，默认为 api
  },
  // 数据库配置，改成 databaseConfig
  databaseConfig: {
    host: '', // 数据库主机地址
    port: 3306, // 数据库端口
    user: '', // 数据库用户名
    password: '', // 数据库密码
    database: '', // 数据库名称
  },
  // 缓存配置，使用 Redis 作为缓存存储
  cacheManager: {
    clients: {
      redis: {
        store: createRedisStore('redis'), // 使用 createRedisStore 方法创建 Redis 存储
        options: {
          ttl: 43200000, // 设置缓存的过期时间为 12 小时
          refreshThreshold: 21600000, // 设置刷新阈值为 6 小时
        },
      },
    },
  },
  redis: {
    clients: {
      redis: { // 定义 Redis 客户端实例
        host: '',
        port: 6379,
        password: '',
        db: 0,
      },
    },
  },
  oss: {
    client: {
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      endpoint: '',
      timeout: '60s',
    },
  },
  busboy: {
    mode: 'file',
    tmpdir: join(tmpdir(), 'midway-busboy-files'),
    cleanTimeout: 5 * 60 * 1000,
    mimeTypeWhiteList: {
      '.jpg': 'image/jpeg',
      // 也可以设置多个 MIME type，比如下面的允许 .jpeg 后缀的文件是 jpg 或者是 png 两种类型
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      // 其他类型
      '.gif': 'image/gif',
      '.bmp': 'image/bmp',
      '.wbmp': 'image/vnd.wap.wbmp',
      '.webp': 'image/webp',
    },
    limits: {
      fileSize: 1024 * 1024 * 10, // 10M
    }
  },
  jwtConfig: {
    secret: '',// JWT 密钥,自定义
    expiresIn: '12h',
  },
  cors: {
    origin: '*',
  },
} as MidwayConfig;
