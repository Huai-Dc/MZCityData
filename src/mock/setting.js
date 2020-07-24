import Mock from 'mockjs'

Mock.mock(/\/getUsers/, 'post', function(options){
    return Mock.mock({
        'name': '@first',
        'userId': /[a-z][A-Z][0-9]\d{5,10}/,
        'phone': '',
        'email': '',
        'status': [],
        'password': '',
        'loginName': '',
        'dept': '', // 部门
        'post': '', // 岗位
    })
})
