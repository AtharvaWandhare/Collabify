export const templates = [
    {
        id: "blank",
        label: "Blank Document",
        imageUrl: "/template_gallery/blank-document.svg",
        initialContent: ``
    },
    {
        id: "business-letter",
        label: "Business Letter",
        imageUrl: "/template_gallery/business-letter.svg",
        initialContent: `
                <h1>Business Letter</h1>
                <p><strong>From</strong><br>
                [Your Name]<br>
                [Your Title]<br>
                [Your Company]<br>
                [Street Address]<br>
                [City, State ZIP]<br>
                [Phone] • [Email]</p>

                <p><strong>Date:</strong> [Month Day, Year]</p>

                <p><strong>To</strong><br>
                [Recipient Name]<br>
                [Recipient Title]<br>
                [Company Name]<br>
                [Street Address]<br>
                [City, State ZIP]</p>

                <p><strong>Subject:</strong> [Concise subject of the letter]</p>

                <p>Dear [Mr./Ms./Mx.] [Last Name],</p>

                <p>
                    I’m writing to [state your purpose briefly]. Provide any necessary
                    context in a clear and concise way. Keep paragraphs short for readability.
                </p>

                <p>
                    Include supporting details, such as timelines, expectations, or action items.
                    If applicable, reference attachments or links.
                </p>

                <p>
                    Thank you for your time and consideration. I look forward to your response.
                </p>

                <p>Sincerely,<br><br>
                [Your Name]<br>
                [Your Title], [Your Company]</p>
                `
    },
    {
        id: "cover-letter",
        label: "Cover Letter",
        imageUrl: "/template_gallery/cover-letter.svg",
        initialContent: `
                <h1>Cover Letter</h1>
                <p><strong>[Your Name]</strong><br>
                [City, State] • [Phone] • [Email] • [Portfolio/LinkedIn]</p>

                <p><strong>Date:</strong> [Month Day, Year]</p>

                <p><strong>Hiring Manager</strong><br>
                [Company Name]<br>
                [Company Address]<br>
                [City, State ZIP]</p>

                <p>Dear Hiring Manager,</p>

                <p>
                    I’m excited to apply for the <strong>[Job Title]</strong> position at
                    <strong>[Company Name]</strong>. With [X] years of experience in [your field],
                    I’ve developed expertise in [key skills] and a strong track record of
                    delivering [impact/results].
                </p>

                <p>Relevant highlights include:</p>
                <ul>
                    <li>Achievement 1 — quantify impact where possible.</li>
                    <li>Achievement 2 — tools/technologies used.</li>
                    <li>Achievement 3 — business outcome or metric.</li>
                </ul>

                <p>
                    I’m particularly drawn to [Company Name] because [reason aligned to company or role].
                    I’d welcome the opportunity to discuss how my background can contribute to your team.
                </p>

                <p>Thank you for your time and consideration.</p>

                <p>Best regards,<br><br>
                [Your Name]</p>
                `
    },
    {
        id: "letter",
        label: "Letter",
        imageUrl: "/template_gallery/letter.svg",
        initialContent: `
                <h1>Letter</h1>
                <p><strong>Date:</strong> [Month Day, Year]</p>

                <p><strong>To</strong><br>
                [Recipient Name]<br>
                [Address Line 1]<br>
                [City, State ZIP]</p>

                <p>Dear [Recipient Name],</p>

                <p>
                    [Opening paragraph stating the purpose of your letter in a sentence or two.]
                </p>

                <p>
                    [Body paragraph(s) adding context, details, and any requests. Keep the tone
                    appropriate to the relationship and purpose of the letter.]
                </p>

                <p>
                    [Closing paragraph with a call to action or summary, and an expression of gratitude.]
                </p>

                <p>Warm regards,<br><br>
                [Your Name]</p>
                `
    },
    {
        id: "project-proposal",
        label: "Project Proposal",
        imageUrl: "/template_gallery/project-proposal.svg",
        initialContent: `
                <h1>Project Proposal</h1>
                <p><strong>Project:</strong> [Project Name]</p>
                <p><strong>Prepared by:</strong> [Your Name / Team]</p>
                <p><strong>Date:</strong> [Month Day, Year]</p>
                <hr>

                <h2>1. Executive Summary</h2>
                <p>
                    Provide a concise overview of the project: the problem/opportunity, your proposed solution,
                    and expected outcomes.
                </p>

                <h2>2. Objectives</h2>
                <ul>
                    <li>Objective 1</li>
                    <li>Objective 2</li>
                    <li>Objective 3</li>
                </ul>

                <h2>3. Scope</h2>
                <ul>
                    <li><strong>In Scope:</strong> [What’s included]</li>
                    <li><strong>Out of Scope:</strong> [What’s excluded]</li>
                </ul>

                <h2>4. Timeline</h2>
                <ul>
                    <li>Phase 1 — [Start ➝ End]</li>
                    <li>Phase 2 — [Start ➝ End]</li>
                    <li>Phase 3 — [Start ➝ End]</li>
                </ul>

                <h2>5. Budget</h2>
                <ul>
                    <li>Category A — $[Amount]</li>
                    <li>Category B — $[Amount]</li>
                    <li>Contingency — $[Amount]</li>
                </ul>

                <h2>6. Risks & Mitigations</h2>
                <ul>
                    <li>Risk 1 — Mitigation</li>
                    <li>Risk 2 — Mitigation</li>
                </ul>

                <h2>7. Approval</h2>
                <p>
                    Prepared by: [Name] • Title: [Role] • Signature: ______________________
                </p>
                `
    },
    {
        id: "resume",
        label: "Resume",
        imageUrl: "/template_gallery/resume.svg",
        initialContent: `
                <h1>[Your Name]</h1>
                <p>[City, State] • [Phone] • [Email] • [LinkedIn/Portfolio]</p>
                <hr>

                <h2>Professional Summary</h2>
                <p>
                    [2–3 sentences summarizing your experience, domain expertise, and what you bring to teams.]
                </p>

                <h2>Skills</h2>
                <ul>
                    <li>[Skill A] • [Skill B] • [Skill C]</li>
                    <li>[Tooling/Frameworks] • [Databases/Cloud] • [Practices]</li>
                </ul>

                <h2>Experience</h2>
                <p><strong>[Company Name]</strong> — [Role Title] ([Start] – [End])</p>
                <ul>
                    <li>Achievement or responsibility with measurable impact.</li>
                    <li>Led/Contributed to [project/initiative] using [technologies].</li>
                    <li>Improved [metric] by [X%] via [action].</li>
                </ul>

                <p><strong>[Company Name]</strong> — [Role Title] ([Start] – [End])</p>
                <ul>
                    <li>Achievement or responsibility with measurable impact.</li>
                    <li>Collaborated with [team/stakeholders] to deliver [outcome].</li>
                </ul>

                <h2>Education</h2>
                <p><strong>[Degree]</strong>, [Institution] — [Year]</p>

                <h2>Projects</h2>
                <p><strong>[Project Name]</strong> — Short description and notable results. <a href="[Link]">Link</a></p>
                `
    },
    {
        id: "software-proposal",
        label: "Software Proposal",
        imageUrl: "/template_gallery/software-proposal.svg",
        initialContent: `
                <h1>Software Proposal</h1>
                <p><strong>Client:</strong> [Client Name]</p>
                <p><strong>Prepared by:</strong> [Your Company]</p>
                <p><strong>Date:</strong> [Month Day, Year]</p>
                <hr>

                <h2>1. Project Overview</h2>
                <p>
                    Briefly describe the problem, desired outcomes, and business value of the proposed software solution.
                </p>

                <h2>2. Proposed Solution</h2>
                <ul>
                    <li><strong>Key Features:</strong> [Feature A], [Feature B], [Feature C]</li>
                    <li><strong>Users & Roles:</strong> [Role 1], [Role 2]</li>
                    <li><strong>Integrations:</strong> [System A], [System B]</li>
                </ul>

                <h2>3. Architecture & Tech Stack</h2>
                <ul>
                    <li><strong>Frontend:</strong> [Framework/Library]</li>
                    <li><strong>Backend:</strong> [Runtime/Framework]</li>
                    <li><strong>Database:</strong> [DB]</li>
                    <li><strong>Infra/Cloud:</strong> [Cloud Provider/Services]</li>
                </ul>

                <h2>4. Timeline</h2>
                <ul>
                    <li>Phase 1 — Discovery & Design ([Dates])</li>
                    <li>Phase 2 — MVP Development ([Dates])</li>
                    <li>Phase 3 — Testing & UAT ([Dates])</li>
                    <li>Phase 4 — Launch & Handover ([Dates])</li>
                </ul>

                <h2>5. Pricing</h2>
                <ul>
                    <li>Fixed/Milestone-based — $[Amount]</li>
                    <li>Optional Support & Maintenance — $[Amount]/month</li>
                </ul>

                <h2>6. Assumptions & Terms</h2>
                <ul>
                    <li>Assumption 1</li>
                    <li>Assumption 2</li>
                    <li>Payment terms, warranties, and acceptance criteria.</li>
                </ul>

                <h2>7. Acceptance</h2>
                <p>
                    Approved by: ____________________ • Title: __________ • Date: __________
                </p>
                `
    },
];