from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "apps" / "web" / "public" / "reports" / "solace-skin-au-market-entry-demo.pdf"

PAPER = colors.HexColor("#F2E4D1")
INK = colors.HexColor("#241109")
MUTED = colors.HexColor("#5A4A3C")
ORANGE = colors.HexColor("#E2603D")
LINE = colors.HexColor("#CDBBA6")


def style(name, **kwargs):
    return ParagraphStyle(name, parent=getSampleStyleSheet()["BodyText"], **kwargs)


SMALL = style("Small", fontName="Helvetica", fontSize=7, leading=10, textColor=MUTED)
MONO = style("Mono", fontName="Courier", fontSize=7, leading=9, textColor=ORANGE, tracking=0.5)
BODY = style("Body", fontName="Helvetica", fontSize=9, leading=14, textColor=MUTED)
HEADING = style("Heading", fontName="Helvetica-Bold", fontSize=33, leading=29, textColor=INK, spaceAfter=10)
SUBHEADING = style("Subheading", fontName="Helvetica-Bold", fontSize=20, leading=22, textColor=INK, spaceAfter=8)
CELL_HEAD = style("CellHead", fontName="Courier", fontSize=6.5, leading=9, textColor=ORANGE)
CELL_TITLE = style("CellTitle", fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=INK)
CELL_BODY = style("CellBody", fontName="Helvetica", fontSize=7.6, leading=11, textColor=MUTED)


def header(label, page_number):
    return Table(
        [[
            Paragraph("<b>COMMON<br/>GROUND<br/>CREATIVE</b>", style("Brand", fontName="Courier-Bold", fontSize=7, leading=8, textColor=ORANGE)),
            Paragraph(label, style("Header", fontName="Courier", fontSize=7, textColor=MUTED, alignment=TA_LEFT)),
            Paragraph(f"{page_number:02d}", style("Page", fontName="Courier", fontSize=7, textColor=ORANGE, alignment=TA_LEFT)),
        ]],
        colWidths=[36 * mm, 119 * mm, 18 * mm],
        style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
    )


def footer(page_number):
    return Table(
        [[Paragraph(f"SOLACE SKIN DEMO REPORT  /  PAGE {page_number} OF 3", style("Footer", fontName="Courier", fontSize=6.5, textColor=MUTED))]],
        colWidths=[173 * mm],
        style=TableStyle([("LINEABOVE", (0, 0), (-1, 0), 0.5, LINE), ("TOPPADDING", (0, 0), (-1, -1), 8)]),
    )


def section_title(label, title, copy=None):
    items = [Paragraph(label, MONO), Spacer(1, 5), Paragraph(title, SUBHEADING)]
    if copy:
        items.extend([Paragraph(copy, BODY), Spacer(1, 10)])
    return items


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title="Solace Skin Australian Market Entry Demo",
        author="Common Ground Creative",
    )
    story = []

    # Page 1 - cover and executive snapshot
    story.extend([header("AUSTRALIAN MARKET ENTRY REPORT", 1), Spacer(1, 45 * mm)])
    story.append(Paragraph("SOLACE SKIN<br/><font color='#E2603D'><i>market-entry readout.</i></font>", HEADING))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph("A focused 90-day launch plan for a science-led skincare brand entering Australia. All figures and brand references in this demo are illustrative.", BODY))
    story.append(Spacer(1, 25 * mm))
    kpis = [
        [Paragraph("PRIMARY AUDIENCE", CELL_HEAD), Paragraph("OPENING MARKET", CELL_HEAD), Paragraph("TEST WINDOW", CELL_HEAD)],
        [Paragraph("26-39", style("KPI", fontName="Helvetica-Bold", fontSize=18, leading=22, textColor=INK)), Paragraph("Sydney", style("KPI2", fontName="Helvetica-Bold", fontSize=18, leading=22, textColor=INK)), Paragraph("90 days", style("KPI3", fontName="Helvetica-Bold", fontSize=18, leading=22, textColor=INK))],
        [Paragraph("urban skin-health buyers", SMALL), Paragraph("inner east + north shore", SMALL), Paragraph("validate before scale", SMALL)],
    ]
    story.append(Table(kpis, colWidths=[57.6 * mm] * 3, style=TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PAPER), ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
    ])))
    story.append(Spacer(1, 50 * mm))
    story.append(footer(1))
    story.append(PageBreak())

    # Page 2 - opportunity and audience
    story.extend([header("01 / OPPORTUNITY & AUDIENCE", 2), Spacer(1, 17 * mm)])
    story.extend(section_title(
        "EXECUTIVE SUMMARY",
        "Win trust before<br/><font color='#E2603D'><i>you chase reach.</i></font>",
        "The strongest opening is a premium, proof-led routine for Australian consumers who are already buying active skincare but want fewer, clearer choices. Do not launch as another ingredient story. Launch as the calm, credible reset after over-complicated routines.",
    ))
    insights = [
        [Paragraph("01 / POSITIONING", CELL_HEAD), Paragraph("02 / CUSTOMER", CELL_HEAD), Paragraph("03 / COMMERCIAL SIGNAL", CELL_HEAD)],
        [Paragraph("Clinical clarity, not clinical theatre.", CELL_TITLE), Paragraph("Skincare-literate, time-poor urban professionals.", CELL_TITLE), Paragraph("A$58-A$72 is a credible hero-product test.", CELL_TITLE)],
        [Paragraph("Make the product benefit understandable in five seconds: what it helps, who it is for, and what proof supports it.", CELL_BODY), Paragraph("They compare formulas, creator reviews and price-per-use before they buy. Familiarity and evidence reduce the perceived risk of a new brand.", CELL_BODY), Paragraph("This price band supports premium cues while leaving room for introductory bundles and efficient creator seeding.", CELL_BODY)],
    ]
    story.append(Table(insights, colWidths=[57.6 * mm] * 3, style=TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
    ])))
    story.append(Spacer(1, 12 * mm))
    story.append(Table([[Paragraph("RECOMMENDATION", CELL_HEAD), Paragraph("Start with one hero serum and one simple routine bundle. The job of the first 90 days is to prove message-market fit, not maximise range.", style("Callout", fontName="Helvetica-Bold", fontSize=9, leading=13, textColor=INK))]], colWidths=[37 * mm, 136 * mm], style=TableStyle([
        ("LINEABOVE", (0, 0), (-1, -1), 0.75, ORANGE), ("LINEBELOW", (0, 0), (-1, -1), 0.75, ORANGE),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ])))
    story.append(Spacer(1, 63 * mm))
    story.append(footer(2))
    story.append(PageBreak())

    # Page 3 - channel and roadmap
    story.extend([header("02 / GO-TO-MARKET PLAN", 3), Spacer(1, 17 * mm)])
    story.extend(section_title("CHANNEL & ACTIVATION", "Build proof in public,<br/><font color='#E2603D'><i>then buy scale.</i></font>"))
    plan = [
        [Paragraph("PHASE", CELL_HEAD), Paragraph("FOCUS", CELL_HEAD), Paragraph("SUCCESS SIGNAL", CELL_HEAD)],
        [Paragraph("Days 1-30", CELL_BODY), Paragraph("Creator seeding and landing-page message tests across Sydney.", CELL_BODY), Paragraph("30 pieces of usable proof; 3+ creator angles worth scaling.", CELL_BODY)],
        [Paragraph("Days 31-60", CELL_BODY), Paragraph("Meta conversion test with founder and creator-led education.", CELL_BODY), Paragraph("Landing-page conversion above 2.2%; repeatable A$35-45 acquisition range.", CELL_BODY)],
        [Paragraph("Days 61-90", CELL_BODY), Paragraph("Retargeting, bundles and a selective retail conversation.", CELL_BODY), Paragraph("25% of sales from returning visitors; a clear wholesale readiness case.", CELL_BODY)],
    ]
    story.append(Table(plan, colWidths=[30 * mm, 76 * mm, 67 * mm], style=TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ])))
    story.append(Spacer(1, 13 * mm))
    bottom = [
        [Paragraph("CHANNEL PRIORITY", CELL_HEAD), Paragraph("WATCHOUTS", CELL_HEAD)],
        [Paragraph("1. Creator proof and paid social<br/>2. Owned education and email<br/>3. Selective retail outreach", CELL_BODY), Paragraph("Keep claims substantiated and localise sun, climate and routine language. Avoid broad clinical claims unless product-specific evidence is ready.", CELL_BODY)],
    ]
    story.append(Table(bottom, colWidths=[86.5 * mm, 86.5 * mm], style=TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
    ])))
    story.append(Spacer(1, 14 * mm))
    story.append(Table([[Paragraph("NEXT DECISION", CELL_HEAD), Paragraph("Approve the hero-product offer, creator cohort and 90-day test budget before commissioning a full launch plan.", style("Next", fontName="Helvetica-Bold", fontSize=9, leading=13, textColor=INK))]], colWidths=[37 * mm, 136 * mm], style=TableStyle([
        ("LINEABOVE", (0, 0), (-1, -1), 0.75, ORANGE), ("LINEBELOW", (0, 0), (-1, -1), 0.75, ORANGE),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ])))
    story.append(Spacer(1, 38 * mm))
    story.append(footer(3))

    doc.build(story)


if __name__ == "__main__":
    build_pdf()
