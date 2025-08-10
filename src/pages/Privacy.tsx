import * as React from "react"
import { Container } from "../components/Container"
import { Meta } from "../components/Meta"
import { Link } from "../components/Router"
import { useAutoPosition, useHashFragment } from "../hooks"

export default function Privacy(): React.JSX.Element {
  useAutoPosition()
  useHashFragment()

  return (
    <>
      <Meta>
        {{
          title: "Privacy Policy",
          description: "Privacy Policy"
        }}
      </Meta>

      <Container size="lg" appendClassNames="my-5 md:my-10">
        <h1 className="text-center text-black text-xl sm:text-range-[20px-36px] sm:leading-range-[28px-40px] 3xl:text-4xl font-bold uppercase py-2">
          Privacy Policy
        </h1>
        <div className="flex flex-col gap-8 leading-6 md:leading-8">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-sm sm:text-range-[14px-16px] sm:leading-range-[20px-24px] 2xl:text-base">
              Effective Date: August 10, 2025
            </p>
            <div>
              <p>
                Welcome to <strong>rujiao.web.id</strong> ("we", "our", or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you access or use our website and participate in our forum.
              </p>
            </div>

            <h2 className="font-bold text-xl sm:text-range-[20px-24px] sm:leading-range-[28px-32px] 3xl:text-2xl">Summary of Key Points</h2>
            <ul className="flex flex-col gap-4">
              <li><span className="font-bold">What personal information do we process?</span> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about personal information you disclose to us.</li>
              <li><span className="font-bold">Do we process any sensitive personal information?</span> We do not process sensitive personal information.</li>
              <li><span className="font-bold">Do we collect any information from third parties?</span> We do not collect any information from third parties.</li>
              <li><span className="font-bold">How do we process your information?</span> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information.</li>
              <li><span className="font-bold">In what situations and with which parties do we share personal information?</span> We may share information in specific situations and with specific third parties. Learn more about when and with whom we share your personal information.</li>
              <li><span className="font-bold">How do we keep your information safe?</span> We have organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.</li>
              <li><span className="font-bold">What are your rights?</span> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.</li>
              <li><span className="font-bold">How do you exercise your rights?</span> The easiest way to exercise your rights is by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</li>
            </ul>
            <h2 className="font-bold text-xl sm:text-range-[20px-24px] sm:leading-range-[28px-32px] 3xl:text-2xl">
              Table of Contents
            </h2>
            <ol className="list-decimal pl-6 flex flex-col gap-2">
              <li>
                <Link to="#section-1" className="underline hover:text-acem2-primary" hideCrawl>
                  Information We Collect
                </Link>
              </li>
              <li>
                <Link to="#section-2" className="underline hover:text-acem2-primary" hideCrawl>
                  How We Use Your Information
                </Link>
              </li>
              <li>
                <Link to="#section-3" className="underline hover:text-acem2-primary" hideCrawl>
                  Sharing of Information
                </Link>
              </li>
              <li>
                <Link to="#section-4" className="underline hover:text-acem2-primary" hideCrawl>
                  Data Security
                </Link>
              </li>
              <li>
                <Link to="#section-5" className="underline hover:text-acem2-primary" hideCrawl>
                  Your Rights
                </Link>
              </li>
              <li>
                <Link to="#section-6" className="underline hover:text-acem2-primary" hideCrawl>
                  Third-Party Links
                </Link>
              </li>
              <li>
                <Link to="#section-7" className="underline hover:text-acem2-primary" hideCrawl>
                  Changes to This Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#section-8" className="underline hover:text-acem2-primary" hideCrawl>
                  Contact Us
                </Link>
              </li>
            </ol>
          </div>

          <div id="section-1" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">1. Information We Collect</h2>
            <div>
              <p>
                When you register for our forum or interact with our services, we may collect the following personal information:
              </p>
              <ul className="list-[square] pl-4">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
              </ul>
              <p>This information is provided voluntarily when you fill out forms, create an account, or participate in discussions.</p>
            </div>
          </div>

          <div id="section-2" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">2. How We Use Your Information</h2>
            <div>
              <p>
                <span className="font-bold">
                  We use the information we collect for the following purposes:
                </span>
              </p>
              <ul className="list-[square] pl-4">
                <li>To create and manage your forum account</li>
                <li>To communicate with you regarding your account or activity</li>
                <li>To respond to your inquiries or support requests</li>
                <li>To maintain the safety and security of our forum community</li>
                <li>To comply with legal obligations, if applicable</li>
              </ul>
            </div>
          </div>

          <div id="section-3" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">3. Sharing of Information</h2>
            <p>We do <strong>not</strong> sell, trade, or rent your personal information to third parties. However, we may share your data with trusted third-party service providers that help us operate our website and forum, under strict confidentiality agreements.</p>
            <p>We may also disclose personal information if required to do so by law or in response to valid requests by public authorities.</p>
          </div>

          <div id="section-4" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or alteration.</p>
            <p>However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.</p>
          </div>

          <div id="section-5" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">5. Your Rights</h2>
            <p>
              We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
            </p>
            <p>You have the right to:</p>
            <ul>
              <li>Access and review the personal data we hold about you</li>
              <li>Request correction or deletion of your personal information</li>
              <li>Withdraw your consent at any time</li>
            </ul>
            <p>To exercise these rights, please contact us at: <strong>admin@rujiao.web.id</strong></p>
          </div>

          <div id="section-6" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">6. Third-Party Links</h2>
            <p>Our website may contain links to other websites that are not operated or controlled by us. We are not responsible for the privacy practices or the content of such third-party websites.</p>
          </div>

          <div id="section-7" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">7. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically.</p>
          </div>

          <div id="section-8" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">8. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
            <p>
              <strong>Email:</strong> <Link to="mailto:admin@rujiao.web.id" hideCrawl>admin@rujiao.web.id</Link>
              <br />
              <strong>Website:</strong> <Link to="https://rujiao.web.id" hideCrawl>https://rujiao.web.id</Link>
            </p>
          </div>
        </div>
      </Container >
    </>
  )
}