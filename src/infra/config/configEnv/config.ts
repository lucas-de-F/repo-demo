export default () => ({
  envFilePath: ['.env', '.env.development'],
  port: parseInt(process.env.PORT, 10) || process.env['PORT'],
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5433,
  },
});
