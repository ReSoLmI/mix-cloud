#命名
####CSS 类名
- 小写加-  例:`.main-page`

#路径
- 模块或组件专属资源引入,使用相对路径.
- 引入公有或是基础资源,使用别名方式的绝对路径. 例:js或vue文件`@/component/Sidebar`,scss资源'~@/styles/variables.scss'
- 业务组件都需在`@/utils/componentPool`中注册,componentPool作为业务组件按需加载的统一出口,因此router文件中的组件也许在此作为出口

#组件库
- 自定义组件的样式类名以 lsh- 起头.例: `.lsh-card` 子元素样式以组件类名起头 __ 分隔.`.lsh-card__header`
- 自定义组件export name以 Lsh 起头.例: `LshCard`
- 自定义组件文件名不加Lsh.例: `Card.vue`

#布局
- 业务组件布局样式需能独能立存在,即使在不同容器场景中内部视觉也能保持一致.建议业务组件最外层div样式以:组件名-container类名命名.例:`.basic-info-container`

