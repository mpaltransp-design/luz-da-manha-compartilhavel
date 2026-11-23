import { Button } from "@/components/ui/button";
import { LockIcon } from "@/components/icons";
import { categories, messages, photoOf, type CategoryId } from "@/lib/messages";
import { cn } from "@/lib/utils";

const covers = new Map(categories.map((category) => [category.id, messages.find((message) => message.category === category.id)]));

export function HomeThemes({ active, vip, onSelect }: {
  active: CategoryId | "todas";
  vip: boolean;
  onSelect: (category: CategoryId | "todas") => void;
}) {
  return (
    <section aria-label="Temas" className="mx-auto w-full max-w-[560px] md:max-w-3xl">
      <div className="flex items-center justify-between px-5 pb-3">
        <h2 className="serif text-[20px] font-semibold text-ink">Temas</h2>
        <Button variant="ghost" onClick={() => onSelect("todas")} aria-pressed={active === "todas"}
          className={cn("rounded-full text-[14px] font-bold", active === "todas" ? "bg-peach text-ink" : "text-ink-muted")}>
          Todas
        </Button>
      </div>
      <div className="flex gap-3 overflow-x-auto px-5 pb-3 snap-x snap-proximity" role="group" aria-label="Escolher tema">
        {categories.map((category) => {
          const cover = covers.get(category.id);
          const locked = category.vip && !vip;
          return (
            <Button key={category.id} variant="ghost" onClick={() => onSelect(category.id)}
              aria-label={locked ? `${category.label} — exclusivo VIP` : category.label}
              aria-pressed={active === category.id}
              className={cn("h-auto w-[132px] shrink-0 snap-start flex-col justify-start gap-2 whitespace-normal rounded-[16px] p-1 hover:bg-peach-soft", active === category.id && "bg-peach ring-2 ring-gold")}>
              <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-[12px] bg-peach-soft">
                {cover && <img src={photoOf(cover)} alt="" loading="lazy" className="h-full w-full object-cover" />}
                {category.vip && <span className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-cream/95 px-2 py-1 text-[11px] font-bold text-gold">
                  {locked && <LockIcon size={12} />} VIP
                </span>}
              </span>
              <span className="flex min-h-[42px] items-start justify-center text-center text-[15px] font-bold leading-[21px] text-ink">{category.label}</span>
            </Button>
          );
        })}
      </div>
    </section>
  );
}