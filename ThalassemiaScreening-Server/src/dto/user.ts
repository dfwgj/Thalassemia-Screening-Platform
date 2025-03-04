// src/dto/user.ts
import { Rule, RuleType, PickDto } from '@midwayjs/validate';
const requiredString = RuleType.string().required();
export class UserDTO {
  @Rule(RuleType.string().min(1).max(200))
  userId: string;
  @Rule(requiredString.min(6).max(16))
  account: string;
  @Rule(requiredString.min(1).max(10))
  name: string;
  @Rule(requiredString.min(1).max(10))
  identity: string;
  @Rule(RuleType.number().min(1).max(120))
  age: number;
  @Rule(RuleType.string().min(1).max(10))
  sex: string;
  @Rule(requiredString.email())
  email: string;
  @Rule(requiredString.length(11))
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
  'account',
  'password',
  'hashPassword',
]) {}
//PickDto选定继承对象中的属性，OmitDto剔除继承对象中的属性
