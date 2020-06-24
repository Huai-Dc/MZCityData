## 注意事项
- 本文件夹下存放各个模块的路由配置

### 命名规范
- 'XXX模块.routes.js'

### 路由字段说明

- path 路由路径
- name  路由名称 可通过 name 访问
- redirect  重定向地址
- hidden  是否显示在导航栏  true 不显示 false 显示
- children 子路由
- component  该路由对应组件
- meta 配置项
    - title 导航标题
    - hideFooter : true  隐藏   false(默认) 显示
    - icon 图标
    - noCache 缓存
