const { hasPermission } = require('../utils');
const { forwardTo } = require('prisma-binding');
const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. Logged In?
    if (!ctx.request.userId) {
      throw new Error();
    }
    // 2. Check if the user has the permissions to query
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // 3. if they do query all users!
    return ctx.db.query.users({}, info);
  },
};

module.exports = Query;
