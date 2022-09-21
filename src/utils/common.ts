/**
 * 随机数生成5位数
 */
export function randomNumber(): number {
  return Math.ceil(Math.random() * 99999);
}

const hexList: string[] = [];
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16);
}

export function buildUUID(len = 8, radix = 0, containTime = 0): string {
  // let uuid = '';
  // for (let i = 1; i <= 36; i++) {
  //   if (i === 9 || i === 14 || i === 19 || i === 24) {
  //     uuid += '-';
  //   } else if (i === 15) {
  //     uuid += 4;
  //   } else if (i === 20) {
  //     uuid += hexList[(Math.random() * 4) | 8];
  //   } else {
  //     uuid += hexList[(Math.random() * 16) | 0];
  //   }
  // }
  // return uuid.replace(/-/g, '');
  var now = new Date();
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  );
  var uuid = [];
  var i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  if (containTime == null && containTime == true) {
    return now.getTime() + '' + uuid.join('');
  } else return uuid.join('');
}

let unique = 0;
export function buildShortUUID(prefix = ''): string {
  const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  unique++;
  return prefix + '_' + random + unique + String(time);
}
