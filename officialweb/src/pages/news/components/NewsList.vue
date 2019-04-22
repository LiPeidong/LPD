<template>
  <div>
    <div class="box">
      <div class="img"></div>
    </div>
    <div class="title">
      <p>新闻资讯</p>
      <p>NEWS</p>
    </div>
    <div class="list">

      <div class="item" v-for="(tab,index) in showList" :key="index">
        <div class="left">
          <img :src="tab.photo"  alt="新闻图片">
        </div>
        <div class="right" @click="detailPage(index)">
          <div class="title_outer">
            <p class="title_inner" style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{tab.title}}</p>
          </div>
          <div class="outer">
            <p class="inner" style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">{{tab.ListData}}</p>
          </div>
          <div style="margin-top:10px;color: #499ef0;font-size: 18px;">
            <span class="time">{{tab.date}}</span>
            <span class="detailButton"
            @click="detailPage(index)"
            onmouseover="this.style.backgroundColor='#499ef0';this.style.color='white'"
            onmouseout="this.style.backgroundColor='#fafafa';this.style.color='#499ef0'"
            >查看详情</span>
          </div>
        </div>
      </div>

    </div>
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="newsdata.length">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name:'NewsList',
  data() {
      return {
        newsdata:[
          {
            "title":"蜂鸟窝服务商大会，助力服务升级",
            "photo":"/static/img/20190307_1.f52308f.jpg",
            "date":"2019-3-7",
            "ListData":"2019年3月7日，蜂鸟窝举办了2019年年初服务商交流会。通过相互赋能，建立新标准，打造高起点，实现了维修服务的产业升级。人们总是喜欢用“第一个吃螃蟹的人”来形容一个人敢于打破规则，建立新的系统。蜂鸟窝自成立以来，正是靠不断的打破旧的体系，以一种新的方式为房东朋友提供更加优质和高效的服务内容。6个月前，蜂鸟窝正式运营。秉承 “省钱”、“省时”、“便捷”、“安全”的服务理念和标准为家庭用户提供房屋维修服务，3个月的时间里，蜂鸟窝合作房屋数量就突破10,000。数字的背后，是蜂鸟窝不断自我升级的结果。",
            "article":
            "<p>导读：2019年3月7日，蜂鸟窝举办了2019年年初服务商交流会。通过相互赋能，建立新标准，打造高起点，实现了<a style='color:#0000C6' href='http://www.fengniaowo.cn/#/'>维修</a>服务的产业升级。</p>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/20190307_1.f52308f.jpg>"+
            "<p style='margin-top:0;font-size:10px'>（▲与会服务商代表合影）</p><br/>"+
            "<p style='font-weight:bold'>因为不甘平凡，所以更加卓越</p>"+
            "<p>人们总是喜欢用“第一个吃螃蟹的人”来形容一个人敢于打破规则，建立新的系统。蜂鸟窝自成立以来，正是靠不断的打破旧的体系，以一种新的方式为房东朋友提供更加优质和高效的服务内容。</p><br/><br/>"+
            "<p>6个月前，蜂鸟窝正式运营。秉承 <a style='color:#0000C6' href='http://www.fengniaowo.cn/#/'>“省钱”、“省时”、“便捷”、“安全”</a>的服务理念和标准为家庭用户提供房屋维修服务，3个月的时间里，蜂鸟窝合作房屋数量就突破10,000。数字的背后，是蜂鸟窝不断自我升级的结果。</p>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/20190307_2.6a34dca.jpg><br/><br/>"+
            "<p style='font-weight:bold'>优质的服务，需要强大的资源体系</p>"+
            "<p>传统的房屋维修服务行业是一个粗放的市场，没有统一的标准和价格，人员结构复杂，所以在服务过程中往往存在价格不透明、维修不及时、人员背景不清晰、售后没有保障等不确定性。</p>"+
            "<p>蜂鸟窝通过大量整合维修市场上下游资源，提供了系统赋能、人员保障的服务，以包年为基础，通过优质、高效、可溯的服务外包方式，赢得了市场的认可。</p>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/20190307_3.ad98ec3.jpg>"+
            "<p style='margin-top:0;font-size:10px'>（▲蜂鸟窝负责人介绍服务规范）</p><br/>"+
            "<p style='font-weight:bold'>开放合作，严格准入 </p>"+
            "<p>在合作关系上，<a style='color:#0000C6' href='http://www.fengniaowo.cn/#/'>蜂鸟窝</a>秉承“平等合作、互利共赢、协同发展”的合理理念，服务商以合伙人的方式加入蜂鸟窝，享受蜂鸟窝提供的一切软硬件资源和系统支持，同时也接受蜂鸟窝的监督。 </p>"+
            "<p>同时对于服务商的准入有严格的条件和机制，服务商必须有相关的资质，同时要进行相应的技术考核，符合考核标准后才能入住平台提供服务。蜂鸟窝对于服务规范还有一套严格的考评标准，如有违规便会进行相应的处罚。 </p>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/20190307_4.a6a8dcd.jpg>"+
            "<p style='margin-top:0;font-size:10px'>（▲服务商仔细研读服务规范、SaaS操作系统）</p><br/>"+
            "<p style='font-weight:bold'>规范化服务，品牌化运营 </p>"+
            "<p>蜂鸟窝为了提高服务质量，制定了一系列服务标准和流程，以及完善的培训机制，建立了标准化的服务技术、服务效率、服务态度规范，为客户提供更优质的服务体验。 </p>"+
            "<p style='font-weight:bold'>技术赋能，极致体验 </p>"+
            "<p>好的体验必须建立在便捷的服务基础之上。为此， 蜂鸟窝花费千万自主研发了行业SaaS系统，把所有的服务流程在线化，提高了服务效率、打破了信息孤岛，做到了5分钟响应，紧急维修30分钟上门服务的极致体验 。 </p>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/20190307_5.f8a9285.jpg>"+
            "<p style='margin-top:0;font-size:10px'>  （▲蜂鸟窝负责人介绍SaaS管理系统）</p><br/>"+
            "<p>会上，服务商还针对行业内一些不规范的问题大家各抒己见，深入交流，为提供更合理和高效的服务发表了自己的看法。 例如，如何切实为客户解决紧急维修问题；如何保证工人安全和客户安全等问题都进行了深入的探讨。 </p>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/20190307_6.42d6919.jpg>"+
            "<p style='margin-top:0;font-size:10px'>  （▲服务商进行问题谈论）</p><br/>"+
            "<p>传统的房屋维保行业在蜂鸟窝O2O的运营理念下，正在一步步的发生变化。大浪淘沙在最初与蜂鸟窝一起成长的商户当中，涌现出了一批真正推动行业发展的人。蜂鸟窝根据客户反馈和服务数据评估，为这些站在第一线的商家和个人颁发了奖牌和奖金。 </p>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/20190307_7.589d3d1.jpg><br/>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/20190307_8.6df16cf.jpg>"+
            "<p style='margin-top:0;font-size:10px'>  （▲蜂鸟窝负责人为优秀服务商颁奖）</p><br/>"+
            "<p>“追求极致，超越自我”，这是蜂鸟窝对每个员工的要求，也是蜂鸟窝对自己的要求，落到实处，把每一件事做的极致，把每一次服务做得最好，把每一个产品做到最优，这就是蜂鸟窝做服务的本质。      </p>"
          },
          {
            "title":"震惊！油烟机长期不清洗居然有那么大的危害，95%的家庭不知道",
            "photo":"/static/img/4_1.5d6c27c.jpg",
            "date":"2019-2-1",
            "ListData":"油烟机是我们家庭生活中使用频率最高的电器之一，同时也是“最脏”的电器。但是对于烟机的维护保养，95%以上的家庭没有正确的认知，认为烟机的维保只是平常的表面清洗，殊不知烟机最应该清洗的是其内部。造成人们对烟机保养的忽视，最终导致烟机使用寿命减短，耗电增加，更会危害我们的身体健康。",
            "article":
              "<p>油烟机是我们家庭生活中使用频率最高的电器之一，同时也是“最脏”的电器。但是对于烟机的维护保养，95%以上的家庭没有正确的认知，认为烟机的维保只是平常的表面清洗，殊不知烟机最应该清洗的是其内部。造成人们对烟机保养的忽视，最终导致烟机使用寿命减短，耗电增加，更会危害我们的身体健康。</p>"+
              "<b>案例一</b>"+
              "<p>6月30日</p>"+
              "<p>陈女士在家做午饭，将锅里的红烧肉加水后，盖上锅盖焖煮，自己则离开厨房，到客厅里看电视。几分钟后，陈女士闻到一股怪味，到厨房一看，油烟机上有油污往下滴，使得煤气灶上的火蔓延到旁边，将桌上的抹布、蔬菜等物点燃，火势越来越大。陈女士打电话报警，又到邻居家寻求帮助，最终大家一起用棉被覆盖，将火熄灭。 事后，警方检查得知，此次火灾的罪魁祸首是未清洗的油烟机。据陈女士回忆，她五年前买回油烟机后，一直没有洗过。</p>"+
              "<b>案例二</b>"+
              "<p>8月4日 </p>"+
              "<p>周女士刚把油倒进锅里后到客厅接手机。接完后，烧热的油锅里蹿起的火苗，引燃了油烟机。听到周女士的呼救，丈夫李先生赶来扑火。他情急之下泼了一盆冷水，油花四处飞溅，火势丝毫不减。两口子试图把油烟机卸下，不料刚把固定的螺栓拔去，机身突然散架，滚烫的铁片把李先生烫伤。消防人员提醒，抽油烟机积满油垢，是家庭火灾的隐患之一，应定期进行清洗。</p><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/4_1.5d6c27c.jpg><br/><br/>"+
              "<b>油烟机长期不清洗的6大坏处</b>"+
              "<b>NO.1 致癌</b>"+
              "<p>食物在高温烹调下，会产生大量的“热氧化分解产物”，其中分解产物以烟雾形式散到空气中，形成油烟气。主要有醛、酮、醇等，其中包括苯并芘、挥发性亚硝胺、杂环胺等已知高致癌物。</p>"+
              "<b>NO.2 损害呼吸道和皮肤</b>"+
              "<p>当油加热到200℃时，油烟的主要成分是丙烯醛，它对眼睛、呼吸道、鼻子产生强烈的刺激，可引起慢性咽炎、鼻炎、气管炎、肺炎等呼吸道疾病。同时，油烟对女性皮肤的伤害更大，油烟颗粒附着在女性皮肤上，造成毛细孔阻塞，加速女性皮肤组织老化，导致肌肤变粗糙、出现皱纹、黑色素增多并转变成色斑。</p>"+
              "<b>NO.3 诱发心血管疾病</b>"+
              "<p>油烟中含大量胆固醇，胆固醇是造成心脑血管疾病的主要原因之一。长期在厨房油烟中的脂肪氧化物会引发心血管、脑血管疾病，尤其是老年人更容易患心脑血管疾病。根据北京大学人民医院提出：100名患者中就有78人长期在厨房操作</p>"+
              "<b>NO.4 引发女性肺癌</b>"+
              "<p>我国绝大多数家庭主妇并不吸烟，但女性得肺癌机率并不比男性低。原因在于：中国特有的烹饪习惯，每次吸入的油烟量相当于每天吸2包烟的量，这是引起肺癌的一个重要原因。</p>"+
              "<p>上海中医药大学一项长达五年的肺癌流行病学调查研究：非吸烟女性肺癌患者中，60%长期接触厨房油烟。厨房油烟中的致癌物质苯并芘、挥发性亚硝胺、杂环胺类化合物等使人体细胞组织发生突变，导致癌症的发生，长期接触油烟的40-60岁女性患者有肺癌、乳腺癌的危险增加2-3倍。 </p>"+
              "<b>NO.5 减少烟机使用寿命</b>"+
              "<p>油污长期积累，发生氧化形成酸性物质，对油烟机进行腐蚀，生锈，最终影响油烟机的使用寿命。</p>"+
              "<b>NO.6 引发火灾</b>"+
              "<p>油污长期积累在油烟机内部、烟道内部，形成火灾隐患（宾馆、酒楼的排油烟机、风道必须定期清洗，主要是防止火灾）</p>"+
              "<p>油污长期积累，发生氧化形成酸性物质，对油烟机进行腐蚀，生锈，最终影响油烟机的使用寿命。</p><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/4_2.b62a656.jpg><br/><br/>"+
              "<b>日常烟机保养技巧 </b>"+
              "<p>水蒸气清洗</p>"+
              "<p>现在市面上有自带清洁功能的油烟机，其工作原理是利用热蒸汽循环的原理来去除油污。其实我们只需一个高压锅就能起到这样的效果。</p>"+
              "<p>第一步</p>"+
              "<p>√ 在压力锅中装半锅清水，去掉压力阀，将锅放在燃气灶上加热热气便会直往上冲，滤网上的油污一遇到高温蒸汽便会被分解了。</p>"+
              "<p>第二步</p>"+
              "<p>√ 此时打开油烟机的排烟功能，吸力便会把热蒸汽带入内部，抽烟机内部的油污也能轻松溶解。</p>"+
              "<p>第三步</p>"+
              "<p>√ 用抹布蘸取洗洁精，轻轻一擦，再顽固的污渍都能立刻去无踪！</p><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/4_3.4b569ba.gif><br/><br/>"+
              "<p>保鲜膜</p>"+
              "<p>油烟机在面板下方的细长油槽，别着急，一秒让它变干净！</p>"+
              "<p>第一步</p>"+
              "<p>√ 取出油槽。</p>"+
              "<p>第二步</p>"+
              "<p>√ 将保鲜膜铺在油槽内侧，贴合在凹槽里，再将油槽安装好即可。</p><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/4_4.f1de64f.jpg><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/4_5.b146475.jpg><br/><br/>"+
              "<p>学会这几招，一年到头抽烟机都干净如新~</p>"+
              "<b>不过，这只是简单的日常清洁，专家建议，对于家庭油烟机最好3-6个月做一次专业清洗。</b>"+
              "<b>自已清洗VS专业清洗</b>"+
              "<b>> 自己清洗</b>"+
              "<p>只能清洗外表，无法深度清洗</p>"+
              "<p> 大部分人并不了解烟机内部结构，清洗时，一般都是做一些表面的清洗，虽然表面上变干净了，但烟机内部还有很多细菌灰尘油污，并且还易损坏烟机。</p>"+
              "<b> > 专业烟机清洗</b>"+
              "<p> 受过专业培训和拥有专业清洗和维修经验的师傅，对烟机结构了然于心，遵循严格的步骤。一次专业的清洗能让烟机由内而外焕然一新，不用再频繁清洗。</p>"+
              "<b> > 自己清洗</b>"+
              "<p> 隐形“炸弹”，潜藏巨大安全隐患</p>"+
              "<p> 忘记关闭电源、灯罩破碎、内部电机电气零件沾水、电线松动和尖锐的边角，都可能给家人带来伤害。</p>"+
              "<p> 其次，选择错误的清洁剂和不规范的清洗流程，不仅会使清洁不彻底，甚至会在日后使用中因热量而引发爆炸！</p>"+
              "<p> 再加上不少清洁剂自身含毒性，如常用的万用清洁剂乙二醇丁醚，会对骨髓、神经系统、肝和肾造成影响，不正确的使用可能会引发中毒。</p>"+
              "<b> > 专业烟机清洗</b>"+
              "<p> 专业服务团队接受过严格的专业清洗培训和安全操作培训，遵循安全的清洗操作流程，确保烟机运行正常、任何边边角角无清洁剂残留，避免发生的安全事故。</p>"
          },
          {
            "title":"蘑菇租房+蜂鸟窝｜年终房东内部交流会",
            "photo":"/static/img/img_1.7ec6ca8.jpg",
            "date":"2019-01-12",
            "ListData":"蜂鸟窝又双叒叕在搞事情了，但这次和以往不一样，因为，蜂鸟窝首次和国内著名租房平台-蘑菇租房共同举办了这次内部房东交流活动。一个是前端的平台服务商，一个是后端的维保服务平台，一前一后，通过各自对行业的重构和专研，解决了房东最急需的推广和保障的问题，虽然是周末，虽然也是年末，虽然天气也很冷，但是大家的热情却很高，有从北京专程赶过来的房东朋友，有成都本地的热情房东，大家聚在一起，一起探讨行业，一起交流经验，干货满满，",
            "article":
              "<p style='text-align: center'>1月12日</p>"+
              "<p>蜂鸟窝又双叒叕在搞事情了，</p>"+
              "<p>但这次和以往不一样，</p>"+
              "<p><b>蜂鸟窝首次和国内著名租房平台-蘑菇租房共同举办了这次内部房东交流活动。</b></p><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/img_1.7ec6ca8.jpg><br/><br/>"+
              "<p>一个是前端的平台服务商，</p>"+
              "<p>一个是后端的维保服务平台，  </p>"+
              "<p>一前一后，</p>"+
              "<p>通过各自对行业的重构和专研，</p>"+
              "<p>解决了房东最急需的推广和保障的问题，</p><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/img_2.b12fdf5.jpg><br/><br/>"+
              "<p>虽然是周末，</p>"+
              "<p>虽然也是年末，</p>"+
              "<p>虽然天气也很冷，</p>"+
              "<p>但是大家的热情却很高，</p>"+
              "<p>有从北京专程赶过来的房东朋友，</p>"+
              "<p>有成都本地的热情房东，</p>"+
              "<p>大家聚在一起，</p>"+
              "<p>一起探讨行业，一起交流经验，</p>"+
              "<p>干货满满，</p><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/img_3.644f98d.jpg><br/><br/>"+
              "<b>蜂鸟窝：后租房市场，服务才是王道</b>"+
              "<p>其实这是个老生常谈的问题，18年的房屋租赁市场搞得大家叫苦连天，靠前期大流量的粗放式发展方式已经不复存在，有房不愁租的时代已经一去不复返。</p>"+
              "<p>在今后的房屋租赁市场，更多的是需要精细化的运营，精细化就意味着要为租客提升好的产品和服务，提高租客的满意度，这个才是永久不衰的法宝。</p>"+
              "<p>蜂鸟窝从行业出发，从服务出发，<b>致力于解决房屋的维保服务，通过成本重构、流程优化和改变服务模式，为租客提供便捷的维修服务，为房东大大的节约维修成本和时间成本，让房东从后期服务中解放出来，有更多的精力去做前期的运营推广。</b></p>"+
              "<p>比如蜂鸟窝推出的“包租无忧C”套餐，<b>398元一年的费用包含了常见的开锁疏通服务、七大类家电维修服务、五金维修服务，而且还包工包料，基本上解决了房东的维修问题。</b></p>"+
              "<p><b>而且现在的活动价仅需360/年，大大降低了房东的维修成本。</b></p><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/img_6.1d73938.gif><br/><br/>"+
              "<b>蘑菇租房张富强分享行业经验</b>"+
              "<p>蘑菇租房作为本次活动的主要发起人，蘑菇成都负责人张富强先生也是从各个角度为到场的房东朋友分享了他个人对这个市场的认识和经验，可谓也是干货满满，解决了大家不少的疑虑。</p><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/img_4.9b570e2.jpg><br/><br/>"+
              "<b>房东现场交流经验</b>"+
              "<p>应该说，房东朋友才是这次活动的主体。所以，所有的问也是在围绕房东的问题解决。</p>"+
              "<p>当然，现场的房东朋友作为本次活动的主人，大家踊跃发言，针对平时运营中遇到的各种难题，大家各抒己见，根据自己的理解和经验，大家倾囊相授，共同解决难题。</p><br/><br/>"+
              "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/img_5.16871c6.jpg><br/><br/>"+
              "<b>现场抽奖，引爆高潮</b>"+
              "<p>现场，蜂鸟窝抽取了10名幸运房东，赠送了全年的开锁疏通包年服务，把本次活动推向高潮。</p>"+
              "<b>不忘初心·砥砺前行</b>"+
              "<p>在房屋租赁市场，房东是一个特殊的群体存在，在行外人看来，房东个个是大款，几十上百上千套房子在出租，名副其实的“腰缠万贯”</p>"+
              "<p>在租客眼里，房东是不折不扣的“奸商”，腰包里装的都是租客的“血汗钱”。</p>"+
              "<p>但是，房东自己是一群什么样的人，背负了多少拿房的资金压力、房屋空置压力、维修服务压力、资金周转压力、有时候还要面对个班奇葩的租客，这其中的酸甜苦辣，也只有房东自己才能体会···</p>"+
              "<p>但是，正是房东的存在，才给了租客更多的选择，也是在激烈的市场竞争中一直在为中国租赁行业默默贡献自己的绵薄之力~\n</p>"
          },
          {
            "title":"房屋出租行业如何实现服务升级？蜂鸟窝是这样做的",
            "photo":"/static/img/wechat_20181222132957.84a43ff.png",
            "date":"2018-12-12",
            "ListData":"2018年的房屋租赁市场，每个房东都过得特别“慌”，随着各大头部平台的疯狂烧钱跑马圈地，使得分散的市场逐步规整起来，让流量的获取变得越来越难，租客更加注重体验。不管头部大平台，还是个人小房东，要想更好获客并留住租客，在租赁市场进入下半场，大家都意识到，唯有变，才能决战未来。但是怎么变？如何提升服务？如果降低运营费用?如何提高租客体验？这些问题是对房东最大的考量。对于房东而言，升级服务，意味着需要更多人力物力的投入，特别是维保服务这种不可控的事情，由于维修费用高，耗时长，导致了租客的体验非常不好，不好的体验一定会带来一系列的恶性循环。蜂鸟窝通过改变服务模式，重构成本结构，优化服务流程，让维修变得更省钱，让服务变得更简单。据了解，传统的维修服务平均耗时需要3天，每套房屋维修成本在300-1000元/年。蜂鸟窝通过对成本、流程、服务模式的改变，让房屋维保效率提升72倍，维保成本降低了2/3，房东处理维保耗时降低90%。比如，蜂鸟窝针对出租房推出的398元的“包租无忧C”包年维修服务套餐，用户可以一年之内享受不限次不限价的开锁、管道疏通、家电维修、五金维修服务，基本上涵盖了房屋所需要的维修范围，大大降低了维修成本！",
            "article":
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/wechat_20181222132957.84a43ff.png><br/><br/>"+
            "<p>2018年的房屋租赁市场，每个房东都过得特别“慌”，随着各大头部平台的疯狂烧钱跑马圈地，使得分散的市场逐步规整起来，让流量的获取变得越来越难，租客更加注重体验。不管头部大平台，还是个人小房东，要想更好获客并留住租客，在租赁市场进入下半场，大家都意识到，唯有变，才能决战未来。但是怎么变？如何提升服务？如果降低运营费用?如何提高租客体验？这些问题是对房东最大的考量。</p>"+
            "<p>对于房东而言，升级服务，意味着需要更多人力物力的投入，特别是维保服务这种不可控的事情，由于维修费用高，耗时长，导致了租客的体验非常不好，不好的体验一定会带来一系列的恶性循环。</p>"+
            "<p>蜂鸟窝通过改变服务模式，重构成本结构，优化服务流程，让维修变得更省钱，让服务变得更简单。</p>"+
            "<p>据了解，传统的维修服务平均耗时需要3天，每套房屋维修成本在300-1000元/年。蜂鸟窝通过对成本、流程、服务模式的改变，让房屋维保效率提升72倍，维保成本降低了2/3，房东处理维保耗时降低90%。比如，蜂鸟窝针对出租房推出的398元的“包租无忧C”包年维修服务套餐，用户可以一年之内享受不限次不限价的开锁、管道疏通、家电维修、五金维修服务，基本上涵盖了房屋所需要的维修范围，大大降低了维修成本！</p><br/><br/>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/wechat_20181222133946.4d508a0.png  ><br/><br/>"+
            "<p>活动现场，蜂鸟窝的首批用户李先生分享了他的使用感受。李：我一共有30多套房子在出租，在前期与蜂鸟窝的接洽中就比较有兴趣，觉得可以省时、省钱。然后就马上买了蜂鸟窝的服务，才两个多月就已经叫了10次服务，整个服务来看，蜂鸟窝给我的感觉就是特别快，而且通过他们的系统很便捷，服务效果也很好，完全不用自己养工人，节约了不少成本开支。希望蜂鸟窝再出其他产品，能完全帮助房东解决更多的问题。</p>"+
            "<p>从几套到几十套，从单项的开锁疏通到全套的包年套餐服务，作为蜂鸟窝的用户的缩影，从开始的犹豫到完全的信任，李先生分享了自己使用蜂鸟窝维修服务产品的感受。</p>"+
            "<p>“快”、“便捷”、“便宜”几个关键词恰好体现了蜂鸟窝产品的优势。</p>"+
            "<p>活动现场，蜂鸟窝还对到场的嘉宾，通过抽奖的方式，免费赠送了100套家电维修服务！</p>"+
            "<p>蜂鸟窝是四川家快保科技有限公司创立的房屋维保服务平台，为房屋所有者、租赁者、销售者以及第三方托管机构提供房屋维保服务，已经和幸福居、熊猫公寓、便利客、助享优家、美宿美栖等房屋租赁平台达成了合作。</p>"+
            "<p>“快”、“便捷”、“便宜”几个关键词恰好体现了蜂鸟窝产品的优势。</p>"
          },

          {
            "title":"【快讯】蜂鸟窝助力成华建设路“商居联盟”正式成立！",
            "photo":"/static/img/3_1.e98601b.jpg",
            "date":"2018-11-7",
            "ListData":"您知道吗?就在11月7日,成华区“商居联盟”正式成立！蜂鸟窝作为首批发起企业,以创新的模式和服务，正走进居民的生活，商居联盟是什么？由建设路街道联合辖区蜂鸟窝在内的7家企业共同创立，旨在为居民提供极具性价比的生活服务团体组织。蜂鸟窝作为众多商家中唯一一家科技型互联网房屋维保综合服务平台，将创新的服务模式和优惠的价格为房屋提供便捷、安全、优惠的维保服务，现场得到了社区领导和社区广大居民和房东的一致赞许。",
            "article":
            "<p style='text-align: center'>您知道吗</p>"+
            "<p style='text-align: center'>就在11月7日<br/>成华区“商居联盟”正式成立！<br/>蜂鸟窝作为首批发起企业<br/>以创新的模式和服务<br/>正走进居民的生活 </p><br/><br/>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/3_1.e98601b.jpg><br/><br/>"+
            "<p style='text-align: center'><b>商居联盟是什么？</b></p>"+
            "<p>由建设路街道联合辖区蜂鸟窝在内的7家企业共同创立，旨在为居民提供极具性价比的生活服务团体组织。</p><br/><br/>"+
            "<p>蜂鸟窝作为众多商家中唯一一家科技型互联网房屋维保综合服务平台，将创新的服务模式和优惠的价格为房屋提供便捷、安全、优惠的维保服务，现场得到了社区领导和社区广大居民和房东的一致赞许。</p>"+
            "<p>通过“商居联盟”平台，蜂鸟窝接下来将联合成都市最优质的房屋维保服务资源和自有服务团队，为成都市所有的居民提供最优质的房屋维保服务！</p><br/><br/>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/3_2.882cdae.jpg><br/><br/>"+
            "<p style='text-align: center'><b>公益集市打造温暖社区</b></p>"+
            "<p>“我们运气好，来到建中社区就遇到这么多好事情，免费品尝了很多东西，商家和居民其乐融融，住建中，很安逸！”新搬进九街坊的重庆陈宇文和女友对成华区建设路商圈公益集市赞不绝口。</p>"+
            "<p>建设中路社区书记严刚英表示，这是社区为积极拉动消费，提升商圈人气，融洽商家和居民关系而开展的商居互动活动。“赚不赚钱不重要，图个闹热！”</p>"+
            "<p>社区主任、商居联盟首任会长谌立英说，为了繁荣社区经济，这样的公益集市将定期举行，“我们将在此基础上建立社区基金，尽可能帮助更多的特殊居民。”</p>"+
            "<p style='text-align: center'>蜂鸟窝作为商居联盟的首批发起者<br/>自然是拿出了120%的诚意</br>比如<br/>针对我们的房东客户<br/><b>您只需要“一次维修价格”<br/>既可享受“全年维修不限次”<br/>家电维修<br/>家电清洗<br/>开锁疏通<br/>五金维修<br/>只要交给蜂鸟窝<br/>通通为您搞定<br/>您无需再操心房屋的维修问题<b/></p>"+
            "<p style='text-align: center'>关键还非常便捷<br/>关键还非常便捷<br/>关键还非常便捷<br/><b>只需一键呼叫服务<br/>蜂鸟窝5分钟内响应，最快30分钟上门服务!<br/>你根本不用到现场<br/>让您做甩手房东~<b/></p><br/><br/>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/3_3.ef71241.jpg>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/3_4.5d17b6a.jpg>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/3_5.485bb69.jpg>"+
            "<p>▲包租无忧产品套餐 </p><br/><br/>"+
            "<p style='text-align: center'>如果您觉得这还不够<br/>也可以联系我们的工作人员<br/>（客服妹子声音超好听哦~）<br/>电话记好了<br/><span style='color: dodgerblue'>400-8084-989</span><br/>我们根据您的情况<br/>为您定制服务项目<br/><b>省钱</b><br/><b>省时</b><br/><b>便捷</b><br/><b>安全</b><br/>我们都为您考虑好了~</p>"
          },

          {
            "title":"29岁，月入10万的房东揭秘包租行业的那些事",
            "photo":"/static/img/5_1.0fecde1.jpg",
            "date":"2018-10-22",
            "ListData":"一直以来，在房屋租赁市场上，房屋在使用过程中的维保问题一直是房东和租客绕不过的弯。对于出租房而言，房东在设施设备的配置上，更倾向于选择一些性价比高的小厂商生产的产品，这类产品在品质的把控上面逊于大厂，再加上租客是一个流动性很强的群体，在产品的使用过程中往往也不爱惜，所以造成出租房的设施设备故障率一般都比较高。",
            "article":
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/5_1.0fecde1.jpg><br/><br/>"+
            "<p>一直以来，在房屋租赁市场上，房屋在使用过程中的维保问题一直是房东和租客绕不过的弯。</p>"+
            "<p>对于出租房而言，房东在设施设备的配置上，更倾向于选择一些性价比高的小厂商生产的产品，这类产品在品质的把控上面逊于大厂，再加上租客是一个流动性很强的群体，在产品的使用过程中往往也不爱惜，所以造成出租房的设施设备故障率一般都比较高。然而设施设备的维修是一件费钱又费事的事情，如果处理不好维修问题往往会影响房东和租客的关系，给租客造成很不好的体验，也会造成房屋二次出租的困难。那么，如何有效的解决这个问题，降低房屋的维保成本，提升用户体验呢？蜂鸟窝的COO陈先生专门邀请到了资深的房屋租赁运营商——周先生，分享如何解决房屋出租过程中的维保问题。周先生在成都有30多套房子在出租，几年前的周先生也是租客，很清楚租客的痛点和述求，通过和“蜂鸟窝”的合作，成功解决了房屋出租过程中的维保问题，大大提升了租客的体验。</p>"+
            "<p>然而设施设备的维修是一件费钱又费事的事情，如果处理不好维修问题往往会影响房东和租客的关系，给租客造成很不好的体验，也会造成房屋二次出租的困难。</p><br/><br/>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/5_2.115a52b.jpg><br/><br/>"+
            "<p style='font-size: 28px'><b>那么，如何有效的解决这个问题，降低房屋的维保成本，提升用户体验呢？</b></p>"+
            "<p>蜂鸟窝的COO陈先生专门邀请到了资深的房屋租赁运营商——周先生，分享如何解决房屋出租过程中的维保问题。</p>"+
            "<p><b>周先生在成都有30多套房子在出租，几年前的周先生也是租客，很清楚租客的痛点和述求，通过和“蜂鸟窝”的合作，成功解决了房屋出租过程中的维保问题，大大提升了租客的体验。 </b></p><br/><br/>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/5_3.5a40dc6.jpg><br/><br/>"+
            "<p><b style='font-size: 28px'>Q&A</b></p>"+
            "<b style='font-size: 28px'>Q:为什么选择做租赁行业？您对租赁行业是怎样看待的？</b>"+
            "<p><b>A</b>：这还得源于我之前在广州租房的一个体验，当时我发现一个问题，在广州这种外来人口相对比较多的大城市，对于租客来说要租到一个心仪的房子非常困难；对于房东而言，要找到一个合适的租客也不是一件容易的事情，所以我觉得房屋租赁行业在一线城市是一个很有需求的行业，同时也是一个新兴行业，所以回到成都后我就毅然的做了房屋租赁。</p>"+
            "<p>当然，目前对于这个行业最大的风险在于国家政策对房屋租赁的态度，如果政策支持或者允许的情况下我会一直在这个行业深耕下去，特别是国家政策对于n+1的态度，如果政策允许n+1的存在，这个行业还是有利润的，如果政策不允许对房屋进行改建，那么基本上这个行业就没有什么利润了，毕竟现在的利润就来源于最后的那个“1”。（注“n+1”是指一套房屋多改建出来一个房间）</p><br/><br/>"+
            "<b style='font-size: 28px'>Q:房屋家电维修费用一般是谁出？有哪些分摊模式？</b>"+
            "<p><b>A</b>:目前而言还没有一个统一的标准，具体得看租房的时候怎么谈，有的是租客出，有的是自己贴钱维修，但最终不管是谁出都不能对房屋的租赁造成影响，还是以房屋能顺利租出去为最终目的。</p><br/><br/>"+
            "<b style='font-size: 28px'>Q:与“蜂鸟窝”合作前对于维修服务是怎么解决的？</b>"+
            "<p><b>A</b>:在此之前我一般都是找外面有实体店面的维修服务站，目的是以便于如果真的出现问题能找到相关责任人，有售后保障。</p><br/><br/>"+
            "<img style='margin-left:auto;margin-right:auto;display:flex;max-width:100%;max-height:100%' src=/static/img/5_4.eaeed49.jpg><br/><br/>"+
            "<b style='font-size: 28px'>Q:在与其他服务合作过程中会遇到哪些问题？如何处理这些问题？</b>"+
            "<p><b>A</b>:过程中其实还是会担心乱收费的问题，不过在合作之前也会询问清楚价格，还有就是直接告诉维修人员自己有很多房屋在出租，让对方给出一个合适的价格，同时做好服务。如果价格公道加上把服务做好，后面自己的房屋维保就会都交由他来做。</p>"+
            "<p>一般情况下大部分维修服务提供商都还是会给出比较优惠的价格，服务质量也还行。 </p><br/><br/>"+
            "<p><b style='font-size: 28px'>Q:为什么会选择“蜂鸟窝”作为合作伙伴？ </b></p>"+
            "<p><b>A</b>:当时了解到蜂鸟窝是一个房屋维保服务平台，所以还是想尝试一下新东西吧！ </p>"+
            "<p><b>其实还有一个主要的原因就是“蜂鸟窝”的价格确实很有优势。 </b></p><br/><br/>"+
            "<p><b style='font-size: 28px'>Q:在与“蜂鸟窝”合作过程中，觉得最满意的是什么？最不满意的是什么？ </b></p>"+
            "<p><b>A</b>:我当时购买了几套包年的家庭综合维修服务，目前为止已经报修了有4次，<b>总体而言我觉得响应速度挺快的，基本上租客只要一报修，蜂鸟窝都会5分钟内的响应，并提供服务，租客对服务非常满意</b>，不像我之前找的维修机构，有时候要拖好几天，响应非常的慢，特别影响租客的体验。 </p>"+
            "<p><b>其次，蜂鸟窝维修师傅的专业性和服务态度也挺不错的，目前而言我和租客对蜂鸟窝挺满意的。 </b></p><br/><br/>"+
            "<p><b style='font-size: 28px'>Q:您对蜂鸟窝有什么意见和建议？ </b></p>"+
            "<p><b>A</b>:就目前体验起来的感受挺好的，也没有什么意见。 </p>"+
            "<p>要说真有建议的话就是希望“蜂鸟窝”能针对我们房东再推出一些其他性价比高的产品套餐。 </p>"
          }
        ],
        pageIndex:0,
        showList:[],
        currentPage:1, //初始页
        pagesize:3,    //    每页的数据

      }
    },
    methods:{
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.showList = this.newsdata.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
      },
      detailPage: function(index){
        let a = (this.currentPage-1)*3+index
        this.$emit("showDetail",this.newsdata[a])
        localStorage.setItem('currentPage',this.currentPage)
        this.$router.push('/NewsDetail')
      }
    },
    created:function(){
      if(localStorage.getItem('currentPage')==null){
        this.currentPage=1
      }else{
        this.currentPage=parseInt(localStorage.getItem('currentPage'))
      }

      this.showList = this.newsdata.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
      localStorage.removeItem('currentPage')
    }
}
</script>
<style scoped>
.title{
  text-align: center;
  color: #499ef0;
}
.left{
  flex-grow:1
}
.right{
  flex-grow:1;margin-left:30px;
}
.item{
  margin-left: auto;
  margin-right:auto;
  margin-bottom: 20px;
  font-family: PingFangSC-Regular;
  display: flex;
  width: 88%;
  background-color:  #fafafa;;
  height:240px;
  position: relative;
  padding: 37px;
  box-sizing: border-box
}
img{
  height:160px;
  width:160px;
}
.title_outer{
  height:24px;
}
.title_inner{
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-break: break-all;
  overflow: hidden;
  color: #333333;font-size: 20px;margin:0
}
.outer{
  height:80px;
}
.outer p{
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.inner{
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-break: break-all;
  overflow: hidden;
  font-size: 18px;
}
.box{
        max-width: 100%;
 }
 .img {
         padding-top:30.85%; /* 比例 */
         background: url("../../../assets/news_banner.png") no-repeat;
          background-size:cover;
          background-position:center;
    }
.detailButton{
  float:right;cursor:pointer;border:1px solid #499ef0;padding:2px 15px;border-radius: 8%
}
.detailButton :hover{
  color:white;background-color: #499ef0
}
    @media only screen and (max-width: 878px) {
      .item{
        height:200px
      }
      .left img{
        height:120px;
        width: 120px;
      }
      .right{
        margin-left:10px
      }
      .detailButton{
        display: none
      }
      .outer p{
        margin-top:5px;
        margin-bottom: 5px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .time{
        position: absolute;
        bottom:42px
      }
      .inner{
        font-size: 16px
      }
      .item{
        width: 100%
      }
    }
</style>
