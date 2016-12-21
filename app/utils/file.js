/* eslint import/prefer-default-export:0 */
/* eslint no-restricted-properties:0 */

export function formatBytes(bytes, decimals) {
  if (bytes === 0) {
    return '0 Byte';
  }
  const k = 1000; // or 1024 for binary
  const dm = decimals + 1 || 3;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
