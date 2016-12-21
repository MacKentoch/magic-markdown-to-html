const appConfig = {
  // date formats:
  dateFormat: 'DD/MM/YYYY',

  // persist storages:
  persistStore: {
    type: 'localStorage',
    allTypes: ['localStorage', 'electron-json-storage', 'tedious']
  },

  // all files mime types (at least these managed by this application):
  fileMimeTypes: [
    // txt:
    'txt',
    'text/plain',
    // zip:
    'zip',
    'application/x-compressed',
    'application/x-zip-compressed',
    'application/zip',
    'multipart/x-zip',
    // rar
    'rar',
    // 7zip:
    '7zip',
    // pdf:
    'pdf',
    'application/pdf',
    // doc:
    'doc',
    'application/msword',
    'docx',
    // excel:
    'xls',
    'application/excel',
    'application/vnd.ms-excel',
    'application/x-excel',
    'application/x-msexcel',
    'xlsx',
    // csv:
    'csv',
    // images:
    'png',
    'image/png',
    'jpg',
    'jpeg',
    'image/jpeg',
    'image/pjpeg',
    'bmp',
    'image/bmp',
    'image/x-windows-bmp'
  ],

  // notifications:
  notifications: {
    timeout: 1000,
    defaultAction: 'Dismiss'
  },

  // mssql:
  mssqlConfig: {
    user: '...',
    password: '...',
    server: '...', // You can use 'localhost\\instance' to connect to named instance
    database: '...'
    // options: {
    //     encrypt: true // Use this if you're on Windows Azure
    // }
  }
};

export default appConfig;
