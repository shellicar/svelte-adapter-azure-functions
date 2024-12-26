import { app } from '@azure/functions';
import { handler } from './handler';

app.http('server', {
  handler,
  authLevel: 'anonymous',
  route: '{*url}',
  methods: ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT'],
});
