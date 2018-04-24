

/*eslint-disable*/

/***
 * array = [
 *  { a: 1 }
 *  { a: 1 }
 *  { b: 1 }
 * ]
 */
export const unique = (array, key) => {
  const filter =  array.reduce((acc, val) => {
    acc[val[key]] = val;
    return acc
  }, {})
  let result = []
  for (let key in filter) {
    result.push(filter[key])
  }
  return result
}


export const formatPhone = (phone) => {
  return phone.substr(0, 3) + '****' + phone.substr(7, 11);
}
