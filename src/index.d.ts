export interface AuthenticatedRequest {
  app: {
    locals: {
      token: string;
    }
  };
}
