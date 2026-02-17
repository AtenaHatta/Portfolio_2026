import type { DevToArticle } from '../types/devto';
import raw from './devto-articles.json';

export const devToArticles: DevToArticle[] = raw as DevToArticle[];
