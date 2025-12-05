"use client";
import useLocalizer from "@/hooks/useLocalizer";
import { cn } from "@/lib/utils";

const Footer = ({ className }: { className?: string }) => {
  const { t } = useLocalizer();
  return (
    <footer
      className={cn(
        "h-12 max-w-xl mx-auto mb-10 mt-8 rounded-full bg-secondary flex flex-row justify-center items-center px-2",
        className
      )}
    >
      <p className="flex flex-row items-center gap-1 text-sm sm:text-lg">
        {t("paragraphs.copyRights")}
        <strong className="text-accent-foreground mx-1">{t("app.name")}</strong>
        <bdi>
          <code>{new Date().getFullYear()}</code>
        </bdi>
        ©
      </p>
    </footer>
  );
};

export default Footer;
