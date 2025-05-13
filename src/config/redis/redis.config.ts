export const redisConfig = () => ({
  redis: [
    {
      name: 'master',
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    },
    {
      name: 'slave',
      host: process.env.REDIS_HOST_SLAVE,
      port: process.env.REDIS_PORT_SLAVE,
      password: process.env.REDIS_PASSWORD_SLAVE,
    },
  ],
});
