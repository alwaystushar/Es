import { Icon } from "@/components/ui/Icon";

type StarsProps = {
  small?: boolean;
  label?: string;
};

export function Stars({ small = false, label = "Rated 4.8 out of 5" }: StarsProps) {
  return (
    <span className={small ? "stars stars--small" : "stars"} role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} src="/assets/icons/star.svg" width={small ? 12 : 20} height={small ? 12 : 20} />
      ))}
    </span>
  );
}
