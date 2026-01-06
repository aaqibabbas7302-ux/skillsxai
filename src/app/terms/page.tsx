export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#08090d] text-[#e0e0e0] font-sans selection:bg-[#00f2ff] selection:text-black">
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(156, 74, 255, 0.08) 0%, transparent 35%),
            radial-gradient(circle at 100% 100%, rgba(0, 242, 255, 0.08) 0%, transparent 35%)
          `
        }}
      />

      <div className="relative pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-[850px] mx-auto bg-white/[0.03] backdrop-blur-[10px] border border-white/10 rounded-[20px] p-8 md:p-[60px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          
          <header className="text-center mb-[50px] border-b border-white/10 pb-[30px]">
             {/* Logo Section */}
             <div className="flex justify-center mb-6">
              <div className="relative w-40 h-12">
                <img 
                  src="/logo.svg" 
                  alt="SkillsX AI Logo" 
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            
            <div className="text-[14px] tracking-[4px] uppercase text-[#9c4aff] font-bold mb-[10px]">
              SkillsX AI
            </div>
            <h1 className="text-[24px] md:text-[32px] font-extrabold m-0 bg-gradient-to-r from-[#00f2ff] to-[#9c4aff] bg-clip-text text-transparent">
              AI Workflow Bootcamp
            </h1>
            <p className="text-[#94a3b8] mt-[10px]">Service Agreement: Terms & Conditions</p>
          </header>

          <div className="space-y-[35px]">
            {/* Section 01 */}
            <div className="section">
              <div className="flex items-center text-[18px] font-bold text-[#00f2ff] mb-[15px] uppercase tracking-[1px]">
                <span className="text-[14px] bg-[rgba(0,242,255,0.1)] text-[#00f2ff] px-[10px] py-[2px] rounded border border-[rgba(0,242,255,0.3)] mr-[12px]">01</span>
                Scope of Services
              </div>
              <div className="pl-0 md:pl-[45px]">
                SkillsX AI (the &quot;Service Provider&quot;) will provide a 3-day on-campus AI Workflow training program for students in Classes 9th to 12th as per the agreed-upon syllabus.
              </div>
            </div>

            {/* Section 02 */}
            <div className="section">
              <div className="flex items-center text-[18px] font-bold text-[#00f2ff] mb-[15px] uppercase tracking-[1px]">
                <span className="text-[14px] bg-[rgba(0,242,255,0.1)] text-[#00f2ff] px-[10px] py-[2px] rounded border border-[rgba(0,242,255,0.3)] mr-[12px]">02</span>
                Payment Terms
              </div>
              <div className="pl-0 md:pl-[45px] space-y-3">
                <div className="sub-point"><strong className="text-white font-semibold">Advance:</strong> 50% of the total program fee must be paid at least 7 days before the program start date to confirm the booking.</div>
                <div className="sub-point"><strong className="text-white font-semibold">Balance:</strong> The remaining 50% is due immediately upon completion of Day 3.</div>
                <div className="sub-point"><strong className="text-white font-semibold">MOQ:</strong> Pricing is based on a Minimum Order Quantity (MOQ) of 100 students. If the actual count is lower, the MOQ fee still applies.</div>
              </div>
            </div>

            {/* Section 03 */}
            <div className="section">
              <div className="flex items-center text-[18px] font-bold text-[#00f2ff] mb-[15px] uppercase tracking-[1px]">
                <span className="text-[14px] bg-[rgba(0,242,255,0.1)] text-[#00f2ff] px-[10px] py-[2px] rounded border border-[rgba(0,242,255,0.3)] mr-[12px]">03</span>
                School’s Responsibilities
              </div>
              <div className="pl-0 md:pl-[45px] space-y-3">
                <div className="sub-point"><strong className="text-white font-semibold">Infrastructure:</strong> The school shall provide a suitable venue (lab or hall), stable high-speed internet, and power backup for the duration of the bootcamp.</div>
                <div className="sub-point"><strong className="text-white font-semibold">Supervision:</strong> At least one school faculty member must be present in the session at all times for student behavior management and safeguarding compliance.</div>
                <div className="sub-point"><strong className="text-white font-semibold">Hardware:</strong> Students/School are responsible for providing individual laptops/tablets as required for hands-on sessions.</div>
              </div>
            </div>

            {/* Section 04 */}
            <div className="section">
              <div className="flex items-center text-[18px] font-bold text-[#00f2ff] mb-[15px] uppercase tracking-[1px]">
                <span className="text-[14px] bg-[rgba(0,242,255,0.1)] text-[#00f2ff] px-[10px] py-[2px] rounded border border-[rgba(0,242,255,0.3)] mr-[12px]">04</span>
                Intellectual Property (IP)
              </div>
              <div className="pl-0 md:pl-[45px]">
                All training materials, workflows, and software access provided during the bootcamp are the exclusive IP of SkillsX AI. Materials are for the educational use of the participating students only and may not be reproduced, shared, or used for commercial purposes by the school.
              </div>
            </div>

            {/* Section 05 */}
            <div className="section">
              <div className="flex items-center text-[18px] font-bold text-[#00f2ff] mb-[15px] uppercase tracking-[1px]">
                <span className="text-[14px] bg-[rgba(0,242,255,0.1)] text-[#00f2ff] px-[10px] py-[2px] rounded border border-[rgba(0,242,255,0.3)] mr-[12px]">05</span>
                Cancellation & Rescheduling
              </div>
              <div className="pl-0 md:pl-[45px] space-y-3">
                <div className="sub-point"><strong className="text-white font-semibold">By School:</strong> Cancellations made less than 7 days before the start date will result in a forfeiture of 50% of the advance payment.</div>
                <div className="sub-point"><strong className="text-white font-semibold">By SkillsX AI:</strong> In case of unforeseen staff emergencies, we reserve the right to reschedule. If a suitable date cannot be found, a full refund of the advance will be issued.</div>
              </div>
            </div>

            {/* Section 06 */}
            <div className="section">
              <div className="flex items-center text-[18px] font-bold text-[#00f2ff] mb-[15px] uppercase tracking-[1px]">
                <span className="text-[14px] bg-[rgba(0,242,255,0.1)] text-[#00f2ff] px-[10px] py-[2px] rounded border border-[rgba(0,242,255,0.3)] mr-[12px]">06</span>
                Limitation of Liability
              </div>
              <div className="pl-0 md:pl-[45px]">
                SkillsX AI is not liable for any technical failures caused by school infrastructure or for any indirect losses. Our total liability is limited to the fees paid for the program.
              </div>
            </div>

            {/* Section 07 */}
            <div className="section">
              <div className="flex items-center text-[18px] font-bold text-[#00f2ff] mb-[15px] uppercase tracking-[1px]">
                <span className="text-[14px] bg-[rgba(0,242,255,0.1)] text-[#00f2ff] px-[10px] py-[2px] rounded border border-[rgba(0,242,255,0.3)] mr-[12px]">07</span>
                Data Privacy
              </div>
              <div className="pl-0 md:pl-[45px]">
                Student data collected (for certificates or platform access) will be used solely for the program’s delivery and will not be shared with third parties, in compliance with the Digital Personal Data Protection (DPDP) Act.
              </div>
            </div>

            {/* Section 08 */}
            <div className="section">
              <div className="flex items-center text-[18px] font-bold text-[#00f2ff] mb-[15px] uppercase tracking-[1px]">
                <span className="text-[14px] bg-[rgba(0,242,255,0.1)] text-[#00f2ff] px-[10px] py-[2px] rounded border border-[rgba(0,242,255,0.3)] mr-[12px]">08</span>
                Force Majeure (Unforeseen Events)
              </div>
              <div className="pl-0 md:pl-[45px] space-y-3">
                <div className="sub-point">Neither party shall be held liable for any failure or delay in the performance of this Agreement if such failure is caused by events beyond their reasonable control (&quot;Force Majeure&quot;).</div>
                <div className="sub-point"><strong className="text-white font-semibold">Trigger Events:</strong> These include, but are not limited to, &quot;Acts of God&quot; (earthquakes, floods, extreme weather), pandemics, strikes, war, or sudden government/administrative mandates.</div>
                <div className="sub-point"><strong className="text-white font-semibold">Notification:</strong> The party affected by such an event must notify the other party within 24 hours of the occurrence.</div>
                <div className="sub-point"><strong className="text-white font-semibold">Resolution:</strong> In the event of a Force Majeure, both parties will first attempt to reschedule. If the program cannot be rescheduled within 30 days, the Agreement may be terminated.</div>
                <div className="sub-point"><strong className="text-white font-semibold">Financial Adjustment:</strong> In case of termination due to Force Majeure, SkillsX AI will refund the advance, minus any unrecoverable costs already incurred (e.g., travel bookings or custom materials).</div>
              </div>
            </div>

            <footer className="mt-[50px] pt-[30px] border-t border-white/10 text-center text-[13px] text-[#94a3b8]">
              © 2026 SkillsX AI. All Rights Reserved.<br />
              <a href="https://www.skillsxai.com" className="hover:text-[#00f2ff] transition-colors">www.skillsxai.com</a> | +91-8285347868
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
