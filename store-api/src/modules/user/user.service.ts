import { hash } from '@app/common/utils/hashing.utils';
import { RegisterUserRequest } from '@app/modules/user/dtos/register-user.request';
import { User } from '@app/modules/user/models/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  @Transactional()
  public async registerNewUser(request: RegisterUserRequest): Promise<string> {
    const { email, password } = request;

    const emailAlreadyExists = await this.findOneByEmail(email);

    if (emailAlreadyExists) {
      throw new ConflictException('Email already exists');
    }

    const encryptedPassword = await hash(password);

    const user = this.userRepository.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    await this.userRepository.save(user);

    return user.id;
  }
}
