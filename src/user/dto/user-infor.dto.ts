export class UserInfoDto {
  _id: string;
  email: string;
  username: string;
  role: string;
  super_key_group_chat?: string[];
  social_info?: Record<string, any>;
}
