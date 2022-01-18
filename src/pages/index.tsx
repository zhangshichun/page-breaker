export default function IndexPage() {
  const containerStyle ={
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  }
  return (
    <div style={containerStyle}>
      <div className="header-text">
        <div>你好啊 </div>
        <div>我是【春哥】，一个卑微的前端。</div>
        <div>这是我的【掘金首页】，欢迎关注：<a href="https://juejin.cn/user/1714893870865303/posts" target="__blank">点我点我！</a></div>
        <div>这是我的【公众号】,欢迎关注：</div>
        <img className="wechat" src="https://cdn.jsdelivr.net/gh/zhangshichun/blog-images/imgs/2022-wechat.png"/>
      </div>
    </div>
  )
}
