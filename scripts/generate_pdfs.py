from pathlib import Path
import textwrap

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "downloads"
OUT.mkdir(exist_ok=True)

PAGE_W = 792
PAGE_H = 612

INK = (24, 31, 42)
CHARCOAL = (51, 65, 85)
MUTED = (100, 116, 139)
LINE = (211, 218, 228)
SOFT = (248, 250, 252)
PAPER = (255, 255, 255)
GREEN = (34, 112, 77)
GREEN_SOFT = (231, 243, 235)
BLUE = (36, 91, 150)
BLUE_SOFT = (230, 239, 250)
PURPLE = (103, 73, 142)
PURPLE_SOFT = (241, 235, 248)
WARM = (245, 242, 237)
SLATE = (71, 85, 105)


class PDF:
    def __init__(self, title):
        self.title = title
        self.width = PAGE_W
        self.height = PAGE_H
        self.margin = 58
        self.pages = []
        self.stream = []
        self.page_number = 0
        self.new_page()

    def esc(self, value):
        return str(value).replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")

    def cmd(self, value):
        self.stream.append(value)

    def color(self, value, stroke=False):
        r, g, b = [c / 255 for c in value]
        self.cmd(f"{r:.3f} {g:.3f} {b:.3f} {'RG' if stroke else 'rg'}")

    def new_page(self, section=None, accent=INK, footer=True):
        if self.stream:
            if footer:
                self.footer()
            self.pages.append("\n".join(self.stream))
        self.page_number += 1
        self.stream = []
        self.y = self.height - self.margin
        if section:
            self.section_label(section, accent)

    def text(self, value, x, y, size=11, font="F1", color=INK):
        self.color(color)
        self.cmd(f"BT /{font} {size} Tf {x:.2f} {y:.2f} Td ({self.esc(value)}) Tj ET")

    def wrapped(self, value, x, y, width_chars=62, size=11, leading=15, font="F1", color=CHARCOAL, max_lines=None):
        lines = []
        for para in str(value).split("\n"):
            if para.strip():
                lines.extend(textwrap.wrap(para.strip(), width=width_chars))
            else:
                lines.append("")
        if max_lines:
            lines = lines[:max_lines]
        for line in lines:
            self.text(line, x, y, size, font, color)
            y -= leading
        return y

    def line(self, x1, y1, x2, y2, color=LINE, width=1):
        self.color(color, stroke=True)
        self.cmd(f"{width:.2f} w {x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S")

    def rect(self, x, y, w, h, fill=None, stroke=LINE, width=1):
        if fill:
            self.color(fill)
            self.cmd(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re f")
        if stroke:
            self.color(stroke, stroke=True)
            self.cmd(f"{width:.2f} w {x:.2f} {y:.2f} {w:.2f} {h:.2f} re S")

    def circle(self, x, y, r, fill=None, stroke=LINE, width=1):
        # cubic Bezier circle approximation
        c = 0.5522847498 * r
        if fill:
            self.color(fill)
            op = "B" if stroke else "f"
        else:
            op = "S"
        if stroke:
            self.color(stroke, stroke=True)
        self.cmd(
            f"{width:.2f} w {x+r:.2f} {y:.2f} m "
            f"{x+r:.2f} {y+c:.2f} {x+c:.2f} {y+r:.2f} {x:.2f} {y+r:.2f} c "
            f"{x-c:.2f} {y+r:.2f} {x-r:.2f} {y+c:.2f} {x-r:.2f} {y:.2f} c "
            f"{x-r:.2f} {y-c:.2f} {x-c:.2f} {y-r:.2f} {x:.2f} {y-r:.2f} c "
            f"{x+c:.2f} {y-r:.2f} {x+r:.2f} {y-c:.2f} {x+r:.2f} {y:.2f} c {op}"
        )

    def footer(self):
        self.line(self.margin, 38, self.width - self.margin, 38, (230, 235, 242), .7)
        self.text("Systems Under Pressure | Algebra 2 Final Project", self.margin, 22, 8.5, color=MUTED)
        self.text(str(self.page_number), self.width - self.margin - 10, 22, 8.5, color=MUTED)

    def save(self, path):
        self.footer()
        self.pages.append("\n".join(self.stream))
        objects = []
        catalog_id = 1
        pages_id = 2
        font_regular = 3
        font_bold = 4
        font_italic = 5
        page_ids = []
        content_ids = []
        next_id = 6
        for _ in self.pages:
            page_ids.append(next_id)
            content_ids.append(next_id + 1)
            next_id += 2
        objects.append((catalog_id, f"<< /Type /Catalog /Pages {pages_id} 0 R >>"))
        kids = " ".join(f"{pid} 0 R" for pid in page_ids)
        objects.append((pages_id, f"<< /Type /Pages /Kids [{kids}] /Count {len(page_ids)} >>"))
        objects.append((font_regular, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"))
        objects.append((font_bold, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"))
        objects.append((font_italic, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>"))
        for pid, cid, stream in zip(page_ids, content_ids, self.pages):
            objects.append((pid, f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 {self.width} {self.height}] /Resources << /Font << /F1 {font_regular} 0 R /F2 {font_bold} 0 R /F3 {font_italic} 0 R >> >> /Contents {cid} 0 R >>"))
            encoded = stream.encode("latin-1", "replace")
            objects.append((cid, f"<< /Length {len(encoded)} >>\nstream\n{stream}\nendstream"))
        pdf = ["%PDF-1.4\n"]
        offsets = [0]
        for obj_id, body in objects:
            offsets.append(sum(len(part.encode("latin-1", "replace")) for part in pdf))
            pdf.append(f"{obj_id} 0 obj\n{body}\nendobj\n")
        xref = sum(len(part.encode("latin-1", "replace")) for part in pdf)
        pdf.append(f"xref\n0 {len(objects)+1}\n0000000000 65535 f \n")
        for off in offsets[1:]:
            pdf.append(f"{off:010d} 00000 n \n")
        pdf.append(f"trailer\n<< /Size {len(objects)+1} /Root {catalog_id} 0 R >>\nstartxref\n{xref}\n%%EOF")
        path.write_bytes("".join(pdf).encode("latin-1", "replace"))

    def section_label(self, label, accent=INK):
        self.text(label.upper(), self.margin, self.height - 32, 8.5, "F2", accent)
        self.line(self.margin, self.height - 42, self.width - self.margin, self.height - 42, (231, 235, 241), .8)

    def title_page(self, subtitle):
        self.rect(0, 0, self.width, self.height, fill=(250, 251, 253), stroke=None)
        self.system_network(615, 300, 135)
        self.text("ALGEBRA 2 CUMULATIVE SEMESTER FINAL PROJECT", self.margin, 505, 9.5, "F2", MUTED)
        self.text("Systems", self.margin, 450, 42, "F2", INK)
        self.text("Under Pressure", self.margin, 402, 42, "F2", INK)
        self.text("The Mathematics of Food Systems", self.margin, 362, 18, "F2", CHARCOAL)
        self.rect(self.margin, 220, 310, 92, fill=PAPER, stroke=(224, 229, 236))
        self.rect(self.margin, 220, 7, 92, fill=INK, stroke=None)
        self.wrapped('"All models are wrong, but some are useful."', self.margin + 22, 278, 38, 15, 20, "F2", INK)
        self.text("George Box", self.margin + 22, 240, 10, color=MUTED)
        self.wrapped(subtitle, self.margin, 150, 55, 12, 17, color=CHARCOAL)

    def system_network(self, cx, cy, radius):
        scale = radius / 180
        nodes = [
            ("Climate", GREEN, -130, 92), ("Transport", BLUE, 42, 118), ("Storage", PURPLE, 146, 28),
            ("Exports", PURPLE, 118, -98), ("Food loss", (150, 66, 66), -44, -130),
            ("Demand", BLUE, -160, -42), ("Supply", GREEN, -170, 35),
        ]
        self.circle(cx, cy, 48 * scale, fill=PAPER, stroke=(200, 208, 220), width=1.2)
        self.text("Food", cx - 23 * scale, cy + 8 * scale, 13 * scale, "F2", INK)
        self.text("System", cx - 30 * scale, cy - 10 * scale, 13 * scale, "F2", INK)
        for name, color, dx, dy in nodes:
            x, y = cx + dx * scale, cy + dy * scale
            self.line(cx, cy, x, y, (173, 184, 199), 1.4)
            r = 28 * scale
            self.circle(x, y, r, fill=PAPER, stroke=color, width=1.4)
            self.text(name, x + r + 6 * scale, y - 3 * scale, max(7.4, 8.4 * scale), "F2", color)
        self.text("interconnected pressures", cx - 62 * scale, cy - 74 * scale, max(8, 9 * scale), color=MUTED)

    def opener(self, kicker, title, body, accent=INK, note=None):
        self.rect(0, 0, self.width, self.height, fill=(250, 251, 253), stroke=None)
        self.rect(self.margin, 98, 7, 356, fill=accent, stroke=None)
        self.text(kicker.upper(), self.margin + 28, 440, 9.5, "F2", accent)
        self.wrapped(title, self.margin + 28, 392, 20, 34, 40, "F2", INK)
        self.wrapped(body, self.margin + 28, 255, 56, 13, 18, color=CHARCOAL)
        if note:
            self.rect(510, 122, 200, 132, fill=PAPER, stroke=(224, 229, 236))
            self.wrapped(note, 532, 215, 28, 11, 15, "F2", CHARCOAL)

    def quote_page(self):
        self.rect(0, 0, self.width, self.height, fill=INK, stroke=None)
        self.rect(94, 125, 5, 345, fill=(255, 255, 255), stroke=None)
        self.wrapped('"All models are wrong, but some are useful."', 122, 398, 34, 32, 40, "F2", (255, 255, 255))
        self.text("George Box", 125, 270, 13, color=(204, 213, 226))
        self.wrapped("This project is not about perfect certainty. It is about using mathematics to make a complex system clearer, then naming what the mathematics still cannot see.", 125, 205, 58, 13, 18, color=(226, 232, 240))

    def card(self, x, y, w, h, title, body, accent=INK, fill=PAPER, body_chars=35):
        self.rect(x, y, w, h, fill=fill, stroke=(224, 229, 236))
        self.rect(x, y + h - 8, w, 8, fill=accent, stroke=None)
        self.text(title, x + 18, y + h - 33, 14, "F2", accent)
        self.wrapped(body, x + 18, y + h - 58, body_chars, 10.5, 14.5, color=CHARCOAL)

    def side_note(self, x, y, w, h, title, body, accent=SLATE):
        self.rect(x, y, w, h, fill=(250, 251, 253), stroke=(224, 229, 236))
        self.text(title.upper(), x + 14, y + h - 24, 8.5, "F2", accent)
        self.wrapped(body, x + 14, y + h - 44, max(18, int(w / 5.7)), 9.5, 13, color=CHARCOAL)

    def bullets(self, x, y, items, width_chars=44, size=10.5, leading=14.5, color=CHARCOAL):
        for item in items:
            lines = textwrap.wrap(item, width=width_chars)
            self.text("-", x, y, size, "F2", color)
            self.text(lines[0], x + 16, y, size, color=color)
            y -= leading
            for line in lines[1:]:
                self.text(line, x + 16, y, size, color=color)
                y -= leading
            y -= 5
        return y

    def workspace(self, x, y, w, h, label=None, grid=False, lines=True, accent=(226, 232, 240)):
        self.rect(x, y, w, h, fill=PAPER, stroke=(192, 202, 216))
        if label:
            self.text(label, x + 14, y + h - 24, 10, "F2", MUTED)
        if grid:
            step = 28
            gx = x + step
            while gx < x + w:
                self.line(gx, y + 12, gx, y + h - 12, (235, 239, 245), .35)
                gx += step
            gy = y + step
            while gy < y + h:
                self.line(x + 12, gy, x + w - 12, gy, (235, 239, 245), .35)
                gy += step
        elif lines:
            yy = y + h - 45
            while yy > y + 18:
                self.line(x + 16, yy, x + w - 16, yy, accent, .45)
                yy -= 22

    def spread_title(self, label, title, subtitle, accent=INK):
        self.section_label(label, accent)
        self.text(title, self.margin, 518, 28, "F2", INK)
        self.wrapped(subtitle, self.margin, 488, 82, 11.5, 16, color=CHARCOAL)
        self.line(self.margin, 458, self.width - self.margin, 458, (226, 232, 240), .8)


RUBRIC_CONTENT_STANDARDS = [
    ("1", "Sequences and Series", "discrete change, arithmetic vs geometric patterns, recursive vs explicit forms, finite vs infinite reasoning, cumulative sums in context", GREEN),
    ("2", "Exponentials and Logarithms", "growth and decay, growth factors, thresholds, logarithmic reasoning, realistic interpretation and limitations", BLUE),
    ("3", "Polynomials", "degree, leading coefficient, end behavior, intercepts, multiplicity, extrema, polynomial forms, and realistic domain restrictions", PURPLE),
]

RUBRIC_SKILL_GRADES = [
    ("4", "Mathematical Communication and Interpretation", "clear explanations, graph-algebra-context connections, assumptions, annotations, tables, and contextual interpretation", INK),
    ("5", "Comparing Models, Assumptions, and Limitations", "model comparison, realism, hidden variables, tradeoffs, assumptions, unreasonable predictions, and meaningful revision", SLATE),
    ("6", "Algebraic Precision and Flexible Number Sense", "accurate methods, factoring, logarithms, substitution, graph interpretation, rational numbers, units, and reasonableness checks", INK),
]


def build_handout():
    pdf = PDF("Student Overview")
    pdf.title_page("A concise investigation brief for studying real food systems under mathematical pressure.")
    pdf.new_page(footer=False)
    pdf.quote_page()
    pdf.new_page()
    pdf.opener(
        "Project Philosophy",
        "A model is useful, but incomplete.",
        "You are not simply completing Algebra 2 tasks. You are investigating an unstable food system and using mathematics to make its behavior more visible. Models reveal patterns, hide variables, depend on assumptions, and eventually break down. Strong mathematical thinkers name those limits honestly.",
        INK,
        "Revision is evidence of mathematical thinking."
    )
    pdf.new_page("Investigation Mindset")
    pdf.spread_title("Investigation Mindset", "Think like a mathematical investigator.", "This project values interpretation over memorization and visible reasoning over polished certainty.", INK)
    pdf.card(58, 312, 204, 132, "Models reveal", "patterns, rates, structure, constraints, thresholds, and possible futures", GREEN, GREEN_SOFT, 25)
    pdf.card(294, 312, 204, 132, "Models hide", "unmeasured variables, human decisions, sudden disruptions, uncertainty, and local context", BLUE, BLUE_SOFT, 25)
    pdf.card(530, 312, 204, 132, "Models change", "when assumptions, rates, dimensions, domains, or constraints are revised", PURPLE, PURPLE_SOFT, 25)
    pdf.side_note(58, 132, 676, 90, "What counts as strong thinking", "Crossed-out assumptions, recalculated thresholds, revised graphs, changed interpretations, and honest limitations are not mistakes to hide. They are evidence that the investigation became more sophisticated.", INK)
    pdf.new_page("System View")
    pdf.spread_title("System View", "One system. Many pressures.", "Food systems are interconnected. Changes in one part can reshape the whole system.", INK)
    pdf.system_network(246, 260, 160)
    pdf.card(455, 315, 245, 118, "Mathematics helps us", "Model change, identify patterns, compare possibilities, estimate outcomes, critique predictions, and reveal constraints.", INK, PAPER, 30)
    pdf.card(455, 168, 245, 118, "Strong thinkers ask", "What assumptions are we making? What variables matter most? Where does the model stop making sense? What tradeoffs appear?", INK, PAPER, 30)
    pdf.new_page("Final Communication")
    pdf.spread_title("Final Communication", "Choose the format that best communicates the investigation.", "The purpose is communicating mathematical reasoning, not producing a polished slideshow.", INK)
    formats = [
        ("Allowed formats", "slides, filmed discussions, workbook walkthroughs, digital whiteboards, screencasts, annotated journals, documentary-style explanations, or hybrid combinations"),
        ("Math remains central", "models, graph analysis, comparisons, assumptions, revisions, limitations, final claims, and visible mathematical evidence"),
        ("Clarity over polish", "Do not prioritize cinematic editing, effects, overproduction, or memorized performance. Prioritize reasoning and explanation."),
    ]
    x = pdf.margin
    for title, body in formats:
        pdf.card(x, 255, 204, 154, title, body, INK, PAPER, 25)
        x += 224
    pdf.side_note(pdf.margin, 115, 654, 82, "Workbook walkthroughs are encouraged", "The journal is a major part of the investigation. Students may explain crossed-out assumptions, revised graphs, recalculations, and changing interpretations directly from the workbook.", INK)
    pdf.new_page("Deliverables")
    pdf.spread_title("Deliverables", "What makes the investigation visible", "These pieces work together. The journal shows the evolving inquiry; the final communication explains the mathematical story.", INK)
    deliverables = [
        ("Investigation Journal", "rough work, sketches, Desmos screenshots, calculations, AI interactions, revisions, and evolving reasoning"),
        ("Mathematical Artifacts", "graph annotations, recursive calculations, polynomial long division, tables, recalculations, and revised models"),
        ("Group Reflection Vlogs", "short mathematical conversations showing uncertainty, revision, disagreement, critique, and progress"),
        ("Final Communication", "the chosen format that communicates models, comparisons, assumptions, limitations, and claims"),
    ]
    coords = [(58, 290), (398, 290), (58, 118), (398, 118)]
    for (title, body), (x, y) in zip(deliverables, coords):
        pdf.card(x, y, 286, 132, title, body, INK, PAPER, 36)
    pdf.new_page("Collaboration")
    pdf.spread_title("Collaboration", "One shared investigation. Visible individual thinking.", "Do not divide units by student. The group functions as a collaborative mathematical inquiry team.", INK)
    pdf.side_note(58, 292, 310, 150, "Collaborative work", "Students think together, discuss together, graph together, revise together, compare together, critique together, and synthesize together.", INK)
    pdf.side_note(400, 292, 310, 150, "Individual evidence snapshots", "Each student contributes smaller, frequent artifacts: graph interpretations, model comparisons, recalculations, AI critique, revised assumptions, or limitation reflections.", INK)
    pdf.side_note(58, 128, 652, 96, "Every student speaks mathematics", "Every student must visibly contribute mathematical reasoning, interpretation, comparison, critique, or explanation in group vlogs and final communication. The goal is authentic reasoning, not mechanical speaking turns.", INK)
    pdf.new_page("Scenarios")
    pdf.spread_title("Scenarios", "Choose one documentary investigation prompt.", "Each scenario begins with a human tension. Your group narrows it into one measurable mathematical investigation.", INK)
    scenarios = [
        ("A | United States", "The $5 Footlong Isn't $5 Anymore", "Changing everyday food costs reshape affordability.", "inflation, pricing, shrinkflation, labor, transportation"),
        ("B | Global", "When War Changes the Price of Bread", "Disruption in one region can shift prices and recovery patterns elsewhere.", "exports, wheat, transport, recovery, supply chains"),
        ("C | Sub-Saharan Africa", "What If Food Exists - But Never Arrives?", "Food can be produced and still be lost before reaching people.", "spoilage, refrigeration, storage, infrastructure"),
        ("D | Colombia", "Can Climate Change the Future of Coffee?", "Environmental and economic changes can alter yield, exports, and thresholds.", "rainfall, coffee yield, climate, transport, exports"),
    ]
    coords = [(58, 312), (398, 312), (58, 118), (398, 118)]
    accents = [GREEN, BLUE, PURPLE, CHARCOAL]
    for (sc, title, hook, ideas), (x, y), accent in zip(scenarios, coords, accents):
        pdf.card(x, y, 286, 150, sc, f"{title}\n\n{hook}\n\nKey tensions: {ideas}", accent, PAPER, 33)
    pdf.new_page("Focus")
    pdf.spread_title("Focus", "A good question is narrow enough to model.", "Avoid giant topics. Look for one changing quantity, one measurable relationship, and one meaningful constraint.", INK)
    pdf.card(58, 315, 300, 118, "Too broad", "How inflation affects food\nClimate and coffee\nFood insecurity\nFood waste", (120, 87, 66), WARM, 34)
    pdf.card(410, 315, 300, 118, "Better", "How sandwich prices changed over time\nRainfall vs coffee yield in one region\nFood spoilage during transport stages\nFood remaining after repeated losses", GREEN, GREEN_SOFT, 34)
    pdf.side_note(58, 145, 652, 96, "Strong focus test", "Can your group identify one main changing quantity, one measurable relationship, one prediction or threshold question, one physical or cost constraint, and one connection across mathematical lenses?", INK)
    pdf.new_page("Roadmap")
    pdf.spread_title("Roadmap", "The five-class arc is one evolving investigation.", "Each phase builds on the same system. The mathematics becomes more sophisticated through comparison and revision.", INK)
    phases = [
        ("1", "Entering the System", "notice variables", SLATE),
        ("2", "Modeling Change", "sequences and series", GREEN),
        ("3", "Thresholds", "exponentials and logs", BLUE),
        ("4", "Constraints", "polynomials", PURPLE),
        ("5", "Synthesis", "claim and critique", INK),
    ]
    x = 70
    y = 300
    for i, (num, title, body, accent) in enumerate(phases):
        pdf.circle(x + 36, y + 64, 25, fill=PAPER, stroke=accent, width=1.6)
        pdf.text(num, x + 29, y + 56, 18, "F2", accent)
        pdf.card(x, y - 65, 116, 102, title, body, accent, PAPER, 16)
        if i < 4:
            pdf.line(x + 118, y + 64, x + 136, y + 64, (167, 178, 193), 1.4)
        x += 136
    pdf.side_note(88, 108, 600, 88, "Project arc", "Notice relationships, model repeated change, recognize acceleration and thresholds, model constraints, then synthesize what each model reveals and misses.", INK)
    pdf.new_page("Mathematical Lenses")
    pdf.spread_title("Mathematical Lenses", "Different structures reveal different things.", "Students repeatedly answer: Why this model? What does it reveal? What does it miss? How do I know?", INK)
    pdf.card(58, 285, 204, 145, "Sequences & Series", "How is the system changing over time? Compare discrete vs continuous, arithmetic vs geometric, recursive vs explicit, finite vs infinite.", GREEN, GREEN_SOFT, 25)
    pdf.card(294, 285, 204, 145, "Exponentials & Logs", "When does change accelerate, decay, compound, or cross a threshold? Compare linear vs exponential and sampled values vs continuous models.", BLUE, BLUE_SOFT, 25)
    pdf.card(530, 285, 204, 145, "Polynomials", "How do capacity, cost, and physical constraints reshape the system? Analyze structure, end behavior, extrema, and domain.", PURPLE, PURPLE_SOFT, 25)
    pdf.side_note(58, 128, 676, 86, "Lightweight model fit", "Use r and R² as credibility and critique tools. Interpret direction, strength, fit, hidden variables, and causation limits. This is not a full statistics unit.", INK)
    pdf.new_page("Assessment Frame")
    pdf.spread_title("Assessment Frame", "Three content standards. Three skill grades.", "The final rubric separates Algebra 2 content from cross-cutting mathematical habits. Both matter.", INK)
    pdf.text("CORE ALGEBRA 2 CONTENT STANDARDS", 58, 420, 9, "F2", MUTED)
    x = 58
    for num, title, body, accent in RUBRIC_CONTENT_STANDARDS:
        pdf.card(x, 258, 204, 135, f"{num}. {title}", body, accent, PAPER, 25)
        x += 236
    pdf.text("CROSS-CUTTING SKILL GRADES", 58, 214, 9, "F2", MUTED)
    x = 58
    for num, title, body, accent in RUBRIC_SKILL_GRADES:
        pdf.card(x, 68, 204, 120, f"{num}. {title}", body, accent, (250, 251, 253), 24)
        x += 236
    pdf.new_page("AI Use")
    pdf.spread_title("AI Use", "SAIL L5: Co-Create", "AI is a thinking partner, not an answer machine. It should deepen reasoning and make critique sharper.", INK)
    pdf.card(58, 286, 300, 140, "AI may help you", "challenge assumptions, critique models, identify missing variables, compare interpretations, explain r and R², organize ideas, and revise explanations", GREEN, PAPER, 36)
    pdf.card(410, 286, 300, 140, "AI may not replace you", "Do not submit reasoning you do not understand, ask AI to complete the project, hide meaningful AI use, or replace your own mathematical voice.", (150, 66, 66), PAPER, 36)
    pdf.side_note(58, 118, 652, 96, "Transparency sentence", "AI use: We asked ChatGPT to critique our constant-growth assumption. We rejected one suggestion, revised our rate assumption, and recalculated the threshold.", INK)
    pdf.save(OUT / "student-handout.pdf")


def class_opener(pdf, num, title, question, identity, accent, mood):
    pdf.new_page(footer=False)
    pdf.rect(0, 0, pdf.width, pdf.height, fill=(250, 251, 253), stroke=None)
    pdf.rect(58, 106, 8, 360, fill=accent, stroke=None)
    pdf.text(f"CLASS {num}", 92, 448, 10, "F2", accent)
    pdf.text(title, 92, 398, 34, "F2", INK)
    pdf.wrapped(question, 92, 342, 52, 16, 22, "F2", CHARCOAL)
    pdf.side_note(520, 310, 190, 120, identity, mood, accent)
    pdf.wrapped("Use this section as a field notebook. Let rough work, uncertainty, recalculation, and revision stay visible.", 92, 205, 58, 13, 18, color=CHARCOAL)


def build_journal():
    pdf = PDF("Investigation Journal")
    pdf.title_page("A spacious mathematical field notebook for sketching, modeling, revising, and explaining.")
    pdf.new_page("Journal Norms")
    pdf.spread_title("Journal Norms", "Rough work belongs here.", "This journal is not a worksheet packet. It is the visible record of your group's evolving mathematical thinking.", INK)
    pdf.card(58, 298, 300, 120, "Value uncertainty", "Label assumptions, questions, disagreements, and places where a model stops making sense.", INK, PAPER, 36)
    pdf.card(410, 298, 300, 120, "Revise visibly", "Cross out, annotate, draw arrows, compare versions, and explain why your thinking changed.", INK, PAPER, 36)
    pdf.side_note(58, 140, 652, 86, "Field note style", "Messy is acceptable. Hidden thinking is not. The strongest journals show graph, algebra, context, units, limitations, and revision together.", INK)
    pdf.new_page("Rubric Alignment")
    pdf.spread_title("Rubric Alignment", "Use the journal to make standards visible.", "The rubric does not only score final answers. It looks for reasoning, interpretation, revision, limitations, precision, and flexible thinking across the investigation.", INK)
    pdf.text("CORE CONTENT STANDARDS", 58, 420, 9, "F2", MUTED)
    x = 58
    for num, title, body, accent in RUBRIC_CONTENT_STANDARDS:
        pdf.card(x, 270, 204, 122, f"{num}. {title}", body, accent, PAPER, 25)
        x += 236
    pdf.text("SKILL GRADES", 58, 226, 9, "F2", MUTED)
    x = 58
    for num, title, body, accent in RUBRIC_SKILL_GRADES:
        pdf.card(x, 86, 204, 114, f"{num}. {title}", body, accent, (250, 251, 253), 24)
        x += 236

    phases = [
        (1, "Entering the System", "What relationships are we beginning to notice?", "Exploratory field notes", "Open, uncertain, observational.", SLATE, [
            ("System map canvas", "Sketch variables, links, pressures, unknowns, and possible feedback loops.", "grid"),
            ("Variable table and measurement notes", "Variable | Units | Why it matters | What is hard to measure", "lines"),
            ("Sketch before technology", "Predict the shape of one relationship before using Desmos, Sheets, or another tool.", "grid"),
            ("Vlog notes", "Patterns noticed, uncertainties, assumptions, important variables.", "lines"),
        ]),
        (2, "Modeling Change", "How is the system changing over time?", "Pattern studio", "Structured repeated change.", GREEN, [
            ("Discrete vs continuous comparison", "Why is a sequence appropriate? What would change in a continuous model?", "lines"),
            ("Arithmetic, geometric, or neither?", "Use evidence. Explain what each term represents in context.", "lines"),
            ("Recursive and explicit formulas", "Write both formulas. Annotate every variable and parameter.", "grid"),
            ("Finite or infinite series", "What does the cumulative sum represent in the real system?", "lines"),
            ("Model versions", "Compare 0-5, 0-10, and 0-20. What changes in realism and reliability?", "grid"),
            ("Individual artifact snapshot", "Recalculation, comparison, graph interpretation, or revised assumption.", "lines"),
        ]),
        (3, "Acceleration, Decay, and Thresholds", "When does repeated change become accelerated or compounding?", "Dynamic modeling", "Rates reshape thresholds.", BLUE, [
            ("Exponential vs linear", "Why does exponential reasoning fit better than repeated addition?", "lines"),
            ("Sampled values vs continuous model", "How does continuous exponential modeling change the interpretation compared to discrete terms?", "lines"),
            ("Build the model", "Starting value, growth factor, variables, assumptions, and realistic domain.", "grid"),
            ("Logarithmic threshold", "Show algebraic steps, graph verification, units, and interpretation.", "grid"),
            ("Rate comparison", "Compare 3%, 5%, and 8% growth or decay. What happens to thresholds?", "grid"),
            ("Model breakdown", "Where does exponential behavior stop being realistic? What hidden variables matter?", "lines"),
        ]),
        (4, "Constraints, Capacity, and Cost", "How do physical and economic constraints reshape the system?", "Structural design lab", "Physical form creates algebraic structure.", PURPLE, [
            ("Flat blueprint", "Original dimensions, square cutout variable, folding lines, units in centimeters.", "grid"),
            ("Folded storage structure", "Height, interior dimensions, usable space, loading floor.", "grid"),
            ("Volume polynomial", "Factored form, standard form, and why multiplying dimensions creates a cubic.", "lines"),
            ("Graph annotation", "Intercepts, multiplicity, extrema, domain, unrealistic regions, physical meaning.", "grid"),
            ("End behavior and structure", "Degree, even/odd, leading coefficient, as x -> infinity and as x -> -infinity.", "lines"),
            ("Polynomial division", "Dividend, divisor, quotient, remainder, and physical interpretation.", "grid"),
            ("Constraint revision", "Change dimensions, cost, refrigeration, transport, or available space. Compare results.", "grid"),
        ]),
        (5, "Revision, Synthesis, and Communication", "What story does our mathematics tell?", "Synthesis studio", "Evidence becomes a claim.", INK, [
            ("Synthesis table", "Lens | What did it reveal? | Where did it fail?", "lines"),
            ("Where models agreed or conflicted", "Compare mathematical lenses and assumptions.", "lines"),
            ("Final mathematical claim", "Use evidence, assumptions, limitations, tradeoffs, and implications.", "lines"),
            ("Communication storyboard", "Choose a format. Plan how mathematical evidence will be visible.", "grid"),
            ("Individual artifact snapshot", "Revision, hidden-variable analysis, limitation critique, or r/R² interpretation.", "lines"),
        ]),
    ]

    for num, title, question, identity, mood, accent, pages in phases:
        class_opener(pdf, num, title, question, identity, accent, mood)
        for i, (label, prompt, mode) in enumerate(pages):
            pdf.new_page(f"Class {num}", accent)
            pdf.text(label, pdf.margin, 520, 24, "F2", INK)
            pdf.wrapped(prompt, pdf.margin, 492, 72, 11.5, 16, color=CHARCOAL)
            if i % 2 == 0:
                pdf.workspace(58, 88, 488, 344, "student thinking space", grid=(mode == "grid"), lines=(mode != "grid"))
                pdf.side_note(570, 260, 150, 172, "Reflection prompt", "What changed in your thinking? What assumption is doing the most work? What evidence would make this stronger?", accent)
                pdf.side_note(570, 88, 150, 128, "Revision marker", "Original idea:\n\nRevised idea:\n\nReason for change:", accent)
            else:
                pdf.side_note(58, 285, 164, 145, "Explain why", "Do not only write the model. Explain why this model fits and where it fails.", accent)
                pdf.workspace(248, 88, 486, 344, "open canvas", grid=(mode == "grid"), lines=(mode != "grid"))
        if num in [2, 3, 4]:
            pdf.new_page(f"Class {num}", accent)
            pdf.text("Model comparison studio", pdf.margin, 520, 24, "F2", INK)
            pdf.wrapped("Changing assumptions creates different mathematical realities. Compare at least three related model versions.", pdf.margin, 492, 75, 11.5, 16, color=CHARCOAL)
            pdf.workspace(58, 100, 210, 330, "version A", grid=True)
            pdf.workspace(291, 100, 210, 330, "version B", grid=True)
            pdf.workspace(524, 100, 210, 330, "version C", grid=True)
        if num == 4:
            pdf.new_page("Class 4", accent)
            pdf.text("Polynomial interpretation studio", pdf.margin, 520, 24, "F2", INK)
            pdf.wrapped("Use this page to connect polynomial structure to physical meaning.", pdf.margin, 492, 72, 11.5, 16, color=CHARCOAL)
            pdf.card(58, 312, 210, 120, "Factored form", "What does it reveal about dimensions, intercepts, or zero-volume situations?", PURPLE, PURPLE_SOFT, 26)
            pdf.card(291, 312, 210, 120, "Standard form", "What does it make easier to analyze or compare?", PURPLE, PURPLE_SOFT, 26)
            pdf.card(524, 312, 210, 120, "Domain", "Which x-values are mathematically valid but physically unrealistic?", PURPLE, PURPLE_SOFT, 26)
            pdf.workspace(58, 90, 676, 160, "end behavior, extrema, multiplicity, and physical interpretation", lines=True)

    pdf.save(OUT / "investigation-journal.pdf")


def rubric_category(pdf, number, title, purpose, indicators, descriptors, accent):
    pdf.new_page("Rubric", accent)
    pdf.text(f"STANDARD {number}", pdf.margin, 520, 9.5, "F2", accent)
    pdf.text(title, pdf.margin, 484, 26, "F2", INK)
    pdf.wrapped(purpose, pdf.margin, 452, 76, 11.5, 16, color=CHARCOAL)
    pdf.card(58, 268, 238, 132, "Look for", "\n".join(indicators), accent, PAPER, 28)
    levels = [
        ("1 Beginning", descriptors[0]),
        ("2 Developing", descriptors[1]),
        ("3 Proficient", descriptors[2]),
        ("4 Advanced", descriptors[3]),
    ]
    x = 320
    y = 314
    for i, (level, desc) in enumerate(levels):
        pdf.card(x, y, 190, 86, level, desc, accent, (250, 251, 253), 23)
        if i % 2 == 0:
            x = 530
        else:
            x = 320
            y -= 106
    pdf.side_note(58, 112, 238, 94, "Student self-check", "What evidence proves you are at the level you claim? Where is that evidence visible?", accent)
    pdf.workspace(320, 92, 400, 108, "teacher notes / evidence codes", lines=True)


def build_rubrics():
    # The finalized rubric is maintained directly at downloads/rubrics.pdf.
    # It is not regenerated here, so approved language and descriptors remain intact.
    return None

def build_resources():
    # Resource links live on the website itself. No separate resource PDF is generated.
    return None


if __name__ == "__main__":
    build_handout()
    build_journal()
    print("Generated student overview and investigation journal in downloads/")
