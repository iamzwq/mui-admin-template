declare global {
  type LoginFormValues = {
    username: string;
    password: string;
    rememberMe?: boolean;
  };
}
