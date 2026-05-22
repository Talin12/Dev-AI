import puppeteer from "puppeteer";
import type { QuestionPaper, Assignment, Question } from "../types";

const difficultyColors: Record<string, string> = {
  easy: "#16a34a",
  medium: "#d97706",
  hard: "#dc2626",
};

function renderQuestion(q: Question, index: number): string {
  const badge = `<span style="background:${difficultyColors[q.difficulty]};color:white;font-size:9pt;padding:2px 7px;border-radius:3px;font-family:Arial,sans-serif;margin-left:8px;">${q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}</span>`;

  const options =
    q.options && q.options.length > 0
      ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;margin-top:6px;padding-left:4px;">
          ${q.options.map((o) => `<div>${o}</div>`).join("")}
        </div>`
      : "";

  return `<li style="margin-bottom:14px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
      <span style="flex:1;line-height:1.6;">${index + 1}. ${q.text}${badge}</span>
      <span style="white-space:nowrap;font-size:10pt;color:#374151;">[${q.marks} mark${q.marks > 1 ? "s" : ""}]</span>
    </div>
    ${options}
  </li>`;
}

function buildHTML(paper: QuestionPaper, assignment: Assignment): string {
  const sectionsHTML = paper.sections
    .map(
      (section) => `
    <div style="margin-bottom:28px;">
      <div style="display:flex;justify-content:space-between;align-items:center;background:#f3f4f6;padding:8px 12px;border-left:4px solid #2563eb;margin-bottom:6px;">
        <strong style="font-size:13pt;">${section.label}: ${section.title}</strong>
        <span style="font-size:11pt;">[${section.totalMarks} Marks]</span>
      </div>
      <p style="font-style:italic;font-size:10pt;color:#555;margin-bottom:10px;">${section.instruction}</p>
      <ol style="list-style:none;padding:0;margin:0;">
        ${section.questions.map((q, i) => renderQuestion(q, i)).join("")}
      </ol>
    </div>`
    )
    .join("");

  const answerKeyHTML = paper.hasAnswerKey
    ? `<div style="margin-top:32px;border-top:2px solid #111;padding-top:16px;">
        <h2 style="font-size:14pt;margin-bottom:12px;">Answer Key</h2>
        <ol style="list-style:decimal;padding-left:20px;">
          ${paper.sections
            .flatMap((s) => s.questions)
            .map(
              (q) =>
                `<li style="margin-bottom:6px;line-height:1.5;">${q.answer || "—"}</li>`
            )
            .join("")}
        </ol>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; color: #111; background: white; }
  </style>
</head>
<body>
  <div style="text-align:center;border-bottom:2px solid #111;padding-bottom:14px;margin-bottom:18px;">
    <h1 style="font-size:18pt;font-weight:bold;">${paper.schoolName}</h1>
    <h2 style="font-size:14pt;font-weight:normal;margin-top:4px;">Subject: ${paper.subject}</h2>
    <p style="font-size:12pt;margin-top:2px;">Class: ${paper.grade}</p>
    <div style="display:flex;justify-content:space-between;margin-top:10px;font-size:11pt;">
      <span>Time Allowed: ${paper.timeAllowed}</span>
      <span>Maximum Marks: ${paper.totalMarks}</span>
    </div>
  </div>

  <p style="font-size:11pt;margin-bottom:14px;">${paper.generalInstruction}</p>

  <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:0 24px;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid #ccc;">
    <div style="border-bottom:1px solid #444;padding-bottom:2px;">
      <div style="font-size:9pt;color:#555;">Name</div>
      <div style="height:18px;"></div>
    </div>
    <div style="border-bottom:1px solid #444;padding-bottom:2px;">
      <div style="font-size:9pt;color:#555;">Roll Number</div>
      <div style="height:18px;"></div>
    </div>
    <div style="border-bottom:1px solid #444;padding-bottom:2px;">
      <div style="font-size:9pt;color:#555;">Section</div>
      <div style="height:18px;"></div>
    </div>
  </div>

  ${sectionsHTML}

  <p style="text-align:center;font-style:italic;font-size:11pt;margin-top:24px;">— End of Question Paper —</p>

  ${answerKeyHTML}
</body>
</html>`;
}

export asy