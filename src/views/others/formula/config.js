

export const calculateOptions = [
  {
    label: '+',
    value: '+',
  },
  {
    label: '-',
    value: '-',
  },
  {
    label: '*',
    value: '*',
  },
  {
    label: '/',
    value: '/',
  },
  {
    label: '(',
    value: '(',
  },
  {
    label: ')',
    value: ')',
  },
]



export const formatOptions = [
  {
    label: '保留整数',
    value: 0,
  },
  {
    label: '保留1位小数',
    value: 1,
  },
  {
    label: '保留2位小数',
    value: 2,
  },
  {
    label: '保留3位小数',
    value: 3,
  },
  {
    label: '保留4位小数',
    value: 4,
  },
]




export const customFieldConfig = [
  {
    label: 'CASE',
    content: `CASE 
    WHEN 条件1 THEN 结果1
    [WHEN 条件2 THEN 结果2]
    ...
    [WHEN 条件N THEN 结果N]
    [ELSE 结果] 
END`,
    tips: '条件函数',
  },
  {
    label: 'SUM',
    content: `SUM( 取值列 ) OVER ( PARTITION BY 分组列1 [,分组列2 ... ] )`,
    tips: '计算窗口内数据的和',
  },
  {
    label: 'AVG',
    content: `AVG( 取值列 ) OVER ( PARTITION BY 分组列1 [,分组列2 ... ] )`,
    tips: '计算窗口内数据的平均值',
  },
  {
    label: 'MAX',
    content: `MAX( 取值列 ) OVER ( PARTITION BY 分组列1 [,分组列2 ... ] )`,
    tips: '计算窗口内数据的最大值',
  },
  {
    label: 'MIN',
    content: `MIN( 取值列 ) OVER ( PARTITION BY 分组列1 [,分组列2 ... ] )
    `,
    tips: '计算窗口内数据的最小值',
  },
  {
    label: 'COUNT',
    content: `COUNT( 取值列 ) OVER ( PARTITION BY 分组列1 [,分组列2 ... ] )
    `,
    tips: '计算窗口内数据出现次数',
  },
  {
    label: 'RANK',
    content: `RANK( ) OVER ( PARTITION BY 分组列1 [,分组列2 ... ] ORDER BY 排序列1 [,排序列2 ...] )`,
    tips: '表示排名，会出现空缺数字',
  },
  {
    label: 'DENSE_RANK',
    content: `DENSE_RANK() OVER( PARTITION BY 分组列1 [,分组列2 ... ] ORDER BY 排序列1 [,排序列2 ...] )`,
    tips: '表示排名，不会出现空缺数字',
  },
  {
    label: 'FIRST_VALUE',
    content: `FIRST_VALUE( 取值列 ) OVER ( PARTITION BY 分组列1 [,分组列2 ... ] ORDER BY 排序列1 [,排序列2 ...] )`,
    tips: '返回窗口范围内的第一个值',
  },
  {
    label: 'LAST_VALUE',
    content: `LAST_VALUE( 取值列 ) OVER ( PARTITION BY 分组列1 [,分组列2 ... ] ORDER BY 排序列1 [,排序列2 ...] )`,
    tips: '返回窗口范围内的最后一个值',
  },
  {
    label: 'LEAD',
    content: `LEAD( 取值列, offset, default) OVER ( PARTITION BY 分组列1 [,分组列2 ... ] ORDER BY 排序列1 [,排序列2 ...] )`,
    tips: '计算当前行向后数若干行的值',
  },
  {
    label: 'LAG',
    content: `LAG( 取值列, offset, default) OVER ( PARTITION BY 分组列1 [,分组列2 ... ] ORDER BY 排序列1 [,排序列2 ...] )`,
    tips: '用来计算当前行向前数若干行的值',
  },
  {
    label: 'ROW_NUMBER',
    content: `ROW_NUMBER() OVER( PARTITION BY 分组列1 [,分组列2 ... ] ORDER BY 排序列1 [,排序列2 ...] )`,
    tips: '为每个分组的每一行返回一个从1开始连续递增的整数',
  },
]
