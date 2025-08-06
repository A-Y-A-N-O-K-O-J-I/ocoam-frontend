// Terms of Service Component
function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Oduduwa College of Yoruba Medicine ("we," "our," or "us"). 
                These Terms of Service ("Terms") govern your use of our website 
                (oyocam.org) and online educational platform, including all courses, 
                content, and services provided by our institution.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By accessing our website or enrolling in our courses, you agree to 
                be bound by these Terms. If you disagree with any part of these terms, 
                you may not access our services.
              </p>
            </section>

            {/* Acceptance */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">2. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By using our services, you confirm that you are at least 18 years old 
                or have parental/guardian consent. You also confirm that you have the 
                legal capacity to enter into these Terms in your jurisdiction.
              </p>
            </section>

            {/* Educational Services */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">3. Educational Services</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Course Access</h3>
                  <p className="text-gray-700">
                    Upon enrollment and payment, you receive access to course materials 
                    for the duration specified in your program. Access may be revoked 
                    for violation of these terms or non-payment.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Course Content</h3>
                  <p className="text-gray-700">
                    All course content is for educational purposes only and should not 
                    replace professional medical advice. Traditional medicine practices 
                    should be approached with proper knowledge and caution.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Certificates</h3>
                  <p className="text-gray-700">
                    Certificates are awarded upon successful completion of course 
                    requirements. These certificates represent completion of our 
                    educational program and do not constitute medical licensing.
                  </p>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">4. User Responsibilities</h2>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>You agree to:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide accurate and complete information during registration</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use course materials solely for personal educational purposes</li>
                  <li>Respect intellectual property rights of all course content</li>
                  <li>Engage respectfully with instructors and fellow students</li>
                  <li>Not share, distribute, or reproduce course materials without permission</li>
                </ul>
              </div>
            </section>

            {/* Payments & Refunds */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">5. Payments and Refunds</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Payment Terms</h3>
                  <p className="text-gray-700">
                    Course fees must be paid in full before access is granted. 
                    We accept various payment methods as indicated during enrollment.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Refund Policy</h3>
                  <p className="text-gray-700">
                    Refunds may be available within 14 days of enrollment if no 
                    course content has been accessed. After this period, refunds 
                    are considered on a case-by-case basis.
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All course content, including but not limited to text, videos, images, 
                audio files, and educational materials, are the intellectual property 
                of Oduduwa College of Yoruba Medicine and its instructors. Unauthorized 
                reproduction or distribution is strictly prohibited.
              </p>
            </section>

            {/* Medical Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">7. Medical Disclaimer</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-gray-800 font-semibold mb-2">Important Notice:</p>
                <p className="text-gray-700 leading-relaxed">
                  The information provided in our courses is for educational purposes 
                  only and is not intended as medical advice, diagnosis, or treatment. 
                  Always consult with qualified healthcare professionals before 
                  implementing any traditional medicine practices. We are not 
                  responsible for any adverse effects from the use of information 
                  learned in our courses.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Oduduwa College of Yoruba 
                Medicine shall not be liable for any indirect, incidental, special, 
                or consequential damages arising from your use of our services or 
                inability to access our platform.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes 
                will be posted on this page with an updated effective date. 
                Continued use of our services after changes constitutes acceptance 
                of the new Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with 
                the laws of the Federal Republic of Nigeria. Any disputes shall be 
                resolved in the courts of Nigeria.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms, please contact us at:
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> info@oyocam.org<br />
                  <strong>Phone:</strong> +234 802 298 1214<br />
                  <strong>Address:</strong> Institute of African Studies, University of Ibadan, Nigeria
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// Privacy Policy Component
function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Oduduwa College of Yoruba Medicine ("we," "our," or "us") respects 
                your privacy and is committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and 
                safeguard your information when you visit our website (oyocam.org) 
                or use our educational services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Personal Information</h3>
                  <p className="text-gray-700 mb-2">When you register for courses or contact us, we may collect:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Full name and contact information</li>
                    <li>Email address and phone number</li>
                    <li>Billing and payment information</li>
                    <li>Educational background and interests</li>
                    <li>Course progress and completion data</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Automatically Collected Information</h3>
                  <p className="text-gray-700 mb-2">When you visit our website, we automatically collect:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>IP address and browser information</li>
                    <li>Device type and operating system</li>
                    <li>Pages visited and time spent on site</li>
                    <li>Referring websites and search terms</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">3. How We Use Your Information</h2>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>We use your information to:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide access to our educational courses and materials</li>
                  <li>Process payments and manage your account</li>
                  <li>Send course updates and educational content</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and educational services</li>
                  <li>Ensure the security and integrity of our platform</li>
                  <li>Comply with legal obligations and regulations</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">4. Information Sharing and Disclosure</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Service Providers:</strong> With trusted third parties who assist in operating our website and providing services</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulations</li>
                  <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of our users and institution</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our organization</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">5. Data Security</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational measures to 
                  protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of 
                  transmission over the internet or electronic storage is 100% secure.
                </p>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">6. Cookies and Tracking Technologies</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your 
                  browsing experience and analyze website usage.
                </p>
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Types of Cookies We Use:</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant content and advertisements</li>
                  </ul>
                </div>
                <p className="text-gray-700">
                  You can control cookie settings through your browser preferences.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to 
                provide our services, comply with legal obligations, resolve disputes, 
                and enforce our agreements. Course completion records may be retained 
                permanently for certification purposes.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">8. Your Privacy Rights</h2>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>You have the right to:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access and review your personal information</li>
                  <li>Request correction of inaccurate or incomplete data</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Withdraw consent where processing is based on consent</li>
                  <li>Request data portability in certain circumstances</li>
                </ul>
                <p className="text-gray-700 text-sm mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for children under 18 years of age. 
                We do not knowingly collect personal information from children. 
                If you believe we have collected information from a child, please 
                contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify 
                you of any changes by posting the new Privacy Policy on this page 
                and updating the "Last updated" date. Your continued use of our 
                services after any modifications constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Privacy Officer</strong><br />
                  <strong>Email:</strong> privacy@oyocam.org<br />
                  <strong>Phone:</strong> +234 802 298 1214<br />
                  <strong>Address:</strong> Institute of African Studies, University of Ibadan, Nigeria
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// Copyright and Disclaimer Component
function CopyrightDisclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-900 mb-4">
              Copyright & Disclaimer
            </h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Copyright Notice */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">1. Copyright Notice</h2>
              <p className="text-gray-700 leading-relaxed">
                © 2025 Oduduwa College of Yoruba Medicine. All rights reserved. 
                The content, design, graphics, compilation, magnetic translation, 
                digital conversion, and other matters related to this website are 
                protected under applicable copyright laws.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-4">
                <p className="text-gray-700">
                  <strong>Protected Content Includes:</strong> All text, graphics, logos, 
                  button icons, images, audio clips, digital downloads, data compilations, 
                  course materials, and software used on this site.
                </p>
              </div>
            </section>

            {/* Institutional Independence */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">2. Institutional Independence</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Important Notice:</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Oduduwa College of Yoruba Medicine is an independent educational institution</strong> 
                    and is NOT affiliated with, endorsed by, or connected to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Obafemi Awolowo University (formerly University of Ife)</li>
                    <li>Any other institution named "Oduduwa University"</li>
                    <li>The historical Oduduwa University that was proposed or established</li>
                    <li>Any government or state-sponsored universities in Nigeria</li>
                  </ul>
                  <p className="mt-4 font-semibold">
                    Our college operates independently under the guidance of Dr. Jegede Obafemi, 
                    affiliated with the Institute of African Studies, University of Ibadan.
                  </p>
                </div>
              </div>
            </section>

            {/* Academic Affiliation Clarification */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">3. Academic Affiliation Clarification</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our institution operates as an online college specializing in traditional 
                  Yoruba medicine education. While our founder, Dr. Jegede Obafemi, is 
                  associated with the University of Ibadan's Institute of African Studies, 
                  this college operates as a separate educational entity.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Our Academic Standing:</strong> We provide specialized education 
                    in traditional medicine and award certificates of completion for our 
                    programs. These certificates represent successful completion of our 
                    curriculum and do not constitute university degrees or medical licenses.
                  </p>
                </div>
              </div>
            </section>

            {/* Trademark Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">4. Trademark Information</h2>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  "Oduduwa College of Yoruba Medicine" and our logo are trademarks of 
                  our institution. All other trademarks, service marks, and trade names 
                  appearing on this site are the property of their respective owners.
                </p>
                <p className="text-gray-700 text-sm">
                  The use of the name "Oduduwa" references the ancestral figure in 
                  Yoruba culture and tradition, and does not imply any connection to 
                  other educational institutions that may use similar names.
                </p>
              </div>
            </section>

            {/* Content Usage Rights */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">5. Content Usage Rights</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Permitted Use</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Viewing and browsing the website for personal, non-commercial use</li>
                    <li>Printing individual pages for personal reference</li>
                    <li>Sharing links to our website and course information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Prohibited Use</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Reproducing, distributing, or displaying content without permission</li>
                    <li>Using content for commercial purposes without authorization</li>
                    <li>Modifying or creating derivative works from our content</li>
                    <li>Removing copyright or proprietary notices</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Educational Content Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">6. Educational Content Disclaimer</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-gray-800 font-bold mb-2">Medical and Educational Disclaimer:</p>
                <div className="space-y-2 text-gray-700">
                  <p>
                    The educational content provided by Oduduwa College of Yoruba Medicine 
                    is for informational and educational purposes only. This content:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-3">
                    <li>Does not constitute medical advice, diagnosis, or treatment</li>
                    <li>Should not replace consultation with qualified healthcare professionals</li>
                    <li>Represents traditional knowledge and practices that may not be scientifically validated</li>
                    <li>Is not intended to cure, treat, or prevent any disease</li>
                  </ul>
                  <p className="mt-3 font-semibold">
                    Always consult with licensed medical professionals before using any 
                    traditional medicine practices discussed in our courses.
                  </p>
                </div>
              </div>
            </section>

            {/* DMCA Policy */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">7. Copyright Infringement Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We respect the intellectual property rights of others and expect our 
                users to do the same. If you believe that content on our site infringes 
                your copyright, please contact us with detailed information including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-3">
                <li>Description of the copyrighted work you claim has been infringed</li>
                <li>Location of the allegedly infringing material on our site</li>
                <li>Your contact information and a statement of good faith belief</li>
                <li>A statement that the information is accurate and you are authorized to act</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by law, Oduduwa College of Yoruba Medicine 
                shall not be liable for any damages arising from the use of information 
                or content provided on this website or in our courses. This includes but 
                is not limited to direct, indirect, incidental, or consequential damages.
              </p>
            </section>

            {/* Contact for Copyright Issues */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">9. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For copyright inquiries, licensing requests, or any questions regarding 
                this disclaimer, please contact us at:
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Copyright Officer</strong><br />
                  <strong>Email:</strong> copyright@oyocam.org<br />
                  <strong>Phone:</strong> +234 802 298 1214<br />
                  <strong>Address:</strong> Institute of African Studies, University of Ibadan, Nigeria
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TermsOfService, PrivacyPolicy, CopyrightDisclaimer };