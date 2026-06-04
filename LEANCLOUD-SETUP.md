# LeanCloud 配置指南

## 第一步：注册 LeanCloud

1. 打开 https://leancloud.cn
2. 注册账号（用邮箱或手机号）
3. 登录后进入控制台

## 第二步：创建应用

1. 点击「创建应用」
2. 应用名称填「pdf-tools」
3. 选择「开发版」（免费）
4. 创建

## 第三步：获取密钥

1. 进入应用 -> 设置 -> 应用 Key
2. 复制 AppID 和 AppKey
3. 注意 MasterKey 不要给别人

## 第四步：填入配置

打开 leancloud-config.js，替换：
```javascript
AV.init({
  appId: "你的AppID",
  appKey: "你的AppKey",
  serverURL: "https://你的前缀.lc-cn-n1-shared.com"
});
```

## 第五步：创建管理员账号

方式一（推荐）：在 LeanCloud 控制台手动创建
1. 控制台 -> 数据存储 -> _User -> 添加行
2. 填写：
   - username: 你的邮箱
   - email: 你的邮箱
   - password: 你的密码（会自动加密）
   - role: admin
   - status: active
3. 保存

方式二：首次使用管理员密钥
1. 打开 login.html 正常登录后
2. 访问 leancloud-setup.html（我会另外创建）
3. 用 MasterKey 将自己设为管理员

## 第六步：设置权限

控制台 -> 数据存储 -> 设置 -> 其他 -> 勾选「禁止客户端创建 Class」
（这样只有管理员面板能管理用户）

## 完成

配置完毕后访问：https://hui015-gao.github.io/pdf-merge/login.html
