Page({
  data: {
    vtabs: [],
    activeTab: 0,
  },

  async onLoad() {
    let categoriesData = await wx.wxp.request({
      url: 'http://localhost:3000/goods/categories',
    })
    if (categoriesData){
      categoriesData = categoriesData.data.data;
    }
    console.log(categoriesData);
    
    // const titles = ['热搜推荐', '手机数码', '家用电器',
    //   '生鲜果蔬', '酒水饮料', '生活美食', 
    //   '美妆护肤', '个护清洁', '女装内衣', 
    //   '男装内衣', '鞋靴箱包', '运动户外', 
    //   '生活充值', '母婴童装', '玩具乐器', 
    //   '家居建材', '计生情趣', '医药保健', 
    //   '时尚钟表', '珠宝饰品', '礼品鲜花', 
    //   '图书音像', '房产', '电脑办公']
    const vtabs = categoriesData.map(item => ({title: item.category_name, id: item.id}))
    this.setData({vtabs})
  },

  onTabCLick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
  },

  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
  }

})
