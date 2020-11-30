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
    // const titles = ['热搜推荐', '手机数码', '家用电器','生鲜果蔬', '酒水饮料']
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
