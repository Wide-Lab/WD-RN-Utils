import * as FileSystem from 'expo-file-system';

export interface FileData {
  fileName: string;
  fileUri: string;
  data: Promise<string>;
}

/**
 * Converte a extensão de um arquivo em seu tipo MIME correspondente.
 * Converts a file's extension to its corresponding MIME type
 * @param extension - The file's extension
 * @returns O tipo MIME correspondente à extensão ou 'text/plain' se não for encontrado.
 * @returns The MIME type corresponding to the extension or 'text/plain' if not found
 */
export const extensionToMimeType = (extension: string): string => {
  const types = {
    '3g2': 'video/3gpp2',
    '3gp': 'video/3gpp',
    '7z': 'application/x-7z-compressed',
    aac: 'audio/aac',
    abw: 'application/x-abiword',
    arc: 'application/x-freearc',
    avi: 'video/x-msvideo',
    avif: 'image/avif',
    azw: 'application/vnd.amazon.ebook',
    bin: 'application/octet-stream',
    bmp: 'image/bmp',
    bz: 'application/x-bzip',
    bz2: 'application/x-bzip2',
    cda: 'application/x-cdf',
    cmx: 'image/x-cmx',
    cod: 'image/cis-cod',
    csh: 'application/x-csh',
    css: 'text/css',
    csv: 'text/csv',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    eot: 'application/vnd.ms-fontobject',
    epub: 'application/epub+zip',
    gif: 'image/gif',
    gz: 'application/gzip',
    htm: 'text/html',
    html: 'text/html',
    ico: 'image/x-icon',
    ics: 'text/calendar',
    ief: 'image/ief',
    jar: 'application/java-archive',
    jfi: 'image/pipeg',
    jpe: 'image/jpeg',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'text/javascript',
    json: 'application/json',
    jsonld: 'application/ld+json',
    mid: 'audio/midi',
    midi: 'audio/midi',
    mjs: 'text/javascript',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    mpeg: 'video/mpeg',
    mpkg: 'application/vnd.apple.installer+xml',
    odp: 'application/vnd.oasis.opendocument.presentation',
    ods: 'application/vnd.oasis.opendocument.spreadsheet',
    odt: 'application/vnd.oasis.opendocument.text',
    oga: 'audio/ogg',
    ogv: 'video/ogg',
    ogx: 'application/ogg',
    opus: 'audio/opus',
    otf: 'font/otf',
    pbm: 'image/x-portable-bitmap',
    pdf: 'application/pdf',
    pgm: 'image/x-portable-graymap',
    php: 'application/x-httpd-php',
    png: 'image/png',
    pnm: 'image/x-portable-anymap',
    ppm: 'image/x-portable-pixmap',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    rar: 'application/vnd.rar',
    ras: 'image/x-cmu-raster',
    rgb: 'image/x-rgb',
    rtf: 'application/rtf',
    sh: 'application/x-sh',
    svg: 'image/svg+xml',
    tar: 'application/x-tar',
    tif: 'image/tiff',
    tiff: 'image/tiff',
    ts: 'video/mp2t',
    ttf: 'font/ttf',
    txt: 'text/plain',
    vsd: 'application/vnd.visio',
    wav: 'audio/wav',
    weba: 'audio/webm',
    webm: 'video/webm',
    webp: 'image/webp',
    woff: 'font/woff',
    woff2: 'font/woff2',
    xbm: 'image/x-xbitmap',
    xhtml: 'application/xhtml+xml',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xml: 'application/xml',
    xpm: 'image/x-xpixmap',
    xul: 'application/vnd.mozilla.xul+xml',
    xwd: 'image/x-xwindowdump',
    zip: 'application/zip',
  };

  const typeValue = types[extension as keyof typeof types];

  if (typeValue) {
    return typeValue;
  }

  return 'text/plain';
};

/**
 * Moves a file to the documents directory
 * @param uri - The URI of the file to be moved
 * @param customFileName - A Custom file name (optional).
 * @returns The new URI of the moved file
 */
export const moveFileToDocumentDir = async (
  uri: string,
  customFileName?: string
): Promise<string> => {
  const uriParts = uri.split('/');
  const fileName = uriParts.pop();
  const fileNameParts = (fileName || '').split('.');
  const ext = fileNameParts.pop();
  const newUri = `${FileSystem.documentDirectory}${
    customFileName || fileNameParts.join('.')
  }.${ext}`;
  const newUriParts = newUri.split('/');
  const newFilePath = newUriParts.slice(0, -1).join('/');
  const dirInfo = await FileSystem.getInfoAsync(newFilePath);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(newFilePath);
  }

  await FileSystem.copyAsync({
    from: uri,
    to: newUri,
  });

  return newUri;
};

/**
 * Reads the contents of a file in base64 format
 * @param filePath - The file path to read
 * @returns The file contents in base64 format
 */
export const getFileBase64 = async (filePath: string): Promise<string> => {
  const fileInfo = await FileSystem.getInfoAsync(filePath);

  if (!fileInfo.exists) {
    throw new Error(`Arquivo ${filePath} não existe!`);
  }

  const fileparts = filePath.split('.');
  const ext = fileparts[fileparts.length - 1];
  const mimeType = extensionToMimeType(ext);
  const cacheBase64 = await FileSystem.readAsStringAsync(filePath, {
    encoding: 'base64',
  });
  return `data:${mimeType};base64,${cacheBase64}`;
};

/**
 * Reads the contents of a file in base64 format, without the MIME type
 * @param filePath - The path of the file to read
 * @returns The file contents in base64 format, excluding the MIME type
 */
export const getFileBase64NoMimeType = async (
  filePath: string
): Promise<string> => {
  const defaultBase64 = await getFileBase64(filePath);
  return defaultBase64.replace(/data:.+;base64,/g, '');
};

/**
 * Gets a list of files in a especific directory
 * @param path - The directory path where files should be searched
 * @returns The list of FileData object representing the files found
 */
export const getFilesInFolder = async (path: string) => {
  const pathFiles = `${FileSystem.documentDirectory}${path}`;
  const directory = await FileSystem.readDirectoryAsync(pathFiles);
  const files: FileData[] = [];

  for (const fileName of directory) {
    const fileUri = `${pathFiles}${fileName}`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (fileInfo.exists && !fileInfo.isDirectory) {
      files.push({
        fileName,
        fileUri,
        data: FileSystem.readAsStringAsync(fileUri),
      });
    }
  }

  return files;
};

/**
 * Gets a Blob object from the URI of a file
 * @param fileUri - The URI of the file to be converted to Blob
 * @returns A Blob object representing the file
 */
export const getBlob = async (fileUri: string) => {
  const resp = await fetch(fileUri);
  return await resp.blob();
};

/**
 * Gets a extension of a file name
 * @param fileName - The name of the file to be converted
 * @returns The file extension (without the dot), or an empty string if ther is no extension
 */
export const getFileNameExtension = (fileName: string) => {
  const fileNameParts = fileName.split('.');
  const ext = fileNameParts.pop();
  return ext || '';
};
