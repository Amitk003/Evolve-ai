export default function DashedDivider({ className = "" }: { className?: string }) {
  return (
    <hr
      className={`w-full border-0 border-t border-dashed border-cork-shadow ${className}`}
    />
  );
}
