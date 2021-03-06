# Token过期问题

**解决一：根据后端返回的状态码刷新Token**

​        服务器生成 `Token` 的过程中，会有两个时间，一个是 `Token访问令牌` ，一个是 `refresh_token刷新令牌` ，`刷新令牌`的时间肯定比`访问令牌`的时间长，当用户 `Token` 过期后服务端会返回 `状态码` 表示  `Token` 无效或过期了，你可以拿着过期的 `Token` 去换取新的 `Token` ，来保持用户的登陆状态，当然这个过期 `Token` 的过期时间必须在刷新时间之内，如果超出了刷新时间，那么返回的依旧是 401（过期状态码）。

处理流程：

1. 在axios的拦截器中加入token刷新逻辑
2. 当用户token过期时，去向服务器请求新的 token
3. 把旧的token替换为新的token
4. 然后继续用户当前的请求

**解决一：前端主动介入token处理的业务逻辑**

​        在用户登录成功拿到token后，往本地存入一个时间戳，在注入Token的时候需要监查时间戳，用当前时间戳—缓存中的时间戳得到一个时间差，如果大于token的超时时间（true），则说明token过期了，此时我们需要：①登出操作 ② 跳转到登录页 ③抛出Promise.reject错误，提示Token超时。

