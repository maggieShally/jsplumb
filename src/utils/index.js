

export function uuid(prefix = "") {
  return `${prefix}${URL.createObjectURL(new Blob()).slice(-36)}`
}
