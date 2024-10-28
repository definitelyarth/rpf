import { z } from 'zod';
import {
  Border,
  ObjectFit,
  ObjectPosition,
  Padding,
  Radius,
} from './ObjectContainer';
import { SerializedFillType } from './Colors';

export const Shadow = z.object({
  color: z.string().optional(),
  blur: z.number().optional(),
  offsetX: z.number().optional(),
  offsetY: z.number().optional(),
});

const CANVAS_EDITOR_ELEMENT = {
  TEXT: 'TEXT',
  SHAPE: 'SHAPE',
  IMAGE: 'IMAGE',
  GROUP: 'GROUP',
  CREATIVE_BOX: 'CREATIVE_BOX',
  CANVAS_MASK: 'CANVAS_MASK',
} as const;

const CANVAS_EDITOR_ELEMENTS = [
  CANVAS_EDITOR_ELEMENT.TEXT,
  CANVAS_EDITOR_ELEMENT.SHAPE,
  CANVAS_EDITOR_ELEMENT.IMAGE,
  CANVAS_EDITOR_ELEMENT.GROUP,
  CANVAS_EDITOR_ELEMENT.CREATIVE_BOX,
  CANVAS_EDITOR_ELEMENT.CANVAS_MASK,
] as const;

export const CANVAS_EDITOR_ELEMENTS_ENUM = z.enum(CANVAS_EDITOR_ELEMENTS);
export const ELEMENT_TYPES_ENUM = z.enum([
  'rect',
  'circle',
  'triangle',
  'line',
  'polygon',
  'polyline',
  'path',
  'group',
  'image',
  'text',
  'rounded-rect',
  'text-container',
  'image-container',
  'custom-textbox',
]);

// enum BlendModeEnum {
//   Color = 'color',
//   ColorBurn = 'color-burn',
//   ColorDodge = 'color-dodge',
//   Copy = 'copy',
//   Darken = 'darken',
//   DestinationAtop = 'destination-atop',
//   DestinationIn = 'destination-in',
//   DestinationOut = 'destination-out',
//   DestinationOver = 'destination-over',
//   Difference = 'difference',
//   Exclusion = 'exclusion',
//   HardLight = 'hard-light',
//   Hue = 'hue',
//   Lighten = 'lighten',
//   Lighter = 'lighter',
//   Luminosity = 'luminosity',
//   Multiply = 'multiply',
//   Overlay = 'overlay',
//   Saturation = 'saturation',
//   Screen = 'screen',
//   SoftLight = 'soft-light',
//   SourceAtop = 'source-atop',
//   SourceIn = 'source-in',
//   SourceOut = 'source-out',
//   SourceOver = 'source-over',
//   Xor = 'xor',
// }

// export const BlendMode = z.nativeEnum(BlendModeEnum);

export const BaseElementJSON = z.object({
  id: z.string(),
  displayText: z.string(),
  dataType: CANVAS_EDITOR_ELEMENTS_ENUM,
  left: z.number(),
  top: z.number(),
  width: z.number(),
  height: z.number(),
  angle: z.number(),
  opacity: z.number(),
  shadow: z.union([Shadow, z.null()]),
  visible: z.boolean(),
  globalCompositeOperation: z.string(),
  selectable: z.boolean(),
  fill: SerializedFillType,
  border: Border,
  padding: Padding,
  cornerRadius: Radius,
});
export const CreativeBoxJSON = z.object({
  ...BaseElementJSON.omit({
    displayText: true,
    left: true,
    top: true,
    angle: true,
    opacity: true,
    shadow: true,
    visible: true,
    globalCompositeOperation: true,
    selectable: true,
    border: true,
    padding: true,
    cornerRadius: true,
  }).shape,
  type: z.literal('rect'),
  dataType: z.literal('CREATIVE_BOX'),
});

export const ImageContainerJSON = z.object({
  ...BaseElementJSON.shape,
  type: z.literal('image-container'),
  dataType: z.literal('IMAGE'),
  objectPosition: ObjectPosition,
  imageScale: z.number(),
  imageLeft: z.number(),
  imageTop: z.number(),
  imageWidth: z.number(),
  imageHeight: z.number(),
  objectFit: ObjectFit,
  src: z.string(),
});

export const PathJSON = z.object({
  ...BaseElementJSON.omit({
    border: true,
    padding: true,
    cornerRadius: true,
  }).shape,
  type: z.literal('path'),
  dataType: z.literal('SHAPE'),
  path: z.array(z.array(z.union([z.string(), z.number()]))),
  scale: z.number(),
});

export const RoundedRectJSON = z.object({
  ...BaseElementJSON.omit({
    border: true,
    padding: true,
  }).shape,
  type: z.literal('rounded-rect'),
  dataType: z.literal('SHAPE'),
  scale: z.number(),
});

export const TextCase = z.enum(['uppercase', 'lowercase', 'titlecase', 'none']);

export const TextStyle = z.object({
  textCase: TextCase,
  textFill: SerializedFillType,
  fontFamily: z.string(),
  fontWeight: z.union([z.number(), z.string()]),
  fontSize: z.number(),
  underline: z.boolean(),
  overline: z.boolean(),
  linethrough: z.boolean(),
  fontStyle: z.enum(['', 'normal', 'italic', 'oblique']),
  charSpacing: z.number(),
  lineHeight: z.number(),
});

export const FontStyle = z.enum(['normal', 'italic', 'oblique']);

export const WordStyle = z.object({
  id: z.string(),
  data: z.object({
    start: z.number(),
    end: z.number(),
    styles: z.object({
      fontFamily: z.string().optional(),
      fontSize: z.number().optional(),
      fontWeight: z.string().optional(),
      fontStyle: FontStyle.optional(),
      textDecoration: z.string().optional(),
      textAlign: z.string().optional(),
      textBackgroundColor: SerializedFillType.optional(),
      fill: SerializedFillType.optional(),
      stroke: z.string().optional(),
      strokeWidth: z.number().optional(),
    }),
  }),
});

export const FontMetaData = z.object({
  fontId: z.string(),
  fontUrl: z.string(),
});

export const TextContainerJSON = z.object({
  ...BaseElementJSON.shape,
  ...TextStyle.shape,
  type: z.literal('text-container'),
  dataType: z.literal('TEXT'),
  autoFit: z.boolean(),
  autoFitSizes: z.tuple([z.number(), z.number()]),
  serializedText: z.string(),
  fontMetaData: FontMetaData,
  objectPosition: ObjectPosition,
  textleft: z.number(),
  textTop: z.number(),
  textHeight: z.number(),
  text: z.string(),
  textAlign: z.string(),
  styles: z.array(z.any()),
  wordStyle: z.array(WordStyle),
});

// Define CanvasElementJSON with discriminated union on 'type' field
export const CanvasElementJSON = z.discriminatedUnion('type', [
  CreativeBoxJSON,
  ImageContainerJSON,
  PathJSON,
  RoundedRectJSON,
  TextContainerJSON,
]);

// Define PartialCanvasElementJSON similarly for partial overrides
export const PartialCanvasElementJSON = z.union([
  CreativeBoxJSON.partial(),
  ImageContainerJSON.partial(),
  PathJSON.partial(),
  RoundedRectJSON.partial(),
  TextContainerJSON.partial(),
]);

// Define CanvasElementWithOverrides schema
export const CanvasElementWithOverrides = CanvasElementJSON.and(
  z.object({
    zIndex: z.number(),
    overrides: z.record(
      z.string(),
      PartialCanvasElementJSON.and(
        z.object({
          zIndex: z.number(),
        })
      )
    ),
  })
);

export const SizeSchema = z.object({
  width: z.number(),
  height: z.number(),
  id: z.string(),
  displayName: z.string(),
});

export const Variants = z.object({
  metadata: z.object({ thumbnailUrl: z.string() }),
  variant: z.object({
    sizes: z.record(z.string(), SizeSchema),
    objects: z.record(z.string(), CanvasElementWithOverrides),
  }),
});

export const RocketiumPortableFormat = z.object({
  variants: z.array(Variants),
  metadata: z.object({
    name: z.string(),
    createdAt: z.string(),
    lastModified: z.string().optional(),
    author: z.string().optional(),
    source: z.string(),
    sourceVersion: z.string(),
    schemaVersion: z.string(),
  }),
});

export * from './Colors';
export * from './ObjectContainer';
