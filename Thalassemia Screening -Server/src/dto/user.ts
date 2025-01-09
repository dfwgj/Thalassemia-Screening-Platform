// src/dto/user.ts
import { Rule, RuleType, PickDto } from '@midwayjs/validate';
const requiredString = RuleType.string().required();
export class UserDTO {
  @Rule(RuleType.string().min(1).max(200))
  userId: string | number;
  @Rule(requiredString.min(0).max(11))
  studentId: string;
  @Rule(requiredString.min(0).max(10))
  name: string;
  college: string;
  grade: string;
  major: string;
  @Rule(requiredString.email())
  email: string;
  @Rule(requiredString.min(0).max(11))
  phone: string;
  @Rule(requiredString.min(6).max(16))
  password: string;
  @Rule(RuleType.string().max(160))
  hashPassword: string;
  @Rule(RuleType.string().max(160))
  avatar: string;
  @Rule(RuleType.string().max(200))
  token: string;
}
export class LoginDTO extends PickDto(UserDTO, [
  'studentId',
  'password',
  'hashPassword',
]) {}
//PickDto选定继承对象中的属性，OmitDto剔除继承对象中的属性
