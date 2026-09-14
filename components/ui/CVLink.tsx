import { existsSync } from "node:fs";
import { join } from "node:path";
import { Download, FileUser } from "lucide-react";

export default function CVLink({ className = "text-link" }: { className?: string }) {
  const exists = existsSync(join(process.cwd(), "public/documents/samuel-adeyemo-cv.pdf"));
  return exists ? <a href="/documents/samuel-adeyemo-cv.pdf" download className={className}><Download size={17} />Download CV</a> : <span className={`${className} unconfigured-link`}><FileUser size={17} />CV coming soon</span>;
}
