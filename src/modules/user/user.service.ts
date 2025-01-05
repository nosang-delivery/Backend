import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUsers() {
    return this.userRepository.find();
  }
}
