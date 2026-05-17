from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    Flowable,
    KeepTogether,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "downloads"
OUT.mkdir(exist_ok=True)
PAGE_SIZE = landscape(letter)
PAGE_W, PAGE_H = PAGE_SIZE

INK = colors.HexColor("#111827")
CHARCOAL = colors.HexColor("#334155")
MUTED = colors.HexColor("#64748B")
LINE = colors.HexColor("#DBE2EA")
SOFT = colors.HexColor("#F8FAFC")
GREEN = colors.HexColor("#15803D")
GREEN_SOFT = colors.HexColor("#EDF8F1")
BLUE = colors.HexColor("#2563EB")
BLUE_SOFT = colors.HexColor("#EDF4FF")
PURPLE = colors.HexColor("#7E22CE")
PURPLE_SOFT = colors.HexColor("#F6EFFF")
WARM = colors.HexColor("#F5F2ED")
WHITE = colors.white
RED = colors.HexColor("#B45353")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle("Kicker", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=MUTED, spaceAfter=7, uppercase=True))
styles.add(ParagraphStyle("TitleBig", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=39, leading=42, textColor=INK, alignment=TA_LEFT, spaceAfter=14))
styles.add(ParagraphStyle("SectionTitle", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=25, leading=30, textColor=INK, spaceAfter=10))
styles.add(ParagraphStyle("Subhead", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=INK, spaceAfter=7))
styles.add(ParagraphStyle("Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.5, leading=15.5, textColor=CHARCOAL, spaceAfter=7))
styles.add(ParagraphStyle("Small", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.2, leading=13.2, textColor=CHARCOAL, spaceAfter=4))
styles.add(ParagraphStyle("Tiny", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.1, leading=11.2, textColor=CHARCOAL, spaceAfter=3))
styles.add(ParagraphStyle("Quote", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=16, leading=22, textColor=INK, leftIndent=12, borderColor=INK, borderWidth=0, borderPadding=0, spaceAfter=7))
styles.add(ParagraphStyle("CenterTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=20, leading=25, alignment=TA_CENTER, textColor=INK, spaceAfter=18))
styles.add(ParagraphStyle("RubricBody", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.4, leading=12.8, textColor=CHARCOAL, spaceAfter=3))
styles.add(ParagraphStyle("RubricLevel", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=11.2, leading=14, textColor=INK, spaceAfter=5))


def p(text, style="Body"):
    return Paragraph(str(text).replace("\n", "<br/>"), styles[style])


def spacer(h=12):
    return Spacer(1, h)


def doc(path, title):
    return SimpleDocTemplate(
        str(path),
        pagesize=PAGE_SIZE,
        rightMargin=0.58 * inch,
        leftMargin=0.58 * inch,
        topMargin=0.48 * inch,
        bottomMargin=0.52 * inch,
        title=title,
    )


def footer(canvas, document):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#E5EAF0"))
    canvas.setLineWidth(0.6)
    canvas.line(document.leftMargin, 28, PAGE_W - document.rightMargin, 28)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(document.leftMargin, 15, "Systems Under Pressure | Algebra 2 Final Project")
    canvas.drawRightString(PAGE_W - document.rightMargin, 15, str(document.page))
    canvas.restoreState()


class SystemMap(Flowable):
    def __init__(self, width=250, height=210):
        super().__init__()
        self.width = width
        self.height = height

    def draw(self):
        c = self.canv
        cx, cy = self.width * 0.48, self.height * 0.5
        nodes = [
            ("Climate", GREEN, -82, 66), ("Transport", BLUE, 56, 82), ("Storage", PURPLE, 111, 10),
            ("Exports", PURPLE, 94, -72), ("Food loss", RED, -35, -82), ("Demand", BLUE, -96, -22), ("Supply", GREEN, -105, 26),
        ]
        c.setStrokeColor(colors.HexColor("#BAC5D2"))
        c.setLineWidth(1.1)
        for _, _, dx, dy in nodes:
            c.line(cx, cy, cx + dx, cy + dy)
        c.setFillColor(WHITE)
        c.setStrokeColor(colors.HexColor("#CBD5E1"))
        c.circle(cx, cy, 34, stroke=1, fill=1)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(cx, cy + 3, "Food")
        c.drawCentredString(cx, cy - 10, "System")
        for name, col, dx, dy in nodes:
            x, y = cx + dx, cy + dy
            c.setFillColor(WHITE)
            c.setStrokeColor(col)
            c.setLineWidth(1.4)
            c.circle(x, y, 24, stroke=1, fill=1)
            c.setFillColor(col)
            c.setFont("Helvetica-Bold", 7.4)
            c.drawString(x + 28, y - 3, name)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        c.drawCentredString(cx, cy - 55, "interconnected pressures")


class Workspace(Flowable):
    def __init__(self, label="student thinking space", height=220, grid=False):
        super().__init__()
        self.label = label
        self.height = height
        self.grid = grid
        self.width = 1

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return availWidth, self.height

    def draw(self):
        c = self.canv
        c.setStrokeColor(colors.HexColor("#AEBBCC"))
        c.setFillColor(WHITE)
        c.roundRect(0, 0, self.width, self.height, 8, stroke=1, fill=1)
        c.setFont("Helvetica-Bold", 8.5)
        c.setFillColor(MUTED)
        c.drawString(14, self.height - 22, self.label)
        c.setStrokeColor(colors.HexColor("#E7ECF3"))
        c.setLineWidth(0.45)
        if self.grid:
            step = 28
            x = step
            while x < self.width:
                c.line(x, 14, x, self.height - 36)
                x += step
            y = 24
            while y < self.height - 36:
                c.line(14, y, self.width - 14, y)
                y += step
        else:
            y = self.height - 48
            while y > 16:
                c.line(16, y, self.width - 16, y)
                y -= 22


def card(title, body, accent=INK, fill=WHITE, body_style="Body"):
    content = [[p(title, "Subhead")], [p(body, body_style)]]
    t = Table(content, colWidths=[None], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), fill),
        ("BOX", (0, 0), (-1, -1), 0.8, LINE),
        ("LINEABOVE", (0, 0), (-1, 0), 5, accent),
        ("LEFTPADDING", (0, 0), (-1, -1), 15),
        ("RIGHTPADDING", (0, 0), (-1, -1), 15),
        ("TOPPADDING", (0, 0), (-1, -1), 13),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 13),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def card_grid(items, cols=3):
    rows, row = [], []
    for title, body, accent, fill in items:
        row.append(card(title, body, accent, fill))
        if len(row) == cols:
            rows.append(row)
            row = []
    if row:
        while len(row) < cols:
            row.append(Spacer(1, 1))
        rows.append(row)
    usable = PAGE_W - 0.58 * inch * 2
    col_width = usable / cols
    t = Table(rows, colWidths=[col_width] * cols, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return t


def section(kicker, title, body=None):
    out = [p(kicker.upper(), "Kicker"), p(title, "SectionTitle")]
    if body:
        out.append(p(body, "Body"))
    out.append(spacer(10))
    return out


def title_story(subtitle):
    return [
        Table([[[
            p("ALGEBRA 2 CUMULATIVE SEMESTER FINAL PROJECT", "Kicker"),
            p("Systems<br/>Under Pressure", "TitleBig"),
            p("The Mathematics of Food Systems", "SectionTitle"),
            spacer(18),
            card('"All models are wrong, but some are useful."', "George Box", INK, WHITE),
            spacer(28),
            p(subtitle, "Body"),
        ], SystemMap(260, 220)]], colWidths=[PAGE_W * 0.52, PAGE_W * 0.30], hAlign="LEFT", style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ])),
        PageBreak(),
    ]


RUBRIC_STANDARDS = [
    ("1", "Sequences and Series", "Content Standard", GREEN, GREEN_SOFT,
     [
         "Selects and justifies appropriate sequence and series models using strong mathematical reasoning. Clearly distinguishes arithmetic vs geometric, recursive vs explicit, finite vs infinite, and discrete vs continuous representations when relevant. Explains what terms, parameters, and cumulative sums mean in context. Predictions, recalculations, and interpretations are thoughtful, realistic, and well-supported.",
         "Uses appropriate sequence and series models with generally accurate reasoning. Explains arithmetic vs geometric patterns and recursive vs explicit forms with minor errors or missing detail. Interpretations and predictions are mostly reasonable and connected to context.",
         "Shows partial understanding of sequences and series. Some model choices or explanations are inaccurate, incomplete, or weakly justified. Connections between formulas, graphs, and context may be unclear or inconsistent.",
         "Shows limited understanding of sequences and series. Models are inappropriate, incomplete, or unsupported. Explanations and interpretations are mostly missing or incorrect.",
     ]),
    ("2", "Exponentials and Logarithms", "Content Standard", BLUE, BLUE_SOFT,
     [
         "Selects and justifies exponential models appropriately. Clearly explains growth and decay, thresholds, growth factors, and logarithmic reasoning in context. Thoughtfully compares exponential behavior to linear or geometric behavior when appropriate. Solutions are interpreted realistically with strong contextual understanding and critique of limitations.",
         "Uses exponential and logarithmic reasoning appropriately with mostly accurate explanations. Shows general understanding of growth factors, thresholds, and logarithmic solving. Interpretations are usually reasonable with only minor errors or missing detail.",
         "Shows partial understanding of exponentials and logarithms. Makes multiple errors in solving, interpretation, or model choice. Explanations may be vague, inconsistent, or disconnected from context.",
         "Shows limited understanding of exponential or logarithmic reasoning. Work is incomplete, incorrect, or lacks meaningful interpretation.",
     ]),
    ("3", "Polynomials", "Content Standard", PURPLE, PURPLE_SOFT,
     [
         "Creates and analyzes polynomial models with strong mathematical reasoning. Clearly explains degree, leading coefficient, end behavior, intercepts, multiplicity, extrema, and realistic domain restrictions in context. Thoughtfully compares factored and standard form and explains what each representation reveals. Uses notation such as x → ∞ and x → −∞ correctly and meaningfully.",
         "Analyzes polynomial models accurately with generally clear explanations. Shows understanding of graph behavior, structure, and polynomial forms with only minor errors or missing detail. Most interpretations are connected to context.",
         "Shows partial understanding of polynomial structure and graph behavior. Multiple errors or incomplete explanations weaken interpretation and analysis. Contextual meaning may be unclear or inconsistent.",
         "Shows limited understanding of polynomial reasoning or graph behavior. Analysis is incomplete, incorrect, or unsupported by meaningful explanation.",
     ]),
    ("4", "Mathematical Communication and Interpretation", "Skill Grade", INK, SOFT,
     [
         "Mathematical thinking is communicated clearly and thoughtfully through explanations, graphs, annotations, tables, discussion, and contextual interpretation. Strong connections among graph, algebra, assumptions, and context are consistently visible. Reasoning is organized, precise, and easy to follow.",
         "Communication is generally clear and understandable. Most mathematical ideas are connected to graphs, algebra, or context appropriately, though some explanations may lack precision or depth.",
         "Explanations are inconsistent, incomplete, or difficult to follow. Connections between mathematics and context are weak, unclear, or only partially developed.",
         "Mathematical thinking is minimally communicated. Explanations, interpretations, and connections are mostly missing or unclear.",
     ]),
    ("5", "Comparing Models, Assumptions, and Limitations", "Skill Grade", MUTED, SOFT,
     [
         "Thoughtfully compares multiple models, assumptions, and representations such as discrete vs continuous, recursive vs explicit, linear vs exponential, or different polynomial structures. Critiques realism, hidden variables, tradeoffs, assumptions, and unreasonable predictions with strong insight. Revision strengthens the mathematical investigation in meaningful ways.",
         "Compares models and assumptions appropriately with some explanation of limitations or realism. Shows general understanding of how assumptions affect predictions and interpretations. Some revision or reconsideration of ideas is visible.",
         "Comparisons are limited, superficial, or weakly justified. Explanations of assumptions, realism, or limitations are incomplete or inconsistent. Revision is minimal or mostly procedural.",
         "Shows little or no meaningful comparison of models, assumptions, or limitations. Revision and critique are mostly absent.",
     ]),
    ("6", "Algebraic Precision and Flexible Number Sense", "Skill Grade", INK, SOFT,
     [
         "Solves equations accurately using appropriate algebraic methods such as factoring, logarithms, inverse operations, substitution, graph interpretation, and algebraic manipulation. Fractions, decimals, percentages, negative numbers, and units are used fluently and precisely. Work is organized, justified, and consistently checked for reasonableness.",
         "Uses appropriate algebraic methods with mostly accurate calculations and organization. Rational numbers and units are generally used correctly, with only minor errors or omissions. Most answers are reasonable and interpreted appropriately.",
         "Uses some correct methods but makes multiple algebraic, numerical, or organizational errors. Precision, units, or interpretation may be inconsistent or incomplete.",
         "Shows little or no valid algebraic progress. Calculations, precision, organization, or interpretation are mostly incorrect or missing.",
     ]),
]


def build_student_overview():
    story = title_story("A concise investigation brief for studying real food systems under mathematical pressure.")
    story += section("Project Philosophy", "A model is useful, but incomplete.", "You are not simply completing Algebra 2 tasks. You are investigating an unstable food system and using mathematics to make its behavior more visible. Models reveal patterns, hide variables, depend on assumptions, and eventually break down. Strong mathematical thinkers name those limits honestly.")
    story.append(card_grid([
        ("Models reveal", "patterns, rates, structure, constraints, thresholds, and possible futures", GREEN, GREEN_SOFT),
        ("Models hide", "unmeasured variables, human decisions, sudden disruptions, uncertainty, and local context", BLUE, BLUE_SOFT),
        ("Models change", "when assumptions, rates, dimensions, domains, or constraints are revised", PURPLE, PURPLE_SOFT),
    ], 3))
    story.append(spacer(12))
    story.append(card("Revision is evidence of thinking", "Crossed-out assumptions, recalculated thresholds, revised graphs, changed interpretations, and honest limitations are not mistakes to hide. They are evidence that the investigation became more sophisticated.", INK, WHITE))
    story.append(PageBreak())

    story += section("System View", "One system. Many pressures.", "Food systems are interconnected. Changes in one part can reshape the whole system.")
    story.append(Table([[SystemMap(280, 210), card_grid([
        ("Mathematics helps us", "Model change, identify patterns, compare possibilities, estimate outcomes, critique predictions, and reveal constraints.", INK, WHITE),
        ("Strong thinkers ask", "What assumptions are we making? What variables matter most? Where does the model stop making sense? What tradeoffs appear?", INK, WHITE),
    ], 1)]], colWidths=[300, PAGE_W - 430], style=TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE")])) )
    story.append(PageBreak())

    story += section("Final Communication", "Choose the format that best communicates the investigation.", "The purpose is communicating mathematical reasoning, not producing a polished slideshow.")
    story.append(card_grid([
        ("Allowed formats", "Slides, filmed discussions, workbook walkthroughs, digital whiteboards, screencasts, annotated journals, documentary-style explanations, or hybrid combinations.", INK, WHITE),
        ("Math remains central", "Models, graph analysis, comparisons, assumptions, revisions, limitations, final claims, and visible mathematical evidence.", INK, WHITE),
        ("Clarity over polish", "Do not prioritize cinematic editing, effects, overproduction, or memorized performance. Prioritize reasoning and explanation.", INK, WHITE),
    ], 3))
    story.append(spacer(12))
    story.append(card("Workbook walkthroughs are encouraged", "The journal is a major part of the investigation. Students may explain crossed-out assumptions, revised graphs, recalculations, and changing interpretations directly from the workbook.", INK, WHITE))
    story.append(PageBreak())

    story += section("Deliverables", "What makes the investigation visible", "These pieces work together. The journal shows the evolving inquiry; the final communication explains the mathematical story.")
    story.append(card_grid([
        ("Investigation Journal", "Rough work, sketches, Desmos screenshots, calculations, AI interactions, revisions, and evolving reasoning.", INK, WHITE),
        ("Mathematical Artifacts", "Graph annotations, recursive calculations, polynomial long division, tables, recalculations, and revised models.", INK, WHITE),
        ("Group Reflection Vlogs", "Short mathematical conversations showing uncertainty, revision, disagreement, critique, and progress.", INK, WHITE),
        ("Final Communication", "The chosen format that communicates models, comparisons, assumptions, limitations, and claims.", INK, WHITE),
    ], 2))
    story.append(PageBreak())

    story += section("Collaboration", "One shared investigation. Visible individual thinking.", "Do not divide units by student. The group functions as a collaborative mathematical inquiry team.")
    story.append(card_grid([
        ("Collaborative work", "Students think together, discuss together, graph together, revise together, compare together, critique together, and synthesize together.", INK, WHITE),
        ("Individual evidence snapshots", "Each student contributes smaller, frequent artifacts: graph interpretations, model comparisons, recalculations, AI critique, revised assumptions, or limitation reflections.", INK, WHITE),
        ("Every student speaks mathematics", "Every student must visibly contribute reasoning, interpretation, comparison, critique, or explanation in group vlogs and final communication.", INK, WHITE),
    ], 3))
    story.append(PageBreak())

    story += section("Scenarios", "Choose one documentary investigation prompt.", "Each scenario begins with a human tension. Your group narrows it into one measurable mathematical investigation.")
    story.append(card_grid([
        ("A | United States", "The $5 Footlong Isn't $5 Anymore<br/><br/>Changing everyday food costs reshape affordability.<br/><br/><b>Key tensions:</b> inflation, pricing, shrinkflation, labor, transportation", GREEN, WHITE),
        ("B | Global", "When War Changes the Price of Bread<br/><br/>Disruption in one region can shift prices and recovery patterns elsewhere.<br/><br/><b>Key tensions:</b> exports, wheat, transport, recovery, supply chains", BLUE, WHITE),
        ("C | Sub-Saharan Africa", "What If Food Exists - But Never Arrives?<br/><br/>Food can be produced and still be lost before reaching people.<br/><br/><b>Key tensions:</b> spoilage, refrigeration, storage, infrastructure", PURPLE, WHITE),
        ("D | Colombia", "Can Climate Change the Future of Coffee?<br/><br/>Environmental and economic changes can alter yield, exports, and thresholds.<br/><br/><b>Key tensions:</b> rainfall, coffee yield, climate, transport, exports", INK, WHITE),
    ], 2))
    story.append(PageBreak())

    story += section("Focus", "A good question is narrow enough to model.", "Avoid giant topics. Look for one changing quantity, one measurable relationship, and one meaningful constraint.")
    story.append(card_grid([
        ("Too broad", "How inflation affects food<br/>Climate and coffee<br/>Food insecurity<br/>Food waste", RED, WARM),
        ("Better", "How sandwich prices changed over time<br/>Rainfall vs coffee yield in one region<br/>Food spoilage during transport stages<br/>Food remaining after repeated losses", GREEN, GREEN_SOFT),
    ], 2))
    story.append(spacer(12))
    story.append(card("Strong focus test", "Can your group identify one main changing quantity, one measurable relationship, one prediction or threshold question, one physical or cost constraint, and one connection across mathematical lenses?", INK, WHITE))
    story.append(PageBreak())

    story += section("Roadmap", "The five-class arc is one evolving investigation.", "Each phase builds on the same system. The mathematics becomes more sophisticated through comparison and revision.")
    story.append(card_grid([
        ("1. Entering the System", "Notice relationships before choosing equations. Move from topic choice to a measurable system relationship.", MUTED, WHITE),
        ("2. Modeling Change", "Represent repeated change with terms, formulas, and accumulated totals. Predict and test reliability.", GREEN, GREEN_SOFT),
        ("3. Thresholds", "Model compounding, decay, and threshold moments. Interpret model breakdown.", BLUE, BLUE_SOFT),
        ("4. Constraints", "Use structure and graph behavior to understand capacity, tradeoffs, extrema, and restricted domains.", PURPLE, PURPLE_SOFT),
        ("5. Synthesis", "Turn separate models into one defensible mathematical claim about uncertainty.", INK, WHITE),
    ], 3))
    story.append(PageBreak())

    story += section("Mathematical Lenses", "Different structures reveal different things.", "Students repeatedly answer: Why this model? What does it reveal? What does it miss? How do I know?")
    story.append(card_grid([
        ("Sequences & Series", "How is the system changing over time? Compare discrete vs continuous, arithmetic vs geometric, recursive vs explicit, finite vs infinite.", GREEN, GREEN_SOFT),
        ("Exponentials & Logs", "When does change accelerate, decay, compound, or cross a threshold? Compare linear vs exponential and sampled values vs continuous models.", BLUE, BLUE_SOFT),
        ("Polynomials", "How do capacity, cost, and physical constraints reshape the system? Analyze structure, end behavior, extrema, and domain.", PURPLE, PURPLE_SOFT),
    ], 3))
    story.append(spacer(12))
    story.append(card("Lightweight model fit", "Use r and R² as credibility and critique tools. Interpret direction, strength, fit, hidden variables, and causation limits. This is not a full statistics unit.", INK, WHITE))
    story.append(PageBreak())

    story += section("Assessment Frame", "Three content standards. Three skill grades.", "The final rubric separates Algebra 2 content from cross-cutting mathematical habits. Both matter.")
    story.append(p("CORE ALGEBRA 2 CONTENT STANDARDS", "Kicker"))
    story.append(card_grid([(f"{n}. {title}", desc, accent, fill) for n, title, kind, accent, fill, descs in RUBRIC_STANDARDS[:3] for desc in ["See the rubric for performance descriptors. This standard focuses on the mathematical content of the investigation."]], 3))
    story.append(spacer(12))
    story.append(p("CROSS-CUTTING SKILL GRADES", "Kicker"))
    story.append(card_grid([(f"{n}. {title}", "Assessed across the whole investigation as a mathematical habit: communication, comparison, critique, revision, precision, and flexible thinking.", accent, fill) for n, title, kind, accent, fill, descs in RUBRIC_STANDARDS[3:]], 3))
    story.append(PageBreak())

    story += section("AI Use", "SAIL L5: Co-Create", "AI is a thinking partner, not an answer machine. It should deepen reasoning and make critique sharper.")
    story.append(card_grid([
        ("AI may help you", "Challenge assumptions, critique models, identify missing variables, compare interpretations, explain r and R², organize ideas, and revise explanations.", GREEN, WHITE),
        ("AI may not replace you", "Do not submit reasoning you do not understand, ask AI to complete the project, hide meaningful AI use, or replace your own mathematical voice.", RED, WHITE),
    ], 2))
    story.append(spacer(12))
    story.append(card("Transparency sentence", "AI use: We asked ChatGPT to critique our constant-growth assumption. We rejected one suggestion, revised our rate assumption, and recalculated the threshold.", INK, WHITE))

    d = doc(OUT / "student-handout.pdf", "Student Overview")
    d.build(story, onFirstPage=footer, onLaterPages=footer)


def journal_page(story, label, prompt, workspace_label="open thinking space", grid=False):
    story += section(label, prompt)
    story.append(Table([[Workspace(workspace_label, 285, grid), card("Reflection prompt", "What changed in your thinking? What assumption is doing the most work? What evidence would make this stronger?", INK, SOFT)]], colWidths=[PAGE_W - 260, 145], style=TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ])))
    story.append(PageBreak())


def build_journal():
    story = title_story("A spacious mathematical field notebook for sketching, modeling, revising, and explaining.")
    story += section("Journal Norms", "Rough work belongs here.", "This journal is not a worksheet packet. It is the visible record of your group's evolving mathematical thinking.")
    story.append(card_grid([
        ("Value uncertainty", "A strong investigation often begins confused. Label assumptions, questions, disagreements, and places where a model stops making sense.", INK, WHITE),
        ("Revise visibly", "Cross out, annotate, draw arrows, compare versions, and explain why your thinking changed.", INK, WHITE),
        ("Models are arguments", "A model is not an answer. It is a claim built from assumptions, evidence, representations, and limits.", INK, WHITE),
    ], 3))
    story.append(spacer(12))
    story.append(card("Field note style", "Messy is acceptable. Hidden thinking is not. The strongest journals show graph, algebra, context, units, limitations, and revision together.", INK, WHITE))
    story.append(PageBreak())

    story += section("Rubric Alignment", "Use the journal to make standards visible.", "The rubric does not only score final answers. It looks for reasoning, interpretation, revision, limitations, precision, and flexible thinking across the investigation.")
    story.append(card_grid([(f"{n}. {title}", kind, accent, fill) for n, title, kind, accent, fill, descs in RUBRIC_STANDARDS], 3))
    story.append(PageBreak())

    phases = [
        ("Class 1", "Entering the System", "What relationships are we beginning to notice?", MUTED, [
            ("System map canvas", "Sketch variables, links, pressures, unknowns, and possible feedback loops.", True),
            ("Variable table and measurement notes", "Variable | Units | Why it matters | What is hard to measure. Which variables seem politically, socially, or physically difficult to measure?", False),
            ("Sketch before technology", "Predict the shape of one relationship before using Desmos, Sheets, or another tool. What relationship seems obvious at first but may be misleading?", True),
            ("Vlog notes", "Discuss uncertainty, early assumptions, possible misleading patterns, and variables that may be hard to measure reliably.", False),
        ]),
        ("Class 2", "Modeling Change", "How is the system changing over time?", GREEN, [
            ("Discrete vs continuous reasoning", "Does your context change in steps, continuously, or both? Justify the representation that best fits your system.", False),
            ("Pattern behavior", "Does the system behave additively, multiplicatively, unpredictably, or in phases? What evidence supports this?", False),
            ("Recursive and explicit formulas", "Write useful formulas if the pattern supports them. Annotate what each term, parameter, and assumption means in your context.", True),
            ("Accumulated change", "What does accumulated change represent in your system? Would accumulation realistically continue forever? Why or why not?", False),
            ("Meaningful time scales", "Choose multiple time ranges that matter for your investigation. How does the model behave differently across those scales?", True),
            ("Pattern breakdown", "When does the pattern stop behaving consistently? What evidence would make you revise or reject it?", False),
        ]),
        ("Class 3", "Acceleration, Decay, and Thresholds", "When does repeated change become accelerated or compounding?", BLUE, [
            ("Exponential vs linear", "What evidence suggests the change depends on the current amount rather than a constant added amount?", False),
            ("Sampled values vs continuous model", "How does continuous exponential modeling change the interpretation compared to sampled or discrete terms in your context?", False),
            ("Build the model", "Define starting value, growth or decay factor, variables, assumptions, and realistic domain. Which assumption is doing the most work?", True),
            ("Logarithmic threshold", "Use logarithms when you need to solve for an unknown time or threshold. What does that threshold mean in the real system?", True),
            ("Rate or assumption comparison", "Compare multiple realistic rates or assumptions relevant to your investigation. Which assumptions cause the prediction to change dramatically?", True),
            ("Model breakdown", "Where does exponential behavior stop being realistic? What real-world forces might interrupt it? What hidden variables matter?", False),
        ]),
        ("Class 4", "Constraints, Capacity, and Cost", "How do physical and economic constraints reshape the system?", PURPLE, [
            ("Flat blueprint", "Original dimensions, square cutout variable, folding lines, units in centimeters.", True),
            ("Folded storage structure", "Height, interior dimensions, usable space, loading floor.", True),
            ("Volume polynomial", "Factored form, standard form, and why multiplying dimensions creates a cubic.", False),
            ("Graph annotation", "Intercepts, multiplicity, extrema, domain, unrealistic regions, physical meaning.", True),
            ("End behavior and structure", "Degree, even/odd, leading coefficient, as x → ∞ and as x → −∞.", False),
            ("Polynomial division", "How could division help analyze storage, packing, capacity, grouping, or remaining space? Interpret the quotient and remainder physically.", True),
            ("Constraint revision", "Change a realistic physical or economic constraint from your context. What tradeoff appears, and which graph regions become impossible?", True),
        ]),
        ("Class 5", "Revision, Synthesis, and Communication", "What story does our mathematics tell?", INK, [
            ("Synthesis table", "Lens | What did it reveal? | Where did it fail?", False),
            ("Where models agreed or conflicted", "Compare mathematical lenses and assumptions.", False),
            ("Final mathematical claim", "Use evidence, assumptions, limitations, tradeoffs, and implications. What remained uncertain even after modeling?", False),
            ("Communication storyboard", "Choose a format. Plan how mathematical evidence, revisions, and uncertainty will be visible.", True),
            ("If we repeated this investigation", "With better data, what would change? Which assumption, measurement, or model would you revisit first?", False),
            ("Individual artifact snapshot", "Revision, hidden-variable analysis, limitation critique, or r/R² interpretation. A high R² can still mislead; correlation can support a claim without proving causation.", False),
        ]),
    ]

    for class_num, title, question, accent, pages in phases:
        story += section(class_num, title, question)
        story.append(card("Field notebook expectation", "Use this section as a place for rough work, uncertainty, recalculation, and revision. Let the thinking stay visible.", accent, WHITE))
        story.append(PageBreak())
        for label, prompt, grid in pages:
            journal_page(story, label, prompt, "student thinking space", grid)
        if class_num in ["Class 2", "Class 3", "Class 4"]:
            story += section(f"{class_num} Model Comparison Studio", "Changing assumptions creates different mathematical realities.", "Choose model versions that are meaningful for your context. Which model is more useful, more realistic, or more honest about uncertainty? Which model hides constraints, exaggerates certainty, or breaks first?")
            story.append(Table([[Workspace("version A", 245, True), Workspace("version B", 245, True), Workspace("version C", 245, True)]], colWidths=[(PAGE_W - 100) / 3] * 3, style=TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ])))
            story.append(PageBreak())

    d = doc(OUT / "investigation-journal.pdf", "Enhanced Investigation Journal")
    d.build(story, onFirstPage=footer, onLaterPages=footer)


def rubric_level_card(level, descriptor, accent):
    title = level
    t = Table([[p(title, "RubricLevel")], [p(descriptor, "RubricBody")]], colWidths=[None])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), WHITE),
        ("BOX", (0, 0), (-1, -1), 0.8, LINE),
        ("LINEABOVE", (0, 0), (-1, 0), 4, accent),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def build_rubric():
    story = [p("Algebra 2 Final Project - Semester 2", "CenterTitle")]
    story += section("Rubric Philosophy", "Reasoning over polish.", "The project assesses reasoning, revision, interpretation, critique, mathematical communication, model selection, contextual understanding, limitations, visible thinking, and intellectual flexibility. It does not prioritize production polish, memorization, superficial correctness, or overproduced presentations.")
    story.append(card_grid([
        ("Standards 1-3", "Core Algebra 2 content standards: Sequences and Series, Exponentials and Logarithms, Polynomials.", GREEN, GREEN_SOFT),
        ("Standards 4-6", "Cross-cutting skill grades: Communication and Interpretation, Comparing Models and Limitations, Algebraic Precision and Flexible Number Sense.", BLUE, BLUE_SOFT),
    ], 2))
    story.append(PageBreak())

    level_names = ["4 — Exceeds Expectations", "3 — Meets Expectations", "2 — Approaching Expectations", "1 — Beginning"]
    for n, title, kind, accent, fill, descriptors in RUBRIC_STANDARDS:
        story += section(f"Standard {n} | {kind}", title)
        story.append(card("Assessment focus", "Use visible mathematical evidence from the journal, artifacts, vlogs, and final communication. The strongest work connects graph, algebra, context, assumptions, revision, and limitations.", accent, fill))
        story.append(spacer(8))
        rows = [
            [rubric_level_card(level_names[0], descriptors[0], accent), rubric_level_card(level_names[1], descriptors[1], accent)],
            [rubric_level_card(level_names[2], descriptors[2], accent), rubric_level_card(level_names[3], descriptors[3], accent)],
        ]
        t = Table(rows, colWidths=[(PAGE_W - 100) / 2] * 2, hAlign="LEFT")
        t.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]))
        story.append(t)
        story.append(PageBreak())

    d = doc(OUT / "rubrics.pdf", "Final Rubric")
    d.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_student_overview()
    build_journal()
    build_rubric()
    print("Generated polished landscape PDFs in downloads/")
