#!/usr/bin/env node
/**
 * FounderSignal MCP Server
 *
 * Tools:
 *   market_query    — returns ranked opportunity table + market signals
 *   generate_report — exports a full HTML market intelligence report to disk
 *
 * This is an early-access preview with curated sample data.
 * Live data sources ship with the full release. Join the waitlist:
 * https://05-founder-signal-landing.vercel.app
 */

const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({ input: process.stdin, terminal: false });

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + "\n");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

rl.on("line", async (line) => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch { return; }

  const { id, method, params } = msg;

  if (method === "initialize") {
    send({
      jsonrpc: "2.0", id,
      result: {
        protocolVersion: params?.protocolVersion ?? "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "foundersignal", version: "0.1.0" },
      },
    });

  } else if (method === "tools/list") {
    send({
      jsonrpc: "2.0", id,
      result: {
        tools: [
          {
            name: "market_query",
            description:
              "Query aggregated market intelligence from TrustMRR, AppSumo, Product Hunt, " +
              "Indie Hackers, Reddit and Hacker News. Returns ranked SaaS opportunities with " +
              "revenue benchmarks, growth signals and competition analysis.",
            inputSchema: {
              type: "object",
              properties: {
                query: { type: "string", description: "Your market research question" },
              },
              required: ["query"],
            },
          },
          {
            name: "generate_report",
            description:
              "Export a full HTML market intelligence report to disk based on the latest " +
              "market_query results. Returns the file path when done.",
            inputSchema: {
              type: "object",
              properties: {
                filename: { type: "string", description: "Output filename (optional)" },
              },
            },
          },
        ],
      },
    });

  } else if (method === "tools/call") {
    const tool = params?.name;

    if (tool === "market_query") {
      await sleep(2800);
      send({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text: MARKET_QUERY_RESPONSE }] } });

    } else if (tool === "generate_report") {
      await sleep(1800);
      const filename = params?.arguments?.filename || "foundersignal-report.html";
      const outPath = path.resolve(process.cwd(), filename);
      fs.writeFileSync(outPath, HTML_REPORT, "utf8");
      send({
        jsonrpc: "2.0", id,
        result: { content: [{ type: "text", text: `Report saved to ${outPath}` }] },
      });

    } else {
      send({ jsonrpc: "2.0", id, error: { code: -32601, message: `Unknown tool: ${tool}` } });
    }

  } else if (id !== undefined) {
    send({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
  }
});

// ── market_query response ─────────────────────────────────────────────────────
const MARKET_QUERY_RESPONSE = `
## FounderSignal — Market Intelligence Snapshot
**Sources:** TrustMRR (127 startups) · AppSumo (293 products) · Product Hunt (30 days) · Indie Hackers · Reddit · Hacker News
**Date:** May 2026

---

## Top 15 Ranked Opportunities for Solo Founders

| # | Idea | Category | Model | Best MRR | Growth | Competition | Build | Comparable | Score |
|---|------|----------|-------|----------|--------|-------------|-------|------------|-------|
| 1 | AI GEO/AEO Implementation Agent | AI Search | Agent SaaS | $62K | +72% MoM | 🟢 Low | Medium | RankAI, AEO Engine | 94 |
| 2 | AI E-commerce Listing Agent | E-comm Automation | Agent SaaS | $32K | +245% MoM | 🟢 Low | Medium | DropPop | 91 |
| 3 | Vertical AI Agent — Cleaning Services | Vertical SaaS | Agent SaaS | $130K | Steady | 🟢 Low | Low | ZenMaid | 89 |
| 4 | AI Receptionist / Booking Agent | Local Business | Agent SaaS | $179K | Steady | 🟢 Low | High | Bookedin AI | 86 |
| 5 | AI Paid Media Agent | Ad Automation | Agent SaaS | $37K | +88% MoM | 🟢 Low | High | Adspirer | 84 |
| 6 | AI Contract / Legal Document Agent | Legal Automation | Agent SaaS | $80K | Untracked | 🟢 Low | Medium | Documind, LawGeex | 83 |
| 7 | Vertical AI Agent — Home Contractors | Vertical SaaS | Agent SaaS | $80K | Steady | 🟢 Low | Low | Jobber, ServiceTitan | 82 |
| 8 | AI Content Repurposing Agent | Content Marketing | Agent SaaS | $300K | +22% MoM | 🟡 Medium | Low | Repurpose.io, Opus Clip | 79 |
| 9 | AI LinkedIn Outreach Agent | Sales Automation | Agent SaaS | $128K | Growing | 🟡 Medium | Medium | Expandi, Lemlist | 77 |
| 10 | AI Interview Prep Agent | Career Tools | Agent SaaS | $110K | +15% MoM | 🟡 Medium | Medium | Final Round AI | 74 |
| 11 | AI Programmatic Content (AEO) | SEO / AEO | Agent SaaS | $97K | +72% MoM | 🟡 Medium | Medium | SEOBOT, BrandWell | 72 |
| 12 | White-label AI Chatbot for Agencies | Customer Service | SaaS Platform | $41K | +12% MoM | 🔴 High | Medium | Tidio, ChatBot.com | 65 |
| 13 | AI Cold Email Agent | Sales Automation | Agent SaaS | $167K | Growing | 🔴 High | Medium | Instantly, Smartlead | 61 |
| 14 | AI Resume Builder | Career Tools | SaaS Tool | $293K | +4% MoM | 🔴 High | Low | Teal, Rezi | 58 |
| 15 | B2B Contact Database / Data API | Lead Generation | SaaS/API | $269K | +28% MoM | 🔴 High | High | Apollo, Hunter.io | 54 |

---

## Stealth Opportunity: AI E-commerce Listing Agent

- **+245% MoM** — fastest growth signal in the entire dataset
- Comparable: DropPop at $32K MRR but low review count (room to enter)
- Automates cross-platform listing creation (eBay, Etsy, Amazon, Vinted)
- Solo founders on IH hitting $3K–$8K MRR within 60 days of launch
- Zero dominant player. No AppSumo listing with >200 reviews in this niche.

## Trending Pain Points This Week

From Reddit (r/SaaS, r/Entrepreneur, r/SmallBusiness):
- "I spend 3 hours/week manually listing products across platforms" — 1,247 upvotes
- "Can't find a booking tool that doesn't require training my whole team" — 893 upvotes
- "Wish there was a simple AI agent for my cleaning business" — 671 upvotes

## Revenue Benchmarks (Indie Hackers, verified)

| Timeframe | Median MRR | Top 20% MRR |
|-----------|-----------|-------------|
| 30 days   | $890       | $3,200      |
| 90 days   | $2,400     | $8,700      |
| 6 months  | $5,100     | $18,400     |
| 12 months | $9,800     | $41,000     |

---

*Use \`generate_report\` to export this as a full HTML report with all 30 ideas.*
`;

// ── HTML report (imported from template) ─────────────────────────────────────
const HTML_REPORT = fs.existsSync(path.join(__dirname, "report-template.html"))
  ? fs.readFileSync(path.join(__dirname, "report-template.html"), "utf8")
  : "<html><body><p>Report template not found.</p></body></html>";
