export type DatabaseConfig = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  name?: string;
  password?: string;
  username?: string;
  synchronize?: boolean;
  maxConnections: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
};
