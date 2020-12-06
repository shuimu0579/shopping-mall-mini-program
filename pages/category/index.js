Page({
  data: {
    vtabs: [],
    activeTab: 0,
    goodsListMap:{}
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
    let vtabs = []
    // const vtabs = categoriesData.map(item => {
    //   this.getGoodsListByCategory(item.id)
    //   return {title: item.category_name, id: item.id}
    // })
    for(let j=0;j<categoriesData.length;j++){
      let item = categoriesData[j]
      if (j<3) this.getGoodsListByCategory(item.id,j)
      // await this.getGoodsListByCategory(item.id)
      vtabs.push({title: item.category_name, id: item.id})
    }
    this.setData({vtabs})
 
  },

  onTabCLick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
    this.onCategoryChanged(index)
  },

  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
    this.onCategoryChanged(index)
  },

  onCategoryChanged(index){
    let cate = this.data.vtabs[index]
    let categoryId = cate.id
    if (!this.data.goodsListMap[categoryId]){
      this.getGoodsListByCategory(categoryId,index)
    }
  },

  // 重新计算高度
  reClacChildHeight(index){
    // calcChildHeight
    const goodsContent = this.selectComponent(`#goods-content${index}`)
    console.log(goodsContent);
    
    const categoryVtabs = this.selectComponent('#category-vtabs')
    categoryVtabs.calcChildHeight(goodsContent)
  },

  async getGoodsListByCategory(categoryId,index){
    let goodsData = await wx.wxp.request({
      url: `http://localhost:3000/goods/goods?page_index=1&page_size=20&category_id=${categoryId}`,
    })
    if (goodsData){
      goodsData = goodsData.data.data.rows;
    }
    // console.log(goodsData);
    this.setData({
      [`goodsListMap[${categoryId}]`]:goodsData
    })
    // this.data.goodsListMap[categoryId] = goodsData
    this.reClacChildHeight(index)
  }

})