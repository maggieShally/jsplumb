

export function uuid(prefix = "") {
  return `${prefix}${URL.createObjectURL(new Blob()).slice(-36)}`
}

export function localGet(key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    let a = 3
    return value
  }
}

export function localSet(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove(key) {
  window.localStorage.removeItem(key)
}

export function copyText(text, callback) {
  // text: 要复制的内容， callback: 回调
  var tag = document.createElement('input')
  tag.setAttribute('id', 'cp_input')
  tag.value = text
  document.getElementsByTagName('body')[0].appendChild(tag)
  document.getElementById('cp_input').select()
  document.execCommand('copy')
  document.getElementById('cp_input').remove()

  if (callback) {
    callback(text)
  }
}