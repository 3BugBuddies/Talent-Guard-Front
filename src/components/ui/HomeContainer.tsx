import { ReactNode } from "react";

interface HomeContainerProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?:
    | "white"
    | "gray"
    | "dark"
    | "primary"
    | "secondary"
    | "transparent"
    | "neutral-300";
}

const className = `
    w-full h-auto flex-shrink-0
    sm:w-[40rem] sm:h-[30rem]    <!-- tablet -->            
    md:w-[60rem] md:h-[40rem]   <!-- telas médias -->
    lg:w-[75rem] lg:h-[50rem]  <!-- desktop -->
    xl:w-full xl:h-[40rem] <!-- desktop grande -->
  `;

export default function HomeContainer({
  children,
  padding,
  background,
}: HomeContainerProps) {
  return (
    <section
      className={`flex items-center justify-center bg-background-dark-blue min-h-screen ${
        padding ? `py-${padding}` : "py-lg"
      } ${background ? `bg-${background}` : "bg-transparent"}`}
    >
      <div className={`${className}`}>{children}</div>
    </section>
  );
}
