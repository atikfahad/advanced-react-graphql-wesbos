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
  async order(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    if (!ctx.request.userId) throw new Error('You are not logged in');
    // 2. Query the current order
    const order = await ctx.db.query.order(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
    // 3. check if they have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      'ADMIN'
    );
    if (!ownsOrder || !hasPermissionToSeeOrder)
      throw new Error('You cant see this');
    // 4. Return the order
    return order;
  },
};

module.exports = Query;
