import * as z from "zod";

export const AuthorizationObjectSchema = z
  .object({
    email: z.string(),
    accessToken: z.string(),
  })
  .readonly();

export type IAuthorizationObject = z.infer<typeof AuthorizationObjectSchema>;
