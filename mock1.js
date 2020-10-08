const Mock = require('mockjs')
const data = Mock.mock({
    'list|100-2000': [{
        'id|+1': 1,
        title: '@title(5, 10)',
        timestamp: +Mock.Random.date('T'),
        display_time: '@datetime'
    }]
})

console.log(data)