import * as FileSystem from 'expo-file-system';
import { WDFiles } from 'widelab-utils';

export interface FileData {
  fileName: string;
  fileUri: string;
  data: Promise<string>;
}

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
  const mimeType = WDFiles.extensionToMimeType(ext);
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
