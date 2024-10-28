import { z } from 'zod';

// Object Fit
const ObjectFit = z.enum(['fill', 'fit', 'crop']);

export { ObjectFit };

// Object Position
const ObjectPosition = z.enum([
  'top-left',
  'top-center',
  'top-right',
  'center-left',
  'center',
  'center-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'custom',
]);

export { ObjectPosition };

// Radius
const Radius = z.object({
  tl: z.optional(z.number()),
  tr: z.optional(z.number()),
  bl: z.optional(z.number()),
  br: z.optional(z.number()),
});

export { Radius };

// Padding
const Padding = z.object({
  top: z.optional(z.number()),
  right: z.optional(z.number()),
  bottom: z.optional(z.number()),
  left: z.optional(z.number()),
});

export { Padding };

// Border
const BorderPosition = z.enum(['center', 'inside', 'outside']);
const Border = z.object({
  color: z.string().optional(),
  style: z.enum(['dashed', 'solid']).optional(),
  top: z.number().optional(),
  right: z.number().optional(),
  bottom: z.number().optional(),
  left: z.number().optional(),
  position: BorderPosition.optional(),
  dashWidth: z.number().optional(),
  dashGap: z.number().optional(),
  dashCap: z.enum(['butt', 'round', 'square', 'NONE']).optional(),
});

export { Border };
