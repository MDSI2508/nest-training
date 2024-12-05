import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BodyGuard implements CanActivate {
  constructor(private readonly fieldName: string) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.body || !request.body[this.fieldName]) {
      throw new BadRequestException(`Field ${this.fieldName} is missing`);
    }

    return true;
  }
}
