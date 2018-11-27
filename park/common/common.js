export default {
  //接口IP
  // basePath: 'http://10.0.0.113:8282/zone2.0',
  // basePath:'https://huigu.sxfs0351.com',
  basePath:'https://www.sxhgpark.com',
  //接口地址
  InterfaceUrl: {
      upload:'/api/visitor/uploadFacePicture',
      //手机号码查公司
      checkMember:'/api/visitor/obtainIntervieweeByPhone',
      //发送短信
      sendCode:'/api/visitor/sendVerificationCode',
      //reson
      reson:'/api/visitor/obtainDictInfo',
      //录入
      save:'/api/visitor/entryVisitorInfo',
      //获取token
      login:'/api/visitorAppLogin',
      //判断用户是否录入
      again:'/api/visitor/obtainVisitorInfo'
  }
}