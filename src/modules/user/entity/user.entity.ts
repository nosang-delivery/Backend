import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entity/base.entity';

@Entity()
export class User extends Base {
  @Column()
  email: string;

  @Column()
  nickname: string;
}
