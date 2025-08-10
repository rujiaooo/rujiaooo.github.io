import * as React from "react"
import { Container } from "../components/Container"
import { Meta } from "../components/Meta"
import { Link } from "../components/Router"
import { useAutoPosition, useHashFragment } from "../hooks"

export default function Term(): React.JSX.Element {
  useAutoPosition()
  useHashFragment()

  return (
    <>
      <Meta>
        {{
          title: "Terms of Service",
          description: "Terms of Service"
        }}
      </Meta>

      <Container size="lg" appendClassNames="my-5 md:my-10">
        <h1 className="text-center text-black text-xl sm:text-range-[20px-36px] sm:leading-range-[28px-40px] 3xl:text-4xl font-bold uppercase py-2">
          Terms of Service
        </h1>
        <div className="flex flex-col gap-8 leading-6 md:leading-8">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-sm sm:text-range-[14px-16px] sm:leading-range-[20px-24px] 2xl:text-base">
              Effective Date: August 10, 2025
            </p>
            <div>
              Welcome to rujiao.web.id. By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the website.
            </div>

            <h2 className="font-bold text-xl sm:text-range-[20px-24px] sm:leading-range-[28px-32px] 3xl:text-2xl">
              Table of Contents
            </h2>
            <ol className="list-decimal pl-6 flex flex-col gap-2">
              <li>
                <Link to="#section-1" className="underline hover:text-acem2-primary" hideCrawl>
                  Acceptance of Terms
                </Link>
              </li>
              <li>
                <Link to="#section-2" className="underline hover:text-acem2-primary" hideCrawl>
                  Modification of Terms
                </Link>
              </li>
              <li>
                <Link to="#section-3" className="underline hover:text-acem2-primary" hideCrawl>
                  Use of the Website
                </Link>
              </li>
              <li>
                <Link to="#section-4" className="underline hover:text-acem2-primary" hideCrawl>
                  User Responsibilities
                </Link>
              </li>
              <li>
                <Link to="#section-5" className="underline hover:text-acem2-primary" hideCrawl>
                  Termination
                </Link>
              </li>
              <li>
                <Link to="#section-6" className="underline hover:text-acem2-primary" hideCrawl>
                  Contact
                </Link>
              </li>
            </ol>
          </div>

          <div id="section-1" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">1. Acceptance of Terms</h2>
            <div>
              <p>
                By accessing or using any part of our website, you agree to comply with and be legally bound by these Terms of Service, including any additional terms and conditions and policies referenced herein.
              </p>
            </div>
          </div>

          <div id="section-2" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">2. Modification of Terms</h2>
            <div>
              <p>
                We reserve the right to modify, update, or replace any part of these Terms of Service at any time without prior notice. Changes will be effective immediately upon posting on this page. It is your responsibility to review these terms periodically. Continued use of the website after any changes constitutes your acceptance of the new terms.
              </p>
            </div>
          </div>

          <div id="section-3" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">3. Use of the Website</h2>
            <p>You agree to use the website only for lawful purposes and in accordance with these Terms. You shall not use the site in any manner that could damage, disable, overburden, or impair the site or interfere with any other party's use of the website.</p>
          </div>

          <div id="section-4" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">4. User Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of any account information and are fully responsible for all activities that occur under your account. You agree to provide accurate, current, and complete information when creating or updating your account.</p>
          </div>

          <div id="section-5" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">5. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the website at any time, without notice or liability, for any reason, including violation of these Terms of Service.
            </p>
          </div>

          <div id="section-6" className="scroll-my-24 md:scroll-my-32 flex flex-col gap-4">
            <h2 className="font-bold text-2xl md:text-3xl">6. Contact</h2>
            <p>If you have any questions about these Terms of Service, please contact us at: admin@rujiao.web.id</p>
          </div>
        </div>
      </Container >
    </>
  )
}