interface CloudflareEnv {
  DB: D1Database;
  BUCKET: R2Bucket;
}

declare module 'cloudflare:workers' {
  export const env: CloudflareEnv;
}
