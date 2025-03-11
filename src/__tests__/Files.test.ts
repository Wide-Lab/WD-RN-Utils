import { extensionToMimeType, getFileNameExtension } from '../Files';

describe('utils/Files', () => {
  describe('extensionToMimeType', () => {
    it('should return the correct MIME type for known extensions', () => {
      expect(extensionToMimeType('mp4')).toBe('video/mp4');
      expect(extensionToMimeType('jpeg')).toBe('image/jpeg');
      expect(extensionToMimeType('pdf')).toBe('application/pdf');
      expect(extensionToMimeType('html')).toBe('text/html');
    });

    it('should return "text/plain" for unknown extensions', () => {
      expect(extensionToMimeType('unknown')).toBe('text/plain');
      expect(extensionToMimeType('random')).toBe('text/plain');
    });

    it('should handle edge cases', () => {
      expect(extensionToMimeType('')).toBe('text/plain');
    });
  });

  describe('getFileNameExtension', () => {
    it('should return the correct extension for a file name with a single extension', () => {
      expect(getFileNameExtension('document.pdf')).toBe('pdf');
      expect(getFileNameExtension('image.jpeg')).toBe('jpeg');
      expect(getFileNameExtension('archive.zip')).toBe('zip');
    });

    it('should return the correct extension for a file name with multiple dots', () => {
      expect(getFileNameExtension('archive.tar.gz')).toBe('gz');
      expect(getFileNameExtension('photo.edit.v2.png')).toBe('png');
    });

    it('should return an empty string for a file name with no extension', () => {
      expect(getFileNameExtension('README')).toBe('');
      expect(getFileNameExtension('Makefile')).toBe('');
    });

    it('should handle edge cases', () => {
      expect(getFileNameExtension('.gitignore')).toBe('gitignore');
      expect(getFileNameExtension('.hiddenfile')).toBe('hiddenfile');
      expect(getFileNameExtension('')).toBe('');
      expect(getFileNameExtension('.')).toBe('');
    });
  });
});
