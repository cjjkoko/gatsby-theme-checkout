
/**
 * 去掉特殊字符,返回true为空，返回false不为空
 * @param字符检验
 *
 */
export function isOrNotEmpty (s) {
  if (!!s) {
    switch (typeof (s)) {
      case 'string':
        // @ts-ignore
        if (s !== '' || s !== 'null') {
          return false
        }
        return true
      case 'number':
        return false
      case 'object':
        if (JSON.stringify(s) === '{}' || JSON.stringify(s) === '[]') {
          return true
        }
        return false
    }
    return true
  }
  return true
}

export function ObjToString (obj) {
  switch (typeof (obj)) {
    case 'object':
      let newData = ''
      if (obj.length >= 1) {
        newData += '['
        obj.map(item => {
          switch (typeof (item)) {
            case 'object':
              newData += '{'
              Object.keys(item).map(key => {
                newData += `${key}:${ObjToString(item[key])},`
              })
              newData = newData.slice(0, newData.length - 1)
              newData += '},'
              break
            case 'string':
              newData += item
              newData += ','
              break
          }
        })
        newData = newData.slice(0, newData.length - 1)
        newData += ']'
      }else{
        newData += '{'
        Object.keys(obj).map(key => {
          newData += `${key}:${ObjToString(obj[key])},`
        })
        newData = newData.slice(0, newData.length - 1)
        newData += '}'
      }
      return newData
    case 'number':
      return obj
    default:
      let str = obj.toString()
      if(str.indexOf('enum')!==-1){
        str = str.slice(4,str.length)
        return `${str}`
      }
      return `"${obj.toString()}"`
  }
}

export function graphQLStrData (obj) {
  if (obj === null) {
    return 'null'
  }
  if (obj === undefined) {
    return 'undefined'
  }
  switch (typeof (obj)) {
    case 'number':
    case 'boolean':
    case 'object':
      return obj
    default:
      if (obj.slice(0, 1) === '"') {
        return `${decodeURIComponent(encodeURIComponent(obj).replace(/%0A/g,`\\n`))}`
      } else {
        return `"${decodeURIComponent(encodeURIComponent(obj).replace(/%0A/g,`\\n`))}"`
      }

  }
}


export function grapQLData (obj) {
  let newData = ''
  Object.keys(obj).map(key => {
    newData += `${key}:${ObjToString(obj[key])},`
  })
  return newData.slice(0, newData.length - 1)
}

export function isItemInList (list, obj, key) {
  if (isOrNotEmpty(list)) {
    return false
  }
  for (const item of list) {

    if (item[key] === obj) {
      return true
    }
  }

  return false
}

