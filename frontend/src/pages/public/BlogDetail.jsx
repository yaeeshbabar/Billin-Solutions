import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiTag } from 'react-icons/fi'
import PageHero from '../../components/common/PageHero'
import ContactForm from '../../components/common/ContactForm'
import { FALLBACK_BLOGS } from './Blog'
import api from '../../utils/api'

// ---------- FULL BLOG CONTENT ----------
const CONTENT = {

'cpt-code-99204-billing-guidelines': `
<p class="lead">CPT code 99204 is assigned to <strong>new patient office visits</strong> that require a medically appropriate history and/or examination, plus moderate-complexity medical decision-making (MDM) — or at least 45 minutes of total time on the date of the encounter.</p>

<h2>What is CPT Code 99204?</h2>
<p>Introduced as part of the AMA's 2021 E/M overhaul, CPT 99204 replaced the old 4-component documentation requirements with a streamlined, MDM-centered approach. It sits one level below the highest new-patient code (99205) and is one of the most frequently billed new-patient codes in outpatient medicine.</p>

<h2>Medical Decision-Making (MDM) Requirements</h2>
<p>To qualify for 99204 under MDM, the encounter must meet <strong>moderate complexity</strong> in at least 2 of the 3 MDM elements:</p>
<ul>
  <li><strong>Number and complexity of problems addressed:</strong> One or more chronic illnesses with exacerbation/progression, or two or more stable chronic illnesses, or one undiagnosed new problem with uncertain prognosis.</li>
  <li><strong>Amount and/or complexity of data reviewed:</strong> Review of external records, independent interpretation of tests, or independent historian discussion (Category 2 or 3 data).</li>
  <li><strong>Risk of complications and/or morbidity or mortality:</strong> Prescription drug management, or decision regarding minor surgery with identified patient/procedure risk factors.</li>
</ul>

<h2>Time-Based Billing for 99204</h2>
<p>If you choose to bill based on <strong>total time</strong> rather than MDM, the physician or other qualified healthcare professional must spend at least <strong>45 minutes</strong> on the date of the encounter. This includes both face-to-face and non-face-to-face activities such as reviewing results, ordering tests, and documenting.</p>

<h2>Common Documentation Mistakes That Trigger Audits</h2>
<ul>
  <li>Upcoding 99203 encounters to 99204 without documented MDM justification</li>
  <li>Failing to document the specific chronic conditions and their status</li>
  <li>Missing notation of prescription drug management when that is the risk qualifier</li>
  <li>Not capturing total time when billing time-based</li>
</ul>

<h2>Reimbursement Rates</h2>
<p>For 2025, the national average Medicare reimbursement for 99204 is approximately <strong>$171–$185</strong> (non-facility setting). Private payer rates are typically 110–130% of Medicare. Rates vary by geographic area using the Geographic Practice Cost Index (GPCI).</p>

<h2>Best Practices for 99204 Billing</h2>
<ol>
  <li>Use your EHR's MDM template to check criteria before coding</li>
  <li>Document the specific problem complexity — not just a diagnosis name</li>
  <li>If using time, document total minutes in the note, not just face-to-face</li>
  <li>Conduct quarterly internal audits on 99204 claims to catch patterns before payers do</li>
  <li>Train physicians on the AMA's 2021 E/M guidelines if they haven't been updated</li>
</ol>

<h2>Conclusion</h2>
<p>CPT 99204 is a valuable, well-reimbursed code for new patient encounters — but it requires precise documentation. Practices that invest in coder training and periodic self-audits can confidently bill 99204 and maximize reimbursement without compliance risk.</p>
`,

'modifier-95-telehealth-billing-guide': `
<p class="lead">Modifier 95 is appended to synchronous telemedicine services delivered via real-time audio-visual communication. Used correctly, it ensures full reimbursement. Used incorrectly, it's a direct path to denial.</p>

<h2>What is Modifier 95?</h2>
<p>Modifier 95 — "Synchronous Telemedicine Service Rendered via a Real-Time Interactive Audio and Video Telecommunications System" — was developed by the AMA to identify services that are rendered remotely but are otherwise identical to the same in-person service. It applies when the physician and patient interact in real time via video.</p>

<h2>Modifier 95 vs. Modifier GT</h2>
<p>Many coders confuse these two:</p>
<ul>
  <li><strong>Modifier 95</strong>: Used for commercial payers and increasingly for Medicare, per the AMA CPT guidelines</li>
  <li><strong>Modifier GT</strong>: Historically used for Medicare telehealth claims; still required by some MACs (Medicare Administrative Contractors)</li>
</ul>
<p>Always check the specific payer policy before appending either modifier. Payer rules for telehealth continue to evolve post-COVID.</p>

<h2>Which CPT Codes Accept Modifier 95?</h2>
<p>The AMA publishes a list of telehealth-eligible codes in the CPT codebook appendix (Appendix P). Common codes that accept Modifier 95 include:</p>
<ul>
  <li>99202–99215 (Office/Outpatient E/M visits)</li>
  <li>90791, 90834, 90837 (Psychiatric evaluation and therapy)</li>
  <li>96116, 96121 (Neurobehavioral testing)</li>
  <li>97110, 97530 (Therapeutic procedures, with payer approval)</li>
</ul>

<h2>When Modifier 95 Causes Denials</h2>
<ul>
  <li>Appending it to a code not on the payer's telehealth-eligible list</li>
  <li>Using Modifier 95 for audio-only visits (should use Modifier 93 instead)</li>
  <li>Billing a facility fee (place of service 02) without the correct companion code</li>
  <li>Missing the originating site requirements for Medicare patients</li>
</ul>

<h2>Place of Service (POS) Codes for Telehealth</h2>
<ul>
  <li><strong>POS 02</strong>: Telehealth provided other than in patient's home</li>
  <li><strong>POS 10</strong>: Telehealth provided in patient's home (effective 2022)</li>
</ul>
<p>Use POS 10 when the patient receives the service at home to reflect the correct payment locality and avoid underpayment.</p>

<h2>Best Practices</h2>
<ol>
  <li>Maintain an updated payer-specific telehealth policy matrix</li>
  <li>Verify that your platform is HIPAA-compliant — payers may ask</li>
  <li>Document that the service was real-time, interactive audio-visual in every note</li>
  <li>Check state-level telehealth parity laws — they may expand coverage beyond federal rules</li>
</ol>
`,

'cpt-code-99213-complete-guide': `
<p class="lead">CPT 99213 is the most commonly billed outpatient E/M code in the United States — and the most frequently targeted in payer audits. Getting it right protects your revenue. Getting it wrong risks recoupment demands and compliance exposure.</p>

<h2>What is CPT Code 99213?</h2>
<p>CPT 99213 covers <strong>established patient office visits</strong> of low complexity. Under the 2021 AMA E/M guidelines, it requires either low-complexity MDM or a minimum of <strong>20 minutes</strong> of total provider time on the date of service.</p>

<h2>Low-Complexity MDM Requirements</h2>
<p>To meet "low complexity" MDM, two of three elements must be satisfied at this level:</p>
<ul>
  <li><strong>Problems:</strong> Two or more self-limited or minor problems, OR one stable chronic illness</li>
  <li><strong>Data:</strong> Category 1 data (ordering tests, reviewing results, or communication with other providers)</li>
  <li><strong>Risk:</strong> Over-the-counter drug management, OR minor surgery with no identified risk factors</li>
</ul>

<h2>How 99213 Differs from 99212 and 99214</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:0.875rem;">
  <thead>
    <tr style="background:#e6f4f1;">
      <th style="padding:10px;text-align:left;border:1px solid #d1e8e3;">Code</th>
      <th style="padding:10px;text-align:left;border:1px solid #d1e8e3;">MDM Level</th>
      <th style="padding:10px;text-align:left;border:1px solid #d1e8e3;">Time (min)</th>
      <th style="padding:10px;text-align:left;border:1px solid #d1e8e3;">Approx. Medicare Rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px;border:1px solid #d1e8e3;">99212</td>
      <td style="padding:10px;border:1px solid #d1e8e3;">Straightforward</td>
      <td style="padding:10px;border:1px solid #d1e8e3;">10</td>
      <td style="padding:10px;border:1px solid #d1e8e3;">~$75</td>
    </tr>
    <tr style="background:#f9fdfc;">
      <td style="padding:10px;border:1px solid #d1e8e3;"><strong>99213</strong></td>
      <td style="padding:10px;border:1px solid #d1e8e3;"><strong>Low</strong></td>
      <td style="padding:10px;border:1px solid #d1e8e3;"><strong>20</strong></td>
      <td style="padding:10px;border:1px solid #d1e8e3;"><strong>~$111</strong></td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #d1e8e3;">99214</td>
      <td style="padding:10px;border:1px solid #d1e8e3;">Moderate</td>
      <td style="padding:10px;border:1px solid #d1e8e3;">30</td>
      <td style="padding:10px;border:1px solid #d1e8e3;">~$167</td>
    </tr>
  </tbody>
</table>

<h2>Top Audit Red Flags for 99213</h2>
<ul>
  <li>Billing 99213 for every follow-up visit regardless of actual complexity</li>
  <li>Cookie-cutter notes that look identical for every patient</li>
  <li>Using 99213 when the patient has multiple active chronic conditions (may warrant 99214)</li>
  <li>Inadequate documentation of the "stable" status of a chronic illness</li>
</ul>

<h2>Key Takeaways</h2>
<ol>
  <li>Always let MDM or documented time drive your code selection — not habit</li>
  <li>Evaluate whether the visit genuinely meets low vs. moderate complexity</li>
  <li>Underusing 99214 for genuinely moderate-complexity visits is just as costly as overcoding 99213</li>
</ol>
`,

'top-10-claim-denial-reasons-prevention': `
<p class="lead">Medical claim denials are the single biggest source of preventable revenue loss in healthcare. U.S. providers write off over $262 billion annually due to unresolved denials. Knowing the root causes is the first step to stopping them.</p>

<h2>1. Eligibility and Coverage Errors</h2>
<p>Verifying insurance eligibility is the first line of defense. When a patient's coverage lapses, changes, or the wrong plan is billed, the claim denies immediately. <strong>Solution:</strong> Verify eligibility for every patient at every visit — automated eligibility checks at 270/271 transaction level are the standard of care.</p>

<h2>2. Missing or Incorrect Prior Authorization</h2>
<p>Procedures, imaging studies, specialty referrals, and certain medications often require prior authorization. Submitting without it — or with an expired auth — results in automatic denial. <strong>Solution:</strong> Maintain an updated payer-specific prior auth list and verify auth numbers before service.</p>

<h2>3. Coding Errors (ICD-10, CPT, HCPCS)</h2>
<p>Incorrect procedure codes, unsupported diagnosis codes, and invalid code-level combinations are a top denial driver. <strong>Solution:</strong> Implement coding edits in your clearinghouse and review CCI (Correct Coding Initiative) edits before submission.</p>

<h2>4. Duplicate Claims</h2>
<p>Submitting the same claim twice — intentionally or accidentally through billing system errors — triggers an automatic duplicate denial. <strong>Solution:</strong> Build duplicate-check logic into your practice management system and enforce a claim-confirmation workflow.</p>

<h2>5. Timely Filing Violations</h2>
<p>Every payer has a filing deadline — typically 90–365 days from date of service. Missing it means permanent revenue loss regardless of claim validity. <strong>Solution:</strong> Set automated filing-deadline alerts by payer in your billing software.</p>

<h2>6. Medical Necessity Denials</h2>
<p>Payers deny claims when the documented diagnosis doesn't justify the ordered service. This is especially common with imaging, surgery, and specialty care. <strong>Solution:</strong> Ensure the clinical documentation clearly supports the ordered service before submission and link the correct ICD-10 code to each CPT code.</p>

<h2>7. Invalid or Missing Modifiers</h2>
<p>Modifiers communicate additional information about how a service was performed. Incorrect or missing modifiers cause bundling errors, bilateral surgery denials, and assistant surgeon rejections. <strong>Solution:</strong> Train coders on the modifier matrix and audit modifier usage quarterly.</p>

<h2>8. Non-Covered Services</h2>
<p>Some services are explicitly excluded from a patient's plan. If the patient wasn't informed and an ABN wasn't signed, the practice absorbs the loss. <strong>Solution:</strong> Know each payer's exclusion list and use Advance Beneficiary Notices appropriately.</p>

<h2>9. Coordination of Benefits (COB) Issues</h2>
<p>When a patient has multiple insurance plans and the primary/secondary order is wrong, both payers may deny. <strong>Solution:</strong> Confirm COB status at every visit and update the patient's record accordingly.</p>

<h2>10. Credentialing Gaps</h2>
<p>Claims submitted by a provider not yet credentialed — or one whose credentials have lapsed — will deny across all payers. <strong>Solution:</strong> Track credentialing expiration dates proactively and submit re-credentialing applications 90–120 days in advance.</p>

<h2>Building a Denial Prevention Program</h2>
<p>The most effective practices track denial rates by payer, code, and denial type monthly. A denial rate above 5% typically signals systemic issues requiring process intervention rather than one-off appeals.</p>
`,

'hipaa-compliance-medical-billing': `
<p class="lead">HIPAA compliance isn't optional — and the billing department is one of the highest-risk areas in any healthcare organization. In 2024 alone, OCR settled over $9.8 million in HIPAA violations. Understanding what the rules require in a billing context is not just good practice — it's essential protection.</p>

<h2>HIPAA Basics for Billing Professionals</h2>
<p>HIPAA — the Health Insurance Portability and Accountability Act — applies to all "covered entities" (providers, payers, clearinghouses) and their "business associates." Medical billing companies that handle Protected Health Information (PHI) are business associates and must sign a Business Associate Agreement (BAA) with every covered entity they serve.</p>

<h2>The Privacy Rule in Billing</h2>
<p>The Privacy Rule governs who can see, use, and disclose PHI. In billing, this means:</p>
<ul>
  <li>PHI may be used to submit and collect payment — this is a permitted use</li>
  <li>Sharing billing records with unauthorized parties (even family members, without authorization) is a violation</li>
  <li>Minimum Necessary Standard: only access and transmit the minimum PHI needed to accomplish the billing task</li>
</ul>

<h2>The Security Rule: Protecting ePHI</h2>
<p>The Security Rule applies specifically to electronic PHI (ePHI). Billing organizations must implement:</p>
<ul>
  <li><strong>Administrative safeguards:</strong> Workforce training, access management, contingency planning</li>
  <li><strong>Physical safeguards:</strong> Workstation security, device controls, facility access restrictions</li>
  <li><strong>Technical safeguards:</strong> Encryption, audit controls, automatic logoff, unique user IDs</li>
</ul>

<h2>High-Risk Billing Scenarios</h2>
<ul>
  <li>Sending unencrypted patient data via regular email to payers or providers</li>
  <li>Using personal devices without MDM (Mobile Device Management) controls</li>
  <li>Sharing login credentials among billing staff</li>
  <li>Disposing of paper EOBs or superbills in regular trash without shredding</li>
  <li>Leaving billing software open on unattended workstations</li>
</ul>

<h2>Breach Notification Requirements</h2>
<p>If a breach of unsecured PHI occurs, covered entities must notify affected individuals within 60 days and report to HHS. Breaches affecting 500+ individuals must be reported to HHS within 60 days AND to prominent media in the affected state.</p>

<h2>HIPAA Compliance Checklist for Billing Departments</h2>
<ol>
  <li>✅ BAAs in place with all billing vendors and clearinghouses</li>
  <li>✅ Annual HIPAA training completed by all billing staff</li>
  <li>✅ Unique user logins for all billing software — no shared credentials</li>
  <li>✅ ePHI transmitted only over encrypted channels</li>
  <li>✅ Physical EOBs and patient records shredded or locked</li>
  <li>✅ Risk analysis conducted and documented annually</li>
  <li>✅ Incident response policy written and tested</li>
</ol>
`,

'revenue-cycle-management-complete-guide': `
<p class="lead">Revenue Cycle Management (RCM) is the clinical and administrative process that healthcare organizations use to track patient care episodes from registration and appointment scheduling to final payment of a balance. Done well, it's the difference between a thriving practice and one perpetually struggling with cash flow.</p>

<h2>What is Revenue Cycle Management?</h2>
<p>RCM encompasses every touchpoint between a patient interaction and the resolution of a claim — including all administrative, clinical, and financial functions. The "revenue cycle" is literally the cycle through which money flows into a healthcare practice.</p>

<h2>The 10 Stages of the Revenue Cycle</h2>

<h3>1. Patient Scheduling & Pre-Registration</h3>
<p>Capturing accurate demographic and insurance data before the visit begins. Errors here cascade through every downstream stage. Best practice: real-time eligibility verification at scheduling.</p>

<h3>2. Insurance Eligibility Verification</h3>
<p>Confirming coverage, benefits, deductibles, and authorization requirements before the patient arrives. This single step prevents the majority of eligibility-related denials.</p>

<h3>3. Prior Authorization</h3>
<p>Obtaining approval from the payer before rendering services that require it. Track auth numbers, expiration dates, and approved units precisely.</p>

<h3>4. Patient Check-In & Registration</h3>
<p>Updating demographics, collecting copays, and having patients sign necessary forms. Collect at point of service — post-visit collection rates drop to 30–40%.</p>

<h3>5. Charge Capture</h3>
<p>Translating clinical services into billable charges. Charge lag (the delay between service and charge entry) is a common revenue leak. Aim for same-day or next-day charge capture.</p>

<h3>6. Medical Coding</h3>
<p>Assigning accurate ICD-10 diagnosis codes and CPT/HCPCS procedure codes. Coding accuracy directly determines what gets paid. Coding error rates above 2–3% require immediate intervention.</p>

<h3>7. Claims Submission</h3>
<p>Submitting clean claims to payers via clearinghouse. A "clean claim" passes all edits and is accepted on first submission. Industry benchmark: 95%+ clean claim rate.</p>

<h3>8. Payment Posting</h3>
<p>Recording payments from payers and patients. Proper payment posting enables accurate AR analysis and surfaces underpayments for appeal.</p>

<h3>9. Denial Management</h3>
<p>Identifying, appealing, and resolving denied claims. Track denial rates by payer and denial code. The goal is under 5% denial rate with 90%+ appeal success on recoverable denials.</p>

<h3>10. Patient Collections</h3>
<p>Collecting patient responsibility balances. Offer payment plans, online payment portals, and financial counseling for high-balance accounts.</p>

<h2>Key RCM Metrics to Track</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:0.875rem;">
  <thead><tr style="background:#e6f4f1;"><th style="padding:10px;border:1px solid #d1e8e3;text-align:left;">Metric</th><th style="padding:10px;border:1px solid #d1e8e3;text-align:left;">Benchmark</th></tr></thead>
  <tbody>
    <tr><td style="padding:10px;border:1px solid #d1e8e3;">Clean Claim Rate</td><td style="padding:10px;border:1px solid #d1e8e3;">&gt;95%</td></tr>
    <tr style="background:#f9fdfc;"><td style="padding:10px;border:1px solid #d1e8e3;">Days in AR</td><td style="padding:10px;border:1px solid #d1e8e3;">&lt;35 days</td></tr>
    <tr><td style="padding:10px;border:1px solid #d1e8e3;">Denial Rate</td><td style="padding:10px;border:1px solid #d1e8e3;">&lt;5%</td></tr>
    <tr style="background:#f9fdfc;"><td style="padding:10px;border:1px solid #d1e8e3;">Collection Rate</td><td style="padding:10px;border:1px solid #d1e8e3;">&gt;95%</td></tr>
    <tr><td style="padding:10px;border:1px solid #d1e8e3;">First-Pass Resolution Rate</td><td style="padding:10px;border:1px solid #d1e8e3;">&gt;90%</td></tr>
  </tbody>
</table>
`,

'medical-billing-mistakes-costing-revenue': `
<p class="lead">Most billing leaks are invisible — until a practice realizes it's leaving 15–30% of collectible revenue on the table every month. These 7 mistakes are the most common culprits, and every one of them is fixable.</p>

<h2>Mistake #1: Not Verifying Eligibility Before Every Visit</h2>
<p>Insurance changes constantly — jobs change, open enrollment happens, and patients often don't know their own coverage status. Practices that don't verify before every visit discover the problem when claims come back denied. <strong>Fix:</strong> Automate eligibility checks 24–48 hours before appointments.</p>

<h2>Mistake #2: Undercoding Out of Fear</h2>
<p>Many physicians consistently bill 99213 when the encounter clearly supports 99214, or 99204 when 99205 is warranted. This "defensive undercoding" is just as problematic as overcoding — it's leaving real money on the table. <strong>Fix:</strong> Train physicians to document accurately and let the code follow the documentation.</p>

<h2>Mistake #3: Letting Denied Claims Age Without Action</h2>
<p>A denied claim doesn't disappear — it converts to a revenue leak if not worked promptly. Many practices have AR buckets full of claims 90–180+ days old with no follow-up. <strong>Fix:</strong> Implement a denial management workflow with follow-up queues by age and payer.</p>

<h2>Mistake #4: Missing Modifier Opportunities</h2>
<p>Bilateral procedures, assistant surgeon services, distinct procedural services, and multiple procedures on the same day all require specific modifiers. Missing them leads to automatic bundling denials. <strong>Fix:</strong> Create a modifier reference guide and audit modifier usage quarterly.</p>

<h2>Mistake #5: Poor Charge Capture Processes</h2>
<p>Services are rendered but never billed. This happens when physicians don't submit encounter forms, EHR workflows break down, or procedures happen in ancillary departments with separate billing systems. <strong>Fix:</strong> Compare scheduled procedures to billed charges weekly — the gap is your missing revenue.</p>

<h2>Mistake #6: Not Collecting Patient Responsibility Upfront</h2>
<p>Post-visit patient collections have a collection rate of 30–50%. At point of service, that rate is above 90%. <strong>Fix:</strong> Train front-desk staff to collect copays, deductibles, and coinsurance estimates at check-in — every time.</p>

<h2>Mistake #7: Ignoring Payer Contract Underpayments</h2>
<p>Payers routinely pay less than the contracted rate, counting on practices not to notice. A study found that 7–11% of all payments contain underpayments. <strong>Fix:</strong> Use a fee schedule management system to automatically flag underpayments at posting for appeal.</p>

<h2>The ROI of Fixing These Mistakes</h2>
<p>A 10-provider practice generating $5M in charges that addresses all 7 of these areas can typically recover $300,000–$750,000 in additional annual collections. The investment in a skilled billing team or outsourced RCM partner pays for itself many times over.</p>
`,

'insurance-credentialing-guide': `
<p class="lead">Insurance credentialing is the process by which a healthcare provider is approved to participate in a payer's network. Until a provider is credentialed, they cannot bill as an in-network provider — meaning every day of delay costs real money.</p>

<h2>Why Credentialing Timelines Matter</h2>
<p>The average credentialing timeline ranges from <strong>90–180 days</strong> depending on the payer. For a specialist billing $15,000/month in insurance revenue, a 6-month delay can cost $90,000 in deferred or lost income. Understanding the process — and how to accelerate it — is critical.</p>

<h2>The Two Types of Credentialing</h2>
<ul>
  <li><strong>Provider Credentialing:</strong> The payer verifies the provider's education, training, licensure, DEA registration, malpractice history, and board certifications.</li>
  <li><strong>Practice/Group Enrollment:</strong> The practice entity itself is enrolled with the payer, separate from the individual provider. Both must be completed before claims can be paid.</li>
</ul>

<h2>Step-by-Step Credentialing Process</h2>
<ol>
  <li><strong>Gather provider documents:</strong> Medical degree, residency/fellowship certificates, current state license(s), DEA certificate, NPI (Type 1 and Type 2), CAQH profile, malpractice insurance certificates, and CV.</li>
  <li><strong>Complete or update CAQH ProView:</strong> Most commercial payers use CAQH as a centralized repository. Keep it current and re-attest every 120 days.</li>
  <li><strong>Identify target payers:</strong> Prioritize payers by patient volume in your demographic area. Don't apply to every payer — focus on the top 5–8 that cover your patient population.</li>
  <li><strong>Submit applications:</strong> Each payer has its own application. Some accept CAQH, others require proprietary forms. Submit complete packets — incomplete applications restart the clock.</li>
  <li><strong>Follow up every 2 weeks:</strong> Applications stall. Proactive follow-up reduces timelines by 30–45 days on average.</li>
  <li><strong>Track effective dates:</strong> Confirm the effective date of participation before billing. Do not submit claims for in-network rates prior to the official effective date.</li>
</ol>

<h2>Strategies to Accelerate the Process</h2>
<ul>
  <li>Submit applications before the provider starts seeing patients (begin 90–120 days in advance)</li>
  <li>Ensure CAQH is fully complete and attested before submitting any payer applications</li>
  <li>Assign a dedicated credentialing coordinator or use a credentialing service</li>
  <li>Request retroactive credentialing when available — some payers will backdate to date of service</li>
  <li>Ask about "provisional credentialing" programs that allow billing under supervision during the review period</li>
</ul>

<h2>Common Credentialing Mistakes to Avoid</h2>
<ul>
  <li>Letting CAQH attestation lapse (requires re-attestation every 120 days)</li>
  <li>Submitting incomplete applications — missing one document can cause 30–60 day delays</li>
  <li>Not tracking each payer's status and next follow-up date</li>
  <li>Assuming hospital privileges alone means payer credentialing is complete</li>
</ul>
`
}

// Build a lookup map from FALLBACK_BLOGS
const BLOG_MAP = Object.fromEntries(FALLBACK_BLOGS.map(b => [b.slug, b]))

export default function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get(`/blog/${slug}`)
      .then(r => { setBlog(r.data.data); setLoading(false) })
      .catch(() => {
        const fallback = BLOG_MAP[slug]
        if (fallback) {
          setBlog({ ...fallback, content: CONTENT[slug] || '<p>Content coming soon.</p>' })
        }
        setLoading(false)
      })
  }, [slug])

  const related = FALLBACK_BLOGS.filter(b => b.slug !== slug && b.category === blog?.category).slice(0, 3)

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">📄</div>
        <h2 className="text-xl font-heading font-bold text-dark mb-3">Blog Not Found</h2>
        <Link to="/blog" className="btn-primary text-sm">← Back to Blog</Link>
      </div>
    </div>
  )

  const img = `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80`

  return (
    <>
      <PageHero
        title={blog.title}
        subtitle={blog.category}
        breadcrumbs={[{ label: 'Blog', to: '/blog' }, { label: blog.title }]}
      />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">

          {/* Article */}
          <article className="lg:col-span-2">

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden mb-8 shadow-green">
              <img src={img} alt={blog.title} className="w-full h-64 object-cover" />
            </div>

            {/* Meta Bar */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-8 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1"><FiCalendar size={12} />{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><FiUser size={12} />{blog.author || 'Billin Solutions Team'}</span>
              <span className="flex items-center gap-1"><FiClock size={12} />{blog.readTime || '8 min read'}</span>
              <span className="bg-primary-light text-primary px-3 py-0.5 rounded-full font-semibold">{blog.category}</span>
            </div>

            {/* Content */}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-100">
                <FiTag size={14} className="text-gray-400 mt-0.5" />
                {blog.tags.map(t => (
                  <span key={t} className="bg-primary-light text-primary text-xs px-3 py-1 rounded-full font-medium">{t}</span>
                ))}
              </div>
            )}

            <div className="mt-8">
              <Link to="/blog" className="btn-outline text-sm"><FiArrowLeft /> Back to Blog</Link>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="mt-14">
                <h3 className="font-heading font-bold text-dark text-lg mb-6">Related Articles</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {related.map(r => (
                    <Link key={r.slug} to={`/blog/${r.slug}`}
                      className="group bg-gray-bg rounded-2xl p-4 hover:bg-primary-light transition-colors">
                      <span className="text-xs text-accent font-bold uppercase tracking-wide">{r.category}</span>
                      <h4 className="font-heading font-semibold text-dark text-sm mt-1 leading-snug group-hover:text-primary transition-colors line-clamp-3">{r.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <div className="space-y-6">
            <ContactForm title="Have a Billing Question?" source="blog-page" />

            <div className="bg-primary rounded-2xl p-6 text-white">
              <h4 className="font-heading font-bold text-lg mb-2">Free Billing Audit</h4>
              <p className="text-sm text-green-100 mb-4">Find out exactly how much revenue your practice is leaving uncollected.</p>
              <Link to="/request-free-demo" className="btn-white text-sm py-2.5 w-full justify-center">Get Free Demo</Link>
            </div>

            <div className="bg-gray-bg rounded-2xl p-6">
              <h4 className="font-heading font-bold text-dark text-sm mb-4">More Articles</h4>
              <div className="space-y-3">
                {FALLBACK_BLOGS.filter(b => b.slug !== slug).slice(0, 5).map(b => (
                  <Link key={b.slug} to={`/blog/${b.slug}`}
                    className="block group">
                    <p className="text-xs text-gray-600 group-hover:text-primary transition-colors font-medium leading-snug line-clamp-2">{b.title}</p>
                    <span className="text-xs text-gray-400 mt-0.5 block">{b.readTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}