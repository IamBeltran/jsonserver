//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = {
  '/api/*': '/$1',
  '/:resource/:id/show': '/:resource/:id',
  '/posts/:category': '/posts?category=:category',
  '/articles\\?id=:id': '/posts/:id',
  '/auth/login/:nickname': '/users?nickname=:nickname',
};
