import { Types } from 'mongoose';

interface MessageDto {
  _id: string;
  content: string;
  sender: string;
  link?: string;
  file?: string;
  reaction?: string[];
  respondTo?: string;
  userSeen?: string[];
  isRetrieve?: boolean;
  frameTime?: number;
}

export interface MessageResponseDto {
  groupId: string;
  message: MessageDto | MessageDto[];
}

export class FrameMessageDto {
  _id: string;
  status: string;
  text: string;
}
export class MessageFrameDto {
  _id: string;
  timeChat: number;
  userId: string;
  contents: FrameMessageDto[];
}

export class MessageResponseDtoV2 {
  groupId: string;
  frames: MessageFrameDto[];
}
