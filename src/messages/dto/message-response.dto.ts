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
}

export interface MessageResponseDto {
  groupId: string;
  message: MessageDto | MessageDto[];
}
