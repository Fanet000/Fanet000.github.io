// utils/soundManager.ts
import { Howl } from "howler";
declare module 'howler';
export const playClick = () => new Howl({ src: ["/sounds/click.mp3"] }).play();