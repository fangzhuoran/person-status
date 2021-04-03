var arrayToTree = require('array-to-tree')
const arr = [
  { id: 'a', pid: '', name: '总裁办' },
  { id: 'b', pid: '', name: '行政部' },
  { id: 'c', pid: '', name: '财务部' },
  { id: 'd', pid: 'c', name: '财务核算部' },
  { id: 'e', pid: 'c', name: '税务管理部' },
  { id: 'f', pid: 'e', name: '税务管理部-分部' }
]

const r = arrayToTree(arr, {
  parentProperty: 'pid',
  customID: 'id'
})
console.log(JSON.stringify(r))[
  ({ id: 'a', pid: '', name: '总裁办' },
  { id: 'b', pid: '', name: '行政部' },
  {
    id: 'c',
    pid: '',
    name: '财务部',
    children: [
      { id: 'd', pid: 'c', name: '财务核算部' },
      {
        id: 'e',
        pid: 'c',
        name: '税务管理部',
        children: [{ id: 'f', pid: 'e', name: '税务管理部-分部' }]
      }
    ]
  })
]
