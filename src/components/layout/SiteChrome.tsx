"use client";

import Image from "next/image";
import { footer, nav } from "@/lib/content";
import { ApplyButton, LoginButton } from "@/components/ui/AuthButtons";

export function Nav() {
  return (
    <header>
      <div className="wrap nav">
        <div className="brand">
          <Image
            src="/images/logo-white.png"
            alt="Beverse School"
            width={200}
            height={48}
            className="brand-logo"
            priority
          />
          <span className="sc">School</span>
        </div>
        <nav className="nlinks" aria-label="Primary">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <LoginButton />
          <ApplyButton className="glow mag navcta">
            {nav.applyLabelShort}
            <span className="cl">&nbsp;for Cohort 1</span>
          </ApplyButton>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fcols">
          <div>
            <Image
              src="/images/logo-white.png"
              alt="Beverse"
              width={140}
              height={30}
              className="flogo h-[30px] w-auto"
            />
            <div className="ftag">{footer.tagline}</div>
            <p className="fdesc">{footer.description}</p>
          </div>
          <div>
            <h5>Explore</h5>
            <ul>
              {footer.explore.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Ecosystem</h5>
            <ul>
              {footer.ecosystem.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcontact">
            <h5>Get in touch</h5>
            {footer.contact.map((item) => (
              <p key={item.label}>
                <span className="l">{item.label}</span>
                {item.value}
              </p>
            ))}
          </div>
        </div>
        <div className="fbot">
          <span>{footer.copyright}</span>
          <span>
            {footer.legal.map((item, i) => (
              <span key={item.label}>
                {i > 0 && " · "}
                <a href={item.href}>{item.label}</a>
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
