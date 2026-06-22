import { ExtractedProduct, Product } from '@/src/models/inventory';

export type Embedding = Float32Array;
export interface VisionAdapter { embed(uri: string): Promise<Embedding>; }
export interface OcrAdapter { recognize(uri: string, languages: string[]): Promise<{ text: string; blocks: unknown[] }>; }

export function cosineSimilarity(a: Embedding, b: Embedding) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) { dot += a[i] * b[i]; na += a[i] ** 2; nb += b[i] ** 2; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

export function rankVisualMatches(query: Embedding, candidates: { product: Product; embedding: Embedding }[]) {
  return candidates.map(({ product, embedding }) => ({ ...product, similarity: cosineSimilarity(query, embedding) })).sort((a,b) => (b.similarity ?? 0) - (a.similarity ?? 0));
}

export async function runProductPipeline(uri: string): Promise<ExtractedProduct> {
  // Production seam: preprocess -> ML Kit OCR -> ONNX MobileCLIP -> field parser/classifier.
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { name:'Bouilloire température réglable', brand:'Nordhaus', reference:'NH-K17', barcode:'376012340221', category:'Électroménager', color:'Inox brossé', material:'Acier inoxydable', dimensions:'22 × 18 × 25 cm', weight:'1,2 kg', capacity:'1,7 L', country:'France', confidence:0.94 };
}
