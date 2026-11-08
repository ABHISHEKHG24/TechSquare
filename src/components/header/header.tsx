"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import { opacity, background } from "./anim";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import { config } from "@/data/config";

interface HeaderProps {
  loader?: boolean;
  githubStars?: React.ReactNode;
}

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#projects" },
  { label: "Team", href: "/#team" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blogs" },
];

const Header = ({ loader, githubStars }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const isHome = usePathname() === "/";

  return (
    <motion.header
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in z-[1000] px-4 md:px-8 py-3.5"
      )}
      style={{
        background: isActive ? "hsl(var(--background) / .85)" : "transparent",
      }}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0,
        duration: 0.8,
      }}
    >
      <div className={cn(styles.bar, "flex items-center justify-between w-full max-w-7xl mx-auto")}>
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center text-xl font-bold tracking-tight text-foreground hover:opacity-85 transition-opacity py-1 shrink-0 font-display"
        >
          {config.author}
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Area: Actions, Theme, Book CTA, Menu */}
        <div className="flex items-center gap-3 shrink-0">
          <FunnyThemeToggle className="w-5 h-5 hidden md:flex" />
          {githubStars}

          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex rounded-xl px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black shadow-sm transition-all"
          >
            <Link href="#contact">Book a Consultation</Link>
          </Button>

          <Button
            variant={"ghost"}
            onClick={() => setIsActive(!isActive)}
            aria-label={isActive ? "Close menu" : "Open menu"}
            aria-expanded={isActive}
            className={cn(
              styles.el,
              "m-0 p-0 h-8 px-2 bg-transparent flex items-center justify-center rounded-lg hover:bg-accent/40"
            )}
          >
            <div className="relative hidden md:flex items-center mr-1">
              <motion.p
                variants={opacity}
                animate={!isActive ? "open" : "closed"}
                className="text-xs font-semibold tracking-wider uppercase"
              >
                Menu
              </motion.p>
              <motion.p
                variants={opacity}
                animate={isActive ? "open" : "closed"}
                className="text-xs font-semibold tracking-wider uppercase"
              >
                Close
              </motion.p>
            </div>
            <div
              className={`${styles.burger} ${
                isActive ? styles.burgerActive : ""
              }`}
            ></div>
          </Button>
        </div>
      </div>

      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        onClick={() => setIsActive(false)}
        className={styles.background}
      ></motion.div>

      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
