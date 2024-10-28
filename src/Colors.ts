import { z } from 'zod';

export const IPatternOptions = z.object({
  repeat: z.enum(['repeat', 'repeat-x', 'repeat-y', 'no-repeat']).optional(),
  offsetX: z.number().optional(),
  offsetY: z.number().optional(),
  crossOrigin: z.enum(['', 'anonymous', 'use-credentials']).optional(),
  patternTransform: z.array(z.number()).optional(),
  source: z.union([z.string(), z.instanceof(HTMLImageElement)]),
});

export const IGradientOptionsCoordsSchema = z.object({
  x1: z.number().optional(),
  y1: z.number().optional(),
  x2: z.number().optional(),
  y2: z.number().optional(),
  r1: z.number().optional(),
  r2: z.number().optional(),
});

// Schema for IGradientOptionsColorStops
export const IGradientOptionsColorStops = z.array(
  z.object({
    offset: z.number(),
    color: z.string(),
  })
);

// Schema for IGradientOptions
export const IGradientOptions = z.object({
  offsetX: z.number().optional(),
  offsetY: z.number().optional(),
  type: z.string().optional(),
  coords: IGradientOptionsCoordsSchema.optional(),
  colorStops: IGradientOptionsColorStops.optional(),
  gradientTransform: z.any().optional(),
  gradientUnits: z.string().optional(),
});

export const SerializedFillType = z.union([
  z.string(),
  IPatternOptions,
  IGradientOptions,
]);
