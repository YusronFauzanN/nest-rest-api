import { IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  link?: string;
}
