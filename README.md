# FounderSignal MCP

> **Early access open** — Join the waitlist at [foundersignal.io](https://05-founder-signal-landing.vercel.app)

**Ask Claude what to build. Get ranked opportunities backed by real market data.**

FounderSignal is an MCP server that connects Claude (and any MCP-compatible AI client) to curated market intelligence — revenue figures, growth signals, competition analysis and community pain points aggregated from the platforms founders actually use.

Instead of spending a Saturday copy-pasting numbers from AppSumo, TrustMRR, Reddit and Product Hunt into a spreadsheet, you just ask.

---

## What it looks like

```
You: What SaaS categories are growing fastest right now?
```

```
FounderSignal:

## Top Ranked Opportunities — May 2026
Sources: TrustMRR · AppSumo · Product Hunt · Indie Hackers · Reddit · HN

| # | Idea                          | Best MRR | Growth     | Competition | Score |
|---|-------------------------------|----------|------------|-------------|-------|
| 1 | AI GEO/AEO Implementation     | $62K     | +72% MoM   | 🟢 Low      | 94    |
| 2 | AI E-commerce Listing Agent   | $32K     | +245% MoM  | 🟢 Low      | 91    |
| 3 | Vertical AI — Cleaning Svcs   | $130K    | Steady     | 🟢 Low      | 89    |
| 4 | AI Receptionist / Booking     | $179K    | Steady     | 🟢 Low      | 86    |
| 5 | AI Paid Media Agent           | $37K     | +88% MoM   | 🟢 Low      | 84    |
...

## Stealth Opportunity
AI E-commerce Listing Agent — +245% MoM, no dominant player,
solo founders hitting $3K–$8K MRR within 60 days of launch.

## Trending Pain Points This Week
- "I spend 3h/week listing products across eBay, Etsy and Amazon" — 1,247 upvotes
- "Can't find a booking tool my team doesn't need training for" — 893 upvotes
```

---

## Tools

### `market_query`
Query aggregated market intelligence. Ask anything about SaaS opportunities, revenue benchmarks, growth signals or competition.

```json
{
  "query": "Are there underserved niches in the creator tools space?"
}
```

### `generate_report`
Export a full HTML market intelligence report to disk — 30 ranked opportunities, deep dives, revenue benchmarks and trending pain points.

```json
{
  "filename": "my-research.html"
}
```

---

## Data Sources

| Source | What it provides |
|--------|-----------------|
| **TrustMRR** | Revenue-verified MRR and growth from 127 startups |
| **AppSumo** | Products ranked by real customer reviews and demand |
| **Product Hunt** | Launch traction and upvote velocity (last 30 days) |
| **Indie Hackers** | Revenue milestones and founder journey data |
| **Reddit** | Pain points from r/SaaS, r/Entrepreneur, r/SmallBusiness |
| **Hacker News** | Show HN / Ask HN — builder and buyer demand signals |
| **G2 / Capterra** | Software reviews exposing gaps in existing tools |
| **Exploding Topics** | Emerging trends before they peak |
| **Crunchbase** | Funding signals — what investors are betting on |
| **Google Trends** | Search demand and emerging category signals |
| **Meta Ads Library** | Ad creative trends — what founders are actively promoting |
| **TikTok** | Viral product trends and consumer demand before it hits mainstream |
| **LinkedIn** | B2B demand signals and professional pain points |

More sources added with each release.

---

## Installation

> **Early access** — The full live-data release is in development. Join the waitlist at [foundersignal.io](https://05-founder-signal-landing.vercel.app) to get notified.
>
> The version below runs with curated sample data so you can explore the interface today.

```bash
npx foundersignal-mcp
```

Or clone and run locally:

```bash
git clone https://github.com/YOUR_USERNAME/foundersignal-mcp
cd foundersignal-mcp
node index.js
```

---

## Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "foundersignal": {
      "command": "npx",
      "args": ["foundersignal-mcp"]
    }
  }
}
```

Config file locations:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

---

## Example queries

```
What SaaS categories are growing fastest right now?
Show me bootstrapped products that hit $10K MRR in under a year
Are there underserved niches in the creator tools space?
What problems do solopreneurs keep paying to solve but still complain about?
Which B2B categories have high demand but no clear winner yet?
What are developers most frustrated about with existing DevOps tools?
```

---

## Roadmap

- [x] MCP server with `market_query` and `generate_report` tools
- [x] HTML report export
- [ ] Live data pipeline (TrustMRR, AppSumo, Product Hunt)
- [ ] Weekly data refresh
- [ ] Custom query filters (category, competition level, build difficulty)
- [ ] Trend alerts via Claude

---

## Get early access

The live data version is coming. Join the waitlist to be first:

**[foundersignal.io →](https://05-founder-signal-landing.vercel.app)**

---

## License

MIT
