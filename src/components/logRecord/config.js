/**
 * @description 操作日志
 * @param gTableColumns {array} 日志列表table配置项
 */

const gTableColumns = [{
  prop: 'date',
  label: '时间'
},
{
  prop: 'name',
  label: '操作人'
},
{
  prop: 'source',
  label: '来源'
},
{
  prop: 'content',
  label: '操作内容'
}
]

export {
  gTableColumns
}
