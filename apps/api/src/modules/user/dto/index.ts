export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  role?: string;
  teamId?: string;
}

export class UpdateUserDto {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  teamId?: string;
}
