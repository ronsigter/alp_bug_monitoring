import { z } from 'zod';

export const AlpSessionScalarFieldEnumSchema = z.enum(['id','sessionId','bannerId','createdAt','updatedAt','resultSuccess','resultCode','resultMessage','alpVersion','alpAction','otaVersion','platform']);

export default AlpSessionScalarFieldEnumSchema;
