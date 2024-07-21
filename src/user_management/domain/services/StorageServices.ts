export interface StorageService {
    execute(file: Buffer, fileName: string, mimeType: string): Promise<any>
}