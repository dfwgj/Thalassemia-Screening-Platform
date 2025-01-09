import { Provide } from '@midwayjs/core';
import { UploadFileInfo } from '@midwayjs/busboy';

@Provide()
export class GetFileExtension {
    getFileExtension(files: Array<UploadFileInfo>): string {
        const name = files[0].filename; // 获取文件名
        const dotIndex = name.lastIndexOf('.'); // 找到最后一个点号的位置
        if (dotIndex === -1) {
            return ''; // 如果没有点号，表示没有扩展名
        }
        return name.substring(dotIndex + 1); // 返回点号之后的部分作为扩展名
    }
}