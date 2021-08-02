// 注意调用$.get 或者$.post() 或者$.ajax() 的时候
// 会调用ajaxPrefilter（）这个函数
// 在函数中，可以拿到ajax提供的配置对象

$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);

})