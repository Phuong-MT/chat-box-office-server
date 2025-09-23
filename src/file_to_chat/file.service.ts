import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { File, FileSchemaDocument } from './Schema/file.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DBName } from '@/utils/connectDB';
import { GroupChatService } from '@/group_chat/group_chat.service';

@Injectable()
export class FileService {
  constructor(
    private cloudinaryServices: CloudinaryService,

    @InjectModel(File.getName(), DBName.CHAT_BOX_DB)
    private fileModel: Model<FileSchemaDocument>,

    private groupChatServices: GroupChatService,
  ) {}
  async uploadAvatar(
    avatar: Express.Multer.File,
    user_id: string,
    groupId: string,
  ) {
    // put file img to cloud
    const descriptionFile = await this.cloudinaryServices.uploadImage(
      avatar,
      'group-avatar',
      groupId,
    );
    // check url
    if (
      !descriptionFile ||
      (!descriptionFile.url && !descriptionFile.secure_url)
    ) {
      throw new Error('Upload file Image failed');
    }

    //check file
    const GroupChat = await this.fileModel.findOne({
      groupId,
    });
    if (GroupChat) {
      GroupChat.link = descriptionFile.url || descriptionFile.secure_url;
      GroupChat.lastUserIdUpdate = user_id;
      return GroupChat.save();
    }
    // create url file img to db
    const fileInfor = await this.fileModel.create({
      name: descriptionFile.original_filename,
      link: descriptionFile.url || descriptionFile.secure_url,
      contentType: descriptionFile.resource_type,
      lastUserIdUpdate: user_id,
      groupId,
    });
    return fileInfor.save();
  }
}
