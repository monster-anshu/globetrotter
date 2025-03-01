import { UserService } from '@/services/user.service';
import { queryOptions } from '@tanstack/react-query';

export const userInfoQuery = queryOptions({
  queryKey: ['user-info'],
  queryFn: UserService.info,
});
