#!/usr/bin/env node
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";

const ffmpeg = await import("ffmpeg-static");

if (!ffmpeg?.default) {
  console.error("ffmpeg-static binary not found.");
  process.exit(1);
}

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(projectRoot, "public");
const outFile = join(publicDir, "viral-short.mp4");

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

const fontFile =
  process.env.FONT_FILE ??
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";

const textLines = [
  { text: "ТОП 3 ЛАЙФХАКА", start: 0.3, end: 2.8 },
  { text: "КОТОРЫЕ\nИЗМЕНЯТ ТВОЕ УТРО", start: 2.9, end: 6.2 },
  { text: "1. ЛЕДЯНОЙ ДУШ\nНА 20 СЕКУНД", start: 6.3, end: 8.8 },
  { text: "2. СПИСОК 3 ЦЕЛЕЙ\nНА ДЕНЬ", start: 8.9, end: 11.4 },
  { text: "3. ПЛЕЙЛИСТ ЭНЕРГИИ\nНА ХОДЬБУ", start: 11.5, end: 14.0 },
  { text: "ПРОБУЙ ЭТО ЗАВТРА!", start: 14.1, end: 15.5 },
];

const drawTextFilters = textLines
  .map(
    ({ text, start, end }) =>
      [
        `drawtext=fontfile=${fontFile}`,
        `text='${text
          .replaceAll("\\", "\\\\")
          .replaceAll("'", "\\\\'")
          .replaceAll("\n", "\\\\n")}'`,
        "x=(w-text_w)/2",
        "y=(h-text_h)/2",
        "fontsize=120",
        "fontcolor=0xF8FAFC",
        "line_spacing=30",
        `enable='between(t,${start},${end})'`,
        `alpha='if(between(t,${start},${start + 0.4}), (t-${start})/0.4, if(between(t,${
          end - 0.4
        },${end}), (${end}-t)/0.4, 1))'`,
        "borderw=12",
        "bordercolor=0x020617@0.65",
      ].join(":")
  )
  .join(",");

const filterGraph = ["fps=30", "format=yuv420p", drawTextFilters]
  .filter(Boolean)
  .join(",");

const args = [
  "-f",
  "lavfi",
  "-i",
  "color=c=0x0f172a:s=1080x1920:d=16",
  "-vf",
  filterGraph,
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  "-y",
  outFile,
];

const child = spawn(ffmpeg.default, args, { stdio: "inherit" });

child.on("close", (code) => {
  if (code !== 0) {
    console.error(`ffmpeg exited with code ${code}`);
    process.exit(code ?? 1);
  }
  console.log(`Video created at ${outFile}`);
});
