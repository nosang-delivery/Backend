import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entity/base.entity';
import { USER_ROLE } from '../../common/enum/user.enum';
@Entity()
export class User extends Base {
  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column({ type: 'enum', enum: USER_ROLE, default: USER_ROLE.USER })
  role: USER_ROLE;
}
